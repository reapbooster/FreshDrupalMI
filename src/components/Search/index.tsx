import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Filters from './Filters';
import Results from './Results';
import KeywordForm from './KeywordForm';

import { useFormik } from 'formik';

class Search extends React.Component {

  render() {
    return (
      <Container fluid={true} className={"outline"}>
        <Row>
          <Col lg={12}>
            <Container fluid={true} className={"text-align-center mx-auto my-2"}>
              <h5 className={"display-5"}>Search the Milken Institute</h5>
              <KeywordForm/>
            </Container>
          </Col>
        </Row>
        <Row >
          <Col lg={4} sm={2} >
            <Filters />
          </Col>
          <Col lg={8} sm={10}>
            <Results />
          </Col>
        </Row>
      </Container>
    );
  }
}


export default Search;
