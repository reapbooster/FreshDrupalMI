<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\RevisionableInterface;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Drupal\milken_migrate\JsonAPIReference;
use Drupal\milken_migrate\Traits\EntityExistsTrait;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * Filter to download image and return media reference.
 *
 * @class Paragraphs
 * @code
 * field_content:
 *   plugin: milken_migrate:paragraphs
 *   source: {source property from $row}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:paragraphs",
 *   handle_multiples = TRUE,
 * );
 */
class Paragraphs extends ProcessPluginBase {

  use JsonAPIDataFetcherTrait;
  use EntityExistsTrait;

  /**
   * {@inheritDoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (isset($value['data']) && empty($value['data'])) {
      return new MigrateSkipProcessException("No value for: {$destination_property}");
    }
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    if (empty($value)) {
      return [];
    }
    if (is_array($value[0][0])) {
      $value = array_shift($value);
    }
    if (isset($value['id'])) {
      $value = [$value];
    }
    $toReturn = [];
    $destination_value = $row->getDestinationProperty($destination_property) ?? [];
    foreach ($value as $paragraph_ref) {
      $ref = new JsonAPIReference($paragraph_ref);
      if (!$ref instanceof JsonAPIReference) {
        continue;
      }
      $ref->getRemoteData();
      $paragraph = $ref->exists();
      if ($paragraph instanceof RevisionableInterface) {
        $destination_value[] = $paragraph;
        $toReturn[] = [
          "target_id" => $paragraph->id(),
          "target_revision_id" => $paragraph->getRevisionId(),
        ];
      }
      else {
        switch ($ref->getBundleTypeId()) {

          case "podcast_episode":
            $episode = \Drupal::entityTypeManager()
              ->getStorage('media')
              ->loadByProperties(['field_episode' => $ref->getProperty('field_episode')]);
            if (count($episode)) {
              $paragraph = Paragraph::create([
                'type' => 'podcast_episode',
                'uuid' => $ref->getId(),
                'field_episode_ref' => $episode,
                'langcode' => 'en',
              ]);
            }
            break;

          default:
            $paragraph = Paragraph::create([
              'type' => 'unmigrated_paragraph',
              'uuid' => $paragraph_ref['id'],
            ]);
            $paragraph->set('langcode', 'en');
            $paragraph->set('field_type', $paragraph_ref['type']);
            $paragraph->set('field_id', $paragraph_ref['id']);
            $paragraph->set('field_revision_id', $paragraph_ref['meta']['revision_id']);
        }
      }

      if ($paragraph instanceof Paragraph) {
        $paragraph->isNew();
        $paragraph->save();
        $destination_value[] = $paragraph;
        $toReturn[] = [
          "target_id" => $paragraph->id(),
          "target_revision_id" => $paragraph->getRevisionId(),
        ];
      }
      else {
        throw new MigrateSkipProcessException("cannot create paragraph: " . print_r($ref, TRUE));
      }

    }
    $row->setDestinationProperty($destination_property, $destination_value);
    return $toReturn;
  }

}
