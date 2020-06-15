<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\RevisionableInterface;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
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

  /**
   * {@inheritDoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (empty($value)) {
      return [];
    }
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
        $paragraph = Paragraph::create([
          'type' => 'unmigrated_paragraph',
          'uuid' => $paragraph_ref['id'],
        ]);
        $paragraph->set('langcode', 'en');
        $paragraph->set('field_type', $paragraph_ref['type']);
        $paragraph->set('field_id', $paragraph_ref['id']);
        $paragraph->set('field_revision_id', $paragraph_ref['meta']['revision_id']);
        $paragraph->isNew();
        $paragraph->save();
      }
      if (!$paragraph instanceof RevisionableInterface) {
        throw new \Exception("could not migrate paragraph:" . print_r($paragraph_ref));
      }
      $destination_value[] = ["entity" => $paragraph];
    }
    return $destination_value;
  }

}
