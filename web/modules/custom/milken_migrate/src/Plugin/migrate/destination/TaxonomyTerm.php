<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\eck\EckEntityInterface;
use Drupal\migrate\Row;

/**
 * Speaker destination plugin.
 *
 * @MigrateDestination(
 *   id = "milken_migrate:taxonomy_term",
 * )
 */
class TaxonomyTerm extends MilkenMigrateDestinationBase implements ContainerFactoryPluginInterface {

  /**
   * @param \Drupal\migrate\Row $row
   * @param array $old_destination_id_values
   *
   * @return array|mixed|void
   */
  public function import(Row $row, array $old_destination_id_values = []) {
    $toReturn = null;
    $termData = [];
    $terms = $this->storage->loadTree($this->getBundle($row));
    foreach ($terms as $term) {
      $termData[$term->name] = $term->tid;
    }
    if (isset($termData[$row->get('name')])) {
      $term = $this->storage->load($termData[$row->get('name')]);
    }
    else {
      $term = $this->storage->create([
        'vid' => 'tracks',
        'name' => $row->get('name'),
      ]);
      $toReturn = $this->save($term, $old_destination_id_values);
    }
    if ($term instanceof EntityInterface && !empty($row->get('eventid'))) {
      $this->addTrackToEvent($row->get('eventid'), $term->id());
    }
    return $toReturn;
  }

  /**
   * @param \Drupal\migrate\Row $row
   *
   * @return string
   */
  public function getBundle(Row $row = NULL) {
    return "tracks";
  }

  /**
   * @param \Drupal\migrate\Row $row
   *
   * @return array|null
   */
  public function addTrackToEvent($eventID, $tid) {
    $entityStorage = \Drupal::getContainer()
      ->get('entity_type.manager')
      ->getStorage('event');
    $event = $entityStorage->loadByProperties(['field_grid_event_id' => $eventID]);
    if (count($event)) {
      $event = array_shift($event);
    }

    if ($event instanceof EckEntityInterface) {
      $event->get('field_tracks')
        ->appendItem(['tid' => $tid]);
      $event->save();
    }
    return $event;
  }

  /**
   * @param \Drupal\migrate\Row $row
   */
  public function setRelatedFields(Row $row) {

  }


  /**
   * @return string|null
   */
  public static function getEntityTypeId($plugin_id) {
    return 'taxonomy_term';
  }

}
