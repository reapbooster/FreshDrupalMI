<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;
use Drupal\taxonomy\Entity\Term;

/**
 * This plugin gets a taxonomy term and returns the ID in a jsonAPI Migration.
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:taxonomy_by_name",
 *   handle_multiples=true,
 * )
 */
class TaxonomyByMachineName extends ProcessPluginBase {

  use JsonAPIDataFetcherTrait;

  /**
   * The main function for the plugin, actually doing the data conversion.
   *
   * @param mixed $value
   *   The value to be processed.
   * @param \Drupal\migrate\MigrateExecutableInterface $migrate_executable
   *   Migrate Executable.
   * @param \Drupal\migrate\Row $row
   *   Row value.
   * @param string $destination_property
   *   Destination property.
   *
   * @return array|\Drupal\migrate\MigrateSkipProcessException|mixed|string
   *   Processed Value.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    if ($row->isStub() || (isset($value['data']) && empty($value['data'])) || empty($value)
    ) {
      return NULL;
    }
    $single_value = FALSE;
    if (!is_array($value)) {
      $value = [$value];
      $single_value = TRUE;
    }
    $destination_values = [];
    foreach ($value as $relatedRecord) {
      $term = \Drupal::entityTypeManager()
        ->getStorage('taxonomy_term')
        ->loadByProperties([
          'machine_name' => str_replace("-", "_", $relatedRecord),
          'vid' => $this->configuration['vocabulary'],
        ]);
      if (count($term)) {
        $term = array_shift($term);
      }
      if ($term instanceof Term) {
        $destination_values[] = term;
      }
      else {
        $this->messenger()->addError('Taxonomy not found: ' . $value);
      }
    }
    if ($single_value == TRUE) {
      $destination_values = array_shift($destination_values);
    }
    return $destination_values;
  }

}
