<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\migrate\Row;

/**
 * Speaker destination plugin.
 *
 * @MigrateDestination(
 *   id = "milken_migrate:speakers",
 * )
 */
class Speakers extends MilkenMigrateDestinationBase {

  /**
   * {@inheritDoc}
   */
  public function getBundle(Row $row = NULL) {
    return "speakers";
  }

  /**
   * Add reference link to Event entity.
   *
   * @param \Drupal\migrate\Row $row
   *   Standard Migration Row Object.
   *
   * @return array|null
   *   Returns array of dependent entities or null.
   */
  public function getEvent(Row $row) {
    print_r($row);
    $entityStorage = \Drupal::getContainer()
      ->get('entity_type.manager')
      ->getStorage('event');
    $results = $entityStorage
      ->getQuery()
      ->condition('field_grid_event_id', $row->getSource()['eventid'])
      ->execute();
    \Drupal::logger(__CLASS__)
      ->debug('Found the following values:' . print_r($results, TRUE));
    if (is_array($results) && $resultID = array_shift($results)) {
      \Drupal::logger(__CLASS__)
        ->debug('Adding value to result set:' . print_r($resultID, TRUE));
      $row->setDestinationProperty('field_event', ['target_id' => $resultID]);
      return ['target_id' => $resultID];
    }
    return NULL;
  }

  /**
   * {@inheritDoc}
   */
  public function setRelatedFields(Row $row) {
    $this->getEvent($row);
  }

}
