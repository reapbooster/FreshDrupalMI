import React from "react";
import { Col, Container, Row, Pagination } from "react-bootstrap";
import ResultsList from "./ResultsList";
import { KeywordForm } from "./KeywordForm";
import Filters from "./Filters";
import { SearchResult } from "./SearchResult";
import { FacetList } from "../../DataTypes/Facet";
import { ErrorBoundary } from "../../Utility/ErrorBoundary";
import Loading from "../Loading";

export interface SearchResultFilterState {
  entity_type_id?: Array<string> | string;
  bundle?: Array<string> | string;
}

export interface SearchState {
  keywords: string;
  results: Array<SearchResult>;
  filters: SearchResultFilterState;
  loading: boolean;
  loaded: boolean;
  page: number;
  abortController: AbortController;
}

export class Search extends React.Component<
  Record<string, unknown>,
  SearchState
> {
  constructor(props) {
    super(props);
    const searchParams = new URLSearchParams(window.location.search);
    const filters = {};
    if (searchParams.has("entity_type_id")) {
      filters.entity_type_id = searchParams.get("entity_type_id");
    }
    if (searchParams.has("bundle")) {
      filters.bundle = searchParams.get("entity_type_id");
    }
    this.state = {
      keywords: searchParams.get("keywords"),
      results: [],
      filters,
      loading: false,
      loaded: false,
      page: 1,
      abortController: new AbortController(),
    };
    this.setFilters = this.setFilters.bind(this);
    this.getResults = this.getResults.bind(this);
    this.searchOnSubmitHandler = this.searchOnSubmitHandler.bind(this);
  }

  componentDidMount() {
    const { keywords } = this.state;
    if (keywords) {
      this.getResults();
    }
  }

  getResults() {
    const { keywords, page, abortController } = this.state;
    const newState = { loading: true, loaded: false };
    console.debug("GetResults", keywords);
    const toSet = new URLSearchParams(window.location.search);
    if (keywords) {
      // If keywords are changed, reset the page to 1.
      toSet.set("keywords", keywords);
      toSet.delete("page");
      newState.page = 1;
    } else {
      // Page is probably being changed.
      if (toSet.has("page")) {
        toSet.set("page", page.toString());
      } else {
        toSet.append("page", page.toString());
      }
    }
    toSet.set("_format", "json");
    this.setState(newState);
    fetch(`/api/v1.0/search?`.concat(toSet.toString()), {
      abortController,
    })
      .then((res) => res.json())
      .then((ajaxResults) => {
        console.debug("back from ajax:", ajaxResults);
        const stateToSet = {
          loading: false,
        };
        if (ajaxResults) {
          stateToSet.results = ajaxResults;
          stateToSet.loaded = true;
        }
        this.setState(stateToSet);
      });
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

  getQueryVariable(variable: string): string {
    const myUrl = new URL(document.location.href);
    return myUrl.searchParams.get(variable);
  }

  setQueryVariable(variable, value) {
    const myUrl = new URL(document.location.href);
    myUrl.searchParams.set(variable, value);
    document.location.href = myUrl.toString();
  }

  searchOnSubmitHandler(values) {
    console.log("VALUES", values);
    /**

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("keywords", values.keywords);
    console.log("I am changing...", searchParams);
    window.location.search = searchParams.toString();
    * */
  }

  render() {
    console.debug("Search => Index => ", this.state, this.props);
    const {
      searchOnSubmitHandler,
      setFilters,
      state: { results, loading, loaded, page },
    } = this;

    if (loading) {
      return <Loading />;
    }
    if (loaded) {
      const searchParams = new URLSearchParams(window.location.search);
      const keywords = searchParams.get("keywords");
      const paginationItems = [];
      for (let number = 0; number <= 9; number++) {
        paginationItems.push(
          <Pagination.Item key={number} active={number === page}>
            {number}
          </Pagination.Item>
        );
      }

      return (
        <Container fluid className="outline">
          <Row>
            <Col lg={12} className="py-1">
              <Container fluid className="text-align-center mx-auto my-2">
                <h5 className="display-5">Search the Milken Institute</h5>
                <ErrorBoundary>
                  <KeywordForm
                    onSubmit={searchOnSubmitHandler}
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
                <ResultsList results={results} links setFilters={setFilters} />
              </ErrorBoundary>
              <Pagination>{paginationItems}</Pagination>
            </Col>
          </Row>
        </Container>
      );
    }
    return <Loading />;
  }
}

export default Search;
