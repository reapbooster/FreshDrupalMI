/**
 * List Display
 * Use this when you don't know what kind of entities you're displaying.
 * 
 * 
 * 
 */

import React from 'react';
import {Row} from 'react-bootstrap';
import {EntityInterface} from "../../DataTypes/Entity";
import {ListableInterface} from "../../DataTypes/Listable";
import ParagraphDisplay from '../ParagraphDisplay';
import NodeDisplay from '../NodeDisplay';
import MediaDisplay from '../MediaDisplay';
import EventDisplay from "../EventDisplay";
import styled from 'styled-components';


export const ListDisplayFactory = (item: EntityInterface) => {
  const [entityTypeId, bundle] = item.type.split("--");

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
  list: Array<EntityInterface> | Promise<Array<EntityInterface>>;
  view_mode: string;
  container: JSX.Element;
}

export const ListDisplay: React.FunctionComponent = function(props: ListDisplayProps) {
  const {list, view_mode, container } = props;
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
    <ContainerComponent fluid id={"list-".concat(list.id)}>
      {list.map((item: EntityInterface, key: number)=> {
        const Component = ListDisplayFactory(item);
        return (
          <ErrorBoundary>
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
