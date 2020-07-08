<?php

/**
 * @file
 * Cron jobs for Milken Migrate module.
 */

use Drupal\migrate\Plugin\Migration;

define('MILKEN_MIGRATION_ORDER', [
  'entityqueue',
  'file',
  'taxonomy_centers',
  'taxonomy_milken_tags',
  'taxonomy_collections',
  'taxonomy_program_initiatives',
  'media_image',
  'media_audio',
  'media_video',
  'media_podcast_episode',
  "media_report",
  "paragraph_body_content",
  "paragraph_pull_quote",
  "paragraph_author",
  "event",
  "panel",
  "room",
  "panel",
  "speaker",
  "track",
  "node_article",
]);

/**
 * Add one migrations from the list to a batch job.
 * There's a hardcoded limit of 250 items per cron run.
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
