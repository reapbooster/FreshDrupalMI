<?php

namespace Drupal\milken_migrate;


/**
 * @class BundleTypeDataFetcher
 *
 * @package Drupal\milken_migrate
 */
class BundleTypeDataFetcher extends JsonAPIReference {

  /**
   * @var array
   */
  protected $source_configuration = [];

  /**
   * @var array
   */
  protected $field_map = [];

  /**
   * @return array
   */
  public function getSourceConfiguration(): array {
    return $this->source_configuration;
  }

  /**
   * @param array $source_configuration
   */
  public function setSourceConfiguration(array $source_configuration): void {
    $this->source_configuration = $source_configuration;
  }

  /**
   * @return array
   */
  public function getFieldMap(): array {
    return $this->field_map;
  }

  /**
   * @param array $field_map
   */
  public function setFieldMap(array $field_map): void {
    $this->field_map = $field_map;
  }

  /**
   * @return string
   */
  public function __toString() {
    return $this->id;
  }

}
