import React from 'react';
import JSONApiUrl from "./JSONApiUrl";
import { CardColumns, Row } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import MediaVideo from "../components/Media/MediaVideo";
import MediaReport from "../components/Media/MediaReport";
import MediaPodcast from "../components/Media/MediaPodcast";
import Loading from "../components/Loading";
import EventConference from '../components/Event/EventConference';
import TileView from "../components/NodeDisplay/TileView";
import EventSummit from "../components/Event/EventSummit";
import EventMeeting from "../components/Event/EventMeeting";
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
    this.abortController = new AbortController();

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
      return fetch(this.url.toString(), { signal: this.abortController.signal })
        .catch(this.handleError);
    } else {
      this.handleError(new Error("No URL to make a refresh call"));
      resolve([]);
    }
  }


  hasItems(): boolean {
    return (!!this.state?.items?.length || 0);
  }

  handleError(err) {
    this.error = err;

    if(err.name === 'AbortError') {
      console.log(this.url);
    }
    console.log("Entity Component Props has encountered an error with fetching the items:", err);
  }

  get loaded() {
    return (this.state.loaded || this.hasItems() );
  }

  get label() {
    return this.id;
  }

  refresh(evt: CustomEvent = null) : Promise<any> {
    if (evt) {
      evt.stopImmediatePropagation();
      evt.preventDefault();
    }

    var toMutate = this.url.clone();
    if (evt?.detail) {

      // Flag keys for deletion
      let clearKeys = [];

      // Do not touch these URL params
      const blacklist = ['jsonapi_include', 'include'];

      for(const key of toMutate.query.keys()) {
        if( blacklist.includes(key) ) { continue; }
        if( !evt.detail.filter.hasOwnProperty(key) || !evt.detail.filter[key] ) {
            clearKeys.push(key);
        }
      };

      // If filter passed, update URL parameters
      if (evt?.detail?.filter) {

        for (var f in evt.detail.filter) {

          // Sensible default filter if not a complex filter key
          const key = f.includes('filter') ? f : `filter[${f}]`;

          if (toMutate.query.has(key)) {
            console.debug("changing value of query param: ", toMutate.query)
            toMutate.query.set(key, evt.detail.filter[f])
          } else {
            console.debug("Appending query param: ", toMutate.query)
            toMutate.query.append(key, evt.detail.filter[f]);
          }
        }
      }

      // Clear flagged keys
      clearKeys?.map( key => {
        console.debug('Clear URL key', key);
        toMutate.query.delete(key);
      });

      // Set URL if passed
      if (evt?.detail?.url) {
        toMutate = evt.detail.url;
      }

      this._url = toMutate;
    }

    if( this?.url && ( this.url.toString() !== toMutate.toString() ) ) {
      console.log('Fetch URL changed, abort current request');
      this.abortController.abort();
    }

    return this.loadChain();
  }

  loadChain() : Promise<any> {
    console.log("Loading an API page");

    var self = this;

    return fetch(this._url.toString(), { signal: this.abortController.signal })
      .then(res => res.json())
      .then(ajaxData => {

        // Result is empty
        if(!ajaxData?.data) { return; }

        // Check for additional pages on the API
        const pageCount = 50;
        let newItems = ajaxData.data;

        if(ajaxData?.links?.next?.href && ajaxData?.meta?.count > pageCount) {

          // Prepare URLs for concurrent requests

          const total = ajaxData.meta.count;
          let pageUrl = new JSONApiUrl(ajaxData.links.next.href);
          let pages = [ ajaxData.links.next.href ];
          let offset = pageCount;

          while( offset + pageCount < total ) {
            offset += pageCount;
            pageUrl.query.set('page[offset]', offset);
            pages.push( pageUrl.toString());
          }

          // console.log('All request pages', pages);

          Promise.all( pages.map( url => fetch(url, { signal: this.abortController.signal }) ) )
            .then( results => {
              return Promise.all(results.map( response => {
            		return response.json();
            	}));
            }).then( allData => {

              allData.map( data => {
                if(data?.data?.length) {
                    newItems = newItems.concat(data.data);
                }
              });

              self.setState({ items: newItems });

            }).catch(function (error) {
            	console.debug('Error reading API pages', error);
            });


        }
        else {
          self.setState({ items: newItems });
        }

      })
      .catch(e => {
          console.warn(`Fetch 1 error: ${e.message}`);
      });
  }


  get items() {
    if (this.hasItems()) {
      // console.log("rendering list component items: ", this.state.items);
      return this.state.items.map((item, key: number) => {
        const Component = ListItemComponents[item.type.replace("--", "_")];
        if (Component == undefined) {
          throw new Error("List Component Type not defined: ".concat(item.type.replace("--", "_")));
        }
        return <Component {...item} key={key} />
      });
    } else {
      return (
        <div>
          <h1>No results for this combination of filters.</h1>
        </div>
      );
    }
  }

  componentDidMount() {
    document.getElementsByClassName('list-component').item(0).addEventListener("refresh", this.refresh);
    this.refresh();
  }

  render() {
    return (
      <Row>
        <CardColumns className={"list-component"}>
            {this.items}
        </CardColumns>
      </Row>
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
