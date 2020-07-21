
import React from 'react';
import ListComponentProps, { ListComponentPropsInterface } from '../../DataTypes/ListComponentProps';
import {Container, Row} from 'react-bootstrap';

const List = function(props: ListComponentPropsInterface) {

  var lcp = new ListComponentProps(props);

  return (
    <Container id={"list-".concat(props.id)}>
      <Row>
        <ListComponentProps {...props} />
      </Row>
    </Container>
  );
}

export default List;
