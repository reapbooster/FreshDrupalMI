<?php

namespace Drupal\milken_base\AccessControlHandler;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\node\NodeTypeAccessControlHandler;

/**
 * Access controller for the MediaType entity.
 *
 * @see \Drupal\media\Entity\MediaType.
 */
class OverrideNodeTypeAccessControlHandler extends NodeTypeAccessControlHandler {

  /**
   * {@inheritDoc}
   */
  public function access(EntityInterface $entity, $operation, AccountInterface $account = NULL, $return_as_object = FALSE) {
    if ( $operation == "view"
      && $entity->bundle() == "session"
      && $entity->get('field_private')->value === true
      && $account->isAnonymous()) {
      return false;
    }
    return parent::access($entity, $operation, $account, $return_as_object);
  }


}
