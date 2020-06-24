<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\MigrateSkipRowException;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Drupal\milken_migrate\JsonAPIReference;
use Drupal\milken_migrate\Traits\EntityExistsTrait;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;
use PHPUnit\Util\Exception;

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
 *   handle_multiples = TRUE,
 * );
 */
class RemoteImage extends ProcessPluginBase implements MigrateProcessInterface {

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
    $toReturn = [];
    if (isset($values['data']) && empty($values['data'])) {
      throw new MigrateSkipProcessException("The referenced Entity has no data.");
    }
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    $file = NULL;
    if (!isset($this->configuration['source'])) {
      throw new Exception('RemoteImage plugin has no source property:' . print_r($this->configuration, TRUE));
    }

    if ($row->isStub()) {
      return NULL;
    }
    $source = $row->getSource();
    if (isset($value['id'])) {
      $value = [$value];
    }
    foreach ($value as $reference) {
      $ref = new JsonAPIReference($reference);
      if (!$ref instanceof JsonAPIReference || $ref->valid() === FALSE) {
        return $ref;
      }
      $ref->getRemoteData();
      $exists = $this->entityExixsts($ref->getEntityTypeId(), $ref->getId());
      if ($exists instanceof EntityInterface) {
        $row->setDestinationProperty($destination_property, ['target_id' => $exists->id()]);
        $toReturn[] = $exists->id();
      }
      else {
        try {
          if ($ref->getUrl() === NULL) {
            \Drupal::logger('milken_migrate')
              ->debug("SKIP importing hero image. JSON data is empty: ");
            throw new MigrateSkipRowException("JSON data is empty.");
          }
          $url = $source['jsonapi_host'] . $ref->getUrl();
          \Drupal::logger('milken_migrate')->debug($url);
          $file = $this->getRemoteFile($ref->getFilename(), $url);
          if ($file instanceof FileInterface) {
            $file->setPermanent();
            $file->isNew();
            $file->save();
            $image_title = (isset($this->configuration['title'])
              ? $this->configuration['title'] : $file->getFilename());
            $media_type = (isset($this->configuration['media_type'])
              ? $this->configuration['media_type'] : "image");
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
            $toReturn[] = $image->id();
          }
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
      }
    }
    return $toReturn;
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

}
