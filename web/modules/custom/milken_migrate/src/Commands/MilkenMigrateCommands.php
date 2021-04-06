<?php // @codingStandardsIgnoreStart

namespace Drupal\milken_migrate\Commands;

use Drupal;
use Drupal\Core\Entity\EntityInterface;
use Drupal\field\Entity\FieldConfig;
use Drupal\milken_migrate\Utility\RemoteRecord;
use Drush\Commands\DrushCommands;
use Exception;
use GuzzleHttp\Client;
use Throwable;

/**
 * A Drush commandfile.
 *
 * In addition to this file, you need a drush.services.yml
 * in root of your module, and a composer.json file that provides the name
 * of the services file to use.
 *
 * See these files for an example of injecting Drupal services:
 *   - http://cgit.drupalcode.org/devel/tree/src/Commands/DevelCommands.php
 *   - http://cgit.drupalcode.org/devel/tree/drush.services.yml
 */
class MilkenMigrateCommands extends DrushCommands {

  /**
   * @var \GuzzleHttp\Client
   */
  protected Client $client;

  /**
   * @var array
   */
  protected array $defaultOptions = [];

  /**
   * Update local articles with remote Author information.
   *
   * @usage drush milken_migrate:author_relations
   *   'https://www.milkeninstitute.org/jsonapi/node/article?include=field_ar_author'
   *   field_ar_author node field_authors -v
   *
   * @description  Grab a list of articles, get their
   *   author and update local version of the article with the local version of
   *   the author.
   *
   * @command milken_migrate:author_relations
   * @aliases mmar
   *
   * @param string $sourceUrl
   *  Url from which to obtain a list of source Entities.
   * @param string $sourceField
   *  String field name on the source object.
   * @param string $destinationEntityTypeId
   *  String EntityTypeId where the author will be updated.
   * @param string $destinationEntityField
   *  String name of the field to be updated.
   */
  public function migrateAuthorRelations(
    string $sourceUrl,
    string $sourceField,
    string $destinationEntityTypeId,
    string $destinationEntityField
  ) {
    $destinationEntityStorage = Drupal::entityTypeManager()
      ->getStorage($destinationEntityTypeId);
    $field_config_ids = Drupal::entityQuery('field_config')
      ->accessCheck(FALSE)
      ->condition('field_type', 'entity_reference')
      ->condition('field_name', $destinationEntityField)
      ->condition('entity_type', $destinationEntityTypeId)
      ->condition('status', 1)
      ->execute();
    if (is_array($field_config_ids) && $fc_id = array_shift($field_config_ids)) {
      $field_config = Drupal::entityTypeManager()
        ->getStorage('field_config')
        ->load($fc_id);
      if ($field_config instanceof FieldConfig) {
        $settings = $field_config->getSettings();
        $referencedEntity = isset($settings['handler']) ? str_replace("default:", "", $settings['handler']) : null;
      }
    }

    if (!is_string($referencedEntity) || empty($referencedEntity) || $referencedEntity === null) {
      throw new Exception("Cannot determine referenced entity type. It's not apparent from the field config which entity will be referenced.");
    }

    $imported_records = 0;
    $url = $sourceUrl;
    do {
      try {
        $page = $this->getPageOfData($url);
        foreach ($page['data'] as $articleData) {
          $articleData = new RemoteRecord($articleData);
          if ($articleData->valid() && $localCopy = $articleData->getLocalVersion($destinationEntityTypeId)) {
            // Is there a valid value to replace?
            $fieldData = $articleData->getField($sourceField);
            if (isset($fieldData['data']) && empty($fieldData['data'])) {
              // field has not been initialized on original data database
              $fieldData = [];
            }
            // Ensure sane data.
            if (!is_array($fieldData) && !empty($fieldData)) {
              $fieldData = [$fieldData];
            }
            foreach ($fieldData as $record) {
              $record = new RemoteRecord($record);
              // if it's a valid record, get local copy of the UUID match.
              $localCopyOfAuthor = $record->valid() ? $record->getLocalVersion($referencedEntity) : NULL;
              // If this is true, we are a go for replacement.
              if ($localCopyOfAuthor instanceof EntityInterface) {
                $localCopy->{$destinationEntityField}[] = $localCopyOfAuthor;
                $localCopy->save();
                $this->logger()
                  ->success(dt('Article Author Migrated::' . print_r($localCopy->toArray()[$destinationEntityField], TRUE)));
                continue;
              }
            }
            $this->logger()
              ->info('Skipped: ' . $localCopy->label());
          }
        }
      } catch (Exception $e) {
        Drupal::logger('milken_migrate')
          ->error($e->__toString());
        exit(1);
      } catch (Throwable $t) {
        Drupal::logger('milken_migrate')
          ->critical(sprintf("THROWABLE Line %d: %s", $t->getLine(), $t->getMessage()));
        print_r($t->__toString());
        exit(1);
      }
      $url = $page['links']['next']['href'] ?? NULL;
    } while ($url !== NULL);
  }

  /**
   * @param string $url
   *
   * @return array
   */
  protected function getPageOfData(string $url): array {
    $parsed = parse_url($url);
    parse_str($parsed['query'] ?? "", $query);
    $query['jsonapi_include'] = TRUE;
    $response = Drupal::httpClient()
      ->get($parsed['path'], array_merge($this->defaultOptions, [
        'query' => $query,
      ]));
    if (in_array($response->getStatusCode(), [200, 201, 202])) {
      return json_decode($response->getBody(), TRUE);
    }
    $this->logger()->warning('URL returned invalid status code: ' . $url);
    exit(-1);
  }

  /**
   * Drush command: Podcast Persons.
   *
   * @command milken_migrate:podcast_persons
   * @aliases mmpp
   *
   * @throws Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws Drupal\Component\Plugin\Exception\PluginNotFoundException
   */

  public function podcastPersons() {
    $storage = Drupal::entityTypeManager()
      ->getStorage('media');
    $episodesIDs = $storage->getQuery()
      ->condition('bundle', 'podcast_episode')
      ->condition('status', TRUE)
      ->execute();
    foreach ($episodesIDs as $epid) {
      $episode = \Drupal::entityTypeManager()
        ->getStorage('media')
        ->load($epid);
      if ($episode instanceof EntityInterface) {
        $media_images = $episode
          ->get('field_media_image')
          ->referencedEntities();
        foreach ($media_images as $image) {
          $person = \Drupal::entityTypeManager()
            ->getStorage('people')
            ->create([
              'type' => 'person'
            ]);
          if ($person instanceof EntityInterface) {
            $person->field_photo[] = [
              'target_id' => $image->id(),
            ];
            $episodeRemoteRecord = RemoteRecord::getRemoteRecord('paragraph', "podcast_episode", $episode->uuid() . "?jsonapi_include=true&include=field_podcast_image");
            $imageRemoteRecord = @array_shift($episodeRemoteRecord->getField('field_podcast_image'));
            if (!empty($imageRemoteRecord)) {
              $person->field_first_name = $imageRemoteRecord['field_photo_subject_name'];
              $person->field_last_name = $imageRemoteRecord['field_photo_subject_title'];
            }
            $person->enforceIsNew();
            $person->save();
          }
        }
      }
    }
  }


}
