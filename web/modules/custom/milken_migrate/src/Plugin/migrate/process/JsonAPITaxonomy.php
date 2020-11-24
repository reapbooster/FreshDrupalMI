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
 *   id = "milken_migrate:jsonapi_taxonomy",
 *   handle_multiples = true,
 * )
 */
class JsonAPITaxonomy extends ProcessPluginBase {

  use JsonAPIDataFetcherTrait;

  /**
   * The main function for the plugin, actually doing the data conversion.
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    if ((isset($value['data']) && empty($value['data'])) ||
      empty($value)
    ) {
      return [];
    }
    $destination_values = [];
    if (is_array($value)) {
      foreach ($value as $relatedRecord) {
        if (isset($relatedRecord['id']) && $relatedRecord['id'] != "missing") {
          // phpcs:ignore
          [$entityTypeId, $vocabulary] = explode("--", $relatedRecord['type']);
          $properties['uuid'] = $relatedRecord['id'];
          // If the VOCABULARY value is not set, use the value
          // from the remote site.
          $properties['vid'] = isset($this->configuration['vocabulary']) ? $this->configuration['vocabulary'] : $vocabulary;
          $term = \Drupal::entityTypeManager()
            ->getStorage('taxonomy_term')
            ->loadByProperties($properties);
          if (count($term)) {
            $term = array_shift($term);
          }
          else {
            $related = $this->getRelatedRecordData($relatedRecord, $row, $this->configuration);
            if (isset($related['uuid'])) {
              $term = TaxonomyTerm::create($related);
              if ($term instanceof EntityInterface) {
                $term->isNew();
                $term->save();
              }
              else {
                $row->setDestinationProperty($destination_property, []);
                return new MigrateSkipProcessException(
                  "Cannot create taxonomy Term:" . \Kint::dump($relatedRecord, TRUE)
                );
              }
            }
          }
        }
        if ($term instanceof Term) {
          $destination_values[] = $term;
        }
        else {
          return new MigrateSkipProcessException("No value can be determined for: {$destination_property}");
        }
      }
    }
    $row->setDestinationProperty($destination_property, $destination_values);
    return $destination_values;
  }

}
