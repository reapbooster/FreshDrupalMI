<?php

namespace Drupal\milken_migrate\Controller;

use Drupal\path_alias\Entity\PathAlias;
use Drupal\Core\Controller\ControllerBase;
use Drupal\taxonomy\Entity\Term;

/**
 *
 */
class MilkenMigrateController extends ControllerBase {

  /**
   *
   */
  public function update_articles($data) {

    $node_ar = \Drupal::entityTypeManager()->getStorage('node')->loadByProperties(['uuid' => $data[9]]);
    $nid = key($node_ar);
    if (is_numeric($nid)) {
      // $node = Node::load($nid);
      print ', nid: ' . $nid;
      $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
      // Tags vid=milken_tags $data[4].
      if ($data[4] <> '') {
        $tags = explode(":", $data[4]);
        foreach ($tags as $index => $tag) {
          $tid = $this->get_term_from_name(str_replace(";", ",", $tag), 'milken_tags');
          if ($tid) {
            print  ', tag#: ' . $index;
            if ($index == 0) {
              $node->set('field_tags', ['target_id' => $tid]);
            }
            else {
              $node->get('field_tags')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Centers.
      if ($data[2] <> '') {
        $centers = explode(":", $data[2]);
        foreach ($centers as $index => $center) {
          $tid = $this->get_term_from_name(str_replace(";", ",", $center), 'centers');
          if ($tid) {
            print  ', center#: ' . $index;
            if ($index == 0) {
              $node->set('field_centers', ['target_id' => $tid]);
            }
            else {
              $node->get('field_centers')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Topics.
      if ($data[3] <> '') {
        $topics = explode(":", $data[3]);
        foreach ($topics as $index => $topic) {
          $tid = $this->get_term_from_name(str_replace(";", ",", $topic), 'topics');
          if ($tid) {
            print  ', topic#: ' . $index;
            if ($index == 0) {
              $node->set('field_topics', ['target_id' => $tid]);
            }
            else {
              $node->get('field_topics')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Collections.
      if ($data[5] <> '') {
        $collections = explode(":", $data[5]);
        foreach ($collections as $index => $collection) {
          $tid = $this->get_term_from_name(str_replace(";", ",", $collection), 'collections');
          if ($tid) {
            print  ', collection#: ' . $index;
            if ($index == 0) {
              $node->set('field_collections', ['target_id' => $tid]);
            }
            else {
              $node->get('field_collections')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Events.
      if ($data[6] <> '') {
        $events = explode(":", $data[6]);
        foreach ($events as $index => $event) {
          $tid = $this->get_term_from_name(str_replace(";", ",", $event), 'events');
          if ($tid) {
            print  ', event#: ' . $index;
            if ($index == 0) {
              $node->set('field_events', ['target_id' => $tid]);
            }
            else {
              $node->get('field_events')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Regions.
      if ($data[7] <> '') {
        $regions = explode(":", $data[7]);
        foreach ($regions as $index => $region) {
          $tid = $this->get_term_from_name(str_replace(";", ",", $region), 'region');
          if ($tid) {
            print  ', region#: ' . $index;
            if ($index == 0) {
              $node->set('field_region', ['target_id' => $tid]);
            }
            else {
              $node->get('field_region')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      $node->save();

      $path_alias = PathAlias::create([
        'path' => '/node/' . $nid,
        'alias' => $data[1],
      ]);
      $path_alias->save();
      print " END OF " . $nid;
    } else {
      print " NOT FOUND: " . implode("; ", $data);
    }

  }

  /**
   *
   */
  public function update_media($data) {

    $media = \Drupal::entityTypeManager()->getStorage('media')->loadByProperties(['uuid' => $data[9]]);
    $mid = key($media);
    if (is_numeric($mid)) {
      print ', mid: ' . $nid;
      $media = \Drupal::entityTypeManager()->getStorage('media')->load($mid);

      // Tags vid=milken_tags $data[4].
      if ($data[4] <> '') {
        $tags = explode(":", $data[4]);
        foreach ($tags as $index => $tag) {
          $tid = $this->get_term_from_name(str_replace(";", ",", $tag), 'milken_tags');
          if ($tid) {
            print  ', tag#: ' . $index;
            if ($index == 0) {
              $media->set('field_tags', ['target_id' => $tid]);
            }
            else {
              $media->get('field_tags')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Centers.
      if ($data[2] <> '') {
        $centers = explode(":", $data[2]);
        foreach ($centers as $index => $center) {
          $tid = $this->get_term_from_name(str_replace(";", ",", $center), 'centers');
          if ($tid) {
            print  ', center#: ' . $index;
            if ($index == 0) {
              $media->set('field_centers', ['target_id' => $tid]);
            }
            else {
              $media->get('field_centers')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Topics.
      if ($data[3] <> '') {
        $topics = explode(":", $data[3]);
        foreach ($topics as $index => $topic) {
          $tid = $this->get_term_from_name(str_replace(";", ",", $topic), 'topics');
          if ($tid) {
            print  ', topic#: ' . $index;
            if ($index == 0) {
              $media->set('field_topics', ['target_id' => $tid]);
            }
            else {
              $media->get('field_topics')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Collections.
      if ($data[5] <> '') {
        $collections = explode(":", $data[5]);
        foreach ($collections as $index => $collection) {
          $tid = $this->get_term_from_name(str_replace(";", ",", $collection), 'collections');
          if ($tid) {
            print  ', collection#: ' . $index;
            if ($index == 0) {
              $media->set('field_collections', ['target_id' => $tid]);
            }
            else {
              $media->get('field_collections')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Events.
      if ($data[6] <> '') {
        $events = explode(":", $data[6]);
        foreach ($events as $index => $event) {
          $tid = $this->get_term_from_name(str_replace(";", ",", $event), 'events');
          if ($tid) {
            print  ', event#: ' . $index;
            if ($index == 0) {
              $media->set('field_events', ['target_id' => $tid]);
            }
            else {
              $media->get('field_events')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Regions.
      if ($data[7] <> '') {
        $regions = explode(":", $data[7]);
        foreach ($regions as $index => $region) {
          $tid = $this->get_term_from_name(str_replace(";", ",", $region), 'region');
          if ($tid) {
            print  ', region#: ' . $index;
            if ($index == 0) {
              $media->set('field_regions', ['target_id' => $tid]);
            }
            else {
              $media->get('field_regions')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      $media->save();

      $path_alias = PathAlias::create([
        'path' => '/media/' . $mid,
        'alias' => $data[1],
      ]);
      $path_alias->save();
      print " END OF " . $mid;
    } else {
      print " NOT FOUND: " . implode("; ", $data);
    }

  }

  /**
   * Helper function to dynamically get the tid from the term_name.
   *
   * @param $term_name
   *   Term name
   * @param $vocabulary_name
   *   Name of the vocabulary to search the term in
   *
   * @return \Drupal\taxonomy\Entity\Term id of the found term or else FALSE
   */
  private function get_term_from_name($term_name, $vid) {
    $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')
      ->loadByProperties(['name' => $term_name, 'vid' => $vid]);
    $term = reset($term);

    if ($term) {
      return $term->id();
    }
    else {
      print " TERM NOT FOUND: " . $term_name;
      $term = Term::create([
        'name' => $term_name,
        'vid' => $vid,
      ])->save();
      return $term;
    }
    return FALSE;
  }

}
