import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Filters from './Filters';
import ResultsList from './ResultsList';
import KeywordForm from './KeywordForm';
import SearchAPIRequest from './SearchApiRequest';

import { useFormik } from 'formik';
import SearchResult from "./SearchResult";

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
      results: [],
      currentActiveRequest: false,
    };


  }

  render() {
    console.log(this);
    return (
      <Container fluid={true} className={"outline"}>
        <Row>
          <Col lg={12} className={"py-1"}>
            <Container fluid={true} className={"text-align-center mx-auto my-2"}>
              <h5 className={"display-5"}>Search the Milken Institute</h5>
              <KeywordForm
                onSubmit={(values) => {
                  this.setCurrentActiveRequest(true);
                  this.setKeywords(values.keywords);
                  fetch(`/api/v1.0/search?_format=json&keywords=${values.keywords}`)
                    .then(res => res.json())
                    .then((ajaxResults) => {
                      console.log(ajaxResults);
                      if (ajaxResults) {
                        this.setCurrentActiveRequest(false);
                        this.setResults(ajaxResults.map((singleresult) => <SearchResult {...singleresult} />));
                      }
                      console.log(this);
                    })}}
                keywords={this.keywords}
              />
            </Container>
          </Col>
        </Row>
        <Row >
          <Col lg={2} sm={1} style={{"background": "#dfdfdf"}}>
            <Filters />
          </Col>
          <Col lg={10} sm={11} style={{"minHeight": "300px"}}>
            <ResultsList
              results={this.state.results}
              currentActiveRequest={this.state.currentActiveRequest}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  setResults(results: Array<SearchResult>) {
    this.setState({
      results: results
    });
  }

  setKeywords(keywords: string) {
    this.setState({
      keywords: keywords
    });
  }

  setCurrentActiveRequest(requestIsActive: boolean) {
    this.setState({
      currentActiveRequest: requestIsActive
    });
  }


}


export default Search;
