<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Apply HTMLEntities function.
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:html_entities"
 * )
 *
 * To decode, use the following:
 *
 * @code
 * field_text:
 *   plugin: 'milken_migrate:html_entities'
 *   source: text
 *   action: decode
 * @endcode
 *
 * To encode, use the following:
 * @code
 * field_text:
 *   plugin: 'milken_migrate:html_entities'
 *   source: text
 *   action: encode
 * @encode
 */
class HtmlEntities extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (!isset($this->configuration['action'])) {
      throw new MigrateException('"action" must be defined in migrate config when using the milken_migrate:html_entities Process');
    }

    if ($this->configuration['action'] == 'decode') {
      return html_entity_decode($value, ENT_QUOTES);
    }
    else {
      return htmlentities($value, ENT_QUOTES);
    }
  }

}
