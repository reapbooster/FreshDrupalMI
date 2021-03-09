import React, { useState, useEffect } from "react";
import { useQueryState } from "use-location-state";

import { Collapse } from "react-bootstrap";
import Select, { components } from "react-select";
import { AiOutlineSearch } from "react-icons/ai";

import styled from "styled-components";

import { Button, CustomSelect, theme } from "../Shared/Styles";

import SearchFilter from "./SearchFilter";
import SearchToolbar from "./SearchToolbar";
import SearchResults from "./SearchResults";

const SearchWrapper = styled.div`
  .btn,
  .card,
  select {
    border-radius: 0;
  }

  .content-card {
    display: flex;
    flex-direction: column;
    height: 100%;

    .content-image-wrapper {
      position: relative;
      img {
        width: 100%;
        object-fit: cover;
        object-position: 0 25%;
        height: 200px;
      }
      span {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 8px 16px;
        background: ${theme.colors.secondary};
        color: white;
      }
    }
    .content-text-wrapper {
      padding: 20px;
    }

    h5 a {
      color: #000;
      text-decoration: none;
    }
  }

  #filter-collapse {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 5;
    background: #ffffff;
    padding-left: 15px;
    padding-right: 15px;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
  }
`;

const throttle = require("lodash/throttle"),
  debounce = require("lodash/debounce");

import { contentAPI, staticData } from "./Backend";
import {
  minAutosuggestCharacters,
  minAutosuggestItems,
  containerClass,
} from "./Search.config";

import { sortOptions, perpageOptions } from "./Backend/static";

const FilterToggleButton = styled(Button)`
  width: 100%;
  height: 100%;
`;

function getCurrentLocation() {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash.replace("#"),
  };
}

function getHashParams() {
  var hash = window.location.hash.substring(1);
  var params = {};
  hash.split("&").map((hk) => {
    let temp = hk.split("=");
    params[temp[0]] = temp[1];
  });
  return params;
}

export default function Search() {
  const searchParams = new URLSearchParams(window.location.search);

  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useQueryState("keywords", ""); // The actual url parameter as state
  const [queryInputValue, setQueryInputValue] = useState(); // Buffer for what's typed
  const [menuOpen, setMenuOpen] = useState();

  // URL-State parameters
  const [sortby, setSortby] = useQueryState("sortby", "");
  const [perpage, setPerpage] = useQueryState("perpage", 20);
  const [type, setType] = useQueryState("type", []);
  const [topics, setTopics] = useQueryState("topics", []);
  const [centers, setCenters] = useQueryState("centers", []);
  const [date, setDate] = useQueryState("date", "");
  const [viewMode, setViewMode] = useQueryState("view", "grid");

  const { dateOptions, typeOptions } = staticData;
  const [topicOptions, setTopicOptions] = useState([]);
  const [centerOptions, setCenterOptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [filterState, setFilterState] = useState({
    type,
    centers,
    topics,
    date,
    sortby,
    perpage,
  });

  const filterFields = {
    type: {
      setter: setType,
      options: typeOptions,
      multiple: true,
    },
    centers: {
      setter: setCenters,
      options: centerOptions,
      multiple: true,
    },
    topics: {
      setter: setTopics,
      options: topicOptions,
      multiple: true,
    },
    date: {
      setter: setDate,
      options: dateOptions,
    },
    sortby: {
      setter: setSortby,
      options: sortOptions,
    },
    perpage: {
      setter: setPerpage,
      options: perpageOptions,
    },
  };

  useEffect(() => {
    console.log("useEffect, normal");
    getTopics();
    getCenters();
    locationChanged();
  }, []);

  const locationChanged = debounce(
    () => {
      console.log("locationChanged");
      const keywords = getHashParams()?.keywords;
      if (keywords) {
        setQuery(keywords);
        setQueryInputValue(keywords);
      }
      fetchSearchResults();
    },
    250,
    { trailing: true }
  );

  useEffect(() => {
    window.addEventListener("hashchange", locationChanged, false);
    return () => window.removeEventListener("hashchange", locationChanged);
  }, [getCurrentLocation()]);

  // Throttle/Debounce as User Types
  let throttled = {};

  // Getter for suggestions
  const getSuggestions = async () => {
    console.debug("Query input value changed", queryInputValue);

    let suggestions = await contentAPI.fetchSuggestions({
      name: queryInputValue,
    });

    if (suggestions?.length > 3) {
      setSuggestions(
        suggestions.map((e) => {
          return { label: e.name, value: e.name };
        })
      );
    } else {
      setSuggestions([]);
    }
  };

  useEffect(
    debounce(() => {
      // TODO: Debounce/Throttle this

      if (
        !!!queryInputValue ||
        queryInputValue?.length < minAutosuggestCharacters
      ) {
        setSuggestions([]);
        return;
      }

      // typeof throttled?.cancel === "function" && throttled.cancel();

      getSuggestions();

      // if (queryInputValue?.length < 5) {
      //   throttled = throttle(cfn, 500);
      // } else {
      //   throttled = debounce(cfn, 500);
      // }
    }, 250),
    [queryInputValue]
  );

  // useEffect(() => {
  //   console.log("filter state changed", filterState);
  // }, [type, topics, centers, date, sortby, perpage]);

  // // Helper to make option array
  // const makeOptions = (options) => {
  //   return options.map((option) => {
  //     if (typeof option === "string") {
  //       return { label: option, value: option };
  //     } else {
  //       return {
  //         value: option?.attributes?.machine_name,
  //         label: option?.attributes?.name,
  //       };
  //     }
  //   });
  // };

  const makeOptions = (items) => {
    if (!items) return;

    return items.map((o) => {
      return {
        value: o?.attributes?.machine_name ?? o?.id,
        label: o?.attributes?.name ?? "",
      };
    });
  };

  const fetchSearchResults = async () => {
    const params = getHashParams();
    if (!params || Object.entries(params).length === 0) {
      return;
    }
    let res = await contentAPI.fetchSearchResults(params);
    console.log(res);
    setSearchResults(res);
  };

  const getTopics = async () => {
    let res = await contentAPI.fetchTopics();
    const options = setTopicOptions(makeOptions(res?.data));
  };

  const getCenters = async () => {
    let res = await contentAPI.fetchCenters();
    setCenterOptions(makeOptions(res?.data));
  };

  //
  // Autosuggest & methods
  //

  // Pressing Enter
  const handleAutosuggestKeypress = (e) => {
    if (e.keyCode == 13) {
      handleAutosuggestCascade(e.target.defaultValue);
    }
  };

  const handleAutosuggestCascade = (newQuery) => {
    setQuery(newQuery);
    setQueryInputValue(newQuery);
    setSuggestions([]);
  };

  const handleAutosuggestQueryChange = (selection) => {
    // console.log("Handle query change from selection", selection);
    if (selection?.label) {
      handleAutosuggestCascade(selection.label);
    }
  };

  // Necessary to
  const handleAutosuggestInputChange = (inputValue, { action }) => {
    // console.log("setValue", inputValue, action);

    if (action === "input-change") {
      setQueryInputValue(inputValue);
    }
    // if (action === "set-value") {
    // }
  };

  // Search React-Select

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <AiOutlineSearch size={30} />
        </components.DropdownIndicator>
      )
    );
  };

  return (
    <SearchWrapper id="search-content" className="my-3">
      <div className={containerClass}>
        <div className="row">
          <div className="col-md-8 col-lg-9">
            <CustomSelect>
              <Select
                value={false}
                inputValue={queryInputValue}
                components={{
                  DropdownIndicator: DropdownIndicator,
                  IndicatorSeparator: () => null,
                }}
                blurInputOnSelect={false}
                closeMenuOnSelect={false}
                onInputChange={handleAutosuggestInputChange}
                onChange={handleAutosuggestQueryChange}
                placeholder={"Search"}
                noOptionsMessage={() => null}
                options={suggestions}
                defaultOptions={[]}
                indicatorsSeparator={false}
                onKeyDown={handleAutosuggestKeypress}
              />
            </CustomSelect>
          </div>
          <div className="col-md">
            <FilterToggleButton
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn btn-orange"
              aria-controls="filter-collapse"
              aria-expanded={menuOpen}
            >
              {menuOpen ? "Hide advanced filters" : "Show advanced filters"}
            </FilterToggleButton>
          </div>
        </div>
      </div>

      <div className={containerClass}>
        <SearchToolbar
          sortby={sortby}
          perpage={perpage}
          viewMode={viewMode}
          setSortby={setSortby}
          setPerpage={setPerpage}
          setViewMode={setViewMode}
        />
        <SearchFilter
          filterFields={filterFields}
          filterState={filterState}
          open={menuOpen}
        />

        <SearchResults isGrid={viewMode != "list"} contents={searchResults} />
      </div>
    </SearchWrapper>
  );
}

// TODO: Ensure character # min is respected for autosuggest
// TODO: Initial page // Don't show results until some search is entered
