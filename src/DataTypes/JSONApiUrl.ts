

class JSONApiUrl {

  parsed: URL;
  query: URLSearchParams;

  constructor(incoming: string = null, searchParams: URLSearchParams = null) {
    if (incoming) {
      const split = incoming.split("?");
      var location = new URL(document.location.href.toString());
      this.parsed = new URL(split[0],location.origin);
      // If new search params are provided, use those, else
      // the query from the supplied URL
      this.query = searchParams ?? new URLSearchParams(split[1]);
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
