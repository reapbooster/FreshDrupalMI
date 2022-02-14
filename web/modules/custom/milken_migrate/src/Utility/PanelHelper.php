<?php

namespace Drupal\milken_migrate\Utility;

/**
 * A utility class for grid panel update batch.
 *
 * Used most of the code from a old function
 * "milken_migrate_update_grid_panel" with some minor updates.
 */
class PanelHelper {

  /**
   * Old cod of panel update.
   *
   * @param array $panel_ids
   *   Array of panel ids.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public static function update(array $panel_ids) {

    foreach ($panel_ids as $panel_id) {

      $operation_messages = [];

      $array_speaker_ids = [];
      $array_speaker_ids_string = '';
      $array_panel_speakers_entities = NULL;

      $array_speaker_roles = [];

      $array_track_ids = [];
      $array_track_ids_string = '';
      $array_panel_tracks_entities = NULL;

      $array_room_ids = [];
      $array_room_ids_string = '';
      $array_panel_rooms_entities = NULL;

      $operation_messages[] = sprintf('Current Panel Record: %d', $panel_id);

      // BEGIN Speaker Reference Linking Block
      // Get Panel_Speaker Records by Panel ID.
      $array_panel_speakers_entities = \Drupal::entityTypeManager()
        ->getStorage('grid_join_panel_speaker')
        ->loadByProperties([
          'type' => 'join_table',
          'field_panel_id' => $panel_id,
        ]);

      if ($array_panel_speakers_entities == NULL) {
        $operation_messages[] = sprintf('No Panel_Speaker entries for Panel: %d', $panel_id);
        // Don't skip this loop iteration because it will skip adding Tracks
        // continue;.
      }
      else {
        foreach ($array_panel_speakers_entities as $panel_speaker_key => $panel_speaker_entity) {
          // Reset all variables.
          $panel_speaker_field_speaker_id_values = NULL;
          $grid_speaker_record = NULL;
          $speaker_role = NULL;

          // Get and loop grid_join_panel_speaker.field_speaker_id.
          $panel_speaker_field_speaker_id_values = $panel_speaker_entity->get('field_speaker_id')
            ->getValue();

          // Also need field_role from Panel_Speaker for Speaker Role.
          $panel_speaker_field_role_values = $panel_speaker_entity->get('field_role')
            ->getValue();

          if ($panel_speaker_field_speaker_id_values == NULL) {
            $operation_messages[] = sprintf('NULL field_speaker_id for Panel_Speaker: %s  at Panel ID: %d',
              $panel_speaker_key,
              $panel_id);
            continue;
          }
          else {
            foreach ($panel_speaker_field_speaker_id_values as $speaker_key => $speaker_value) {
              // Only add a Speaker ID if the Speaker actually exists.
              $grid_speaker_record = \Drupal::entityTypeManager()
                ->getStorage('grid_speakers')
                ->load((int) $speaker_value['value']);
              if ($grid_speaker_record == NULL) {
                $operation_messages[] = sprintf('Could not load Speaker[%s] %s at Panel ID: %d',
                  $speaker_key,
                  $speaker_value['value'],
                  $panel_id
                );
                continue;
              }
              else {
                $array_speaker_ids[] = ['target_id' => $speaker_value['value']];
                $array_speaker_ids_string .= $speaker_value['value'] . ',';

                if ($panel_speaker_field_role_values == NULL) {
                  $operation_messages[] = sprintf('NULL field_role for Panel_Speaker: %s at Panel ID: %d',
                    $panel_speaker_key,
                    $panel_id
                  );
                }
                else {
                  $speaker_role = $panel_speaker_field_role_values[0]['value'];
                  $array_speaker_roles[] = [
                    'key' => $speaker_value['value'],
                    'value' => $speaker_role,
                    'description' => '',
                  ];
                  $operation_messages[] = sprintf('%s is the value of field_role for Panel_Speaker: %s at Panel ID: %d',
                    $speaker_role,
                    $panel_speaker_key,
                    $panel_id,
                  );
                }
              }
            }
          }
        }
      }
      // END Speaker Reference Linking Block.
      // BEGIN Track Reference Linking Block
      // Get Panel_Track Records by Panel ID.
      $array_panel_tracks_entities = \Drupal::entityTypeManager()
        ->getStorage('grid_join_panel_track')
        ->loadByProperties([
          'type' => 'join_table',
          'field_panel_id' => $panel_id,
        ]);
      if ($array_panel_tracks_entities == NULL) {
        $operation_messages[] = sprintf('No Panel_Track entries for Panel: %d',
          $panel_id
        );
        // Don't skip this loop iteration because it will skip adding Tracks
        // continue;.
      }
      else {
        foreach ($array_panel_tracks_entities as $panel_track_key => $panel_track_entity) {
          // Reset all variables.
          $panel_track_field_track_id_values = NULL;
          $grid_track_record = NULL;

          // Get and loop grid_join_panel_track.field_track_id.
          $panel_track_field_track_id_values = $panel_track_entity->get('field_track_id')
            ->getValue();
          if ($panel_track_field_track_id_values == NULL) {
            $operation_messages[] = sprintf('NULL field_track_id for Panel_Track: %s at Panel ID: %d',
              $panel_track_key,
              $panel_id
            );
            continue;
          }
          else {
            foreach ($panel_track_field_track_id_values as $track_key => $track_value) {
              // Only add a Track ID if the Track actually exists.
              $grid_track_record = \Drupal::entityTypeManager()
                ->getStorage('grid_tracks')
                ->load((int) $track_value['value']);
              if ($grid_track_record == NULL) {
                $operation_messages[] = sprintf('Could not load Track[%s] %s at Panel ID: %d',
                  $track_key,
                  $track_value['value'],
                  $panel_id);
                continue;
              }
              else {
                $array_track_ids[] = ['target_id' => $track_value['value']];
                $array_track_ids_string .= $track_value['value'] . ',';
              }
            }
          }
        }
      }
      // END Track Reference Linking Block.
      // BEGIN Room Reference Linking Block
      // Get Panel_Room Records by Panel ID.
      $array_panel_rooms_entities = \Drupal::entityTypeManager()
        ->getStorage('grid_join_panel_room')
        ->loadByProperties([
          'type' => 'join_table',
          'field_panel_id' => $panel_id,
        ]);

      if ($array_panel_rooms_entities == NULL) {
        $operation_messages[] = sprintf('No Panel_Room entries for Panel: %d',
          $panel_id
        );
      }
      else {
        foreach ($array_panel_rooms_entities as $panel_room_key => $panel_room_entity) {
          // Reset all variables.
          $panel_room_field_room_id_values = NULL;
          $grid_room_record = NULL;

          // Get and loop grid_join_panel_room.field_room_id.
          $panel_room_field_room_id_values = $panel_room_entity->get('field_room_id')
            ->getValue();

          if ($panel_room_field_room_id_values == NULL) {
            $operation_messages[] = sprintf('NULL field_room_id for Panel_Room: %s at Panel ID: %d',
              $panel_room_key,
              $panel_id
            );
            continue;
          }
          else {
            foreach ($panel_room_field_room_id_values as $room_key => $room_value) {
              // Only add a room ID if the room actually exists.
              $grid_room_record = \Drupal::entityTypeManager()
                ->getStorage('grid_rooms')
                ->load((int) $room_value['value']);
              if ($grid_room_record == NULL) {
                $operation_messages[] = sprintf('Could not load room[%s] %s at Panel ID: %d',
                  $room_key,
                  $room_value['value'],
                  $panel_id
                );
                continue;
              }
              else {
                $array_room_ids[] = ['target_id' => $room_value['value']];
                $array_room_ids_string .= $room_value['value'] . ',';

              }
            }
          }
        }
      }

      // If panel_speakers and panel_tracks BOTH returned NULL,
      // Then skip updating and log warning.
      if ($array_panel_speakers_entities == NULL
        && $array_panel_tracks_entities == NULL
        && $array_panel_rooms_entities == NULL) {
        $operation_messages[] = sprintf('No records found on BOTH Join tables for Panel ID: %d',
          $panel_id
        );
        continue;
      }

      // Load the Panel by ID and check if null.
      $panel_record_rw = \Drupal::entityTypeManager()
        ->getStorage('panel')
        ->load((int) $panel_id);
      if ($panel_record_rw == NULL) {
        $operation_messages[] = sprintf('Could not load Panel ID: %d for Read-Write',
          $panel_id
        );
        continue;
      }

      // Set Speaker values.
      $panel_record_rw->set('field_speakers', $array_speaker_ids);
      // Set Speaker  => Role values.
      $panel_record_rw->set('field_speaker_roles', $array_speaker_roles);
      // Set Track values.
      $panel_record_rw->set('field_tracks', $array_track_ids);
      // Set Room values.
      $panel_record_rw->set('field_rooms', $array_room_ids);
      // Save updated Panel record.
      $panel_record_rw->save();
      $operation_messages[] = sprintf('Speaker IDs: %s', $array_speaker_ids_string);
      $operation_messages[] = sprintf('Track IDs: %s', $array_track_ids_string);
      $operation_messages[] = sprintf('Room IDs: %s', $array_room_ids_string);
      $operation_messages[] = sprintf('End of Loop Iteration, Panel ID: %d', $panel_id);
      \Drupal::logger('milken_migrate')
        ->debug(json_encode($operation_messages));
      // Thank you come again.
    }

  }

}
