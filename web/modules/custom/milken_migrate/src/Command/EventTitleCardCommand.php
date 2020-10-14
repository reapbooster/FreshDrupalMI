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
    $response = \Drupal::httpClient()
      ->get('https://milkeninstitute.org/jsonapi/node/event?jsonapi_include=true&filter[field_grid_event_id][condition][path]=field_grid_event_id&filter[field_grid_event_id][condition][operator]=IS%20NOT%20NULL&include=field_event_header_image,field_event_video_still,field_event_image,field_event_live_info,field_event_live_info.field_social_network,field_event_summary_image');
    $list = Json::decode($response->getBody());

    foreach ($list['data'] as $remoteEvent) {
      $localEvent = $this->getLocalForRemoteEvent($remoteEvent);
      if (!$localEvent instanceof EntityInterface) {
        throw new \Exception("Cannot get local entity for remote event:" . print_r($remoteEvent, TRUE));
      }
      if (!empty($remoteEvent['field_meta_tags'])) {
        $localEvent->set('field_meta_tags', $remoteEvent['field_meta_tags']);
      }
      $heroImage = $localEvent->toArray()['field_hero_image'];
      $eventImage = $localEvent->toArray()['field_title_card_image'];

      if (!array_key_exists('data', $remoteEvent['field_event_header_image']) && empty($heroImage)) {
        echo "field_event_header_image" . PHP_EOL;
        print_r($remoteEvent['field_event_header_image']);
        $ref = new JsonAPIReference($remoteEvent['field_event_header_image'][0]);
        $fileHandle = $ref->getRemote();
        $localEvent->set('field_hero_image', $fileHandle);
        $heroImage = $localEvent->toArray()['field_hero_image'];
      }

      if (!array_key_exists('data', $remoteEvent['field_event_image']) && empty($eventImage)) {
        echo "Field_event_image" . PHP_EOL;
        print_r($remoteEvent['field_event_image']);
        $ref = new JsonAPIReference($remoteEvent['field_event_image']);
        $fileHandle = $ref->getRemote();
        $localEvent->set('field_title_card_image', $fileHandle);
        $eventImage = $localEvent->toArray()['field_title_card_image'];
      }

      if (!array_key_exists('data', $remoteEvent['field_event_summary_image']) && empty($eventImage)) {
        echo "field_event_summary_image " . PHP_EOL;
        print_r($remoteEvent['field_event_summary_image']);
        $ref = new JsonAPIReference($remoteEvent['field_event_summary_image']);
        $fileHandle = $ref->getRemote();
        $localEvent->set('field_title_card_image', $fileHandle);
        $eventImage = $localEvent->toArray()['field_title_card_image'];
      }

      if (!array_key_exists('data', $remoteEvent['field_event_video_still']) && empty($eventImage)) {
        echo "field_event_video_still" . PHP_EOL;
        print_r($remoteEvent['field_event_video_still']);
        $ref = new JsonAPIReference($remoteEvent['field_event_video_still']);
        $fileHandle = $ref->getRemote();
        $localEvent->set('field_title_card_image', $fileHandle);
        $eventImage = $localEvent->toArray()['field_title_card_image'];
      }



      $localEvent->save();

    }

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
