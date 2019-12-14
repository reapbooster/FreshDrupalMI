<?php

namespace Drupal\milken\Plugin\Layout;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Layout\LayoutDefault;

/**
 * A very advanced custom layout.
 *
 * @Layout(
 *   id = "react_component",
 *   label = @Translation("React Component"),
 *   category = @Translation("milken"),
 *   template = "templates/react_component",
 *   library = "milken/react-component",
 *   default_region = "main",
 *   regions = {
 *     "main" = {
 *       "label" = @Translation("Main content"),
 *     }
 *   }
 * )
 */
class ReactComponent extends LayoutDefault {

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form['label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('React Component'),
      '#default_value' => $this->configuration['label'],
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateConfigurationForm(array &$form, FormStateInterface $form_state) {
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['label'] = $form_state->getValue('label');
  }

}
