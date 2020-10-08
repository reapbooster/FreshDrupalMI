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
    $response = \Drupal::httpClient()
      ->get('https://milkeninstitute.org/jsonapi/node/event?jsonapi_include=true&filter[field_grid_event_id][condition][path]=field_grid_event_id&filter[field_grid_event_id][condition][operator]=IS%20NOT%20NULL&include=field_event_header_image');
    $list = Json::decode($response->getBody());
    foreach ($list['data'] as $remoteEvent) {
      $localEvent = $this->getLocalForRemoteEvent($remoteEvent);
      if (!empty($remoteEvent['field_meta_tags']))
        $localEvent->set('field_meta_tags',$remoteEvent['field_meta_tags']);
      if (!isset($remoteEvent['field_event_header_image']['data'])) {
        $ref = new JsonAPIReference($remoteEvent['field_event_header_image'][0]);
        $fileHandle = $ref->getRemote();
        $localEvent->set('field_hero_image', $fileHandle);
      }
      if (!isset($remoteEvent['field_event_image']['data'])) {
        $ref = new JsonAPIReference($remoteEvent['field_event_image'][0]);
        $fileHandle = $ref->getRemote();
        $localEvent->set('field_title_card_image', $fileHandle);
      }
      print_r($localEvent->toArray());
      $localEvent->save();

    }


  }

  function getLocalForRemoteEvent($event): EntityInterface {
    $results = \Drupal::entityQuery('event')
      ->condition('field_grid_event_id', $event['field_grid_event_id'])
      ->execute();
    if (!empty($results)) {
      return \Drupal::entityTypeManager()
        ->getStorage('event')
        ->load(reset($results));
    }
    return NULL;
  }

}
