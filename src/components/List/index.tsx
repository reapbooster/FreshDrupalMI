
import React from 'react';
import ListComponentProps, { ListComponentPropsInterface } from '../../DataTypes/ListComponentProps';
import {Container, Row} from 'react-bootstrap';
import ListBundleBrowser from '../List/ListBundleBrowser';
import JSONApiUrl from '../../DataTypes/JSONApiUrl';
import {EntityInterface} from "../../DataTypes/Entity";

function ListDataFactory(incoming: EntityInterface) {

}

function ListComponentFactory(incoming: EntityInterface) {


}

interface ListProps {
  items: Array<EntityInterface>;
  view_mode: string;
}

const List = function(props: ListProps) {
  var url = new JSONApiUrl(props.url);
  return (
    <Container fluid id={"list-".concat(props.id)}>
      {props.browser || []}
      <ListComponentProps {...props} url={url} />
    </Container>
  );
}

export default List;
