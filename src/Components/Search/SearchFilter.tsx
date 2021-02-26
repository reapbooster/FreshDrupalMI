import PropTypes from "prop-types";
import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import Select from "react-select";
import { Button, CustomSelect } from "../Shared/Styles";

export default function SearchFilter(props) {
  const {
    types,
    setTypes,
    typeOptions,

    centers,
    setCenters,
    centerOptions,

    topics,
    setTopics,
    topicOptions,

    date,
    setDate,
    dateOptions,

    onApplyFilter,
    onResetFilter,

    open,
  } = props;

  function renderFilters() {
    return (
      <div>
        <div className="row my-4">
          <div className=" col-sm-6 col-lg-3">
            <CustomSelect>
              <Select
                isMulti
                value={types}
                placeholder={"Content Types"}
                options={typeOptions}
                onChange={(o) => setTypes(o)}
              />
            </CustomSelect>
          </div>
          <div className=" col-sm-6 col-lg-3">
            <CustomSelect>
              <Select
                isMulti
                value={centers}
                placeholder={"Centers and Programs"}
                options={centerOptions}
                onChange={(o) => setCenters(o)}
              />
            </CustomSelect>
          </div>
          <div className=" col-sm-6 col-lg-3">
            <CustomSelect>
              <Select
                isMulti
                placeholder={"Topics"}
                value={topics}
                options={topicOptions}
                onChange={(o) => setTopics(o)}
              />
            </CustomSelect>
          </div>
          <div className=" col-sm-6 col-lg-3">
            <CustomSelect>
              <Select
                placeholder={"Refine by Date"}
                value={date}
                options={dateOptions}
                onChange={(o) => setDate(o)}
              />
            </CustomSelect>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className=" d-flex justify-content-end">
              <Button className="btn btn-orange mr-3" onClick={onApplyFilter}>
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
  centerOptions: PropTypes.array,
  centers: PropTypes.array,
  setCenters: PropTypes.func,

  dateOptions: PropTypes.array,
  date: PropTypes.array,
  setDate: PropTypes.func,

  topicOptions: PropTypes.array,
  topics: PropTypes.array,
  setTopics: PropTypes.func,

  typeOptions: PropTypes.array,
  types: PropTypes.array,
  setTypes: PropTypes.func,

  onApplyFilter: PropTypes.func,
  onResetFilter: PropTypes.func,

  open: PropTypes.bool,
};
