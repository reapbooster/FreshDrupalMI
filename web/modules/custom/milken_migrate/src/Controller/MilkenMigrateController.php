<?php

namespace Drupal\milken_migrate\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Component\Serialization\Json;
use Psr\Log\LoggerInterface;
use Drupal\node\Entity\Node;
use Drupal\media\Entity\Media;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\rest\ModifiedResourceResponse;
use Drupal\taxonomy\Entity\Term;




class MilkenMigrateController extends ControllerBase
{
  

  public function update_articles($data) {

    $node_ar = \Drupal::entityTypeManager()->getStorage('node')->loadByProperties(['uuid' => $data[9]]);
    $nid =  key($node_ar);
    if (is_numeric($nid)) {
      //$node = Node::load($nid);
      print $nid;
      print "\n";
      $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
      //tags vid=milken_tags $data[4]
      if($data[4] <> '') {
      $tags = explode(":", $data[4]);
        foreach($tags as $index => $tag) {
            $tid = $this->get_term_from_name(str_replace(";", ",", $tag), 'milken_tags');
            if($tid) {
              print $index;
              print "\n";
              if($index == 0) {
                $node->set('field_terms', ['target_id' => $tid]);
              } else {
                $node->get('field_terms')->appendItem([
                  'target_id' => $tid,
                ]);
              }
            }
          }
      }
    
      //centers
      if($data[2] <> '') {
      $centers = explode(":", $data[2]);
        foreach($centers as $index => $center) {
            $tid = $this->get_term_from_name(str_replace(";", ",", $center), 'centers');
            if($tid) {
              if($index == 0) {
                $node->set('field_centers', ['target_id' => $tid]);
              } else {
                $node->get('field_centers')->appendItem([
                  'target_id' => $tid,
                ]);
              }
            }
          }
      }
    
      //topics
      if($data[3] <> '') {
      $topics = explode(":", $data[3]);
        foreach($topics as $index => $topic) {
            $tid = $this->get_term_from_name(str_replace(";", ",", $topic), 'topics');
            if($tid) {
              if($index == 0) {
                $node->set('field_topics', ['target_id' => $tid]);
              } else {
                $node->get('field_topics')->appendItem([
                  'target_id' => $tid,
                ]);
              }
            }
          }
      }
    
      $path_alias = \Drupal\path_alias\Entity\PathAlias::create([
        'path' => '/node/'.$nid,
        'alias' => $data[1],
      ]);
      $path_alias->save();
    
      //collections
      if($data[5] <> '') {
      $collections = explode(":", $data[5]);
        foreach($collections as $index => $collection) {
            $tid = $this->get_term_from_name(str_replace(";", ",", $collection), 'collections');
            if($tid) {
              if($index == 0) {
                $node->set('field_collections', ['target_id' => $tid]);
              } else {
                $node->get('field_collections')->appendItem([
                  'target_id' => $tid,
                ]);
              }
            }
          }
      }
    
      //events
      if($data[6] <> '') {
      $events = explode(":", $data[6]);
        foreach($events as $index => $event) {
            $tid = $this->get_term_from_name(str_replace(";", ",", $event), 'events');
            if($tid) {
              if($index == 0) {
                $node->set('field_events', ['target_id' => $tid]);
              } else {
                $node->get('field_events')->appendItem([
                  'target_id' => $tid,
                ]);
              }
            }
          }
      }
    
      //regions
      if($data[7] <> '') {
      $regions = explode(":", $data[7]);
        foreach($regions as $index => $region) {
            $tid = $this->get_term_from_name(str_replace(";", ",", $region), 'region');
            if($tid) {
              if($index == 0) {
                $node->set('field_region', ['target_id' => $tid]);
              } else {
                $node->get('field_region')->appendItem([
                  'target_id' => $tid,
                ]);
              }
            }
          }
      }
    
      $node->save();
    
      $path_alias = \Drupal\path_alias\Entity\PathAlias::create([
        'path' => '/node/'.$nid,
        'alias' => $data[1],
      ]);
      $path_alias->save();
      print $nid;
      print "\n";
    }
    
   
  }
  

  public function update_media() {
    
  }
  
  
  /**
   * Helper function to dynamically get the tid from the term_name
   *
   * @param $term_name Term name
   * @param $vocabulary_name Name of the vocabulary to search the term in
   *
   * @return Term id of the found term or else FALSE
   */
  private function get_term_from_name($term_name, $vid) {
    $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')
        ->loadByProperties(['name' => $term_name, 'vid' => $vid]);
        $term = reset($term);

        if ($term){
          return $term->id();
        } else {
          $term = Term::create([
            'name' => $term_name,
            'vid' => $vid,
          ])->save();
          return $term;
        }
    return FALSE;
  }
}
