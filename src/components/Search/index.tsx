import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Filters from './Filters';
import ResultsList from './ResultsList';
import KeywordForm from './KeywordForm';
import SearchAPIRequest from './SearchApiRequest';

import { useFormik } from 'formik';

class Search extends React.Component {

  request: SearchAPIRequest;

  constructor(props) {
    super(props);
    this.request = new SearchAPIRequest();
  }

  render() {
    return (
      <Container fluid={true} className={"outline"}>
        <Row>
          <Col lg={12}>
            <Container fluid={true} className={"text-align-center mx-auto my-2"}>
              <h5 className={"display-5"}>Search the Milken Institute</h5>
              <KeywordForm
                handleSubmit={this.request.onSubmitHandler.bind(this.request)}
                keywords={this.request.getKeywords()}
              />
            </Container>
          </Col>
        </Row>
        <Row >
          <Col lg={4} sm={2} >
            <Filters />
          </Col>
          <Col lg={8} sm={10}>
            <ResultsList />
          </Col>
        </Row>
      </Container>
    );
  }
}


export default Search;
