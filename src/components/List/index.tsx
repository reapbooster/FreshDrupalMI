
import React from 'react';
import ListComponentProps, { ListComponentPropsInterface } from '../../DataTypes/ListComponentProps';
import {Container, Row} from 'react-bootstrap';
import ListBundleBrowser from '../List/ListBundleBrowser';
import JSONApiUrl from '../../DataTypes/JSONApiUrl';


const List = function(props: ListComponentPropsInterface) {
  var url = new JSONApiUrl(props.url);
  return (
    <Container fluid id={"list-".concat(props.id)}>
      {props.browser || []}
      <ListComponentProps {...props} url={url} />
    </Container>
  );
}

export default List;
