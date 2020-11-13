import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ResultsList from "./ResultsList";
import KeywordForm from "./KeywordForm";
import Filters from "./Filters";
import SearchResult from "./SearchResult";
import {
  FacetList,
  FacetValue,
  FacetValueInterface,
} from "../../DataTypes/Facet";
import FacetListDisplay from "./FacetListDisplay";
import ErrorBoundary from "../../Utility/ErrorBoundary";

interface SearchState {
  keywords: string;
  results: Array<SearchResult>;
  filters: Array<Facets>;
  currentActiveRequest: boolean;
  abortController: AbortController;
}

class Search extends React.Component<any, SearchState> {
  constructor(props) {
    super(props);
    const searchParams = new URLSearchParams(window.location.search);
    this.state = {
      keywords: searchParams.get("keywords"),
      results: [],
      filters: [],
      currentActiveRequest: false,
      abortController: new AbortController(),
    };
    this.setFilters = this.setFilters.bind(this);
    this.getResults = this.getResults.bind(this);
    this.searchOnSubmitHandler = this.searchOnSubmitHandler.bind(this);
  }

  componentDidMount() {
    if (this.state.keywords) {
      this.getResults();
    }
  }

  getResults() {
    const { keywords } = this.state;
    console.debug("GetResults", keywords);
    const { abortController } = this.state;
    fetch(`/api/v1.0/search?_format=json&`.concat("keywords=", keywords), {
      abortController,
    })
      .then((res) => res.json())
      .then((ajaxResults) => {
        console.debug("back from ajax:", ajaxResults);
        if (ajaxResults) {
          this.setState({
            currentActiveRequest: false,
            results: ajaxResults,
          });
        }
      });
  }

  render() {
    console.debug("Search => Index => ", this.state, this.props);
    const { filters, results, currentActiveRequest } = this.state;
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
              <ErrorBoundary>
                <KeywordForm
                  onSubmit={this.searchOnSubmitHandler}
                  keywords={keywords}
                />
              </ErrorBoundary>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col lg={2} sm={1} style={{ background: "#dfdfdf" }}>
            <ErrorBoundary>
              <Filters results={results} />
            </ErrorBoundary>
          </Col>
          <Col lg={10} sm={11} style={{ minHeight: "300px" }}>
            <ErrorBoundary>
              <ResultsList
                results={results}
                currentActiveRequest={currentActiveRequest}
                setFilters={this.setFilters}
              />
            </ErrorBoundary>
          </Col>
        </Row>
      </Container>
    );
  }

  setFilters(filters: Array<FacetList>) {
    console.debug("Search => set Filters => ", filters);
    this.setState({ filters });
  }

  setCurrentActiveRequest(requestIsActive: boolean) {
    this.setState({
      currentActiveRequest: requestIsActive,
    });
  }

  searchOnSubmitHandler(values) {
    console.log("Searching...", values);
    this.setState({ keywords: values.keywords });
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
