<?php

namespace Drupal\milken_migrate\Command;

use Drupal\Component\Serialization\Json;
use Drupal\Console\Core\Command\ContainerAwareCommand;
use Drupal\Core\Entity\EntityInterface;
use Drupal\milken_migrate\JsonAPIReference;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Class EventTitleCardCommand.
 *
 * Drupal\Console\Annotations\DrupalCommand (
 *     extension="milken_migrate",
 *     extensionType="module"
 * )
 */
class EventTitleCardCommand extends ContainerAwareCommand {

  /**
   * {@inheritdoc}
   */
  protected function configure() {
    $this
      ->setName('milken_migrate:event_title_card')
      ->setDescription($this->trans('commands.milken_migrate.event_title_card.description'));
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
  protected function execute(InputInterface $input, OutputInterface $output) {
    // phpcs:ignore
    // 1. get all events and begin loop.
    // 2. for each event: Do they have any sessions?
    // 3. if they do, separate the sessions into days.
    // 4. create "program" tab on event.
    // 5. create program_day paragraph for each of the days with event_id and date add to program tab.
    // 6. save event.
    $results = \Drupal::entityTypeManager()->getStorage('event')->getQuery()->execute();

  }

  /**
   * Find local version of the event.
   *
   * @param array $event
   *   Incoming event data.
   *
   * @return \Drupal\Core\Entity\EntityInterface|null
   *   Local version of event.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function getLocalForRemoteEvent(array $event): ?EntityInterface {
    // phpcs:ignore
    $results = \Drupal::entityTypeManager()
      ->getStorage('event')
      ->loadByProperties(['field_grid_event_id' => mb_strtolower($event['field_grid_event_id'])]);
    if (!empty($results)) {
      return reset($results);
    }
    return NULL;
  }

}
