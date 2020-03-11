<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\File\FileSystemInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use GuzzleHttp\Client;
use ColorThief\ColorThief;

/**
 * Filter to download image and return media reference.
 *
 * @code
 * field_image:
 *   plugin: milken_migrate:remote_image
 *   source: {name where row data appears}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:remote_image",
 * );
 */
class RemoteImage extends ProcessPluginBase implements MigrateProcessInterface {

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
    $file = NULL;

    if ($row->isStub()) {
      return NULL;
    }
    $source = $row->getSource();
    $value = $row->getSourceProperty('hero_image');
    if (!empty($value)) {
      if (!isset($value['uri']['url'])) {
        \Drupal::logger('milken_migrate')
          ->debug("SKIP importing hero image. JSON data is empty: ");
        $row->setDestinationProperty($destination_property, []);
        return NULL;
      }
      try {
        if (isset($value['uri']['url'])) {
          $url = $source['jsonapi_host'] . $value['uri']['url'];
          \Drupal::logger('milken_migrate')->debug($url);
          $file = $this->getRemoteFile($value['filename'], $url);
        }
        if ($file instanceof FileInterface) {
          $image_title = (isset($this->configuration['title'])
            ? $this->configuration['title'] : $file->getFilename());
          $media_type = (isset($this->configuration['media_type'])
            ? $this->configuration['media_type'] : "hero_image");

          $entity_type_mgr = \Drupal::getContainer()
            ->get('entity_type.manager');
          $image = $entity_type_mgr->getStorage('media')->create([
            'type' => $media_type,
            'uid' => 2,
            'langcode' => \Drupal::languageManager()
              ->getDefaultLanguage()
              ->getId(),
            'field_media_image' => [
              'target_id' => $file->id(),
              'target_type' => 'file',
              'alt' => $file->getFilename(),
              'title' => $file->getFilename(),
            ],
            'title' => $image_title,
            // 'field_link' => Url::fromUri('/node/'
            // . $row->getSourceProperty('uuid')),
            // TODO: figure out how to link it back to the node
            'field_published' => TRUE,
          ]);

          if ($image instanceof EntityInterface) {
            $image->save();
            $row->setDestinationProperty($destination_property, ['entity' => $image]);
            return ['entity' => $image];
          }
        }
      }
      catch (\Exception $e) {
        \Drupal::logger('milken_migrate')
          ->error("IMPORT ERROR: " . $e->getMessage());
        throw new MigrateException($e->getMessage());
      }
    }
    return $value;
  }

  /**
   * Return a hex color if exists in string.
   *
   * @param string $string_results
   *   A longer string from which hex color needs to be derived.
   *
   * @return string
   *   Return string.
   */
  public function matchColorInStringResults(string $string_results): string {
    $matches = [];
    $found = preg_match_all('/#(?:[0-9a-fA-F]{6})/', $string_results, $matches);
    if ($found) {
      return array_shift($matches[0]);
    }
    return "#000000";
  }

  /**
   * Turn remote URL into local FileInterface object.
   *
   * @param string $name
   *   The filename.
   * @param string $url
   *   The file Url.
   *
   * @return \Drupal\file\FileInterface|null
   *   return FileInterface or Null.
   */
  public function getRemoteFile($name, $url): ?FileInterface {
    $client = new Client();
    $response = $client->get($url);
    $toReturn = file_save_data($response->getBody(), "public://" . $name, FileSystemInterface::EXISTS_REPLACE);
    if ($toReturn instanceof FileInterface) {
      $realpath = \Drupal::service('file_system')
        ->realpath($toReturn->getFileUri());
      if (isset($_SERVER['USER'])) {
        chown($realpath, $_SERVER['USER']);
        chgrp($realpath, $_SERVER['USER']);
      }
      return $toReturn;
    }
    return NULL;
  }

}
