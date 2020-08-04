<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Drupal\milken_migrate\Plugin\migrate\destination\TaxonomyTerm;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;
use Drupal\taxonomy\Entity\Term;

/**
 * This plugin gets a taxonomy term and returns the ID in a jsonAPI Migration.
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:toxonomy_by_name",
 *   handle_multiples=true,
 * )
 */
class TaxonomyByMachineName extends ProcessPluginBase {

  use JsonAPIDataFetcherTrait;


  /**
   * The main function for the plugin, actually doing the data conversion.
   *
   * @param mixed $value
   * @param \Drupal\migrate\MigrateExecutableInterface $migrate_executable
   * @param \Drupal\migrate\Row $row
   * @param string $destination_property
   *
   * @return array|\Drupal\migrate\MigrateSkipProcessException|mixed|string
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if(!is_array($value)){
      $value = [$value];
    }
    $destination_values = [];
    foreach ($value as $relatedRecord) {
      $term = \Drupal::entityTypeManager()
        ->getStorage('taxonomy_term')
        ->loadByProperties(['machine_name' => $relatedRecord ]);
      if (count($term)) {
        $term = array_shift($term);
      }
      if ($term instanceof Term) {
        $destination_values[] = ['target_id' => $term->id() ];
      } else {
        $this->messenger()->addError('Taxonomy not found: ' . $value);
      }
    }
    $row->setDestinationProperty($destination_property, $destination_values);
    return $destination_values;
  }

}
