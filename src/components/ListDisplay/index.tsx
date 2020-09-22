
import React from 'react';
import {Container, Row} from 'react-bootstrap';
import {EntityInterface} from "../../DataTypes/Entity";
import {ListableInterface} from "../../DataTypes/Listable";
import ParagraphDisplay from '../ParagraphDisplay';
import NodeDisplay from '../NodeDisplay';
import MediaDisplay from '../MediaDisplay';
import EventDisplay from "../EventDisplay";

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
  list: ListableInterface;
  view_mode: string;
}

export const ListDisplay: React.FunctionComponent = function(props: ListDisplayProps) {
  const {list, view_mode} = props;
  console.debug("list display:", list);
  return (
    <Container fluid id={"list-".concat(list.id)}>
      {list.browser ?? []}
      <Row className="list-component">{list.getItems().map((item : EntityInterface, key: number)=> {
        const Component = ListDisplayFactory(item);
        return <Component
            data={item}
            view_mode={view_mode}
            key={key}
        />
      })}</Row>;
    </Container>
  );
}

export default ListDisplay;
