<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\RevisionableInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
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
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    if (empty($value)) {
      return [];
    }
    if (is_array($value[0][0])) {
      $value = array_shift($value);
    }
    $destination_value = $row->getDestinationProperty($destination_property) ?? [];
    foreach ($value as $paragraph_ref) {
      if (isset($paragraph_ref['data']) && empty($paragraph_ref['data'])) {
        return new MigrateSkipProcessException("No value for: {$destination_property}");
      }
      $paragraph = $this->entityExixsts('paragraph', $paragraph_ref['id']);
      if ($paragraph instanceof RevisionableInterface) {
        $destination_value[] = $paragraph;
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
        throw new MigrateException("could not migrate paragraph:" . print_r($paragraph_ref, TRUE));
      }
      $destination_value[] = $paragraph;
    }
    $row->setDestinationProperty($destination_property, $destination_value);
    return $destination_value;
  }

}
