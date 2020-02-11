<?php

namespace Drupal\milken_base\Element;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Element\Radios;

/**
 * Class MilkenRadios.
 *
 * @package Drupal\milken_base\Element
 */
class MilkenRadios extends Radios {

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
    $element['#attributes']['class'][] = 'MilkenRadios';
    return $element;
  }

}
