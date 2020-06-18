<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\File\FileSystemInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipRowException;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;

/**
 * Filter to download image and return media reference.
 *
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

  use JsonAPIDataFetcherTrait;

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
      $source = $row->getSourceProperty($this->configuration['source']);
      if (empty($source) || !isset($source['type']) || !isset($source['id'])) {
        \Drupal::logger('milken_migrate')
          ->debug("SKIP importing hero image. JSON data is empty: ");
        $row->setDestinationProperty($destination_property, []);
        return NULL;
      }

      [$entityTypeID, $bundleID] = explode('--', $source['type']);
      if ($entityTypeID == "missing" || $bundleID == "missing") {
        return new MigrateSkipRowException("The referenced Entity is missing on the remote server.");
      }
      \Drupal::logger('milken_migrate')
        ->debug("{$entityTypeID}::{$bundleID}::{$source['id']}");
      $storage = \Drupal::entityTypeManager()
        ->getStorage($entityTypeID);
      $exists = $storage
        ->loadByProperties(['uuid' => $source['id']]);

      if (count($exists)) {
        $entity = array_shift($exists);
        $row->setDestinationProperty($destination_property, ['target_id' => $entity->id()]);
        return ['target_id' => $entity->id()];
      }
      // TODO: figure out a way to derive "node/article".
      $sourcePath = "/jsonapi/{$entityTypeID}/{$bundleID}/" . $source['id'];
      \Drupal::logger('milken_migrate')
        ->debug("Source: " . $sourcePath);
      $response = $this->getClient()->get($sourcePath);
      if (in_array($response->getStatusCode(), [200, 201, 202])) {
        $responseData = json_decode($response->getBody(), TRUE);
        $attributes = $responseData['data']['attributes'];
        if (isset($attributes['uri']['url'])) {
          $url = $this->configuration['jsonapi_host'] . $attributes['uri']['url'];
          \Drupal::logger('milken_migrate')
            ->debug("Source URL:" . $url);
          $file = $this->getRemoteFile($attributes['filename'], $url);
          if ($file instanceof EntityInterface) {
            if ($this->configuration['name']) {
              $file->set('field_file_image_alt_text', $row->getSourceProperty($this->configuration['name']));
              $file->set('field_file_image_title_text', $row->getSourceProperty($this->configuration['name']));
            }
            $file->save();
            $row->setDestinationProperty($destination_property, ['target_id' => $file->id()]);
            return ['target_id' => $file->id()];
          }
          else {
            return $file;
          }
        }
      }
      else {
        return new MigrateSkipRowException("The media source record request returns an error: " . $sourcePath);
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error("IMPORT Exception: " . $e->getMessage() . ($sourcePath ?? ""));
      return new MigrateSkipRowException($e->getMessage());
    }
    catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->error("IMPORT Throwable: " . $t->getMessage() . ($sourcePath ?? ""));
      return new MigrateSkipRowException($t->getMessage());
    }
    return NULL;
  }

  /**
   * Turn remote URL into local FileInterface object.
   */
  public function getRemoteFile($name, $url) {
    $client = $this->getClient();
    try {
      $response = $client->get($url);
      if (in_array($response->getStatusCode(), [200, 201, 202])) {
        $toReturn = file_save_data($response->getBody(),
          "public://" . $name,
          FileSystemInterface::EXISTS_REPLACE
        );
        if ($toReturn instanceof FileInterface) {
          $realpath = \Drupal::service('file_system')
            ->realpath($toReturn->getFileUri());
          if (isset($_SERVER['USER'])) {
            chown($realpath, $_SERVER['USER']);
            chgrp($realpath, $_SERVER['USER']);
          }
          return $toReturn;
        }
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error("Error getting file: " . $url);
    }
    catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->error("IMPORT Throwable: " . $t->getMessage() . $url);
    }
    return new MigrateSkipRowException("File does not exist on the remote server");
  }

}
