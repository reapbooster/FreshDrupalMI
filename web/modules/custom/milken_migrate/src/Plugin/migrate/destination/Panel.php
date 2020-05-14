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
 * Panel destination plugin
 *
 * @MigrateDestination(
 *   id = "milken_migrate:panel",
 * )
 */
class Panel extends EntityContentBase implements ContainerFactoryPluginInterface {

  protected $supportsRollback = TRUE;

  /**
   * @var
   */
  protected $entityType;

  /**
   * @var
   */
  protected $entityFieldManager;

  /**
   * {@inheritdoc}
   */
  public function import(Row $row, array $old_destination_id_values = []) {
    $this->getEvent($row);
    $this->rollbackAction = MigrateIdMapInterface::ROLLBACK_DELETE;
    $entity = $this->getEntity($row, $old_destination_id_values);
    if (!$entity instanceof ContentEntityInterface) {
      throw new MigrateException('Unable to get entity');
    }
    assert($entity instanceof ContentEntityInterface, "Cannot get the entity object");
    if ($this->isEntityValidationRequired($entity)) {
      $this->validateEntity($entity);
    }
    $map = $row->getIDMap();
    $ids = $this->save($entity, $old_destination_id_values);
    $map['destid1'] = $ids[array_keys($ids)[0]];
    $row->setIdMap($map);
    $this->setRollbackAction($map,
      $entity->isNew() ?
        MigrateIdMapInterface::ROLLBACK_DELETE :
        MigrateIdMapInterface::ROLLBACK_PRESERVE
    );
    return $ids;
  }

  /**
   * @param \Drupal\migrate\Row $row
   *
   * @return string
   */
  public function getBundle(Row $row = NULL) {
    return "panel";
  }

  /**
   *
   */
  public function fields(MigrationInterface $migration = NULL) {
    if (!$this->storage->getEntityType()
      ->entityClassImplements('Drupal\Core\Entity\FieldableEntityInterface')) {
      return [];
    }
    $field_definitions = $this->getEntityFieldManager()
      ->getFieldDefinitions($this->storage->getEntityTypeId(), $this->configuration['bundle']);
    return array_map(function ($definition) {
      return (string) $definition->getLabel();
    }, $field_definitions);
  }

  /**
   * @return array|array[]
   */
  public function getIds() {
    return $this->configuration['ids'];
  }

  /**
   *
   */
  public function getEntityFieldManager(): EntityFieldManagerInterface {
    if (!$this->entityFieldManager instanceof EntityFieldManagerInterface) {
      $this->entityFieldManager = \Drupal::service('entity_field.manager');
    }
    return $this->entityFieldManager;
  }


  public function getEvent(Row $row) {
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

}
