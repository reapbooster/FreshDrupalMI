<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Component\Serialization\Json;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\eck\EckEntityInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\Plugin\MigrateIdMapInterface;
use Drupal\migrate\Row;
use Drupal\milken_migrate\JsonAPIReference;

/**
 * Provides Event destination.
 *
 * Use this plugin for a table not registered with Drupal Schema API.
 *
 * @MigrateDestination(
 *   id = "milken_migrate:event",
 * )
 */
class Event extends MilkenMigrateDestinationBase implements ContainerFactoryPluginInterface {

  /**
   *
   */
  protected function getEntityId(Row $row) {
    return $row->getSourceProperty('grid_event_id');
  }

  /**
   * {@inheritdoc}
   */
  public function import(Row $row, array $old_destination_id_values = []) {
    \Drupal::logger(__CLASS__)
      ->debug('Importing:' . print_r($row, TRUE));
    $this->rollbackAction = MigrateIdMapInterface::ROLLBACK_DELETE;
    $entity = $this->getEntity($row, $old_destination_id_values);
    if (!$entity instanceof EckEntityInterface) {
      throw new MigrateException('Unable to get Event');
    }
    assert($entity instanceof EckEntityInterface, "Cannot get the Event object");
    $this->setRelatedFields($row, $entity);
    \Drupal::logger(__CLASS__)
      ->debug('Related Fields set:' . print_r($row, TRUE));
    if ($this->isEntityValidationRequired($entity)) {
      $this->validateEntity($entity);
    }
    \Drupal::logger(__CLASS__)
      ->debug('saving these values:' . print_r($entity->toArray(), TRUE));
    $ids = $this->save($entity, $old_destination_id_values);
    $map['destid1'] = $entity->id();
    $row->setIdMap($map);
    $this->setRollbackAction($map,
      $entity->isNew() ?
        MigrateIdMapInterface::ROLLBACK_DELETE :
        MigrateIdMapInterface::ROLLBACK_PRESERVE
    );
    return $ids;
  }

  /**
   * Creates or loads an entity.
   *
   * @param \Drupal\migrate\Row $row
   *   The row object.
   * @param array $old_destination_id_values
   *   The old destination IDs.
   *
   * @return \Drupal\Core\Entity\EntityInterface
   *   The entity we are importing into.
   */
  protected function getEntity(Row $row, array $old_destination_id_values) {
    $entity_id = $this->getEntityId($row);
    $exists = $this->storage->getQuery()
      ->condition('field_grid_event_id', $entity_id)
      ->execute();
    if (count($exists)) {
      $entity = $this->storage->load(reset($exists));
      // Allow updateEntity() to change the entity.
      $entity = $this->updateEntity($entity, $row) ?: $entity;
    }
    else {
      // Attempt to ensure we always have a bundle.
      if ($bundle = $this->getBundle($row)) {
        $row->setDestinationProperty($this->getKey('bundle'), $bundle);
      }

      // Stubs might need some required fields filled in.
      if ($row->isStub()) {
        $this->processStubRow($row);
      }
      $entity = $this->storage->create($row->getDestination());
      $entity->enforceIsNew();
    }
    return $entity;
  }

  /**
   * {@inheritdoc}
   */
  public function getBundle(Row $row) {
    switch (strtolower($row->get('type'))) {
      case "finLabs":
      case "mia":
      case "p4c":
        return "meeting";

      case "summit":
        return "summit";

      case "gc":
        return "conference";

      default:
        return NULL;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function setRelatedFields(Row $row, EntityInterface $entity): EntityInterface {
    // Query the live site and get data for the event.
    $gridID = $entity->get('field_grid_event_id')->value;
    $url = "https://milkeninstitute.org/jsonapi/node/event?jsonapi_include=true&filter[field_grid_event_id]={$gridID}";
    $url .= "&include=field_event_header_image,field_event_video_still,field_event_image,field_event_live_info,";
    $url .= "field_event_live_info.field_social_network,field_event_summary_image";
    $response = \Drupal::httpClient()->get($url);

    // If Data exists for the vent, process it.
    $list = Json::decode($response->getBody());
    if (is_array($list['data']) && count($list['data']) === 1) {
      $remoteEvent = array_shift($list['data']);
      if (!empty($remoteEvent['field_meta_tags'])) {
        $row->setDestinationProperty('field_meta_tags', $remoteEvent['field_meta_tags']);
        $entity->set('field_meta_tags', $remoteEvent['field_meta_tags']);
      }
      $heroImage = $entity->toArray()['field_hero_image'];
      $eventImage = $entity->toArray()['field_title_card_image'];

      if (!array_key_exists('data', $remoteEvent['field_event_header_image']) && empty($heroImage)) {
        \Drupal::logger(__CLASS__)
          ->debug("field_event_header_image =>" . print_r($remoteEvent['field_event_header_image'], TRUE));
        $ref = new JsonAPIReference($remoteEvent['field_event_header_image'][0]);
        $fileHandle = $ref->getRemote();
        $row->setDestinationProperty('field_hero_image', $fileHandle);
        $entity->set('field_hero_image', $fileHandle);
        $heroImage = $entity->toArray()['field_hero_image'];
      }

      if (!array_key_exists('data', $remoteEvent['field_event_image']) && empty($eventImage)) {
        \Drupal::logger(__CLASS__)
          ->debug("Field_event_image =>" . print_r($remoteEvent['field_event_image'], TRUE));
        $ref = new JsonAPIReference($remoteEvent['field_event_image']);
        $fileHandle = $ref->getRemote();
        $row->setDestinationProperty('field_title_card_image', $fileHandle);
        $entity->set('field_title_card_image', $fileHandle);
        $eventImage = $entity->toArray()['field_title_card_image'];
      }

      if (!array_key_exists('data', $remoteEvent['field_event_summary_image']) && empty($eventImage)) {
        \Drupal::logger(__CLASS__)
          ->debug("field_event_summary_image =>" . print_r($remoteEvent['field_event_summary_image'], TRUE));
        $ref = new JsonAPIReference($remoteEvent['field_event_summary_image']);
        $fileHandle = $ref->getRemote();
        $row->setDestinationProperty('field_title_card_image', $fileHandle);
        $entity->set('field_title_card_image', $fileHandle);
        $eventImage = $entity->toArray()['field_title_card_image'];
      }

      if (!array_key_exists('data', $remoteEvent['field_event_video_still']) && empty($eventImage)) {
        \Drupal::logger(__CLASS__)
          ->debug("field_event_video_still =>" . print_r($remoteEvent['field_event_video_still'], TRUE));
        $ref = new JsonAPIReference($remoteEvent['field_event_video_still']);
        $fileHandle = $ref->getRemote();
        $row->setDestinationProperty('field_title_card_image', $fileHandle);
        $entity->set('field_title_card_image', $fileHandle);
      }
    }
    if (!empty($remoteEvent['field_event_live_info'])) {
      $to_set = [];
      foreach ($remoteEvent['field_event_live_info'] as $social_link) {
        $to_set[] = [
          "key" => (trim($social_link['field_url']['title']) !== "")
          ? trim($social_link['field_url']['title']) : $social_link['field_social_network']['name'],
          "value" => $social_link['field_url']['uri'],
        ];
      }
      $row->setDestinationProperty('field_social_network_links', $to_set);
      $entity->set('field_social_network_links', $to_set);
      \Drupal::logger(__CLASS__)
        ->debug("field_social_network_links =>" . print_r($to_set, TRUE));
    }

    if ($remoteEvent['field_enable_program_overview'] === TRUE) {
      $this->importTab($entity, 'Overview', $remoteEvent['field_event_featured_content']);
    }

    if ($remoteEvent['field_enable_program_details'] === TRUE) {
      $this->importTab('Details', $remoteEvent['need_detail_field']);
    }

    $entity->save();
    return $entity;
  }

  /**
   * Do the work of moving an event tab from the old site to new.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The Event Entity.
   * @param string $tabName
   *   Name for the new tab.
   * @param $paragraph_field
   *   Field data from the old site.
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function importTab(EntityInterface $entity, string $tabName, $paragraph_field) {
    // .9 create new paragraph tab with the string TabName as the ID.
    $paragraph_storage = $this->container->get('entity_type.manager')->getStorage('paragraph');
    $paragraph_tab = $paragraph_storage->create([
      'type' => 'paragraph_tab',
    ]);
    // Loop over the $paragraph_field.
    foreach ($paragraph_field as $paragraph) {
      // Search for local paragraph replica via uuid.
      $results = $paragraph_storage->loadByProperties(['uuid' => $paragraph['id']]);
      $tab_contents = $paragraph_tab->get('field_tab_contents');
      if (count($results)) {
        // 3. If does exist, save references to the paragraphs in the
        //    newly-created tab.
        $tab_contents[] = reset($results);
      }
      else {
        // 4. If doesn't exist, flag as "un-migrated".
      }
      $paragraph_tab->set('field_tab_contents', $tab_contents);
      // 5. Save Paragraph Tab.
      $paragraph_tab->save();
    }
    // 6. Connect the Paragraph Tab to the event => field_content_tabs
    $content_tabs = $entity->get('field_content_tabs');
    $content_tabs[] = $paragraph_tab;
    $entity->set('field_content_tabs', $content_tabs);
    $entity->save();
  }

}
