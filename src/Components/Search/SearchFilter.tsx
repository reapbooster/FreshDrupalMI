import PropTypes from "prop-types";
import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import Select from "react-select";
import { Button, CustomSelect } from "../Shared/Styles";

export default function SearchFilter(props) {
  const {
    onResetFilter,
    onApplyFilter,

    open,

    filterFields,
    filterState,
  } = props;

  const [filterBuffer, setFilterBuffer] = useState({ ...filterState });

  const readFieldValues = (optionType) => {
    return filterBuffer[optionType];
  };

  const readFieldOptions = (optionType) => {
    const options = filterFields[optionType].options;
    return options;
  };

  const readFieldTerms = (optionType) => {
    const options = readFieldOptions(optionType);
    const activeValues = readFieldValues(optionType);

    if (!activeValues) return;

    if (filterFields[optionType]?.multiple == true) {
      return options.filter(({ value }) => activeValues.includes(value));
    } else {
      return options.filter(({ value }) => value == activeValues);
    }
  };

  const setFilterParameter = (optionType, values, multiple = true) => {
    let filterStateSnapshot = filterBuffer;

    console.log("setFilterParameter", optionType, values);

    if (!values) {
      return;
    }

    if (multiple == true) {
      filterStateSnapshot[optionType] = values.map((o) => {
        return o.value;
      });
    } else {
      filterStateSnapshot[optionType] = values?.value;
    }

    setFilterBuffer({ ...filterStateSnapshot });
  };

  const handleApplyFilters = () => {
    for (const field in filterBuffer) {
      filterFields[field].setter(filterBuffer[field]);
    }
  };

  function renderFilters() {
    return (
      <div>
        <div className="row my-4">
          <div className=" col-sm-6 col-lg-3">
            <CustomSelect>
              <Select
                isMulti
                closeMenuOnSelect={false}
                value={readFieldTerms("type")}
                placeholder={"Content Types"}
                options={readFieldOptions("type")}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
                onChange={(t) => setFilterParameter("type", t)}
              />
            </CustomSelect>
          </div>
          <div className=" col-sm-6 col-lg-3">
            <CustomSelect>
              <Select
                isMulti
                closeMenuOnSelect={false}
                value={readFieldTerms("centers")}
                placeholder={"Centers and Programs"}
                options={readFieldOptions("centers")}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
                onChange={(t) => setFilterParameter("centers", t)}
              />
            </CustomSelect>
          </div>
          <div className=" col-sm-6 col-lg-3">
            <CustomSelect>
              <Select
                isMulti
                closeMenuOnSelect={false}
                placeholder={"Topics"}
                value={readFieldTerms("topics")}
                options={readFieldOptions("topics")}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
                onChange={(t) => setFilterParameter("topics", t)}
              />
            </CustomSelect>
          </div>
          <div className=" col-sm-6 col-lg-3">
            <CustomSelect>
              <Select
                placeholder={"Refine by Date"}
                value={readFieldTerms("date")}
                options={readFieldOptions("date")}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
                onChange={(o) => setFilterParameter("date", o, false)}
              />
            </CustomSelect>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className=" d-flex justify-content-end">
              <Button
                className="btn btn-orange mr-3"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
              <Button className="btn-text" onClick={onResetFilter}>
                Reset All Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Collapse in={open}>
      <div id="filter-collapse">{renderFilters()}</div>
    </Collapse>
  );
}

SearchFilter.propTypes = {
  filterFields: PropTypes.object,
  filterState: PropTypes.object,
  onApplyFilter: PropTypes.func,
  onResetFilter: PropTypes.func,
  open: PropTypes.bool,
};
