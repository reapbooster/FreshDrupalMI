<?php // @codingStandardsIgnoreStart

namespace Drupal\milken_migrate\Commands;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\RevisionableContentEntityBase;
use Drupal\field\Entity\FieldConfig;
use Drupal\migrate\MigrateException;
use Drupal\milken_migrate\Utility\RemoteRecord;
use Drupal\paragraphs\Entity\Paragraph;
use Drush\Commands\DrushCommands;
use GuzzleHttp\Client;
use GuzzleHttp\Cookie\CookieJar;

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
  protected \GuzzleHttp\Client $client;

  /**
   * @var array
   */
  protected array $defaultOptions = [];

  /**
   * Update local articles with remote Author information.
   *
   * @usage drush milken_migrate:author_relations 'https://www.milkeninstitute.org/jsonapi/node/article?include=field_ar_author' field_ar_author node field_authors
   *   Grab a list of articles, get their author and update local version of
   *   the article with the local version of the author.
   *
   * @command milken_migrate:author_relations
   * @alias mmar
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

    $imported_records = 0;
    do {
      try {
        $page = $this->getPageOfData($sourceUrl);
        $destinationEntityStorage = \Drupal::entityTypeManager()->getStorage($destinationEntityTypeId);
        $field_config_ids = \Drupal::entityQuery('field_config')
          ->accessCheck(FALSE)
          ->condition('field_type', 'entity_reference')
          ->condition('field_name', $destinationEntityField)
          ->condition('entity_type', $destinationEntityTypeId)
          ->condition('status', 1)
          ->execute();
        $field_config = \Drupal::entityTypeManager()
          ->getStorage('field_config')
          ->load(reset($field_config_ids));
        if ($field_config instanceof FieldConfig) {
          $settings = $field_config->getSettings();
          $referencedEntity = str_replace('default:', "", $settings['handler']);
        }
        foreach ($page['data'] as $articleData) {
          $articleData = new RemoteRecord($articleData);
          if ($articleData->valid() && $localCopy = $articleData->getLocalVersion($destinationEntityTypeId)) {
            $fieldData = $articleData->getField($sourceField);
            if (!is_array($fieldData)) {
              $fieldData = [$fieldData];
            }
            foreach ($fieldData as $record) {
              $record = new RemoteRecord($record);
              $localCopyOfAuthor = $record->getLocalVersion($referencedEntity);
              if ($localCopyOfAuthor instanceof EntityInterface) {
                $localCopy->{$destinationEntityField}[] = $localCopyOfAuthor;
              }
            }
            $localCopy->save();
            $this->logger()->success(dt('Article Author Migrated::' . $localCopy->toArray()[$destinationEntityField]));

          }
        }
      } catch(\Exception $e) {
        \Drupal::logger('milken_migrate')
          ->error($e->getMessage());
      } catch (\Throwable $t) {
        \Drupal::logger('milken_migrate')
          ->critical($t->getMessage());
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
    $response = \Drupal::httpClient()->get($parsed['path'], array_merge($this->defaultOptions, [
      'query' => $query,
    ]));
    if (in_array($response->getStatusCode(), [200, 201, 202])) {
      return json_decode($response->getBody(), TRUE);
    }
    $this->logger()->warning('URL returned invalid status code: ' . $url);
    exit(-1);
  }


}
