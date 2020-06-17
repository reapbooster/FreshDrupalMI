<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;
use Drupal\taxonomy\Entity\Term;

/**
 * This plugin gets a taxonomy term and returns the ID in a jsonAPI Migration.
 *
 * @MigrateProcessPlugin(
 *   id = "jsonapi_taxonomy",
 *   handle_multiples=true,
 * )
 */
class JsonAPITaxonomy extends ProcessPluginBase {

  use JsonAPIDataFetcherTrait;

  /**
   * The main function for the plugin, actually doing the data conversion.
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if ((isset($value['data']) && empty($value['data'])) ||
      empty($value)
    ) {
      return [];
    }
    $destination_values = [];
    if (is_array($value)) {
      foreach ($value as $relatedRecord) {
        if (isset($relatedRecord['id'])) {
          $term = \Drupal::entityTypeManager()
            ->getStorage('taxonomy_term')
            ->loadByProperties(['uuid' => $relatedRecord['id']]);
          if (count($term)) {
            $term = array_shift($term);
          }
          else {
            $recordData = $this->getRelatedRecordData($relatedRecord, $row);
            print_r($recordData);
            exit();
          }
        }
        if ($term instanceof Term) {
          $destination_values[] = ['entity' => $term];
        }
        else {
          return NULL;
        }
      }
    }
    $row->setDestinationProperty($destination_property, $destination_values);
    return $destination_values;
  }

}
