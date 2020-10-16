<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Component\Serialization\Json;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\eck\EckEntityInterface;
use Drupal\file\FileInterface;
use Drupal\media\MediaInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\Plugin\MigrateIdMapInterface;
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate\Row;
use Drupal\milken_migrate\JsonAPIReference;
use Drupal\paragraphs\ParagraphInterface;

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
   * {@inheritDoc}
   */
  public function fields(MigrationInterface $migration = NULL) {
    $defs = $this->container->get('entity_field.manager')->getFieldDefinitions('event', 'conference');
    $toReturn = [];
    foreach ($defs as $field_id => $fieldInfo) {
      $toReturn[$fieldInfo->label] = $field_id;
    }
    return $toReturn;
  }

  /**
   * Get id of entity to which we're migrating.
   *
   * @param \Drupal\migrate\Row $row
   *   Row data.
   *
   * @return string
   *   Returns the value of the property 'grid_event_id'.
   */
  protected function getEntityId(Row $row) {
    return $row->getSourceProperty('grid_event_id');
  }

  /**
   * {@inheritdoc}
   */
  public function import(Row $row, array $old_destination_id_values = []) {
    $this->container->get('logger.factory')->get(__CLASS__)
      ->debug('Importing:' . print_r($row, TRUE));
    $this->rollbackAction = MigrateIdMapInterface::ROLLBACK_DELETE;
    $entity = $this->getEntity($row, $old_destination_id_values);
    if (!$entity instanceof EckEntityInterface) {
      throw new MigrateException('Unable to get Event');
    }
    assert($entity instanceof EckEntityInterface, "Cannot get the Event object");
    $this->setRelatedFields($row, $entity);
    $this->container->get('logger.factory')->get(__CLASS__)
      ->debug('Related Fields set:' . print_r($row, TRUE));
    if ($this->isEntityValidationRequired($entity)) {
      $this->validateEntity($entity);
    }
    $this->container->get('logger.factory')->get(__CLASS__)
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
    try {
      // Query the live site and get data for the event.
      $gridID = $row->getDestinationProperty('field_grid_event_id');
      $url = "https://milkeninstitute.org/jsonapi/node/event?jsonapi_include=true&filter[field_grid_event_id]={$gridID}";
      $url .= "&include=field_event_header_image,field_event_video_still,field_event_image,field_event_live_info,";
      $url .= "field_event_live_info.field_social_network,field_event_summary_image";
      $response = \Drupal::httpClient()->get($url);

      // If Data exists for the vent, process it.
      $list = Json::decode($response->getBody());
      if (is_array($list['data']) && count($list['data']) === 1) {
        $remoteEvent = array_shift($list['data']);
        $this->importLocation($entity, $remoteEvent);
        if (!empty($remoteEvent['field_meta_tags'])) {
          $entity->set('field_meta_tags', $remoteEvent['field_meta_tags']);
        }
        $heroImage = $entity->toArray()['field_hero_image'];
        $eventImage = $entity->toArray()['field_title_card_image'];

        if (!array_key_exists('data', $remoteEvent['field_event_header_image'])) {

          $this->container->get('logger.factory')->get(__CLASS__)
            ->debug("field_event_header_image =>" . print_r($remoteEvent['field_event_header_image'], TRUE));
          $ref = new JsonAPIReference($remoteEvent['field_event_header_image'][0]);
          $fileHandle = $ref->getRemote();
          assert($fileHandle instanceof FileInterface, "Cannot save file to File Storabge");
          $mediaHandle = $this->createMedia($fileHandle->label(), [
            'field_media_image' => [
              'target_id' => $fileHandle->id(),
            ],
            'bundle' => 'hero_image',
          ]);
          if (empty($heroImage)) {
            $entity->set('field_hero_image', ['target_id' => $mediaHandle->id()]);
          }
          $entity->field_related_media[] = ['target_id' => $mediaHandle->id()];
        }

        if (!array_key_exists('data', $remoteEvent['field_event_image'])) {
          $this->container->get('logger.factory')->get(__CLASS__)
            ->debug("Field_event_image =>" . print_r($remoteEvent['field_event_image'], TRUE));
          $ref = new JsonAPIReference($remoteEvent['field_event_image']);
          $fileHandle = $ref->getRemote();
          $mediaHandle = $this->createMedia($fileHandle->label(), [
            'field_media_image' => [
              'target_id' => $fileHandle->id(),
            ],
            'bundle' => 'hero_image',
          ]);
          if (empty($eventImage)) {
            $entity->set('field_title_card_image', ['target_id' => $fileHandle->id()]);
            $eventImage = $entity->toArray()['field_title_card_image'];
          }
          $entity->field_related_media[] = ['target_id' => $mediaHandle->id()];
        }

        if (!array_key_exists('data', $remoteEvent['field_event_summary_image'])) {
          $this->container->get('logger.factory')->get(__CLASS__)
            ->debug("field_event_summary_image =>" . print_r($remoteEvent['field_event_summary_image'], TRUE));
          $ref = new JsonAPIReference($remoteEvent['field_event_summary_image']);
          $fileHandle = $ref->getRemote();
          $mediaHandle = $this->createMedia($fileHandle->label(), [
            'field_media_image' => [
              'target_id' => $fileHandle->id(),
            ],
            'bundle' => 'hero_image',
          ]);
          if (empty($eventImage)) {
            $entity->set('field_title_card_image', ['target_id' => $fileHandle->id()]);
            $eventImage = $entity->toArray()['field_title_card_image'];
          }
          $mediaHandle = $this->createMedia($fileHandle->label(), [
            'field_media_image' => [
              'target_id' => $fileHandle->id(),
            ],
            'bundle' => 'image',
          ]);
          $entity->field_related_media[] = ['target_id' => $mediaHandle->id()];
        }

        if (!array_key_exists('data', $remoteEvent['field_event_video_still'])) {
          $this->container->get('logger.factory')->get(__CLASS__)
            ->debug("field_event_video_still =>" . print_r($remoteEvent['field_event_video_still'], TRUE));
          $ref = new JsonAPIReference($remoteEvent['field_event_video_still']);
          $fileHandle = $ref->getRemote();
          if (empty($eventImage)) {
            $entity->set('field_title_card_image', ['target_id' => $fileHandle->id()]);
          }
          $mediaHandle = $this->createMedia($fileHandle->label(), [
            'field_media_image' => ['target_id' => $fileHandle->id()],
            'bundle' => 'image',
          ]);
          $entity->field_related_media[] = ['target_id' => $mediaHandle->id()];
        }

        if (!empty($remoteEvent['field_event_live_info'])) {
          $to_set = $entity->get('field_social_network_links') ?? [];
          foreach ($remoteEvent['field_event_live_info'] as $social_link) {
            $to_set[] = [
              "key" => (trim($social_link['field_url']['title']) !== "")
              ? trim($social_link['field_url']['title']) : $social_link['field_social_network']['name'],
              "value" => $social_link['field_url']['uri'],
            ];
          }
          if (!empty($remoteEvent['field_event_flickr_url'])) {
            $to_set[] = [
              'key' => "Flickr",
              'value' => $remoteEvent['field_event_flickr_url']['uri'],
            ];
          }
          $this->container->get('logger.factory')->get(__CLASS__)
            ->debug("field_social_network_links =>" . print_r($to_set, TRUE));
          $entity->set('field_social_network_links', $to_set);

        }

        if ($remoteEvent['field_enable_program_overview'] === TRUE) {
          $this->importTab($entity, 'Overview', $remoteEvent['field_event_featured_content']);
        }

        if ($remoteEvent['field_enable_program_details'] === TRUE) {
          $this->importTab($entity, 'Program', $remoteEvent['field_poi_featured_content_1']);
        }
        $this->container->get('logger.factory')->get(__CLASS__)
          ->info("Saving entity:" . print_r($entity->toArray(), TRUE));
        $entity->save();
        $this->container->get('logger.factory')->get(__CLASS__)
          ->info("Entity saved" . print_r($entity->toArray(), TRUE));
      }
    }
    catch (\Exception $e) {
      echo $e->getMessage();
      exit($e->getTraceAsString());
    }
    return $entity;
  }

  /**
   * Do the work of moving an event tab from the old site to new.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The Event Entity.
   * @param string $tabName
   *   Name for the new tab.
   * @param array $paragraph_field
   *   Field data from the old site.
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function importTab(EntityInterface $entity, string $tabName, array $paragraph_field) {
    // .9 create new paragraph tab with the string TabName as the ID.
    $paragraph_storage = $this->container
      ->get('entity_type.manager')
      ->getStorage('paragraph');
    $paragraph_tab = $paragraph_storage->create([
      'type' => 'paragraph_tab',
    ]);
    // Loop over the $paragraph_field.
    foreach ($paragraph_field as $paragraph) {
      // Search for local paragraph replica via uuid.
      $results = $paragraph_storage->loadByProperties(['uuid' => $paragraph['id']]);
      if (count($results)
        && $results = array_shift($results)
        && $results instanceof ParagraphInterface) {
        // 3. If does exist, save references to the paragraphs in the
        //    newly-created tab.
        $paragraph_tab->field_tab_contents[] = [
          'target_id' => $results->id(),
          'revision_id' => $results->getRevisionId(),
        ];
      }
      else {
        // 4. If doesn't exist, flag as "un-migrated".
      }
      $paragraph_tab->set('field_tab_contents', $tab_contents);
      // 5. Save Paragraph Tab.
      $paragraph_tab->save();
    }
    // 6. Connect the Paragraph Tab to the event => field_content_tabs
    $entity->field_content_tabs[] = [
      'target_id' => $paragraph_tab->id(),
      'revision_id' => $paragraph_tab->getRevisionId(),
    ];
    $entity->save();
  }

  /**
   * Import the location relationship.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The Event Entity.
   * @param array $remoteData
   *   Remote Data from the live site.
   *
   * @return bool
   *   Success or failure.
   */
  public function importLocation(EntityInterface $entity, array $remoteData) {
    // Does location exist?
    $address = array_filter($remoteData['field_event_address']);
    if (empty($address)) {
      return FALSE;
    }
    $address_label = $address['address_line1'];
    $address['address_line1'] = $address['address_line2'];
    unset($address['address_line2']);
    $location_storage = $this->container
      ->get('entity_type.manager')
      ->getStorage('location');
    $results = $location_storage->loadByProperties(['title' => $address_label]);
    if (count($results)) {
      // If YES, reference it in the entity and save.
      $location = array_shift($results);
    }
    else {
      // If not, create it.
      $location = $location_storage->create([
        'type' => 'conference_center',
        'field_address' => $address,
        'title' => $address_label,
      ]);
      $location->save();
    }
    $this->container->get('logger.factory')->get(__CLASS__)
      ->debug("location: " . print_r($location, TRUE));
    $entity->set('field_venue', ['target_id' => $location->id()]);
    $entity->save();
    return TRUE;
  }

  /**
   * Create media object from File reference.
   *
   * @param string $name
   *   Title field of the newly created media object.
   * @param array $details
   *   File reference and metadata.
   *
   * @return \Drupal\media\MediaInterface
   *   A newly-created entity object.
   *
   * @throws \Drupal\migrate\MigrateException
   */
  protected function createMedia(string $name, array $details): MediaInterface {
    try {
      $media = $this->container
        ->get('entity_type.manager')
        ->getStorage('media')
        ->create($details);
      assert($media instanceof MediaInterface,
        'Unable to create media with this file: ' . print_r($details, TRUE));
      $media->setName($name)
        ->setPublished(TRUE)
        ->save();
      return $media;

    }
    catch (\Exception $e) {
      $this->container->get('logger.factory')
        ->get(__CLASS__)->error("Cannot save media object" . print_r($details));
      throw new MigrateException("Yeah, this isn't work for me. Can we just be entityFriends?");
    }
    return NULL;
  }

}
