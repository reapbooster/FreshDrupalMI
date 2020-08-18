<?php
// phpcs:ignoreFile

namespace Drupal\milken_migrate\Command;

// phpcs:disable
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
// phpcs:enable

/**
 * Class MigrateMenuItemsCommand.
 *
 * @DrupalCommand(
 *     extension = "milken_migrate",
 *     extensionType = "module",
 * );
 */
class MigrateMenuItemsCommand extends ContainerAwareCommand {

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
      ->setName('milken_migrate:menuitems')
      ->setDescription($this->trans('Migrate menu items from current site production API'));
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
    $menus = $this->getPageOfData('/jsonapi/menu/menu');

    foreach ($menus['data'] as $menuRef) {
      if ($menuRef["locked"] == FALSE) {
        $this->getIo("importing menu: " . $menuRef['drupal_internal__id']);
        $menu = \Drupal::entityTypeManager()
          ->getStorage('menu')
          ->load($menuRef['drupal_internal__id']);
        if (!$menu instanceof MenuInterface) {
          $menu = $this->createMenu($menuRef);
          if ($menu instanceof MenuInterface) {
            $menu->save();
          }
        }
        if (!$menu instanceof MenuInterface) {
          throw new \Exception("Unable to create menu");
        }
        \Kint::dump($menuRef);
        \Kint::dump($menu->toArray());
        exit();
        $this->importMenuContent($menu);
      }
      else {
        $this->getIo()
          ->info("Skipping menu: " . $menuRef['drupal_internal__id']);
      }
    }
    $this->getIo()
      ->info($this->trans('commands.generate.plugin.queue.messages.success'));
  }

  /**
   *
   */
  protected function importMenuContent(Menu $menu) {
    // Step 1: get the data from remote.
    $page = [
      'links' => [
        'next' => [
          'href' => "/jsonapi/menu_link_content/{$menu->id()}?jsonapi_include=true",
        ],
      ],
    ];
    do {
      $page = $this->getPageOfData($page['links']['next']['href']);
      $iterator = new \ArrayIterator($page['data'] ?? []);
      for ($iterator->rewind(); $iterator->valid(); $iterator->next()) {
        $current = $iterator->current();
        $lp = $this->createLandingPage($iterator->current(), $menu);
        if ($lp instanceof NodeInterface) {
          // Step 3: create the menu link from the landing page entity.
          $this->createMenuLink($lp, $menu, $current);
        }
      }
    } while (isset($page['links']['next']));
  }

  /**
   * @param array $menuRef
   *
   * @return \Drupal\Core\Entity\EntityInterface
   */
  protected function createMenu(array $menuRef): EntityInterface {
    print_r($menuRef);
    exit();
    return Menu::create([
      'id' => $menuRef['drupal_internal__id'],
      'uuid' => $menuRef['id'],
      'langcode' => $menuRef['langcode'],
      'status' => $menuRef['status'],
      'label' => $menuRef['label'],
      'description' => $menuRef['description'],
    ]);
  }

  /**
   * @param array $deets
   * @param \Drupal\system\Entity\Menu $menu
   *
   * @return \Drupal\Core\Entity\EntityInterface|null
   */
  protected function createLandingPage(array $deets, Menu $menu): ?EntityInterface {
    print_r($deets);
    exit();
    $toReturn = NULL;
    try {
      $find = \Drupal::entityTypeManager()
        ->getStorage('node')
        ->loadByProperties(['uuid' => $deets['uuid']]);

      if (count($find)) {
        $toReturn = array_shift($find);
      }
      else {
        $this->getIo()->info("UUID not found, creating new Landing Page");
      }
      if (!$toReturn instanceof EntityInterface) {
        $toReturn = \Drupal::entityTypeManager()
          ->getStorage('node')
          ->create($deets);
        if ($toReturn instanceof EntityInterface) {
          $toReturn->save();
        }
        else {
          $this->getIo()->error("Cannot create Landing Page");
        }
      }
    }
    catch (\Exception $e) {
      $this->getIo()->error($e->getMessage());
    }
    return $toReturn;
  }

  /**
   *
   */
  protected function createMenuLink(NodeInterface $entity, MenuInterface $menu, array $options = []): ?MenuLinkInterface {
    try {
      $linkValue = ['uri' => 'internal:/node/' . $entity->id()];
      if (isset($options['uuid'])) {
        $find = \Drupal::entityTypeManager()
          ->getStorage('menu_link_content')
          ->loadByProperties(['uuid' => $options['uuid']]);
        if (count($find)) {
          $toReturn = array_shift($find);
        }
      }
      if ($toReturn instanceof MenuLinkInterface) {
        $toReturn->updateLink($linkValue);
      }
      else {
        $deets = array_merge($options, [
          'title' => $entity->label(),
          'link' => $linkValue,
          'menu_name' => $menu->id(),
          'expanded' => TRUE,
        ]);
        $toReturn = \Drupal::entityTypeManager()
          ->getStorage('menu_link_content')
          ->create($deets);
      }
      if ($toReturn instanceof EntityInterface) {
        $toReturn->save();
        return $toReturn;
      }
    }
    catch (\Exception $e) {
      $this->getIo()->error($e->getMessage());
    }
    return NULL;
  }

  /**
   * @return \GuzzleHttp\Client
   */
  protected function getClient(): Client {
    if (!$this->client) {
      $this->cookieJar = new CookieJar();
      $this->defaultOptions = [
        'base_uri' => 'https://www.milkeninstitute.org',
        'headers' => [
          'Accept'     => 'application/json',
        ],
        'http_errors' => FALSE,
        'cookies' => $this->cookieJar,
        'allow_redirects' => TRUE,
      ];
      $this->client = new Client($this->defaultOptions);
      $response = $this->client->post('/user/login', [
        'form_params' => [

          'form_id' => 'user_login_form',
        ],
        'cookies' => $this->cookieJar,
      ]);
      if (!in_array($response->getStatusCode(), [200, 201, 202])) {
        throw new \Exception("Could not log into the current production server");
      }
      $this->sessionToken = $this->client->get('/session/token', [
        'cookies' => $this->cookieJar,
      ])->getBody(TRUE);

      $this->defaultOptions['headers']['X-CSRF-Token'] = $this->sessionToken->toString();
      $this->client = new Client($this->defaultOptions);
    }
    \Kint::enabled(TRUE);
    \Kint::dump([$this->sessionToken, $this->cookieJar->toArray(), $this->defaultOptions, $this->client]);
    exit();
    return $this->client;
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
