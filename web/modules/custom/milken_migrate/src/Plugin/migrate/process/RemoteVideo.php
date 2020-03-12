<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Filter to download video URL's improperly stored to fully-fledged entities.
 *
 *
 * @code
 * oembed_video_vidle:
 *   plugin: milken_migrate:remove_video
 *   source: {name where row data appears}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:remote_video"
 * );
 */
class RemoteVideo extends ProcessPluginBase implements MigrateProcessInterface {

  /**
   * Transform remote image ref into local Media Object.
   *
   * @param mixed $value
   *   Value to import.
   * @param \Drupal\migrate\MigrateExecutableInterface $migrate_executable
   *   Executable migration interface.
   * @param \Drupal\migrate\Row $row
   *   Row object with imported/tranformed data.
   * @param string $destination_property
   *   The property to which this value is destined.
   *
   * @return array|int|mixed|string|null
   *   The Value that the trasformation returns.
   *
   * @throws \Drupal\migrate\MigrateException
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if ($row->isStub()) {
      return NULL;
    }

    try {
      // $source = $row->getSource();
      if (!empty($value)) {
        $video_url = str_replace('https://www.youtube.com/embed/', 'https://youtu.be/', $value);
        // \Drupal::logger('milken_migrate')
        // ->info(\Kint::dump($video_url));
        $row->setDestinationProperty($destination_property, $video_url);
        return $video_url;
      }
      return NULL;

    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error(__CLASS__ . "::IMPORT ERROR: " . $e->getMessage());
      throw new MigrateException($e->getMessage());
    }
    catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->error(__CLASS__ . "::IMPORT ERROR: " . $t->getMessage());
      throw new MigrateException($t->getMessage());
    }
    return $value;
  }

}
