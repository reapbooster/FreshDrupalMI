import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import moment from "moment";

const apiPath = "http://localhost:3001";

// Value cache
let centers, topics;

const fetchSuggestions = async (params) => {
  try {
    params._format = "json";

    console.log("autosuggest backend", params);
    const response = await fetch(
      `/api/v1.0/autocomplete?` + new URLSearchParams(params)
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

    const apiParams = new DrupalJsonApiParams();

    if (params?.perpage) {
      apiParams.addPageLimit(params?.perpage);
    }

    if (params?.date) {
      const parsedDate = params?.date.split("_");
      const date = moment().subtract(...parsedDate);
      apiParams.addFilter("created", date.format("YYYY-MM-DD"), ">=");
    }

    // const urlencodedQueryString = apiParams.getQueryString();
    const queryString = apiParams.getQueryString({ encode: false });
    // console.log("query string", queryString, urlencodedQueryString);

    const response = await fetch(
      `/api/v1.0/search?_format=json&keywords=${params?.keywords}&` +
        queryString
    );
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
    const response = await fetch(`/jsonapi/taxonomy_term/milken_tags`);

    return await response.json();
  } catch (err) {
    return err;
  }
};

const fetchCenters = async () => {
  try {
    const response = await fetch(`/jsonapi/taxonomy_term/centers`);
    return await response.json();
  } catch (err) {
    return err;
  }
};

const fetchCentersData = async () => {
  try {
    const response = await fetch(`/jsonapi/centers_data`);
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
