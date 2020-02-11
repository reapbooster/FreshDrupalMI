<?php

namespace Drupal\milken_base\Element;



use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Element\Radios;

class MilkenRadios extends Radios {

  public static function processAjaxForm(&$element, FormStateInterface $form_state, &$complete_form) {
    $element['#ajax_processed'] = true;
    $element['#attributes']['class'][] = 'MilkenRadios';
    return $element;
  }

}
