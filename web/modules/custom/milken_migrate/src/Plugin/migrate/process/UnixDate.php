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
    $dt = new \DateTime();
    if (!empty($value)) {
      $dt = \DateTime::createFromFormat(\DateTimeInterface::W3C, $value);
    }
    $row->setDestinationProperty($destination_property, $dt);
    if ($dt instanceof \DateTime) {
      return $dt->getTimestamp();
    }
    return $dt;
  }

}
