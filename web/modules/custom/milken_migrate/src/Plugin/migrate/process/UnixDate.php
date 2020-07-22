<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Turn any date field to unix timestamp.
 *
 * @code
 * changed:
 *   plugin: milken_migrate:unix_date
 *   source: changed
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:unix_date"
 * )
 */
class UnixDate extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    $dt = new \DateTime();
    if (!empty($value)) {
      if (strpos($value, "+")) {
        $format = \DateTimeInterface::ATOM;
      } elseif (strpos($value, "T")) {
        $format = \DateTimeInterface::ISO8601;
      } else {
        $format = \DateTimeInterface::W3C;
      }
      $dt = \DateTime::createFromFormat($format, $value);
    }
    if ($dt instanceof \DateTime) {
      $row->setDestinationProperty($destination_property, $dt->format('Y-m-d\TH:i:s'));
      return $dt->format('Y-m-d\TH:i:s');
    }
    return NULL;
  }

}
