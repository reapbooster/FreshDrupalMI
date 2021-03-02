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
    // params._format = "json";

    const response = await fetch(
      `/api/v1.0/search?` + new URLSearchParams(params)
    );
    return await response.json();
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
