import React from "react";
import { Accordion, Alert, Col, Container, Row } from "react-bootstrap";
import PodcastEpisode from "../PodcastEpisodeDisplay";
import Loading from "../Loading";
import Paginator from "./Paginator";
import JSONApiUrl from "../../DataTypes/JSONApiUrl";
import LinkList from "../../DataTypes/LinkList";
import PodcastBrowserNavbar from "./PodcastBrowserNavbar";
import ErrorBoundary from "../../Utility/ErrorBoundary";

interface PodcastBrowserState {
  currentURL: JSONApiUrl;
  loading: boolean;
  activeKey: number;
  data: object;
  links: LinkList;
  error?: Error;
}

class PodcastBrowser extends React.Component<any, PodcastBrowserState> {
  constructor(props) {
    super(props);
    this.setActiveKeyHandler = this.setActiveKeyHandler.bind(this);
    this.refresh = this.refresh.bind(this);
    this.getPodcastList = this.getPodcastList.bind(this);
    this.replaceUrl = this.replaceUrl.bind(this);
    this.queryPropertyChange = this.queryPropertyChange.bind(this);
    this.state = {
      currentURL: new JSONApiUrl(
        "/jsonapi/media/podcast_episode?jsonapi_include=1&sort[sort-name-episode][direction]=DESC&sort[sort-name-episode][path]=field_episode&include=field_media_image,field_media_audio_file"
      ),
      loading: false,
      activeKey: 0,
      data: [],
      links: [],
      error: null,
    };
  }

  setActiveKeyHandler(eventKey) {
    console.debug("Setting Active Key: ", eventKey);
    this.setState({ activeKey: eventKey });
  }

  componentDidMount() {
    const me = this;
    this.refresh();
  }

  replaceUrl(evt: Event) {
    console.debug("Replace Url current target:", evt.currentTarget);
    const refreshUrl = new JSONApiUrl(evt.currentTarget?.dataset?.jsonapiHref);
    console.debug("refresh trigger", refreshUrl);
    this.refresh(refreshUrl);
  }

  queryPropertyChange(evt: Event) {
    const newUrl = this.state.currentURL.clone();
    console.debug("queryPropertyChange", evt.currentTarget?.dataset);
    if (evt.currentTarget?.dataset?.jsonapiQueryProperty) {
      newUrl.query.set(
        evt.currentTarget.dataset.jsonapiQueryProperty,
        evt.currentTarget.dataset.jsonapiQueryValue
      );
    }
    this.refresh(newUrl);
  }

  refresh(url?: JSONApiUrl) {
    if (!url) {
      url = this.state.currentURL;
    }
    const me = this;
    this.setState({ loading: true, currentURL: url });
    fetch(url.toString())
      .then((res) => res.json())
      .then((ajaxData) => {
        if (ajaxData.data !== undefined && ajaxData.data[0] !== undefined) {
          const newState = {
            loading: false,
            data: ajaxData.data,
            links: new LinkList(ajaxData.links),
            activeKey: ajaxData.data[0].field_episode,
            error: null,
          };
          console.debug("NEW PODCAST BROWSER STATE", newState);
          me.setState(newState);
        }
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  }

  getPodcastList() {
    // => Condition : loading
    if (this.state.loading == true) {
      return <Loading />;
    }
    // => Condition : has error
    if (this.state.error instanceof Error) {
      return (
        <Alert>
          <h1>{this.state.error.message}</h1>
        </Alert>
      );
    }
    // => Condition : loaded, no error, but no data
    if (this.state.data.length == 0) {
      return (
        <Alert>
          <h1>No data returned.</h1>
        </Alert>
      );
    } else {
      // => Condition : loaded, no error, data returned
      return this.state?.data?.map((item, key) => {
        const open = this.state.activeKey == item.field_episode;
        return (
          <ErrorBoundary key={key}>
            <PodcastEpisode
              data={item}
              view_mode={"panel"}
              open={open}
              onSelectHandler={this.setActiveKeyHandler}
            />
          </ErrorBoundary>
        );
      });
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col
            xs={12}
            lg={12}
            style={{ position: "relative", textAlign: "right" }}
          >
            <PodcastBrowserNavbar
              links={this.state.links}
              currentURL={this.state.currentURL}
              replaceURLClickHandler={this.replaceUrl}
              changeUrlClickHandler={this.queryPropertyChange}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={12} style={{ position: "relative" }}>
            <Accordion
              id="PodcastAccordion"
              activeKey={this.state.activeKey}
              onSelect={this.setActiveKeyHandler}
            >
              {this.getPodcastList()}
            </Accordion>
          </Col>
        </Row>
        <Row>
          <Paginator links={this.state.links} clickHandler={this.replaceUrl} />
        </Row>
      </Container>
    );
  }
}

export default PodcastBrowser;
