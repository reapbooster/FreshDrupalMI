<?php

namespace Drupal\milken_base;


use Drupal\jsonapi\JsonApiResource\ResourceObject;
use Symfony\Component\HttpFoundation\Request;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class JSONApiTwigExtension extends AbstractExtension {

  public function getFilters() {
    return [
      new TwigFilter('jsonapi', [$this, 'fetchFromJsonApi']),
    ];
  }

  public function fetchFromJsonApi($resource, array $options = []) {
    $orig = \Drupal::entityTypeManager()
      ->getStorage($resource['entityTypeId'])
      ->load($resource['drupal_internal__id']);
    $includes = [];
    if (isset($resource['includes'])) {
      $includes = explode(",", $resource['includes']);
    }
    return \Drupal::service('jsonapi_extras.entity.to_jsonapi')->serialize($orig, $includes);
  }

}
