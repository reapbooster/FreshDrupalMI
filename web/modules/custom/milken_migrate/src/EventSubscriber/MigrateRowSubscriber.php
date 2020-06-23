<?php

namespace Drupal\milken_migrate\EventSubscriber;

use Drupal\migrate\Event\MigrateEvents;
use Drupal\migrate\Event\MigratePreRowSaveEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Class MigrateRowSubscriber.
 *
 * @package Drupal\milken_migrate
 */
class MigrateRowSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritDoc}
   */
  public static function getSubscribedEvents() {
    return [
      MigrateEvents::PRE_ROW_SAVE => 'preRowSave',
    ];
  }

  /**
   * Triggered before each row saves its data.
   *
   * @param \Drupal\migrate\Event\MigratePreRowSaveEvent $event
   *   Event object.
   */
  public function preRowSave(MigratePreRowSaveEvent $event) {
    // $row = $event->getRow();
    if (function_exists('drush_print')) {
      // drush_print("Import " . $event->getMigration()->id() . " row: ".
      // . $row->getDestinationProperty('uuid')).
    }
  }

}