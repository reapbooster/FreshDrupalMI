<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipRowException;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Drupal\milken_migrate\JsonAPIReference;
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
 *   id = "milken_migrate:remote_file",
 *   handle_multiples = true,
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
    $source = $row->getSourceProperty($this->configuration['source']);
    if (isset($source['data']) && empty($source['data'])) {
      throw new MigrateSkipRowException("Skip importing remote file: no data");
    }
    if (empty($source)) {
      return NULL;
    }
    $ref = new JsonAPIReference($source);
    $ref->getRemoteData();
    \Drupal::logger('milken_migrate')
      ->debug("REF: " . print_r($ref, TRUE));
    // Validate ref.
    if (!$ref instanceof JsonAPIReference) {
      return NULL;
    }
    if ($ref->valid() === FALSE || $ref->getFilename() === NULL || $ref->getUrl() === NULL) {
      \Drupal::logger('milken_migrate')
        ->debug("Skip Row: invalid" . print_r($source, TRUE));
      return NULL;
    }
    if (substr($ref->getFilename(), 0, 6) === "sample") {
      \Drupal::logger('milken_migrate')
        ->debug("Skip Row Sample:" . print_r($ref, TRUE));
      return NULL;
    }
    // Do the work of getting data.
    \Drupal::logger('milken_migrate')
      ->debug("Importing... {$ref->getEntityTypeId()}::{$ref->getBundle()}::{$ref->getId()}");

    try {
      $file = $ref->exists();
      if ($file instanceof EntityInterface) {
        \Drupal::logger('milken_migrate')
          ->debug("Found image in database: " . $file->label());
        $row->setDestinationProperty($destination_property, [$file->id()]);
        return [$file->id()];
      }
      $file = $ref->getRemote();
      if ($file instanceof FileInterface) {
        if (isset($this->configuration['name'])) {
          $file->set('field_file_image_alt_text', $row->getSourceProperty($this->configuration['name']));
          $file->set('field_file_image_title_text', $row->getSourceProperty($this->configuration['name']));
        }
        $file->setPermanent();
        $file->isNew();
        $file->save();
        $row->setDestinationProperty($destination_property, [$file->id()]);
        return [$file->id()];
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error("IMPORT Exception: " . $e->getMessage());
      throw new MigrateException($e->getMessage());
    }
    catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->error("IMPORT Throwable: " . $t->getMessage());
      throw new MigrateException($t->getMessage());
    }
    return NULL;
  }

}
