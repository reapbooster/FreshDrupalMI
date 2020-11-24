<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Core\Entity\EntityInterface;
use Drupal\migrate\Row;

/**
 * Speaker destination plugin.
 *
 * @MigrateDestination(
 *   id = "milken_migrate:people",
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
   * {@inheritDoc}
   */
  public function setRelatedFields(Row $row, EntityInterface $entity) : EntityInterface {
    \Drupal::logger(__CLASS__)
      ->debug('Getting Related Fields:' . \Kint::dump($row, TRUE));
    $entity->set('field_event', $this->getEvent($row));
    return $entity;
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
    $entityStorage = \Drupal::getContainer()
      ->get('entity_type.manager')
      ->getStorage('event');
    $results = $entityStorage
      ->getQuery()
      ->condition('field_grid_event_id', $row->getSource()['eventid'])
      ->execute();
    \Drupal::logger(__CLASS__)
      ->debug('Found the following values:' . \Kint::dump($results, TRUE));
    if (is_array($results) && count($results) >= 1 && $resultID = array_shift($results)) {
      \Drupal::logger(__CLASS__)
        ->debug('Adding value to result set:' . \Kint::dump($resultID, TRUE));
      $entity = $entityStorage->load($resultID);
      if ($entity instanceof EntityInterface) {
        $toReturn = ['target_id' => $resultID];
        $row->setDestinationProperty('field_event', $toReturn);
        return $toReturn;
      }
    }
    return [];
  }

}
