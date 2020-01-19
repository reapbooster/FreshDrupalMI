<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Exception;

/**
 * Filter to download image and return media reference.
 *
 * @Class BodyEmbed
 * @code
 * field_image:
 *   plugin: milken_migrate:body_embed
 *   source: {name where row data appears}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:body_embed"
 * );
 */
class BodyEmbed extends ProcessPluginBase {

  /**
   * Main guts of the plugin.
   *
   * @param mixed $value
   *   Incoming value from source row.
   * @param \Drupal\migrate\MigrateExecutableInterface $migrate_executable
   *   Migration executable.
   * @param \Drupal\migrate\Row $row
   *   Row data.
   * @param string $destination_property
   *   Destination Property.
   *
   * @return array|string|void
   *   Retruned Data.
   *
   * @throws \Drupal\migrate\MigrateException
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    try {
      if (!empty($value)) {
        $toReturn = $this->stripWordHtml($value);
        $row->setDestinationProperty($destination_property, $toReturn);
        Drupal::logger('milken_migrate')->debug($toReturn);
        return $toReturn;
      }
    }
    catch (Exception $e) {
      throw new MigrateException($e->getMessage());
    }
    return NULL;
  }

  /**
   * Strip away awful MSWORD html.
   *
   * @param string $text
   *   Text to be filtered.
   * @param string $allowed_tags
   *   Tags allowed in filtered text.
   *
   * @return false|string|string[]|null
   *   Returned string.
   */
  protected function stripWordHtml(string $text, string $allowed_tags = '<b><i><sup><sub><em><strong><u><br><table><tr><td>'): ?string {
    mb_regex_encoding('UTF-8');
    // Replace MS special characters first.
    $search = [
      '/&lsquo;/u',
      '/&rsquo;/u',
      '/&ldquo;/u',
      '/&rdquo;/u',
      '/&mdash;/u',
    ];
    $replace = ['\'', '\'', '"', '"', '-'];
    $text = preg_replace($search, $replace, $text);
    // Make sure _all_ html entities are converted to the plain ascii
    // equivalents - it appears.
    // in some MS headers, some html entities are encoded and some aren't.
    $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
    // Try to strip out any C style comments first, since these, embedded in
    // html comments, seem to prevent strip_tags from removing html comments
    // (MS Word introduced combination).
    if (mb_stripos($text, '/*') !== FALSE) {
      $text = mb_eregi_replace('#/\*.*?\*/#s', '', $text, 'm');
    }
    // Introduce a space into any arithmetic expressions that could be caught
    // by strip_tags so that they won't be
    // '<1' becomes '< 1'(note: somewhat application specific).
    $text = preg_replace(['/<([0-9]+)/'], ['< $1'], $text);
    $text = strip_tags($text, $allowed_tags);
    // Eliminate extraneous whitespace from start and end of line, or anywhere
    // there are two or more spaces, convert it to one.
    $text = preg_replace(['/^\s\s+/', '/\s\s+$/', '/\s\s+/u'], [
      '',
      '',
      ' ',
    ], $text);
    // Strip out inline css and simplify style tags.
    $search = [
      '#<(strong|b)[^>]*>(.*?)</(strong|b)>#isu',
      '#<(em|i)[^>]*>(.*?)</(em|i)>#isu',
      '#<u[^>]*>(.*?)</u>#isu',
    ];
    $replace = ['<b>$2</b>', '<i>$2</i>', '<u>$1</u>'];
    $text = preg_replace($search, $replace, $text);
    // On some of the ?newer MS Word exports, where you get conditionals of
    // the form 'if gte mso 9', etc., it appears that whatever is in one of
    // the html comments prevents strip_tags from eradicating the html comment
    // that contains some MS Style Definitions - this last bit gets rid of
    // any leftover comments.
    $num_matches = preg_match_all("/\<!--/u", $text, $matches);
    if ($num_matches) {
      $text = preg_replace('/\<!--(.)*--\>/isu', '', $text);
    }
    return $text;
  }

}
