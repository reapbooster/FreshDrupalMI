<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal;
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
    $toReturn = "";
    $source = $row->getSource();
    try {
      foreach ($value as $field) {
        if (is_array($field)) {
          $toReturn .= $this->parseParagraphFields($field);
        }
        if (is_string($field)) {
          $toReturn .= $field;
        }
      }
      // Importing embedded entities should not alter the text.
      // $this->importEmbeddedEntities($toReturn);
      Drupal::logger('milken_migrate')->debug($toReturn);
    }
    catch (\Exception $e) {
      throw new MigrateException($e->getMessage());
    }
    catch (\Throwable $t) {
      throw new MigrateException($t->getMessage());
    }
    $row->setDestinationProperty($destination_property, $toReturn);
    $row->setDestinationProperty('field_body/format', 'full_html');
    return $toReturn;
  }

  /**
   *
   */
  public function importEmbeddedEntities($source_text) {
    $dom = new \DOMDocument();
    $dom->loadHTML($source_text);
    $embedded_entities = $dom->getElementsByTagName('drupal-entity');
    foreach ($embedded_entities as $entity) {
      $type = $entity->getAttribute('data-entity-type');
      $uuid = $entity->getAttribute('data-entity-uuid');
      if ($type && $uuid) {
        $this->ensureExists($type, 'image', $uuid);
      }
      // TODO: Finish this function.
      print_r($type);
      exit();
    }
  }

  /**
   *
   */
  protected function parseParagraphFields($paragraphFields) {
    $paragraph_text_field = $this->configuration['paragraph_text_field'];
    if (!$paragraph_text_field) {
      throw new MigrateException("The text field in the paragraph objects should be set as property 'paragraph_text_field'");
    }
    $toReturn = "";
    foreach ($paragraphFields as $field) {
      if (isset($field[$this->configuration['paragraph_text_field']]['value'])) {
        $toReturn .= $field[$this->configuration['paragraph_text_field']]['value'];
      }
    }
    return $toReturn;
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
  public function ensureEntityExists($entityTypeId, $bundle, $uuid) {
    if (!$this->entityExists($entityTypeId, $uuid)) {
      $response = $this->getRestClient()->get("/jsonapi/{$entityTypeId}/{$bundle}/{$uuid}");
      if (in_array($response->getStatusCode(), [200, 201, 202])) {
        $responseData = json_decode($response->getBody(), TRUE);
        $attributes = $responseData['data']['attributes'];
        switch ($responseData['data']['type']) {
          case "media--video":
            break;

          case "media-image":
            break;

          default:
        }
        if (isset($attributes['uri']['url'])) {
          $url = $this->configuration['jsonapi_host'] . $attributes['uri']['url'];
          \Drupal::logger('milken_migrate')->debug($url);
          $file = $this->getRemoteFile($attributes['filename'], $url);

        }
        return ['entity' => $file];
      }
    }
  }

  /**
   *
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
   *
   */
  public function getRestClient() {
    return new Client(['base_uri' => $this->configuration['jsonapi_host']]);
  }

}
