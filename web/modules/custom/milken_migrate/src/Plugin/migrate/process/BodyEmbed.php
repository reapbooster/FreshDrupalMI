<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\RevisionableInterface;
use Drupal\Core\File\FileSystemInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use GuzzleHttp\Client;

/**
 * Filter to download image and return media reference.
 *
 * @Class BodyEmbed
 * @code
 * field_image:
 *   plugin: milken_migrate:body_embed
 *   source: {name where row data appears}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:body_embed"
 * );
 */
class BodyEmbed extends ProcessPluginBase {

  /**
   * Main guts of the plugin.
   *
   * @param mixed $value
   *   Incoming value from source row.
   * @param \Drupal\migrate\MigrateExecutableInterface $migrate_executable
   *   Migration executable.
   * @param \Drupal\migrate\Row $row
   *   Row data.
   * @param string $destination_property
   *   Destination Property.
   *
   * @return array|string|void
   *   Retruned Data.
   *
   * @throws \Drupal\migrate\MigrateException
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    print_r($row);
    exit (__CLASS__ . "::" . __LINE__);
    $toReturn = "";
    if (is_array($value)) {
      foreach ($value as $field) {
        if (is_string($field)) {
          $toReturn .= $field;
        }
      }
    }
    if (is_string(($value))) {
      $toReturn = $value;
    }
    $destination_value = $row->getDestinationProperty($this->configuration['destination']) ?? [];
    $paragraph = $this->createBodyTextParagraph($toReturn);
    if ($paragraph instanceof RevisionableInterface && is_array($destination_value)) {
      $destination_value[] = [
        'target_id' => $paragraph->id(),
        'target_revision_id' => $paragraph->getRevisionId(),
      ];
      $row->setDestinationProperty($this->configuration['destination'], $destination_value);
    }


    return $toReturn;
  }

  /**
   * Unfinished Embeded Entities function.
   */
  public function importEmbeddedEntities($source_text, Row $row) {
    \Drupal::logger(__CLASS__)
      ->debug("Source Text: :source", [":source" => print_r($source_text, TRUE)]);
    $dom = new \DOMDocument();
    @$dom->loadHTML($source_text);
    $embedded_entities = $dom->getElementsByTagName('drupal-entity');
    foreach ($embedded_entities as $entity) {
      \Drupal::logger(__CLASS__)
        ->debug("Found embedded entities: :entity ", [':entity' => $entity]);
      $type = $entity->getAttribute('data-entity-type');
      $uuid = $entity->getAttribute('data-entity-uuid');
      if ($type && $uuid) {
        \Drupal::logger(__CLASS__)
          ->debug("Ensuring entity exists:  :type - :uuid", [":type" => $type, ":uuid" => $uuid]);
        $this->ensureEntityExists([
          'type' => $type,
          'id' => $uuid,
        ]);
      }
    }
  }

  /**
   * Strip away awful MSWORD html.
   *
   * @param string $text
   *   Text to be filtered.
   * @param string $allowed_tags
   *   Tags allowed in filtered text.
   *
   * @return false|string|string[]|null
   *   Returned string.
   */
  protected function stripWordHtml(string $text, string $allowed_tags = '<b><i><sup><sub><em><strong><u><br><table><tr><td>'): ?string {
    mb_regex_encoding('UTF-8');
    // Replace MS special characters first.
    $search = [
      '/&lsquo;/u',
      '/&rsquo;/u',
      '/&ldquo;/u',
      '/&rdquo;/u',
      '/&mdash;/u',
    ];
    $replace = ['\'', '\'', '"', '"', '-'];
    $text = preg_replace($search, $replace, $text);
    // Make sure _all_ html entities are converted to the plain ascii
    // equivalents - it appears.
    // in some MS headers, some html entities are encoded and some aren't.
    $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
    // Try to strip out any C style comments first, since these, embedded in
    // html comments, seem to prevent strip_tags from removing html comments
    // (MS Word introduced combination).
    if (mb_stripos($text, '/*') !== FALSE) {
      $text = mb_eregi_replace('#/\*.*?\*/#s', '', $text, 'm');
    }
    // Introduce a space into any arithmetic expressions that could be caught
    // by strip_tags so that they won't be
    // '<1' becomes '< 1'(note: somewhat application specific).
    $text = preg_replace(['/<([0-9]+)/'], ['< $1'], $text);
    $text = strip_tags($text, $allowed_tags);
    // Eliminate extraneous whitespace from start and end of line, or anywhere
    // there are two or more spaces, convert it to one.
    $text = preg_replace(['/^\s\s+/', '/\s\s+$/', '/\s\s+/u'], [
      '',
      '',
      ' ',
    ], $text);
    // Strip out inline css and simplify style tags.
    $search = [
      '#<(strong|b)[^>]*>(.*?)</(strong|b)>#isu',
      '#<(em|i)[^>]*>(.*?)</(em|i)>#isu',
      '#<u[^>]*>(.*?)</u>#isu',
    ];
    $replace = ['<b>$2</b>', '<i>$2</i>', '<u>$1</u>'];
    $text = preg_replace($search, $replace, $text);
    // On some of the ?newer MS Word exports, where you get conditionals of
    // the form 'if gte mso 9', etc., it appears that whatever is in one of
    // the html comments prevents strip_tags from eradicating the html comment
    // that contains some MS Style Definitions - this last bit gets rid of
    // any leftover comments.
    $num_matches = preg_match_all("/\<!--/u", $text, $matches);
    if ($num_matches) {
      $text = preg_replace('/\<!--(.)*--\>/isu', '', $text);
    }
    return $text;
  }

  /**
   * Download data for embedded entity.
   */
  public function ensureEntityExists($jsonapi) : EntityInterface {
    [$entityTypeId, $bundle] = explode('--', $jsonapi['type']);
    $results = \Drupal::entityTypeManager()
      ->getStorage($entityTypeId)
      ->loadByProperties(['uuid' => $jsonapi['id']]);
    if (count($results)) {
      return \Drupal::entityTypeManager()
        ->getStorage($entityTypeId)
        ->load(array_shift($results));
    }
    return $this->createMissingMigration($jsonapi['type'], $jsonapi['id']);
  }

  /**
   * Check to see whether an entity exists, by UUID.
   */
  public function entityExists($entityTypeId, $uuid) {
    $loaded = \Drupal::entityTypeManager()
      ->getStorage($entityTypeId)
      ->loadByProperties(['uuid' => $uuid]);
    return empty($loaded);
  }

  /**
   * Turn remote URL into local FileInterface object.
   *
   * @param string $name
   *   The filename.
   * @param string $url
   *   The file Url.
   *
   * @return \Drupal\file\FileInterface|null
   *   return FileInterface or Null.
   */
  public function getRemoteFile($name, $url): ?FileInterface {
    $response = $this->getRestClient()->get($url);
    $toReturn = file_save_data($response->getBody(), "public://" . $name, FileSystemInterface::EXISTS_REPLACE);
    if ($toReturn instanceof FileInterface) {
      $realpath = \Drupal::service('file_system')
        ->realpath($toReturn->getFileUri());
      if (isset($_SERVER['USER'])) {
        chown($realpath, $_SERVER['USER']);
        chgrp($realpath, $_SERVER['USER']);
      }
      return $toReturn;
    }
    return NULL;
  }

  /**
   * Create a rest client configured for the JSONAPI host.
   */
  public function getRestClient() {
    return new Client(['base_uri' => $this->configuration['jsonapi_host']]);
  }

  /**
   *
   */
  protected function createMissingMigration(string $type, string $id) : EntityInterface {
    $mm_storage = \Drupal::entityTypeManager()->getStorage('missing_migration');
    $exists = $mm_storage->getQuery('and')
      ->condition('field_id', $id)
      ->execute();
    if (count($exists)) {
      return $mm_storage->load(reset($exists));
    }
    else {
      $toReturn = $mm_storage->create([
        'type' => 'missing_migration',
        'uuid' => $id,
        'name' => $type,
        'title' => $type,
        'field_type' => $type,
        'field_id' => $id,
      ]);
      $toReturn->save();
      return $toReturn;
    }
  }

  /**
   *
   */
  protected function createBodyTextParagraph($text) : ?RevisionableInterface {
    $paragraph = \Drupal::entityTypeManager()
      ->getStorage('paragraph')
      ->create([
        'type' => 'body_content',
        "field_body" => [
          'value' => $text,
          'format' => 'full_html',
        ],
        "field_num_text_columns" => 1,
        "field_background" => "transparent",
      ]);
    if ($paragraph instanceof RevisionableInterface) {
      $paragraph->save();
    }
    return $paragraph;

  }

}
