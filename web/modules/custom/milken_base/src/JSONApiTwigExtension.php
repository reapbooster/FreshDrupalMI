<?php

namespace Drupal\milken_base;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Twig extension to return a JSONAPI response from an entity.
 *
 * @package Drupal\milken_base
 */
class JSONApiTwigExtension extends AbstractExtension {

  /**
   * Config of the filter.
   *
   * @return \Twig\TwigFilter[]
   *   Returns a twig filter config.
   */
  public function getFilters() {
    return [
      new TwigFilter('jsonapi', [$this, 'fetchFromJsonApi']),
    ];
  }

  /**
   * Action of the filter.
   *
   * @param array $resource
   *   The jsonapi resource.
   * @param array $options
   *   Not used.
   *
   * @return mixed
   *   The jsonapi response.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function fetchFromJsonApi(array $resource, array $options = []) {
    // @codingStandardsIgnoreStart
    $orig = \Drupal::entityTypeManager()
      ->getStorage($resource['entityTypeId'])
      ->load($resource['drupal_internal__id']);
    $includes = [];
    if (isset($resource['includes'])) {
      $includes = explode(",", $resource['includes']);
    }
    return \Drupal::service('jsonapi_extras.entity.to_jsonapi')->serialize($orig, $includes);
    // @codingStandardsIgnoreEnd
  }

}
