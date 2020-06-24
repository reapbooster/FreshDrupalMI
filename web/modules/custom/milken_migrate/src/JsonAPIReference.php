<?php

namespace Drupal\milken_migrate;

use Drupal\migrate\MigrateSkipProcessException;
use Drupal\milken_migrate\Traits\EntityExistsTrait;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;

/**
 *
 */
class JsonAPIReference {

  use JsonAPIDataFetcherTrait;
  use EntityExistsTrait;

  /**
   * @var string
   */
  protected $id;

  /**
   * @var string
   */
  protected $entityTypeId;

  /**
   * @var string
   */
  protected $type;

  /**
   * @var string
   */
  protected $bundle;

  /**
   * @var array
   */
  protected $uri = [];

  /**
   * @var null|string
   */
  protected $filename = NULL;

  /**
   *
   */
  public function __construct(array $values = []) {
    $this->setValues($values);
    if ($this->getEntityTypeId() == "missing" || $this->getBundle() == "missing" || $this->getId() == "missing") {
      return new MigrateSkipProcessException("The referenced Entity is missing on the remote server.");
    }
  }

  public function exists(){
    return $this->entityExixsts($this->getEntityTypeId(), $this->getId());
  }

  public function getRemote() {
    return $this->getRemoteFile($this->getFilename(), $this->getUrl());
  }

  /**
   *
   */
  public function valid() {
    return (isset($this->id) && is_string($this->id) && isset($this->entityTypeId) && is_string($this->entityTypeId));
  }

  /**
   * Set multiple values for object.
   */
  public function setValues(array $values) {
    foreach ($values as $key => $value) {
      if ($key == "type") {
        [$entityTypeId, $bundle] = explode("--", $value);
        $this->setEntityTypeID($entityTypeId);
        $this->setBundle($bundle);
      }
      $this->{$key} = $value;
    }
  }

  /**
   *
   */
  public function getRemoteData() : JsonAPIReference {
    if ($this->valid()) {
      $response = $this->getClient()
        ->get("/jsonapi/{$this->entityTypeId}/{$this->bundle}/{$this->id}",
          ['query' => ['jsonapi_include' => TRUE]]);
      if (in_array($response->getStatusCode(), [200, 201, 202])) {
        $responseData = json_decode($response->getBody(), TRUE);
        if (!empty($responseData['data'])) {
          $this->setValues($responseData['data']);
        }
      }
    }
    return $this;
  }

  /**
   * @return string
   */
  public function getId(): ?string {
    return $this->id;
  }

  /**
   * @param string $id
   */
  public function setId(string $id): void {
    $this->id = $id;
  }

  /**
   * @return string
   */
  public function getEntityTypeId(): ?string {
    return $this->entityTypeId;
  }

  /**
   * @param string $entityTypeID
   */
  public function setEntityTypeId(string $entityTypeId): void {
    $this->entityTypeId = $entityTypeId;
  }

  /**
   * @return string
   */
  public function getType(): ?string {
    return $this->type;
  }

  /**
   * @param string $type
   */
  public function setType(string $type): void {
    $this->type = $type;
  }

  /**
   * @return string
   */
  public function getBundle(): ?string {
    return $this->bundle;
  }

  /**
   * @param string $bundle
   */
  public function setBundle(string $bundle): void {
    $this->bundle = $bundle;
  }

  /**
   * @return mixed|null
   */
  public function getUrl(): ?string {
    return (isset($this->uri['url'])) ? $this->uri['url'] : NULL;
  }

  /**
   * @return string|null
   */
  public function getFilename(): ?string {
    return $this->filename;
  }

}
