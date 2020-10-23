import { EntityInterface } from "./Entity";
import { LinkListInterface } from "./LinkList";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";

export interface JsonApiListResponse {
  data: Array<EntityInterface>;
  links: LinkListInterface;
}

export interface JSONApiContentResponse {
  data: EntityInterface;
  links: LinkListInterface;
}

export class JSONApiUrl {
  parsed: URL;

  query: URLSearchParams;

  constructor(incoming: string = null, searchParams: URLSearchParams = null) {
    console.log("jsonapiURL: Incoming", incoming);
    if (incoming) {
      // This is to deal with relative URL's that dont' have a pathl
      const location = new URL(document.location.href.toString());
      this.parsed = new URL(incoming, location.origin.toString());
      // If new search params are provided, use those, else
      // the query from the supplied URL.
      this.query = new DrupalJsonApiParams();
      this.query.initializeWithQueryString(
        searchParams ?? this.parsed.searchParams.toString()
      );
    }
    console.debug("JsonapiURL: constructor", this);
  }

  toString(): string {
    return this?.parsed?.toString().concat("?", this?.query?.toString());
  }

  clone() {
    return Object.assign(new JSONApiUrl(), this);
  }
}

export default JSONApiUrl;
