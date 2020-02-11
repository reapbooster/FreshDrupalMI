<?php

namespace Drupal\milken_base\Element;



use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Element\Radio;

class MilkenRadio extends Radio {


  public static function processAjaxForm(&$element, FormStateInterface $form_state, &$complete_form) {
    $element['#ajax_processed'] = true;
    return $element;
  }

}
