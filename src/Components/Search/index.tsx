import React, { useState, useEffect } from "react";
import { useQueryState } from "use-location-state";

import { Collapse } from "react-bootstrap";
import Select, { components } from "react-select";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";

import { Button, CustomSelect } from "../Shared/Styles";

import SearchFilter from "./SearchFilter";
import SearchToolbar from "./SearchToolbar";
import SearchContent from "./SearchContent";

import { contentAPI, staticData } from "./Backend";
import {
  minAutosuggestCharacters,
  minAutosuggestItems,
  containerClass,
} from "./Search.config";

const FilterToggleButton = styled(Button)`
  width: 100%;
  height: 100%;
`;

const throttle = require("lodash/throttle"),
  debounce = require("lodash/debounce");

export default function Search() {
  // State objects
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useQueryState("keywords", ""); // The actual url parameter as state
  const [queryInputValue, setQueryInputValue] = useState(); // Buffer for what's typed
  const [menuOpen, setMenuOpen] = useState();
  const [viewMode, setViewMode] = useQueryState("view", "");

  // Buffer of values has to be state so it works two-way
  // const [sortby, setSortby] = useState(staticData.sortOptions[0]);
  // const [perpage, setPerpage] = useState(staticData.perpageOptions[0]);
  //
  // const [types, setTypes] = useState([]);
  // const [topics, setTopics] = useState([]);
  // const [centers, setCenters] = useState([]);
  // const [date, setDate] = useState();
  //
  // const { dateOptions, typeOptions } = staticData;
  // const [topicOptions, setTopicOptions] = useState([]);
  // const [centerOptions, setCenterOptions] = useState([]);
  //
  // const [contents, setContents] = useState([]);
  //

  //
  // console.log(searchParams);
  //
  // const filterFields = {
  //   type: {
  //     setter: setTypes,
  //     options: typeOptions,
  //   },
  //   centers: {
  //     setter: setCenters,
  //     options: centerOptions,
  //   },
  //   topics: {
  //     setter: setTopics,
  //     options: topicOptions,
  //   },
  //   date: {
  //     setter: setDate,
  //     options: dateOptions,
  //   },
  //   sortby: {
  //     setter: setSortby,
  //     single: true,
  //   },
  //   perpage: {
  //     setter: setPerpage,
  //     single: true,
  //   },
  // };
  //
  // useEffect(() => {
  //   getTopics();
  //   getCenters();
  //   setQuery(router.query.keywords);
  //   setQueryInput(router.query.keywords);
  // }, [router.query]);
  //

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

  useEffect(() => {
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
  }, [queryInputValue]);

  //
  // useEffect(() => {
  //   setFilterStates();
  //   getFilteredContents(router.query);
  // }, [typeOptions, topicOptions, centerOptions, dateOptions]);
  //
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

  // Capitalize helper
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const getFilteredContents = async (params) => {
    if (!Object.entries(params).length) {
      return;
    }
    let res = await contentAPI.fetchSearchResults(params);
    if (res.status === 200) {
      console.log(res.data.data);
      setContents(res.data.data);
    } else {
      console.log("error", res);
    }
  };

  // const getTopics = async () => {
  //   let res = await contentAPI.fetchTopics();
  //   if (res.status === 200) {
  //     setTopicOptions(makeOptions(res.data.data));
  //   } else {
  //     console.log("error", res);
  //   }
  // };
  //
  // const getCenters = async () => {
  //   let res = await contentAPI.fetchCenters();
  //   if (res.status === 200) {
  //     setCenterOptions(makeOptions(res.data.data));
  //   } else {
  //     console.log("error", res);
  //   }
  // };

  const handleViewChange = (mode) => {
    setView(mode);
  };

  // const handleSortbyChange = (value) => {
  //   setSortBy(value);
  // };
  //
  // const handlePerpageChange = (value) => {
  //   setPerpage(value);
  // };
  //
  // const handleApplyFilter = () => {
  //   let params = router.query;
  //
  //   let typesArray = types?.map((type) => {
  //     return type.value;
  //   });
  //   let topicsArray = topics?.map((topic) => topic.value);
  //   let centersArray = centers?.map((center) => center.value);
  //
  //   typesArray?.length ? (params.type = typesArray) : delete params.type;
  //   delete params.types;
  //
  //   topicsArray?.length ? (params.topics = topicsArray) : delete params.topics;
  //   centersArray?.length
  //     ? (params.centers = centersArray)
  //     : delete params.centers;
  //
  //   if (!date?.value || date.value == "default") {
  //     delete params.date;
  //   } else {
  //     params.date = date.value;
  //   }
  //
  //   if (!sortby || sortby == "default") {
  //     delete params.sortby;
  //   } else {
  //     params.perpage = perpage;
  //   }
  //
  //   if (!perpage || perpage == 20) {
  //     delete params.perpage;
  //   } else {
  //     params.perpage = perpage;
  //   }
  //
  //   delete params._format;
  //
  //   const qs = Object.keys(params)
  //     .map((key) => `${key}=${params[key]}`)
  //     .join("&");
  //
  //   router.push("?" + qs, undefined, { shallow: true });
  //
  //   getFilteredContents(params);
  // };
  //
  // const handleResetFilter = () => {
  //   setTypes([]);
  //   setTopics([]);
  //   setCenters([]);
  //   setDate(dateOptions[0]);
  //
  //   const params = {
  //     keywords: router.query.keywords ?? "",
  //   };
  //
  //   const qs = Object.keys(params)
  //     .map((key) => `${key}=${params[key]}`)
  //     .join("&");
  //
  //   router.push("?" + qs, undefined, { shallow: true });
  //
  //   getFilteredContents(qs);
  // };
  //
  // const setFilterStates = async () => {
  //   console.log("Set Filter State", router.query);
  //
  //   for (const key in router.query) {
  //     const values = router.query[key].split(",");
  //
  //     if (values.length == 0) {
  //       continue;
  //     }
  //
  //     if (filterFields?.hasOwnProperty(key)) {
  //       if (filterFields[key]?.single) {
  //         filterFields[key].setter(values[0]);
  //       } else {
  //         let valueArray = filterFields[key].options.filter((e) => {
  //           if (values.includes(e.value)) {
  //             return e;
  //           }
  //         });
  //         filterFields[key].setter(valueArray);
  //       }
  //     }
  //   }
  // };

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
    console.log("Handle query change from selection", selection);
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
    <div id="search-content" className="my-3">
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
        {viewMode}
        {/* <SearchToolbar
          sortby={sortby}
          perpage={perpage}
          onSortbyChange={handleSortbyChange}
          onPerpageChange={handlePerpageChange}
          grid={grid}
          onViewChange={handleViewChange}
        />
        <SearchFilter
          typeOptions={typeOptions}
          centerOptions={centerOptions}
          topicOptions={topicOptions}
          dateOptions={dateOptions}
          setTypes={setTypes}
          setCenters={setCenters}
          setTopics={setTopics}
          setDate={setDate}
          types={types}
          centers={centers}
          topics={topics}
          date={date}
          onApplyFilter={handleApplyFilter}
          onResetFilter={handleResetFilter}
          open={menuOpen}
        />

        <SearchContent isGrid={grid} contents={contents} /> */}
      </div>
    </div>
  );
}

// TODO: Ensure character # min is respected for autosuggest
// TODO: Initial page // Don't show results until some search is entered
