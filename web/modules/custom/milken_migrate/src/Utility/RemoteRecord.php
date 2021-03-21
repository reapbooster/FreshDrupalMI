<?php
// phpcs:ignoreFile

namespace Drupal\milken_migrate\Utility;

use Drupal\Core\Entity\EntityInterface;

/**
 * Class RemoteRecord
 *
 * @package Drupal\milken_migrate\Utility
 */
class RemoteRecord extends DrupalBaseRemoteRecord {

  /**
   * @param $string
   *
   * @return \Drupal\milken_migrate\Utility\RemoteRecord|null
   */
  public static function fromJson($string): ?RemoteRecord {
    try {
      return new static(json_decode($string, true));
    } catch(\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error($e->getMessage());
    } catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->critical($t->getMessage());
    }
    return null;
  }

  public function getLocalVersion($localEntityTypeId): ?EntityInterface {
    $exists = \Drupal::entityTypeManager()->getStorage($localEntityTypeId)
      ->loadByProperties(['uuid' => $this->getId()]);
    if (count($exists)) {
      return reset($exists);
    }
    return null;
  }

  public static function fromUrl(string $url): ?RemoteRecord {
    try {
      $response = \Drupal::httpClient()->get($url);
      $responseArray = json_decode($response->getBody(), true);
      if (isset($responseArray['data']) && is_array($responseArray['data'])) {

      }
      return new static(json_decode($string, true));
    } catch(\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error($e->getMessage());
    } catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->critical($t->getMessage());
    }
    return null;
  }

  public function getField(string $fieldName) {
    return isset($this->otherFields[$fieldName]) ?
      $this->otherFields[$fieldName] : NULL;
  }

}
