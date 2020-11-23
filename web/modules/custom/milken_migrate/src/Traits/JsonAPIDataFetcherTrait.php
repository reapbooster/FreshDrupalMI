<?php

namespace Drupal\milken_migrate\Traits;

use Drupal\Core\File\FileSystemInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\Row;
use GuzzleHttp\Client;

/**
 * Supplies Json API Data Fetcher Trait.
 *
 * @package Drupal\milken_migrate\Traits
 */
trait JsonAPIDataFetcherTrait {

  /**
   * Get data from a related JSONApi record.
   *
   * @param array $recordValue
   *   Cross Referenced Value to be retrieved.
   * @param \Drupal\migrate\Row $row
   *   Migration Row in question.
   *
   * @return null|array
   *   Returns either data or null.
   */
  public function getRelatedRecordData(array $recordValue, Row $row) : array {
    $relatedSourcePath = ($row->getSource()['jsonapi_host'] ?? "https://milkeninstitute.org");
    $relatedSourcePath .= '/jsonapi/' . str_replace("--", "/", $recordValue['type']) . "/" . $recordValue['id'];
    $relatedSourcePath .= "?jsonapi_include=true";
    \Drupal::logger('milken_migrate')
      ->debug("Getting related record: {$relatedSourcePath}");
    $response = $this->getClient()->get($relatedSourcePath);
    $responseData = json_decode($response->getBody(), TRUE);
    if (isset($responseData['data']) && !empty($responseData['data']) && isset($responseData['data']['id'])) {
      return $responseData['data'];
    }
    else {
      return [];
    }
  }

  /**
   * Get a pre-configured client.
   *
   * @param array $configuration
   *   Optionally supply a configuration.
   *
   * @return \GuzzleHttp\Client
   *   The client.
   */
  protected function getClient(array $configuration = []): Client {
    // @todo move this to $this->configuration.
    return new Client([
      'base_uri' => $configuration['jsonapi_host'] ?? "https://milkeninstitute.org",
      "http_errors" => FALSE,
      "allow_redirects" => FALSE,
      'synchronous' => TRUE,
      'connect_timeout' => 2.5,
      'timeout' => 5,
      "debug" => FALSE,
      'query' => [
        'jsonapi_include' => TRUE,
        'uniq_id' => uniqid(),
      ],
    ]);
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
  public function getRemoteFile(string $name, string $url): ?FileInterface {
    \Drupal::logger('milken_migrate')
      ->debug("Getting remote file: {$url}");
    try {
      $response = $this->getClient()->get($url);
      if (in_array($response->getStatusCode(), [200, 201, 202])) {
        \Drupal::logger('milken_migrate')
          ->debug("Remote File success! Saving Data!");
        $toReturn = file_save_data($response->getBody(),
          "public://" . $name,
          FileSystemInterface::EXISTS_REPLACE
        );
        if ($toReturn instanceof FileInterface) {
          $realpath = \Drupal::service('file_system')
            ->realpath($toReturn->getFileUri());
          \Drupal::logger('milken_migrate')
            ->debug("Realpath:" . $realpath);
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
        ->error("Exception getting file: " . $e->getMessage() . "::" . $url);
    }
    catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->error("IMPORT Throwable: " . $t->getMessage() . "::" . $url);
    }
    return NULL;
  }

}
