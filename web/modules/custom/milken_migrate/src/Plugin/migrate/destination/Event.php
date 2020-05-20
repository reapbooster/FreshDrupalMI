<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
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

  /**
   * {@inheritdoc}
   */
  public function getRelatedFields(Row $row) {

  }

  /**
   * {@inheritdoc}
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
        return NULL;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function setRelatedFields(Row $row) {
    return TRUE;
  }

}
