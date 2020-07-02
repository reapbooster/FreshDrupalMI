<?php

namespace Drupal\milken_migrate\EventSubscriber;

use Drupal\migrate\Event\MigrateEvents;
use Drupal\migrate\Event\MigratePostRowSaveEvent;
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
      // MigrateEvents::POST_ROW_SAVE => 'postRowSave',.
    ];
  }

  /**
   * Triggered before each row saves its data.
   *
   * @param \Drupal\migrate\Event\MigratePreRowSaveEvent $event
   *   Event object.
   */
  public function preRowSave(MigratePreRowSaveEvent $event) {
    $row = $event->getRow();
    \Kint::enabled(true);
    $message = "PreSave: " . $event->getMigration()->id() . " row: " . $row->getDestinationProperty('uuid');
    $message .= \Kint::dump($row->getDestination());
    \Drupal::logger('milken_migrate')
      ->debug($message);
  }

  /**
   * Triggered before each row saves its data.
   *
   * @param \Drupal\migrate\Event\MigratePostRowSaveEvent $event
   *   Event object.
   */
  public function postRowSave(MigratePostRowSaveEvent $event) {
    // $dest = $event->getDestinationIdValues();
    // if (function_exists('drush_print')) {
    // drush_print("PostSave " . $event->getMigration()->id() .
    // " destination: " . $dest);
    // }
  }

}
