<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityFieldManager;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\Plugin\migrate\destination\EntityContentBase;
use Drupal\migrate\Plugin\MigrateIdMapInterface;
use Drupal\migrate\Row;
use Drupal\migrate\Plugin\MigrationInterface;

/**
 * Class MilkenMigrateDestinationBase.
 *
 * @package Drupal\milken_migrate\Plugin\migrate\destination
 */
abstract class MilkenMigrateDestinationBase extends EntityContentBase {

  /**
   * Supports Rollback?
   *
   * @var bool
   *    Yes or no.
   */
  protected $supportsRollback = TRUE;
  /**
   * Type of Entity.
   *
   * @var \Drupal\Core\Entity\EntityTypeInterface
   *    EckEntityInterface is produced.
   */
  protected $entityType;
  /**
   * Field Manager.
   *
   * @var \Drupal\Core\Entity\EntityFieldManagerInterface
   */
  protected $entityFieldManager;

  /**
   * {@inheritdoc}
   */
  public function import(Row $row, array $old_destination_id_values = []) {
    \Drupal::logger(__CLASS__)
      ->debug('Importing:' . print_r($row, TRUE));
    $this->rollbackAction = MigrateIdMapInterface::ROLLBACK_DELETE;
    $entity = $this->getEntity($row, $old_destination_id_values);
    if (!$entity instanceof ContentEntityInterface) {
      throw new MigrateException('Unable to get entity');
    }
    assert($entity instanceof ContentEntityInterface, "Cannot get the entity object");
    $this->setRelatedFields($row, $entity);
    \Drupal::logger(__CLASS__)
      ->debug('Related Fields set:' . print_r($row, TRUE));
    if ($this->isEntityValidationRequired($entity)) {
      $this->validateEntity($entity);
    }
    \Drupal::logger(__CLASS__)
      ->debug('saving these values:' . print_r($entity->toArray(), TRUE));
    $ids = $this->save($entity, $old_destination_id_values);

    $map['destid1'] = $entity->id();
    $row->setIdMap($map);
    $this->setRollbackAction($map,
      $entity->isNew() ?
        MigrateIdMapInterface::ROLLBACK_DELETE :
        MigrateIdMapInterface::ROLLBACK_PRESERVE
    );
    return $ids;
  }

  /**
   * Must be implemented and add any related reference fields.
   */
  abstract public function setRelatedFields(Row $row, EntityInterface $entity) : EntityInterface;

  /**
   * Get a list of fields and their labels.
   *
   * @param \Drupal\migrate_plus\Entity\MigrationInterface|null $migration
   *   Migration Class Object.
   *
   * @return array|string[]|void
   *   Array of fields and their labels.
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
   * Get the entityFieldManager.
   *
   * @return \Drupal\Core\Entity\EntityFieldManager
   *   Intantiate if it doesn't already exist.
   */
  public function getEntityFieldManager(): EntityFieldManager {
    if (!$this->entityFieldManager instanceof EntityFieldManagerInterface) {
      $this->entityFieldManager = \Drupal::service('entity_field.manager');
    }
    return $this->entityFieldManager;
  }

}
