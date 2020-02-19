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
 * )
 */
class JsonAPITaxonomy extends ProcessPluginBase {

  use JsonAPIDataFetcherTrait;

  /**
   * The main function for the plugin, actually doing the data conversion.
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    $destination_values = [];
    foreach ($value['data'] as $relatedRecord) {
      if (isset($relatedRecord['id'])) {
        $term = \Drupal::service('entity.repository')
          ->loadEntityByUuid('taxonomy_term', $relatedRecord['id']);
        if ($term instanceof Term) {
          $destination_values['target_id'] = $term->id();
        }
        // TODO: create tax term if not exists.
      }
    }
    $row->setDestinationProperty($destination_property, $destination_values);
    return $destination_values;
  }

}
