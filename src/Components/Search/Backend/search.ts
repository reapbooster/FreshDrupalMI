import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import moment from "moment";

// TODO: Conditional
const apiPath = window.location.host.includes("localhost")
  ? "http://localhost:3001"
  : "/";

// Value cache
let centers, topics;

const fetchSuggestions = async (params) => {
  try {
    params._format = "json";

    console.log("autosuggest backend", params);
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

    params._format = "json";

    // api/v1.0/search?_format=json&keywords=covid
    // Sort
    // &sort_by=search_api_relevance&sort_order=DESC
    // Sort by date, relevance, name, ***type (does not exist yet)
    // http://docker.milkeninstitute.org:8080/admin/structure/views/view/solr_search
    // Search: Relevance (Exposed)
    // Index freshdrupal_live: Label (Exposed)
    // Index freshdrupal_live: Aggregated field Published (Exposed)

    // date &aggregated_field_published_op=between&aggregated_field_published[min]=2021-01-01&aggregated_field_published[max]=2021-01-03
    // type (type=)
    // field_centers
    // field_topics

    // http://docker.milkeninstitute.org:8080/api/v1.0/search?_format=json&field_centers=211

    // TODO: Pagination

    if (params?.perpage) {
      // apiParams.addPageLimit(params?.perpage);
    }

    if (params?.date) {
      const parsedDate = params?.date.split("_");
      const date = moment().subtract(...parsedDate);
      // apiParams.addFilter("created", date.format("YYYY-MM-DD"), ">=");
    }

    // const urlencodedQueryString = apiParams.getQueryString();
    // const queryString = apiParams.getQueryString({ encode: false });
    // console.log("query string", queryString, urlencodedQueryString);

    console.log("fetching");

    const response = await fetch(
      `${apiPath}/api/v1.0/search?` + new URLSearchParams(params).toString()
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
    const response = await fetch(
      `${apiPath}/jsonapi/taxonomy_term/milken_tags`
    );

    return await response.json();
  } catch (err) {
    return err;
  }
};

const fetchCenters = async () => {
  try {
    const response = await fetch(`${apiPath}/jsonapi/taxonomy_term/centers`);
    return await response.json();
  } catch (err) {
    return err;
  }
};

// const fetchCentersData = async () => {
//   try {
//     const response = await fetch(`/jsonapi/centers_data`);
//     return await response.json();
//   } catch (err) {
//     return err;
//   }
// };

export {
  fetchSearchResults,
  fetchTypes,
  fetchTopics,
  fetchCenters,
  // fetchCentersData,
  fetchSuggestions,
};
