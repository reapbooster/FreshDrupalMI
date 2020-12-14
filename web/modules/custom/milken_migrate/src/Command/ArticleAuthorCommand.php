<?php // @codingStandardsIgnoreStart

namespace Drupal\milken_migrate\Command;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Menu\MenuLinkInterface;
use Drupal\node\NodeInterface;
use Drupal\system\Entity\Menu;
use Drupal\system\MenuInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Cookie\CookieJar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Drupal\Console\Annotations\DrupalCommand;
use Drupal\Console\Core\Command\ContainerAwareCommand;
use Drupal\Console\Core\Generator\GeneratorInterface;

/**
 * Class MigrateMenuItemsCommand.
 *
 * @DrupalCommand(
 *     extension = "milken_migrate",
 *     extensionType = "module",
 * );
 */
class ArticleAuthorCommand extends ContainerAwareCommand {

  /**
   * @var \GuzzleHttp\Client
   */
  protected $client;
  /**
   * @var GuzzleHttp\Cookie\CookieJar
   */
  protected $cookieJar;

  /**
   * @var
   */
  protected $sessionToken;

  /**
   * @var array
   */
  protected $defaultOptions;

  /**
   * Drupal\Console\Core\Generator\GeneratorInterface definition.
   *
   * @var \Drupal\Console\Core\Generator\GeneratorInterface
   */
  protected $generator;

  /**
   * Constructs a new MigrateMenuItemsCommand object.
   */
  public function __construct(GeneratorInterface $milken_migrate_generate_plugin_queue_generator) {
    $this->generator = $milken_migrate_generate_plugin_queue_generator;
    parent::__construct();
  }

  /**
   * {@inheritdoc}
   */
  protected function configure() {
    $this
      ->setName('milken_migrate:author')
      ->setDescription($this->trans('Migrate article authors'));
  }

  /**
   * {@inheritdoc}
   */
  protected function initialize(InputInterface $input, OutputInterface $output) {
    parent::initialize($input, $output);
    $this->getIo()->info('initialize');
  }

  /**
   * {@inheritdoc}
   */
  protected function interact(InputInterface $input, OutputInterface $output) {
    $this->getIo()->info('interact');
  }

  /**
   * {@inheritdoc}
   */
  protected function execute(InputInterface $input, OutputInterface $output) {
    $this->getIo()->info('Migrating menu items from old site to new.');
    // Get list of menu systems.
    $articles = $this->getPageOfData('/jsonapi/node/article');

    foreach ($articles['data'] as $articleRef) {
      $this->getIo()
        ->info("Skipping article: " . $articleRef['drupal_internal__nid']);
    }
    $this->getIo()
      ->info($this->trans('commands.generate.plugin.queue.messages.success'));
  }

  /**
   * @param string $url
   *
   * @return array
   */
  protected function getPageOfData(string $url): array {

    $response = $this->getClient()->get($url, array_merge($this->defaultOptions, [
      'query' => ['jsonapi_include' => TRUE],
    ]));
    if (in_array($response->getStatusCode(), [200, 201, 202])) {
      return json_decode($response->getBody(), TRUE);
    }
    $this->getIo()->warning('URL returned invalid status code: ' . $url);
    return [];
  }

}
