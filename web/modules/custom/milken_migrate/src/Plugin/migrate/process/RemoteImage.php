<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\file\FileInterface;
use Drupal\media\Entity\Media;
use Drupal\media\MediaInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use GuzzleHttp\Client;

/**
 * Filter to download image and return media reference.
 * @code
 * field_image:
 *   plugin: milken_migrate:remote_image
 *   source: {name where row data appears}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:remote_image"
 * );
 */
class RemoteImage extends ProcessPluginBase implements MigrateProcessInterface {


  /**
   * Transform remote image ref into local Media Object.
   * @param mixed $value
   *   Value to import.
   * @param \Drupal\migrate\MigrateExecutableInterface $migrate_executable
   *   Executable migration interface.
   * @param \Drupal\migrate\Row $row
   * @param string $destination_property
   *
   * @return array|int|mixed|string|null
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
          ->notice("SKIP importing hero image. JSON data is empty: ");
        $row->setDestinationProperty($destination_property, []);
        return NULL;
      }
      // TODO: figure out a way to derive "node/article".
      $sourcePath = '/jsonapi/' . str_replace("--", "/", $value['type']) . "/" . $value['id'];
      \Drupal::logger('milken_migrate')->notice($sourcePath);
      $client = new Client(['base_uri' => $source['jsonapi_host']]);
      $response = $client->get($sourcePath);
      if (in_array($response->getStatusCode(), [200, 201, 202])) {
        $responseData = json_decode($response->getBody(), TRUE);
        $attributes = $responseData['data']['attributes'];
        if (isset($attributes['uri']['url'])) {
          $url = $source['jsonapi_host'] . $attributes['uri']['url'];
          \Drupal::logger('milken_migrate')->notice($url);
          $file = $this->getRemoteFile($attributes['filename'], $url);
        }
        if ($file instanceof FileInterface) {

          $media = Media::create([
            'bundle' => 'hero_image',
            'uid' => 2,
            'langcode' => \Drupal::languageManager()->getDefaultLanguage()->getId(),
            'field_media_image' => [
              'target_id' => $file->id(),
              'alt' => $file->getFilename(),
              'title' => $file->getFilename(),
            ],
          ]);
          if ($media instanceof MediaInterface) {
            $media->setPublished(TRUE);
            $media->save();
            $row->setDestinationProperty('field_hero_image', ['entity' => $media]);
            return ['entity' => $media];
          }
        }
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')->error("IMPORT ERROR: " . $e->getMessage());
      throw new MigrateException($e->getMessage());
    }
    return $value;
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
      chown($realpath, 'www-data');
      chgrp($realpath, 'www-data');
      return $toReturn;
    }
    return NULL;
  }

}
