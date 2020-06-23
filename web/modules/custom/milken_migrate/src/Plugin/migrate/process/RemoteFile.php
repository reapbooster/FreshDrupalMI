<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Drupal\milken_migrate\Traits\EntityExistsTrait;
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
  use EntityExistsTrait;

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
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    $file = NULL;
    if ($row->isStub()) {
      return NULL;
    }
    try {
      $source = $row->getSourceProperty($this->configuration['source']);
      \Drupal::logger('milken_migrate')
        ->debug("Source Value:" . print_r($source, TRUE));
      if (isset($source['data']) && empty($source['data'])) {
        return new MigrateSkipProcessException("Skip importing remote file: no data");
      }
      if (
        empty($source) ||
        !isset($source['type']) ||
        !isset($source['id']) ||
        $source['id'] == "missing" ||
        $source['type'] == "missing"
      ) {
        \Drupal::logger('milken_migrate')
          ->debug("SKIP importing hero image. JSON data is empty: " . print_r($source, TRUE));
        $row->setDestinationProperty($destination_property, []);
        return new MigrateSkipProcessException("Skip Importing Remove File: No data");
      }

      [$entityTypeID, $bundleID] = explode('--', $source['type']);
      if ($entityTypeID == "missing" || $bundleID == "missing") {
        return new MigrateSkipProcessException("The referenced Entity is missing on the remote server.");
      }
      \Drupal::logger('milken_migrate')
        ->debug("Importing... {$entityTypeID}::{$bundleID}::{$source['id']}");
      $entity = $this->entityExixsts($entityTypeID, $source['id']);
      if ($entity instanceof EntityInterface) {
        \Drupal::logger('milken_migrate')
          ->debug("Found image in database: " . $entity->label());
        $row->setDestinationProperty($destination_property, ['entity' => $entity]);
        return $entity;
      }

      $responseData = $this->getRelatedRecordData($source, $row);
      if ($responseData !== NULL) {
        $attributes = $responseData['attributes'];
        if (substr($attributes['filename'], 0, 6) === "sample") {
          return new MigrateSkipProcessException("Sample Image. Not imported.");
        }
        if (isset($attributes['uri']['url'])) {
          $url = $row->getSource()['jsonapi_host'] . $attributes['uri']['url'];
          \Drupal::logger('milken_migrate')
            ->debug("Source URL:" . $url);
          $file = $this->getRemoteFile($attributes['filename'], $url);
          if ($file instanceof FileInterface && file_validate_is_image($file)) {
            if (isset($this->configuration['name'])) {
              $file->set('field_file_image_alt_text', $row->getSourceProperty($this->configuration['name']));
              $file->set('field_file_image_title_text', $row->getSourceProperty($this->configuration['name']));
            }
            $file->setPermanent();
            $file->isNew();
            $file->save();

            $row->setDestinationProperty($destination_property, ['entity' => $file]);
            return ['entity' => $file];
          }
        }
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error("IMPORT Exception: " . $e->getMessage() . ($url ?? "Url is not set"));
      return new MigrateSkipProcessException($e->getMessage());
    }
    catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->error("IMPORT Throwable: " . $t->getMessage() . ($url ?? "Url is not set"));
      return new MigrateSkipProcessException($t->getMessage());
    }
    return new MigrateSkipProcessException("The image does not exist on the remote server");
  }

}
