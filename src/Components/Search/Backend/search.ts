import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import moment from "moment";

const apiPath = "http://localhost:3001";

// Value cache
let centers, topics;

const fetchSuggestions = async (params) => {
  try {
    params._format = "json";

    console.debug("autosuggest params", params);
    const response = await fetch(
      `${apiPath}/api/v1.0/autocomplete?` + new URLSearchParams(params)
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

const fetchSearchResults = async (params) => {
  try {
    console.log("params api, raw", params);

    if (!params?.keywords) {
      return;
    }

    const apiParams = {
      _format: "json",
      keywords: params.keywords,
    };

    // & keywords=covid
    // & sort_by=search_api_relevance
    // & sort_order=DESC
    // & aggregated_field_published_op=between
    // & aggregated_field_published[min]=2021-01-01
    // & aggregated_field_published[max]=2021-03-11

    // TODO: Page limit
    // apiParams["page[limit]"] = params?.perpage ?? 20;

    if (params?.date) {
      const parsedDate = params?.date.split("_");

      const today = moment().format("YYYY-MM-DD"),
        date = moment().subtract(...parsedDate);

      apiParams["aggregated_field_published[min]"] = date;
      apiParams["aggregated_field_published[max]"] = today;
      apiParams["aggregated_field_published_op"] = "between";
    }

    let sortFieldFix = "search_api_relevance",
      sortOrderFix = "DESC";

    if (params?.sortby) {
      const sortPairs = {
        created: { sortField: "aggregated_field_published", sortOrder: "DESC" },
        title: { sortField: "label", sortOrder: "ASC" },
        type: { sortField: "bundle", sortOrder: "ASC" },
      };
      let { sortField, sortOrder } = sortPairs[params.sortby];
      sortFieldFix = sortField;
      sortOrderFix = sortOrder;
    }

    apiParams.sort_by = sortFieldFix;
    apiParams.sort_order = sortOrderFix;

    // const urlencodedQueryString = apiParams.getQueryString();
    // const queryString = apiParams.getQueryString({ encode: false });
    // console.log("query string", queryString, urlencodedQueryString);

    // console.log(apiParams, params);

    var apiUrl = new URL(`${apiPath}/api/v1.0/search`);
    Object.keys(apiParams).forEach((key) =>
      apiUrl.searchParams.append(key, apiParams[key])
    );

    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    return err;
  }
};

const fetchTypes = async () => {
  return new Promise((resolve) => {
    resolve([
      "Articles",
      "Centers",
      "People",
      "Podcast",
      "Programs",
      "Reports",
    ]);
  });
  // try {
  //     return await axios.get(`/types`);
  // } catch (err) {
  //     return err;
  // }
};

const fetchTopics = async () => {
  try {
    if (!topics) {
      const response = await fetch(
        `${apiPath}/jsonapi/taxonomy_term/milken_tags`
      );
      topics = await response.json();
    }

    return topics;
  } catch (err) {
    return err;
  }
};

const fetchCenters = async () => {
  try {
    if (!centers) {
      const response = await fetch(`${apiPath}/jsonapi/taxonomy_term/centers`);
      centers = await response.json();
    }
    return centers;
  } catch (err) {
    return err;
  }
};

const fetchCentersData = async () => {
  try {
    const response = await fetch(`${apiPath}/jsonapi/centers_data`);
    return await response.json();
  } catch (err) {
    return err;
  }
};

export {
  fetchSearchResults,
  fetchTypes,
  fetchTopics,
  fetchCenters,
  fetchCentersData,
  fetchSuggestions,
};
