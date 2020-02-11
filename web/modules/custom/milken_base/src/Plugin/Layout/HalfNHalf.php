<?php

namespace Drupal\milken_base\Plugin\Layout;

use Drupal\Core\Entity\Entity;
use Drupal\Core\Entity\EntityBase;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Layout\LayoutDefault;
use Drupal\Core\Layout\LayoutDefinition;
use Drupal\layout_builder\Context\LayoutBuilderContextTrait;
use Drupal\node\Entity\Node;

/**
 * A custom Layout for Milken "Slides".
 *
 * @Layout(
 *   id = "half_n_half",
 *   label = @Translation("Milken Half and Half"),
 *   category = @Translation("milken"),
 *   template = "templates/half-n-half",
 *   library = "milken/react-component",
 *   default_region = "content",
 *   icon = "images/half-n-half.png",
 *   type = "partial",
 *   regions = {
 *     "content" = {
 *       "label" = @Translation("React Coponent"),
 *     },
 *   },
 *   context_definitions = {
 *     "node" = @ContextDefinition("entity:node", label = @Translation("Node"))
 *   }
 * )
 */
class HalfNHalf extends MilkenLayoutBase {



}
