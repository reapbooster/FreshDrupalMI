<?php

namespace Drupal\milken_migrate\Commands;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drush\Commands\DrushCommands;

/**
 * A drush command file for update grid panel.
 *
 * Php function "milken_migrate_update_grid_panel" is
 * converted to drush command with batch feature.
 */
class UpdateGridPanelCommands extends DrushCommands {

  use StringTranslationTrait;

  /**
   * Entity type service.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Logger service.
   *
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected $logger;

  /**
   * Constant batch size.
   */
  public const BATCHSIZE = 50;

  /**
   * Constructs a new UpdateGridPanelCommands object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   Entity type service.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $loggerChannelFactory
   *   Logger service.
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager, LoggerChannelFactoryInterface $loggerChannelFactory) {
    parent::__construct();
    $this->entityTypeManager = $entityTypeManager;
    $this->logger = $loggerChannelFactory->get('milken_migrate');
  }

  /**
   * Update Grid Panel.
   *
   * @command update:grid-panel
   * @aliases update-grid-panel
   *
   * @usage update:grid-panel
   *   No argument accepted with this drush command.
   */
  public function updateGridPanel() {

    // 1. Print some message.
    $this->output()->writeln('Start of milken_migrate_update_grid_panel.');

    // 2. Get all Panel ids.
    $panels = $this->entityTypeManager->getStorage('panel')
      ->getQuery()
      ->condition('type', 'panel')
      ->execute();
    $panels_batch = array_chunk(
      array_reverse($panels, TRUE),
      static::BATCHSIZE);

    // 3. Create the operations array for the batch.
    $operations = [];
    foreach ($panels_batch as $batchId => $panelIds) {
      // 4. Prepare batch operations.
      $operations[] = [
        '\Drupal\milken_migrate\PanelBatchService::processPanel',
        [
          $panelIds,
          $this->t('Updating panels in batch @batchId', ['@batchId' => $batchId]),
        ],
      ];
    }

    // Number of operations.
    $numOperations = count($operations);

    // 5. Log some important messages.
    $this->output()->writeln(
      sprintf(
        'Prepared batch with total %d operations.',
        $numOperations
      )
    );

    // 6. Create the batch.
    $batch = [
      'title' => $this->t('Updating @num panel(s)', ['@num' => $numOperations]),
      'operations' => $operations,
      'finished' => '\Drupal\milken_migrate\PanelBatchService::processPanelFinished',
    ];

    // 7. Add batch operations as new batch sets.
    batch_set($batch);

    // 8. Process the batch sets.
    drush_backend_batch_process();

    // 9. Show some information.
    $this->logger->notice("Batch operations end.");
  }

}
