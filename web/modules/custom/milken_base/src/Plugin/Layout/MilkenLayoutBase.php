<?php

namespace Drupal\milken_base\Plugin\Layout;


use Drupal\Core\Entity\EntityTypeBundleInfoInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Layout\LayoutDefault;
use Drupal\Core\Plugin\Context\ContextRepositoryInterface;
use Drupal\layout_builder\Context\LayoutBuilderContextTrait;
use Drupal\layout_builder\SectionStorage\SectionStorageTrait;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class MilkenLayoutBase
 *
 * @package Drupal\milken_base\Plugin\Layout
 */
abstract class MilkenLayoutBase extends LayoutDefault {

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return array
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    return $form;
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return array
   */
  public function validateConfigurationForm(array &$form, FormStateInterface $form_state) {
    return $form;
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return array
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function build(array $regions) {
    // Ensure $build only contains defined regions and in the order defined.
    $build = [];
    foreach ($this->getPluginDefinition()->getRegionNames() as $region_name) {
      if (array_key_exists($region_name, $regions)) {
        $build[$region_name] = $regions[$region_name];
      }
    }
    $build['#settings'] = $this->getConfiguration();
    $build['#layout'] = $this->pluginDefinition;
    $build['#theme'] = $this->pluginDefinition->getThemeHook();
    if ($library = $this->pluginDefinition->getLibrary()) {
      $build['#attached']['library'][] = $library;
    }
    return $build;
  }


}
