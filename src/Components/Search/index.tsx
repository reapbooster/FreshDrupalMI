import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ResultsList from "./ResultsList";
import KeywordForm from "./KeywordForm";
import FilterList from "./FilterList";
import SearchResult from "./SearchResult";

interface SearchState {
  keywords: string;
  results: Array<SearchResult>;
  filters: FilterList;
  currentActiveRequest: boolean;
  abortController: AbortController;
}

class Search extends React.Component<any, SearchState> {
  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
      results: [],
      filters: <FilterList filters={[]} />,
      currentActiveRequest: false,
      abortController: new AbortController(),
    };
  }

  getResults() {
    const searchParams = new URLSearchParams(document.location.search);
    fetch(`/api/v1.0/search?_format=json`.concat(searchParams.toString()))
      .then((res) => res.json())
      .then((ajaxResults) => {
        console.debug("back from ajax:", ajaxResults);
        if (ajaxResults) {
          this.setState({
            currentActiveRequest: false,
            results: ajaxResults.data,
          });
        }
      });
  }

  render() {
    const { filters, results, currentActiveRequest} = this.state;
    const searchParams = new URLSearchParams(document.location.search);
    const keywords = searchParams.get("keywords");
    return (
      <Container fluid={true} className={"outline"}>
        <Row>
          <Col lg={12} className={"py-1"}>
            <Container
              fluid={true}
              className={"text-align-center mx-auto my-2"}
            >
              <h5 className={"display-5"}>Search the Milken Institute</h5>
              <KeywordForm
                onSubmit={this.searchOnSubmitHandler.bind(this)}
                keywords={keywords}
              />
            </Container>
          </Col>
        </Row>
        <Row>
          <Col lg={2} sm={1} style={{ background: "#dfdfdf" }}>

          </Col>
          <Col lg={10} sm={11} style={{ minHeight: "300px" }}>
            <ResultsList
              results={results}
              currentActiveRequest={currentActiveRequest}
              filters=
            />
          </Col>
        </Row>
      </Container>
    );
  }

  setCurrentActiveRequest(requestIsActive: boolean) {
    this.setState({
      currentActiveRequest: requestIsActive,
    });
  }

  searchOnSubmitHandler(values) {
    console.log("Searching...", values);
    const { abortController } = this.state;
    this.setCurrentActiveRequest(true);
    this.setQueryVariable("keywords", values);
  }

  getQueryVariable(variable: string): string {
    const myUrl = new URL(document.location.href);
    return myUrl.searchParams.get(variable);
  }

  setQueryVariable(variable, value) {
    const myUrl = new URL(document.location.href);
    myUrl.searchParams.set(variable, value);
    document.location.href = myUrl.toString();
  }
}

export default Search;
