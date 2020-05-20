<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * This plugin gets a reference to another entity with a specific property.
 *
 * @code
 *
 *   field_event:
 *     plugin: milken_reference
 *     source: eventID
 *     referenced_entity: event
 *     referenced_entity_search_property: field_grid_event_id
 *
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_reference",
 * )
 */
class Reference extends ProcessPluginBase {

  /**
   * The main function for the plugin, actually doing the data conversion.
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    $destination_values = [];
    $entityStorage = \Drupal::getContainer()
      ->get('entity_type.manager')
      ->getStorage($this->configuration['referenced_entity']);
    $results = $entityStorage
      ->getQuery()
      ->condition($this->configuration['referenced_entity_search_property'], $row->getSource()[$this->configuration['source']])
      ->execute();
    \Drupal::logger(__CLASS__)->debug('Found the following values:' . print_r($results, true));
    if (is_array($results) && $resultID = array_shift($results)) {
      \Drupal::logger(__CLASS__)->debug('Adding value to result set:' . print_r($resultID, true));
      $row->setDestinationProperty($destination_property, $resultID);
      return $resultID;
    }
    \Drupal::logger(__CLASS__)->debug('adding default empty value');
    return [];
  }

}
