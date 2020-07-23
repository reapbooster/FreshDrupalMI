import React from 'react';
import JSONApiUrl from "./JSONApiUrl";
import MediaVideo from "../components/Media/MediaVideo";
import MediaReport from "../components/Media/MediaReport";
import MediaPodcast from "../components/Media/MediaPodcast";
import Loading from "../components/Loading";
import EventConference from '../components/Events/EventConference';


interface ListComponentPropsInterface {
  id: string;
  url: JSONApiUrl;
  error?: Error;
  onSelectHandler?: any;
  view_mode?: string;
  items?: Array<any>;
  entityTypeId: string;
}

interface ListComponentState {
  items: Array<any>;
}


enum ListItemComponents {
  media_video = MediaVideo,
  media_report = MediaReport,
  media_podcast = MediaPodcast,
  event_conference = EventConference,
}

class ListComponentProps extends React.Component <ListComponentPropsInterface, ListComponentState> {

  id: string;
  _url: JSONApiUrl;
  key: number;
  error?: Error;
  onSelectHandler: any;

  constructor(props: ListComponentPropsInterface) {
    super(props);
    this.state = {
      items: (props.items || []),
    };
    Object.assign(this, props);
  }

  toObject() : ListComponentPropsInterface {
    return {
      entityTypeId: this.props.entityTypeId,
      id: this.id,
      url: this.url.toString(),
      error: this.error,
      onSelectHandler: this.onSelectHandler,
      view_mode: this.view_mode,
    };
  }

  async getData(query: string = ""): Promise<any> {
    console.log("get Data called: ", this);
    if (this.url) {
      console.log("listComponenet calling url: ", this.url.toString());
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
    return this.hasItems();
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
      return this.state.items.map((item, key: number) => {
        const Component = ListItemComponents[item.type.replace("--", "_")];
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
