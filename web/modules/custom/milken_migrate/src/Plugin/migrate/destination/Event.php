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
 * Provides Event destination.
 *
 * Use this plugin for a table not registered with Drupal Schema API.
 *
 * @MigrateDestination(
 *   id = "milken_migrate:event",
 * )
 */
class Event extends EntityContentBase implements ContainerFactoryPluginInterface {

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
    $this->rollbackAction = MigrateIdMapInterface::ROLLBACK_DELETE;
    $entity = $this->getEntity($row, $old_destination_id_values);
    if (!$entity) {
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
  public function getBundle(Row $row) {
    switch (strtolower($row->get('type'))) {
      case "finLabs":
      case "mia":
      case "p4c":
        return "meeting";


      case "summit":
        return "summit";

      case "gc":
        return "conference";

      default:
        return null;
    }
  }

  /**
   *
   */
  public function fields(MigrationInterface $migration = NULL) {
    if (!$this->storage->getEntityType()->entityClassImplements('Drupal\Core\Entity\FieldableEntityInterface')) {
      return [];
    }
    $field_definitions = $this->getEntityFieldManager()->getFieldDefinitions($this->storage->getEntityTypeId(), $this->configuration['bundle']);
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
  public function getEntityFieldManager() : EntityFieldManagerInterface {
    if (!$this->entityFieldManager instanceof EntityFieldManagerInterface) {
      $this->entityFieldManager = \Drupal::service('entity_field.manager');
    }
    return $this->entityFieldManager;
  }

}
