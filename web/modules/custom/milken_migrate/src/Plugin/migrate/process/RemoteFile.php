<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use GuzzleHttp\Client;

/**
 * Filter to download image and return media reference.
 * @code
 * field_image:
 *   plugin: milken_migrate:remote_file
 *   source: {property name where file appears}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:remote_file"
 * );
 */
class RemoteFile extends ProcessPluginBase implements MigrateProcessInterface {

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

    try {
      $source = $row->getSource();

      if (empty($value) || !isset($value['type']) || !isset($value['id'])) {
        \Drupal::logger('milken_migrate')
          ->debug("SKIP importing hero image. JSON data is empty: ");
        $row->setDestinationProperty($destination_property, []);
        return NULL;
      }
      // TODO: figure out a way to derive "node/article".
      $sourcePath = '/jsonapi/' . str_replace("--", "/", $value['type']) . "/" . $value['id'];
      \Drupal::logger('milken_migrate')->debug($sourcePath);
      $client = new Client(['base_uri' => $source['jsonapi_host']]);
      $response = $client->get($sourcePath);
      if (in_array($response->getStatusCode(), [200, 201, 202])) {
        $responseData = json_decode($response->getBody(), TRUE);
        $attributes = $responseData['data']['attributes'];
        if (isset($attributes['uri']['url'])) {
          $url = $source['jsonapi_host'] . $attributes['uri']['url'];
          \Drupal::logger('milken_migrate')->debug($url);
          $file = $this->getRemoteFile($attributes['filename'], $url);
          if ($file instanceof EntityInterface && isset($this->configuration['title'])) {
            $file->set('field_file_image_alt_text', $row->getSourceProperty($this->configuration['title']));
            $file->set('field_file_image_title_text', $row->getSourceProperty($this->configuration['title']));
          }
          $row->setDestinationProperty($destination_property, ['entity' => $file]);
        }
        return ['entity' => $file];
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')->error("IMPORT ERROR: " . $e->getMessage());
      throw new MigrateException($e->getMessage());
    }
    return NULL;
  }

  /**
   * Turn remote URL into local FileInterface object.
   */
  public function getRemoteFile($name, $url) : ? FileInterface {
    $client = new Client();
    $response = $client->get($url);
    $toReturn = file_save_data($response->getBody(), "public://" . $name, FILE_EXISTS_REPLACE);
    if ($toReturn instanceof FileInterface) {
      $realpath = \Drupal::service('file_system')->realpath($toReturn->getFileUri());
      if (isset($_SERVER['USER'])) {
        chown($realpath, $_SERVER['USER']);
        chgrp($realpath, $_SERVER['USER']);
      }
      return $toReturn;
    }
    return NULL;
  }

}
