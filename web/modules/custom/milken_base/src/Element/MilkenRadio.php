<?php

namespace Drupal\milken_base\Element;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Element\Radio;

/**
 * Class MilkenRadio.
 *
 * @package Drupal\milken_base\Element
 */
class MilkenRadio extends Radio {

  /**
   * Override AJAX form processing.
   *
   * @param array $element
   *   Render Element.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   Form State Object.
   * @param array $complete_form
   *   Complete Form.
   *
   * @return array
   *   Render array.
   */
  public static function processAjaxForm(array &$element, FormStateInterface $form_state, array &$complete_form) {
    $element['#ajax_processed'] = TRUE;
    return $element;
  }

}
