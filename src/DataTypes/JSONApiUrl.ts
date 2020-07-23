
import Url from 'locutus/php/url';
import { query } from 'express';
import { IncomingMessage } from 'http';
import Querystring , { ParsedUrlQuery } from 'querystring';
import { hostname } from 'os';

class JSONApiUrl {

  _scheme:     string;
  _host:       string;
  user?:       string;
  pass?:       string;
  _path:       Array<string>;
  _query:      ParsedUrlQuery;
  _fragment:   string;

  constructor(incoming: string) {
    Object.assign(this, Url.parse_url(incoming));
  }


  toString(): string {
    return `${this.scheme}${this.auth}${this.host}${this.path}${this.query}`;
  }


  // SCHEME

  get scheme() {
    if (this._host !== undefined) {
      return (this._scheme || "").concat("://");
    }
    return "";
  }

  set scheme(incoming: string) {
    this._scheme = incoming;
  }


  // USERNAME/PASSWORD combo

  get auth() : string {
    if (this.user && this.password) {
      return `${this.user}:{this.pass}@`
    }
    return "";
  }


  // HOST

  get host() {
    return (this._host || "").concat("/");
  }

  set host(incoming: string) {
    if (incoming != "/") {
      this._host = incoming;
    }
  }

  // PATH

  get path() {
    return "jsonapi/".concat(this._path.join("/"));
  }

  set path(incoming: string) {
    if (typeof incoming == "string") {
      this._path = incoming.replace("/jsonapi/", "").split("/");
    }
  }

  get pathArray() {
    return this._path
  }

  // QUERY

  get query() {
    return "?".concat(Querystring.stringify(this._query));
  }

  set query(incoming: string) {
    if (typeof incoming == "string") {
      this._query = Querystring.parse(incoming);
    }
  }

  // FRAGMENT

  get fragment():string {
    return this._fragment || "";
  }

  set fragment(incoming: string) {
    this._fragment = incoming.replace('#', "");
  }

}

export default JSONApiUrl;
