<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\RevisionableInterface;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

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

  /**
   * {@inheritDoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (is_array($value[0][0])) {
      $value = array_shift($value);
    }
    $destination_value = $row->getDestinationProperty($destination_property) ?? [];
    foreach ($value as $paragraph_ref) {
      $paragraph = \Drupal::entityTypeManager()
        ->getStorage('paragraph')
        ->loadByProperties(['uuid' => $paragraph_ref['id']]);
      // Exit (__CLASS__ . "::" . __LINE__);.
      if (is_array($paragraph) && count($paragraph)) {
        $paragraph = array_shift($paragraph);
      }
      else {
        $paragraph = \Drupal::entityTypeManager()
          ->getStorage('paragraph')
          ->create([
            'langcode' => 'en',
            'type' => 'unmigrated_paragraph',
            'field_type' => $paragraph_ref['type'],
            'field_id' => $paragraph_ref['id'],
            'field_revision_id' => $paragraph_ref['meta']['revision_id'],
          ]);
        $paragraph->save();
      }
      if ($paragraph instanceof RevisionableInterface) {
        $destination_value[] = [
          'target_entityTypeId' => $paragraph->getEntityTypeId(),
          'target_bundle' => $paragraph->bundle(),
          'target_id' => $paragraph->id(),
          'target_revision_id' => $paragraph->getRevisionId(),
        ];
      }
      else {
        throw new \Exception("could not migrate paragraph:" . print_r($value));
      }
    }
    // $row->setDestinationProperty($destination_property, $destination_value);
    return $destination_value;

  }

}
