import React from 'react';
import JSONApiUrl from "./JSONApiUrl";
import { CardColumns, Row } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import MediaVideo from "../components/Media/MediaVideo";
import MediaReport from "../components/Media/MediaReport";
import MediaPodcast from "../components/Media/MediaPodcast";
import Loading from "../components/Loading";
import EventConference from '../components/Events/EventConference';
import TileView from "../components/NodeDisplay/TileView";
import EventSummit from "../components/Events/EventSummit";
import EventMeeting from "../components/Events/EventMeeting";
import NodeOpportunityCard from "../components/NodeDisplay/NodeOpportunityCard";

interface ListComponentPropsInterface {
  id: string;
  url: JSONApiUrl;
  error?: Error;
  onSelectHandler?: any;
  view_mode?: string;
  items?: Array<any>;
  entityTypeId: string;
  browser: boolean;
  key: number;
}

interface ListComponentState {
  items: Array<any>;
  loaded: boolean;
}


enum ListItemComponents {
  media_video = MediaVideo,
  media_report = MediaReport,
  media_podcast = MediaPodcast,
  event_conference = EventConference,
  event_summit = EventSummit,
  event_meeting = EventMeeting,
  node_landing_page = TileView,
  node_opportunity = NodeOpportunityCard,
}




class ListComponentProps extends React.Component <ListComponentPropsInterface, ListComponentState> {

  id: string;
  _url: JSONApiUrl;
  key: number;
  error?: Error;
  onSelectHandler: any;
  view_mode: string;

  constructor(props: ListComponentPropsInterface) {
    super(props);
    this.state = {
      items: (props.items || [])
    };
    this.refresh = this.refresh.bind(this);
    this.getData = this.getData.bind(this);
    this.toObject = this.toObject.bind(this);
    this.hasItems = this.hasItems.bind(this);
    this.handleError = this.handleError.bind(this);
    var remaining = Object.assign({}, props);
    delete remaining.items;
    Object.assign(this, remaining);
  }

  toObject() : ListComponentPropsInterface {
    return {
      entityTypeId: this.props.entityTypeId,
      id: this.id,
      url: this.url.toString(),
      error: this.error,
      onSelectHandler: this.onSelectHandler,
      view_mode: this.view_mode,
      key: this.key,
    };
  }

  async getData(url: JSONApiUrl = null): Promise<any> {
    console.debug("get Data called: ", this);
    if (url !== null) {
      this.url = url;
    }
    if (this.url) {
      console.debug("listComponenet calling url: ", this.url.toString());
      return fetch(this.url.toString())
        .catch(this.handleError);
    } else {
      this.handleError(new Error("No URL to make a refresh call"));
    }
  }


  hasItems(): boolean {
    return (!!this.state?.items?.length || 0);
  }

  handleError(err) {
    this.error = err;
    console.log("Entity Component Props has encountered an error with fetching the items:", err);
  }

  get loaded() {
    return (this.state.loaded || this.hasItems() );
  }

  get label() {
    return this.id;
  }

  refresh(evt: CustomEvent = null) : Promise<any> {
    var toMutate = this.url.clone();
    if (evt) {
      evt.stopImmediatePropagation();
    }
    if (evt?.detail) {
      console.log("EVENT", evt);
      for (var f in evt.detail.filter) {
        const key = `filter[${f}]`;
        if (toMutate.query.has(key)) {
          console.debug("changing value of query param: ", toMutate.query)
          toMutate.query.set(key, evt.detail.filter[f])
        } else {
          console.debug("Appending query param: ", toMutate.query)
          toMutate.query.append(key, evt.detail.filter[f]);
        }
      }
      this._url = toMutate;
      console.debug("REFRESH", toMutate.toString());
    }
    var self = this;
    return this.getData()
      .then(res => res.json())
      .then(ajaxData => {
        self.setState({ items: ajaxData.data });
      });
  }

  get items() {
    if (this.hasItems()) {
      console.log("rendering list component items: ", this.state.items);
      return this.state.items.map((item, key: number) => {
        const Component = ListItemComponents[item.type.replace("--", "_")];
        if (Component == undefined) {
          throw new Error("List Component Type not defined: ".concat(item.type.replace("--", "_")));
        }
        return <Component {...item} key={key} />
      });
    } else {
      this.refresh();
      return <Loading />;
    }
  }

  componentDidMount() {
    document.getElementsByClassName('philanthropy-hub-root').item(0).addEventListener("refresh", this.refresh);
  }

  render() {
    return (
      <>
        <Row>
          <CardColumns className={"philanthropy-hub-root"}>
              {this.items}
          </CardColumns>
        </Row>
      </>
    );
  }

  get url() : JSONApiUrl {
    return this._url;
  }

  set url(url) {
    if (!url instanceof JSONApiUrl) {
      url = new JSONApiUrl(url);
    }
    this._url = url;
  }

}




export { ListComponentProps as default, ListComponentPropsInterface };
