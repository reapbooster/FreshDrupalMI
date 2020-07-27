
import React from 'react';
import ListComponentProps, { ListComponentPropsInterface } from '../../DataTypes/ListComponentProps';
import {Container, Row} from 'react-bootstrap';
import ListBundleBrowser from '../List/ListBundleBrowser';
import JSONApiUrl from '../../DataTypes/JSONApiUrl';

const List = function(props: ListComponentPropsInterface) {
  var url = new JSONApiUrl(props.url);
  var browser = [];
  if (props.browser == true) {
    browser = (
      <Row>
        <ListBundleBrowser entityTypeId={props.entityTypeId} url={url} />
      </Row>
    );
  }
  console.debug(url);
  return (
    <Container id={"list-".concat(props.id)}>
      {browser}
      <Row>
        <ListComponentProps {...props} url={url} />
      </Row>
    </Container>
  );
}

export default List;
