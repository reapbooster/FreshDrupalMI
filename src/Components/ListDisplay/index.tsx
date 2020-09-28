/**
 * List Display
 * Use this when you don't know what kind of entities you're displaying.
 *
 *
 *
 */

import React from 'react';
import {EntityInterface} from "../../DataTypes/Entity";
import ParagraphDisplay from '../ParagraphDisplay';
import NodeDisplay from '../NodeDisplay';
import MediaDisplay from '../MediaDisplay';
import EventDisplay from "../EventDisplay";
import styled, {StyledComponent} from 'styled-components';
import ErrorBoundary from "../../Utility/ErrorBoundary";

export const ListDisplayFactory = (item: EntityInterface) => {
  const [entityTypeId, bundle] = item.type.split("--");
  console.debug("list display factory", entityTypeId);
  switch(entityTypeId) {
    case "paragraph":
      return ParagraphDisplay;
    case "node":
      return NodeDisplay;
    case "media":
      return MediaDisplay;
    case "event":
      return EventDisplay;

    default:
      console.error(`missing display component for ${entityTypeId}`);
      throw new Error(`Missing config for ${entityTypeId}`);
  }
}

export interface ListDisplayProps {
  id: string;
  list: Array<EntityInterface> | Promise<Array<EntityInterface>>;
  view_mode: string;
  container?: StyledComponent<any, any>;
}

export const ListDisplay = function(props: ListDisplayProps) {
  const {id, list, view_mode, container } = props;
  const ContainerComponent = container ?? styled.div`
    display: flex;
  `;

  console.debug("list display:", list);
  if (list.length === 0 ?? true) {
    return (
      <>
        <h1>Nothing in list to display</h1>
      </>
    )
  }
  return (
    <ContainerComponent id={"list-".concat(id)}>
      {list.map((item: EntityInterface, key: number)=> {
        console.debug(" ==> list item:", item);
        const Component = ListDisplayFactory(item);
        return (
            <ErrorBoundary key={key}>
              <Component
                  data={item}
                  view_mode={view_mode}
                  key={key}
              />
            </ErrorBoundary>
        );
      })}
    </ContainerComponent>
  );
}

export default ListDisplay;
