
import React from 'react';
import {Col, Grid, Navbar, Row, Nav, NavItem, PanelGroup, Panel, Alert} from 'react-bootstrap';
import httpBuildQuery from 'http-build-query';
import PodcastEpisode, { PodcastEpisodeProps } from "../PodcastEpisode";
import Loading from "../Loading";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortNumericDownAlt, faSortNumericDown } from '@fortawesome/free-solid-svg-icons'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

class PodcastSortFilter {
  direction: true;
  path: "created";

  toObject() {
    return {
      jsonapi_include: true,
      sort: {
        "sort-name-episode": {
          direction: this.direction ? "ASC":"DESC",
          path: "field_episode"
        }
      }
    }
  }

  invert() {
    this.direction = !this.direction
  }

}

interface PodcastBrowserState {
  loading: boolean;
  activeKey: number;
  data: Array<any>;
  links: Array<any>;
  sortFilter: PodcastSortFilter;
  error?: Error;
}

class PodcastBrowser extends React.Component<any, PodcastBrowserState> {

  constructor(props) {
    super(props);
    this.setActiveKeyHandler = this.setActiveKeyHandler.bind(this);
    this.resortHandler = this.resortHandler.bind(this);
    this.refresh = this.refresh.bind(this);
    this.getPodcastList = this.getPodcastList.bind(this);
    this.state = {
      loading: false,
      activeKey: 0,
      data: [],
      links: [],
      sortFilter: new PodcastSortFilter(),
      error: null,
    };
  }

  setActiveKeyHandler(eventKey) {
    console.log("Setting Active Key: ", eventKey);
    this.setState({ activeKey: eventKey })
  }

  resortHandler(){
    this.state.sortFilter.invert();
    console.log("sort filter", this.state.sortFilter);
    this.refresh();
  }

  componentDidMount() {
    const me = this;
    // sort by CREATED DESC (newest first)
    this.refresh();
  }


  refresh() {
    const queryString = httpBuildQuery(this.state.sortFilter.toObject());
    const me = this;
    this.setState({loading: true});
    fetch('/jsonapi/paragraph/podcast_episode'.concat("?", queryString ))
      .then(res => res.json())
      .then((ajaxData) => {
        if (ajaxData.data !== undefined && ajaxData.data[0] !== undefined) {
          var newState = {
            loading: false,
            data: ajaxData.data,
            links: ajaxData.links,
            activeKey: ajaxData.data[0].field_episode,
            error: null,
          };
          console.log("NEW PODCAST BROWSER STATE", newState);
          me.setState(newState);
        }
      }).catch((err) => {
        this.setState({
          error: err,
        })
    });
  }
  render() {
    const icon = (this.state.sortFilter.direction == true) ? faSortDown : faSortUp;
    const sortPhrase = (this.state.sortFilter.direction == true) ? "Sort Descending" : "Sort Ascending";
    return (
      <Grid>
        <Row>
          <Col xs={12} lg={12} style={{position: "relative", textAlign: "right", }}>
            <span
              onClick={this.resortHandler}
              style={{
                position: "relative",
                display: "inline-block",
                fontSize: "1em",
                fontWeight: "bold",
                textTransform: "uppercase",
                backgroundColor: "#FF6633",
                color: "#FFF",
                cursor: "pointer",
                margin: "1em 0",
                padding: "0.5em 0.75em 0.25em 0.75em",
              }}
            >
              <span>{sortPhrase} </span>
              <FontAwesomeIcon
                icon={icon}
                size={"2x"}
                style={{
                  fontSize: "1em",
                  fontWeight: "lighter",
                }}
              >
                <h5>RE-SORT</h5>
              </FontAwesomeIcon>
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={12} style={{position: "relative"}}>
            <PanelGroup
              accordion
              id="PodcastAccordion"
              activeKey={this.state.activeKey}
              onSelect={this.setActiveKeyHandler}
            >
              {this.getPodcastList()}
            </PanelGroup>
          </Col>
        </Row>
      </Grid>
    );
  }



  getPodcastList() {
    // => Condition : loading
    if (this.state.loading == true) {
      return ( <Loading/> );
    }
    // => Condition : has error
    if (this.state.error instanceof Error) {
      return (
        <Alert>
          <h1>{this.state.error.message}</h1>
        </Alert>
      )
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
      return this.state?.data?.map(
        (item, key) => {
          const open = ( this.state.activeKey == item.field_episode )
          const ecp = new EntityComponentProps(item)
          ecp.key = key;
          return (
            <PodcastEpisode
              key={key}
              view_mode={"panel"}
              open={open}
              entityComponentProps={ecp}
              field_episode={item.field_episode}
              field_summary={item.field_summary}
              onSelectHandler={this.setActiveKeyHandler}
            />
          );
        });
    }
  }

}


export default PodcastBrowser;
