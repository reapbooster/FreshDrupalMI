<?php

namespace Drupal\milken_base\Plugin\Layout;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Layout\LayoutDefault;
use Drupal\layout_builder\SectionStorageInterface;


/**
 * A custom Layout for Milken "Slides".
 *
 * @Layout(
 *   id = "one_col_full_width",
 *   label = @Translation("Milken One Col Full Width"),
 *   category = @Translation("milken"),
 *   template = "templates/one-col-full-width",
 *   library = "milken/react-component",
 *   default_region = "content",
 *   icon = "images/one-col-full-width.png",
 *   type = "partial",
 *   regions = {
 *     "content" = {
 *       "label" = @Translation("React Coponent"),
 *     },
 *   }
 * )
 */
class OneColFullWidth extends MilkenLayoutBase {


}
