<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Component\Utility\Random;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\File\FileSystemInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\Row;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;

/**
 * Filter to download image and return media reference.
 *
 * @code
 * import_hero_image_to_slide:
 *   plugin: milken_migrate:hero_to_slide
 *   title_source: field_title_source
 *   title_source_backup: title
 *   image: secondary source of title if first one is null
 *   link_id: uuid
 *   link_entity_type_id: node
 *   link_bundle: report
 * @endcode
 *
 * Title Source:
 * The source property from which the title of the slide should
 * be derived.
 *
 * Title source backup:
 * The title is not optional. If a secondary source is not provided
 * and the primary source is empty, a randomized title will be generated.
 *
 * Image:
 * The source which will reference the slide's background image property. It
 * should be a standard file field. Json API will download the file for you.
 * The importer will use image magick to try to determine a color to record
 * for the text.
 *
 * Link:
 * The link is essentially a link to another drupal entity. Give it
 * EntityTypeId, Bundle and UUID and it will retrieve the data to create
 * the link.
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:hero_to_slide",
 * );
 */
class ImageToSlide extends MilkenProcessPluginBase implements MigrateProcessInterface {

  use JsonAPIDataFetcherTrait;

  /**
   * Random number generator.
   *
   * @var \Drupal\Component\Utility\Random
   */
  protected $random;

  /**
   * Transform remote image ref into local Media Object.
   *
   * @param mixed $value
   *   Value to import.
   * @param \Drupal\migrate\MigrateExecutableInterface $migrate_executable
   *   Executable migration interface.
   * @param \Drupal\migrate\Row $row
   *   Row object with imported/tranformed data.
   * @param string $destination_property
   *   The property to which this value is destined.
   *
   * @return array|int|mixed|string|null
   *   The Value that the trasformation returns.
   *
   * @throws \Drupal\migrate\MigrateException
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {

    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    if ($row->isStub()) {
      return NULL;
    }
    $source = $row->getSource();
    $value = $row->getSourceProperty($this->configuration['source']);
    if (array_key_exists("data", $value)) {
      return [];
    }
    if ($value) {
      \Drupal::logger('milken_migrate')
        ->debug("~~~ Field has value:" . \Kint::dump($value, TRUE));
    }

    $destination_value = [];

    try {
      $destination = [
        'type' => 'full_width_one_column',
        'uid' => 2,
        'langcode' => \Drupal::languageManager()
          ->getDefaultLanguage()
          ->getId(),
        'field_published' => TRUE,
      ];

      \Drupal::logger('milken_migrate')
        ->debug("DESTINATION SO FAR: " . \Kint::dump($destination));

      // ** Title cannot be empty.
      // Try "title_source", then "title_source_backup".
      // If all else fails, generate a random title.
      $destination['title'] = (
      empty($source[$this->configuration['title_source']])
        ? (
        empty($source[$this->configuration['title_source_backup']]) ?
          $this->getRandom()->sentences(mt_rand(1, 20), TRUE) :
          $source[$this->configuration['title_source_backup']]
        )
        : $source[$this->configuration['title_source']]
      );
      $destination['name'] = $destination['title'];

      // ** Subhead is optional
      // ** Supertitle is also optional, Article uses it
      $destination['field_slide_text'] = (isset($this->configuration['subhead'])
        && isset($source[$this->configuration['subhead']]))
        ? $source[$this->configuration['subhead']]
        : (isset($this->configuration['supertitle_source'])
        && isset($source[$this->configuration['supertitle_source']])
        && isset($destination['name']))
        ? [
          0 => [
            "key" => "h2",
            "description" => '',
            "value" => $source[$this->configuration['supertitle_source']],
            "format" => "full_html",
            "processed" => $source[$this->configuration['supertitle_source']],
            "new_entry" => '',
          ],

          1 => [
            "key" => "h1",
            "description" => '',
            "value" => $destination['name'],
            "format" => "full_html",
            "processed" => $destination['name'],
            "new_entry" => '',
          ],
        ]
        : NULL;

      \Drupal::logger('milken_migrate')
        ->debug("Destination so far: " . \Kint::dump($destination, TRUE));

      $exists = $this->entityTypeManager->getStorage('file')
        ->loadByProperties(['uuid' => $value['id']]);

      // ** Background Image is dependent on the download process
      // Should this fail, the catch loops will log the error.
      if (is_array($exists) && count($exists)) {
        $file = array_shift($exists);
        if ($file instanceof FileInterface) {
          \Drupal::logger('milken_migrate')
            ->debug("~~~ File exists: Attaching" . \Kint::dump($file->toArray()));
        }
        else {
          throw new MigrateException("Gurl, you 'bout to work my LAST nerve." . \Kint::dump($file->toArray(), TRUE));
        }
      }
      else {
        $file = $this->getRemoteFile($value,
          $source['jsonapi_host'] . $row->getSourceProperty($this->configuration['source']));
        $file->isNew();
        $file->setPermanent();
        $file->save();
      }

      if ($file instanceof FileInterface) {
        $destination['field_background_image'] = ['target_id' => $file->id()];
      }
      else {
        throw new MigrateException("File is empty.");
      }
      $destination['field_text_color'] = ['color' => "#000000"];
      $destination['field_text_color'] = ['color' => "#dfdfdf"];
      // ** LINK content object to which this slide is linked.
      if (isset($this->configuration['should_be_link_id_but_im_temporarily_disabling'])) {
        $destination['field_link'] = [
          'url' => "/node/" . $source[$this->configuration['link_id']],
          "title" => "click here",
        ];
      }
      \Drupal::logger('milken_migrate')
        ->debug('Creating Slide with data: ' . \Kint::dump($destination));
      $slide = $this->entityTypeManager->getStorage('slide')
        ->create($destination);

      if ($slide instanceof EntityInterface) {
        $slide->set('langcode', 'en');
        $slide->isNew();
        $slide->save();
        \Drupal::logger('milken_migrate')
          ->debug('Destination Value: ' . \Kint::dump($slide->toArray()));
        // RETURN the slide as the reference.
        return $slide;
      }
      else {
        throw new MigrateException("unable to create Slide for value: ", \Kint::dump($destination, TRUE));
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error(__CLASS__ . "::IMPORT ERROR: " . $e->getMessage());
      return new MigrateSkipProcessException($e->getMessage());
    }
    catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->error(__CLASS__ . "::IMPORT ERROR: " . $t->getMessage());
      return new MigrateSkipProcessException($t->getMessage());
    }
    return new MigrateSkipProcessException($message ?? ("Error Occurred!: " . \Kint::dump($destination_value, TRUE)));
  }

  /**
   * Turn remote URL into local FileInterface object.
   */
  public function getRemoteFile($name, $url): ?FileInterface {
    \Drupal::logger('milken_migrate')->debug("~~~ getting remote file:" . $url);
    $response = $this->getClient()->get($url);
    $toReturn = file_save_data($response->getBody(), "public://" . $name, FileSystemInterface::EXISTS_REPLACE);
    if ($toReturn instanceof FileInterface) {
      $realpath = \Drupal::service('file_system')
        ->realpath($toReturn->getFileUri());
      if (isset($_SERVER['USER'])) {
        chown($realpath, $_SERVER['USER']);
        chgrp($realpath, $_SERVER['USER']);
      }
      \Drupal::logger('milken_migrate')->debug("~~~ Local Path" . $realpath);
      $toReturn->save();
      return $toReturn;
    }
    return NULL;
  }

  /**
   * Returns the random data generator.
   *
   * @return \Drupal\Component\Utility\Random
   *   The random data generator.
   */
  protected function getRandom() {
    if (!$this->random) {
      $this->random = new Random();
    }
    return $this->random;
  }

}
