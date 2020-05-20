<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\migrate\MigrateSkipRowException;
use Drupal\migrate\Plugin\migrate\destination\EntityContentBase;
use Drupal\migrate\Plugin\MigrateIdMapInterface;
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate\Row;

/**
 * Speaker destination plugin
 *
 * @MigrateDestination(
 *   id = "milken_migrate:speakers",
 * )
 */
class Speakers extends MilkenMigrateDestinationBase {

  /**
   * @param \Drupal\migrate\Row $row
   *
   * @return string
   */
  public function getBundle(Row $row = NULL) {
    return "speakers";
  }

  /**
   * @param \Drupal\migrate\Row $row
   *
   * @return array|null
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

  function setRelatedFields(Row $row) {
    $this->getEvent($row);
  }

}
