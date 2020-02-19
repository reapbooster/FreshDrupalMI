<?php

namespace Drupal\milken_migrate\Traits;

use Drupal;
use Drupal\migrate\Row;
use GuzzleHttp\Client;

/**
 * Trait JsonAPIDataFetcherTrait.
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
  public function getRelatedRecordData(array $recordValue, Row $row) :? array {
    $rowSource = $row->getSource();
    $relatedSourcePath = '/jsonapi/' . str_replace("--", "/", $recordValue['type']) . "/" . $recordValue['id'];
    Drupal::logger('milken_migrate')->debug($relatedSourcePath);
    $client = new Client(['base_uri' => $rowSource['jsonapi_host']]);
    $response = $client->get($relatedSourcePath);
    if (in_array($response->getStatusCode(), [200, 201, 202])) {
      $responseData = json_decode($response->getBody(), TRUE);
      if (!empty($responseData['data'])) {
        return $responseData['data'];
      }
    }
    return NULL;
  }

}
