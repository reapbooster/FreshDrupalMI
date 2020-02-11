<?php


namespace Drupal\milken_base\Plugin\Field\FieldWidget;


use Drupal\Core\Entity\EntityReferenceSelection\SelectionPluginManager;
use Drupal\Core\Entity\FieldableEntityInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\Plugin\Field\FieldType\EntityReferenceItem;
use Drupal\Core\Field\Plugin\Field\FieldWidget\OptionsWidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\OptGroup;

/**
 * Plugin implementation of the 'options_buttons' widget.
 *
 * @FieldWidget(
 *   id = "milken_layouts_selection_icons",
 *   label = @Translation("Selection Icons For Milken Layouts"),
 *   field_types = {
 *     "entity_reference",
 *   },
 *   multiple_values = FALSE
 * )
 */
class MilkenLayoutSelectionIcons extends OptionsWidgetBase {

  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element = parent::formElement($items, $delta, $element, $form, $form_state);
    $options = $this->getOptions($items->getEntity());
    $selected = $this->getSelectedOptions($items);

    // If required and there is one single option, preselect it.
    if ($this->required && count($options) == 1) {
      reset($options);
      $selected = [key($options)];
    }

    $element += [
      '#type' => 'radios',
      // Radio buttons need a scalar value. Take the first default value, or
      // default to NULL so that the form element is properly recognized as
      // not having a default value.
      '#default_value' => $selected ? reset($selected) : NULL,
      '#options' => $options,
      '#options_attributes' => [
        '#attributes' => ['class' => ['form-group', 'row']]
      ]
    ];

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  protected function getEmptyLabel() {
    if (!$this->required && !$this->multiple) {
      return t('N/A');
    }
  }

  protected function getOptions(FieldableEntityInterface $entity) {
    if (!isset($this->options)) {
      $options = [];
      // Limit the settable options for the current user account.
      $op = $this->fieldDefinition
        ->getFieldStorageDefinition()
        ->getOptionsProvider($this->column, $entity);

      if ($op instanceof EntityReferenceItem) {
        $fieldDef = $op->getFieldDefinition();
        $targetType = $fieldDef->getFieldStorageDefinition()
          ->getSetting('target_type');
        $selectionHandler = \Drupal::service('plugin.manager.entity_reference_selection')
          ->getSelectionHandler($fieldDef, $op->getEntity());
        $refs = $selectionHandler->getReferenceableEntities();
        $path = drupal_get_path('module', 'milken_base') . "/images";
        $result = \Drupal::entityTypeManager()
          ->getStorage($targetType)
          ->loadMultiple(array_keys($refs[$targetType]));
        if (empty($result)) {
          return [];
        }
        foreach ($result as $layout) {
          $imageURL = base_path() . $path . "/" . str_replace("_", "-", $layout->id()) . ".png";
          $options[$layout->id()] = '<img src="' . $imageURL . '" alt="' . $layout->label() . '" />';
        }
      }
      $this->options = $options;
    }
    return $this->options;
  }

}
