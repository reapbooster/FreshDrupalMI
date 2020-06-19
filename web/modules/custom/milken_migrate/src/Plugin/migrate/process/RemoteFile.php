<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
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
      if (
        empty($source) ||
        !isset($source['type']) ||
        !isset($source['id']) ||
        $source['id'] == "missing" ||
        $source['type'] == "missing"
      ) {
        \Drupal::logger('milken_migrate')
          ->debug("SKIP importing hero image. JSON data is empty: " . print_r($source));
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
        \Drupal::logger('milken_migrate')
          ->debug("Found image in database: " . $entity->label());
        $row->setDestinationProperty($destination_property, ['entity' => $entity]);
        return ['entity' => $entity];
      }
      $responseData = $this->getRelatedRecordData($source, $row);
      if ($responseData !== NULL) {
        $attributes = $responseData['attributes'];
        if (substr($attributes['filename'], 0, 6) === "sample") {
          return new MigrateSkipRowException("Sample Image. Not imported.");
        }
        if (isset($attributes['uri']['url'])) {
          $url = $row->getSource()['jsonapi_host'] . $attributes['uri']['url'];
          \Drupal::logger('milken_migrate')
            ->debug("Source URL:" . $url);
          $file = $this->getRemoteFile($attributes['filename'], $url);
          if ($file instanceof EntityInterface) {
            if (isset($this->configuration['name'])) {
              $file->set('field_file_image_alt_text', $row->getSourceProperty($this->configuration['name']));
              $file->set('field_file_image_title_text', $row->getSourceProperty($this->configuration['name']));
            }
            $file->isNew();
            $file->save();
            $row->setDestinationProperty($destination_property, ['entity' => $file]);
            return ['entity' => $file];
          }
        }
      }
    } catch (\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error("IMPORT Exception: " . $e->getMessage() . ($url ?? "Url is not set"));
      return new MigrateSkipRowException($e->getMessage());
    } catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->error("IMPORT Throwable: " . $t->getMessage() . ($url ?? "Url is not set"));
      return new MigrateSkipRowException($t->getMessage());
    }
    return new MigrateSkipRowException("The image does not exist on the remote server");
  }

}
