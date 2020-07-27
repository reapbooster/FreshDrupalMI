import React from 'react';
import JSONApiUrl from "./JSONApiUrl";
import MediaVideo from "../components/Media/MediaVideo";
import MediaReport from "../components/Media/MediaReport";
import MediaPodcast from "../components/Media/MediaPodcast";
import Loading from "../components/Loading";
import EventConference from '../components/Events/EventConference';
import TileView from "../components/NodeDisplay/TileView";


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
  node_landing_page = TileView
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

  async getData(query: string = ""): Promise<any> {
    console.debug("get Data called: ", this);
    if (this.url) {
      console.debug("listComponenet calling url: ", this.url.toString());
      return fetch(this.url.toString())
        .catch(this.handleError);
    } else {
      this.handleError(new Error("No URL to make a refresh call"));
    }
  }


  hasItems(): boolean {
    return (!!this.state.items.length || 0);
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

  refresh() : Promise<any> {
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

  render() {
    return (
      <>
        {this.items}
      </>
    );
  }

  get url() : JSONApiUrl {
    return this._url;
  }

  set url(url) {
    if (typeof url == "string") {
      this._url = new JSONApiUrl(url);
    }
    if (url instanceof JSONApiUrl) {
      this._url = url;
    }
  }

}




export { ListComponentProps as default, ListComponentPropsInterface };
