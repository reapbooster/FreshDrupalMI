<?php

namespace Drupal\milken_base\Element;


use Drupal\Core\Form\FormStateInterface;
use Drupal\field_group\Element\HtmlElement;

class MilkenHtmlGroupElement extends HtmlElement {

  public static function processHtmlElement(&$element, FormStateInterface $form_state) {
    $toReturn = parent::processHtmlElement($element, $form_state);
    kint($toReturn);
    return $toReturn;

  }

}
