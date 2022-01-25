<?php

namespace Drupal\milken_migrate;

use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\milken_migrate\Utility\PanelHelper;

/**
 * A batch service for grid panel update command.
 *
 * Class provide process and finished function.
 */
class PanelBatchService {

  /**
   * Process/Update Panels.
   *
   * @param array $panel_ids
   *   Panel ids of the batch.
   * @param string $operation_details
   *   Details of the operation.
   * @param object $context
   *   Context for operations.
   */
  public function processPanel(array $panel_ids, $operation_details, &$context) {
    // 1. Merge results.
    $context['results'] = array_merge($context['results'], $panel_ids);

    // 2. Log messages.
    $context['message'] = new TranslatableMarkup('Batch: @details',
      ['@details' => $operation_details]
    );

    // 3. Run panel updates.
    try {
      PanelHelper::update($panel_ids);
    }
    catch (\Exception $e) {
      $context['message'] = new TranslatableMarkup('Batch Failed: @details',
        ['@details' => $e->getMessage()]
          );
    }
  }

  /**
   * Finished panel batch.
   *
   * @param bool $success
   *   Success of the operation.
   * @param array $results
   *   Array of results for post processing.
   * @param array $operations
   *   Array of operations.
   */
  public function processPanelFinished($success, array $results, array $operations) {
    $messenger = \Drupal::messenger();
    if ($success) {
      $messenger->addMessage(new TranslatableMarkup('@count results processed.',
          ['@count' => count($results)])
      );
    }
    else {
      // An error occurred.
      $error_operation = reset($operations);
      $messenger->addMessage(
        new TranslatableMarkup('An error occurred while processing @operation with arguments : @args',
          [
            '@operation' => $error_operation[0],
            '@args' => print_r($error_operation[0], TRUE),
          ]
        )
      );
    }
  }

}
