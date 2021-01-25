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
class TaxonomyByMachineName extends MilkenProcessPluginBase {

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
    $taxonomyStorage = $this->entityTypeManager->getStorage('taxonomy_term');
    foreach ($value as $relatedRecord) {
      $term = [];
      if (isset($this->configuration['vocabulary'])) {
        $properties['vid'] = $this->configuration['vocabulary'];
      }
      $properties['machine_name'] = is_array($relatedRecord) ?
        $relatedRecord['machine_name'] :
        str_replace("-", "_", $relatedRecord);

      if (!empty($properties["machine_name"])) {
        $term = $taxonomyStorage->loadByProperties($properties);
      }
      if (count($term)) {
        $destination_values = array_merge($destination_values, $term);
      }
    }
    if ($single_value == TRUE) {
      $destination_values = array_shift($destination_values);
    }
    return $destination_values;
  }

}
