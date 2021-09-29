<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Apply HTMLSpecialChars function.
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:html_special_chars"
 * )
 *
 * To decode, use the following:
 *
 * @code
 * field_text:
 *   plugin: 'milken_migrate:html_special_chars'
 *   source: text
 *   action: decode
 * @endcode
 *
 * To encode, use the following:
 * @code
 * field_text:
 *   plugin: 'milken_migrate:html_special_chars'
 *   source: text
 *   action: encode
 * @encode
 */
class HtmlSpecialChars extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (!isset($this->configuration['action'])) {
      throw new MigrateException('"action" must be defined in migrate config when using the milken_migrate:html_special_chars Process');
    }

    if ($this->configuration['action'] == 'decode') {
      return htmlspecialchars_decode($value, ENT_QUOTES);
    }
    else {
      return htmlspecialchars($value, ENT_QUOTES);
    }
  }

}
