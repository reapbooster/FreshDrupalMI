<?php

/**
 * @file
 * Cron jobs for Milken Migrate module.
 */

use Drupal\migrate\Plugin\Migration;

define('MILKEN_MIGRATION_ORDER', [
  'entityqueue',
  'file',
  'media_image',
  'media_audio',
  'video',
  'media_podcast_episode',
]);

/**
 * Add the migrations to a batch job.
 */
function milken_migrate_cron_run_migrations() {
  $logger = \Drupal::logger('milken_migrate');
  $queue = \Drupal::queue('milken_migrate');
  $manager = \Drupal::service('plugin.manager.migration');
  if ($queue->numberOfItems() == 0) {
    foreach (MILKEN_MIGRATION_ORDER as $migrationID) {
      $migrations = $manager->createInstances($migrationID);
      if ($migrations[$migrationID] instanceof Migration) {
        $migration = $migrations[$migrationID];
        if (!$migration->allRowsProcessed()) {
          $success = $queue->createItem([
            'migration_id' => $migrationID,
          ]);
          if ($success) {
            $logger->notice('%label has been scheduled for import',
              [
                '%label' => $migrationID,
              ]
            );
            break;
          }
        }
      }
    }
  }
}
