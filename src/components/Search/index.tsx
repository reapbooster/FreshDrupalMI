
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';

class Search extends React.Component {

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <h1 className={"display-3"}>This is the Search Component</h1>
          </Col>
        </Row>
      </Container>
    );
  }

}


export default Search;
