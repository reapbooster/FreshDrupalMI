<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * This plugin transforms multiple text fields into a key-value field.
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:key_value_field",
 *   handle_multiples=true,
 * )
 */
class KeyValueField extends ProcessPluginBase {

  /**
   * {@inheritDoc}
   *
   * @param mixed $value
   *   Value.
   * @param \Drupal\migrate\MigrateExecutableInterface $migrate_executable
   *   The migration.
   * @param \Drupal\migrate\Row $row
   *   Row data.
   * @param string $destination_property
   *   Destination Property name.
   *
   * @return array|string
   *   The return value.
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    $toReturn = [];
    foreach ($value as $ordinal => $text) {
      if (trim($text) !== "") {
        $toReturn[] = [
          "key" => "display-" . ($ordinal + 1),
          "value" => $text,
          'format' => 'full_html',
        ];
      }
    }
    $row->setDestinationProperty($destination_property, $toReturn);
    return $toReturn;
  }

}
