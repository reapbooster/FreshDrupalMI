<?php // @codingStandardsIgnoreStart

namespace Drupal\milken_migrate\Commands;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\RevisionableContentEntityBase;
use Drupal\migrate\MigrateException;
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
  protected $client;
  /**
   * @var GuzzleHttp\Cookie\CookieJar
   */
  protected $cookieJar;

  protected $defaultOptions = [];

  /**
   * Update articles with Author information.
   *
   * @usage milken_migrate-commandName foo
   *   Usage description
   *
   * @command milken_migrate:articleAuthor
   * @aliases mmaa
   *
   */
  public function articleAuthor() {
    // Get First page.
    $url = '/jsonapi/node/article?include=field_ar_author';
    $imported_records = 0;
    do {
      $page = $this->getPageOfData($url);
      foreach ($page['data'] as $articleData) {
        $authors = $articleData['field_ar_author'];
        if (isset($authors['data'])) {
          \Drupal::logger(__CLASS__)->debug("Skipping: " . $articleData['title'] . print_r($authors, true));
          continue;
        }
        else {
          foreach ($authors as $author) {
            if ($author['id'] == "missing") {
              continue;
            }
            $localVersionAuthor = $this->findAuthorLocally($author);
            if (!$localVersionAuthor instanceof EntityInterface) {
              throw new MigrateException("Cannot find Author: " . $author['title'] . "//" . $author['id']);
            }
            $localVersionArticle = $this->findArticleLocally($articleData);
            if (!$localVersionArticle instanceof EntityInterface) {
              throw new MigrateException("Cannot find Article: " . $articleData['title'] . "//" . $articleData['id']);
            }
            if ($localVersionAuthor !== NULL && $localVersionArticle !== NULL) {
              $newParagraph = $this->newAuthorParagraph($localVersionAuthor);
              if ($newParagraph instanceof ContentEntityInterface) {
                $localVersionArticle->get('field_content')->appendItem([
                  'target_id' => $newParagraph->id(),
                  "target_revision_id" => $newParagraph->getRevisionId()
                ]);
                $localVersionArticle->save();
                $imported_records++;
              } else {
                throw new MigrateException("Cannot create new Paragraph");
              }
            }
            else {
              \Drupal::logger(__CLASS__)
                ->debug("Article: " . $article->label() . "::" . $article->label());
            }
          }
        }
      }
      $url = $page['links']['next']['href'] ?? NULL;
    } while ($url !== NULL);
    $this->logger()->success(dt('Article Paragraphs Created::' . $imported_records ));
  }

  /**
   *
   */
  public function findAuthorLocally($authorRecord): ?EntityInterface {
    if (!isset($authorRecord['id']) && !is_string($authorRecord['id'])) {
      throw new MigrateException("Cannot retried Author information without a UUID:" . print_r($authorRecord, true));
    }
    $remoteAuthorLocalInstance = \Drupal::entityTypeManager()
      ->getStorage('people')
      ->loadByProperties(["uuid" => $authorRecord['id']]);

    if ($remoteAuthorLocalInstance) {
      return reset($remoteAuthorLocalInstance);
    }
    return NULL;
  }

  /**
   *
   */
  public function findArticleLocally($articleRecord): ?EntityInterface {
    if (!isset($articleRecord['id']) && !is_string($articleRecord['id'])) {
      throw new MigrateException("Cannot retried Article information without a UUID:" . print_r($articleRecord, true));
    }
    $remoteAuthorLocalInstance = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->loadByProperties(["uuid" => $articleRecord['id']]);
    if ($remoteAuthorLocalInstance) {
      return reset($remoteAuthorLocalInstance);
    }
    return NULL;
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
    $response = $this->getClient()->get($parsed['path'], array_merge($this->defaultOptions, [
      'query' => $query,
    ]));
    if (in_array($response->getStatusCode(), [200, 201, 202])) {
      return json_decode($response->getBody(), TRUE);
    }
    $this->logger()->warning('URL returned invalid status code: ' . $url);
    exit(-1);
  }

  /**
   * @return \GuzzleHttp\Client
   */
  protected function getClient(): Client {
    if (!$this->client) {
      $this->cookieJar = new CookieJar();
      $this->client = \Drupal::httpClient();
      $this->defaultOptions = $this->client->getConfig();

      /**
       * @code
       * $client = \Drupal::httpClient();
       * $clientClass = get_class($client);
       * $this->defaultOptions = $client->getConfig();
       * $response = $client->post('/user/login', [
       * 'form_params' => [
       * 'form_id' => 'user_login_form',
       * ],
       * 'cookies' => $this->cookieJar,
       * ]);
       *
       * if (!in_array($response->getStatusCode(), [200, 201, 202])) {
       * throw new \Exception("Could not log into the current production server");
       * }
       *
       * $this->sessionToken = (string) $client->get('/session/token', [
       * 'cookies' => $this->cookieJar,
       * ])->getBody(TRUE);
       * $this->defaultOptions['headers']['X-CSRF-Token'] = $this->sessionToken;
       * $this->client = new $clientClass($this->defaultOptions);
       * @code
       */

    }
    return $this->client;
  }

  protected function newAuthorParagraph(EntityInterface  $author) {
    try {
      $paragraph = Paragraph::create([
        'type' => 'author',
        'field_author' => [
          ['target_id' => $author->id()]
        ],
      ]);
      $paragraph->isNew(true);
      $paragraph->save();
      return $paragraph;
    }
    catch(\Exception $e) {
      \Drupal::logger("milken_migrate")
        ->error($e->getMessage());
    }
    catch(\Throwable $t) {
      \Drupal::logger("milken_migrate")
        ->error($t->getMessage());
    }
    return null;
  }

}
