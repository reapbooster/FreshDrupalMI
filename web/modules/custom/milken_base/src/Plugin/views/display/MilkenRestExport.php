<?php

namespace Drupal\milken_base\Plugin\views\display;

use Drupal\Core\Render\RenderContext;
use Drupal\rest\Plugin\views\display\RestExport;
use Drupal\views\Render\ViewsRenderPipelineMarkup;

/**
 * The plugin that handles Data response callbacks for REST resources.
 *
 * @ingroup views_display_plugins
 *
 * @ViewsDisplay(
 *   id = "milken_rest_export",
 *   title = @Translation("MILKEN REST export"),
 *   help = @Translation("Create a REST export resource specific to Milken Website."),
 *   uses_route = TRUE,
 *   admin = @Translation("Milken REST export"),
 *   returns_response = TRUE
 * )
 */
class MilkenRestExport extends RestExport {

  /**
   * Render Function.
   */
  public function render() {
    $build = [];
    $build['#markup'] = $this->renderer->executeInRenderContext(new RenderContext(), function () {
      return $this->view->style_plugin->render();
    });
    $toReturn = [];
    // Decode results.
    $results = \GuzzleHttp\json_decode($build['#markup'], TRUE);
    $filters = [];
    foreach ($results as $key => $result) {
      if (empty($result['title'])) {
        $results[$key]['title'] = $result['title_1'];
      }
      unset($results[$key]['title_1']);
      if (!isset($filters[$result['type']])) {
        $filters[$result['type']] = [
          'facetName' => $result['type'],
          'facetItemsReturned' => 0,
        ];
      }
      $filters[$result['type']]['facetItemsReturned']++;
    }
    $toReturn['data'] = $results;
    $toReturn['filters'] = [
      [
        'facetTypeName' => "Content Type",
        'facetTypeID' => 'type',
        'items' => array_values($filters),
      ],
    ];

    // Convert back to JSON.
    $build['#markup'] = \GuzzleHttp\json_encode($toReturn);

    $this->view->element['#content_type'] = $this->getMimeType();
    $this->view->element['#cache_properties'][] = '#content_type';

    // Encode and wrap the output in a pre tag if this is for a live preview.
    if (!empty($this->view->live_preview)) {
      $build['#prefix'] = '<pre>';
      $build['#plain_text'] = $build['#markup'];
      $build['#suffix'] = '</pre>';
      unset($build['#markup']);
    }
    elseif ($this->view->getRequest()->getFormat($this->view->element['#content_type']) !== 'html') {
      // This display plugin is primarily for returning non-HTML formats.
      // However, we still invoke the renderer to collect cacheability metadata.
      // Because the renderer is designed for HTML rendering, it filters
      // #markup for XSS unless it is already known to be safe, but that filter
      // only works for HTML. Therefore, we mark the contents as safe to bypass
      // the filter. So long as we are returning this in a non-HTML response
      // (checked above), this is safe, because an XSS attack only works when
      // executed by an HTML agent.
      // @todo Decide how to support non-HTML in the render API in
      //   https://www.drupal.org/node/2501313.
      $build['#markup'] = ViewsRenderPipelineMarkup::create($build['#markup']);
    }

    parent::applyDisplayCacheabilityMetadata($build);

    return $build;

  }

}
