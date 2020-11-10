import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import SearchResult, { SearchResultProps } from "./SearchResult";

interface ResultsListProps {
  results: Array<SearchResultProps>;
  currentActiveRequest: boolean;
}

const ResultsList = (props: ResultsListProps) => {
  const { results, currentActiveRequest } = props;
  if (currentActiveRequest === true) {
    return (
      <Row className="h-100">
        <Col lg={12} className={"col-sm-12 my-auto"}>
          <div className={"w-25 text-align-center border-0"}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        </Col>
      </Row>
    );
  } else if (results.length >= 1) {
    return (
      <ol>
        {results.map((result, key) => {
          console.log("result:", result);
          return (
            <li key={key}>
              <SearchResult {...result} />
            </li>
          );
        })}
      </ol>
    );
  } else {
    return <h1>No results found.</h1>;
  }
};

ResultsList.defaultProps = {
  results: [],
  currentActiveRequest: false,
};

export default ResultsList;
