<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
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
class Event extends MilkenMigrateDestinationBase implements ContainerFactoryPluginInterface {


  function getRelatedFields(Row $row) {

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

  function setRelatedFields(Row $row) {
    return true;
  }

}
