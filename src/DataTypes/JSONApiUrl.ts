

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

  static newFilter(params: URLSearchParams = null) {
    if (params == null) {
      params = new URLSearchParams(window.location.hash.replace("#", ""));
    }
    console.debug("New Filter", params);
    let newFilter = {};
    for (let [field, values] of params) {
      var fullField = `field_${field}`;
      var splitValues = values.split(",");

      for (const fieldValue of splitValues) {
        const conjunction = "AND";
        const filterKey = `${field}-${fieldValue}`;
        const groupKey = `${filterKey}-group-${conjunction}`;

        const newValue = {};

        // NOTE: Workaround as per https://www.drupal.org/project/drupal/issues/3066202#comment-13181270
        newValue[`filter[${groupKey}][group][conjunction]`] = conjunction;
        newValue[`filter[${filterKey}][condition][value]`] = fieldValue;
        newValue[
          `filter[${filterKey}][condition][path]`
        ] = `${fullField}.machine_name`;
        newValue[`filter[${filterKey}][condition][memberOf]`] = groupKey;

        newFilter = {
          ...newFilter,
          ...newValue
        };
      }
    }
    console.debug("new Filter returned", newFilter);
    return newFilter;
  }

}

export default JSONApiUrl;
