import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import { FaThLarge, FaList } from "react-icons/fa";
import { sortOptions, perpageOptions } from "./Backend/static";
import styled from "styled-components";

import { Button, CustomSelect, theme } from "../Shared/Styles";

const ToolbarButton = styled.button`
  display: flex;
  height: calc(1.5em + 0.75rem + 2px);
  align-self: flex-end;
  /* border: 1px solid ${theme.colors.gray}; */
  border: transparent;
  background: transparent !important;

  padding: 4px;
  margin: 0 2px;
  svg {
    width: 1.6em;
    height: 1.6em;
  }
  &:not(.disabled) {
    svg {
      fill: ${theme.colors.primary};
    }
  }
  &.disabled {
    svg {
      fill: ${theme.colors.lightgray};
    }
  }
`;

export default function SearchToolbar({
  sortby,
  perpage,
  grid,
  onSortbyChange,
  onPerpageChange,
  onViewChange,
}) {
  return (
    <div id="toolbar" className="d-flex justify-content-end my-4">
      <div className="d-inline mx-3">
        <label htmlFor="sortby">Sort by:</label>
        <CustomSelect>
          <select
            name="sortby"
            className="custom-select"
            value={sortby}
            onChange={(e) => onSortbyChange(e.target.value)}
          >
            {sortOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </CustomSelect>
      </div>
      <div className="d-inline mx-3">
        <label htmlFor="perpage">Results per page:</label>
        <CustomSelect>
          <select
            name="perpage"
            className="custom-select"
            value={perpage}
            onChange={(e) => onPerpageChange(e.target.value)}
          >
            {perpageOptions.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </CustomSelect>
      </div>
      <div className="d-flex mx-3">
        <ToolbarButton
          className={classnames(
            "view-btn",
            " justify-content-center",
            "align-items-center",
            { disabled: !grid }
          )}
          onClick={() => onViewChange("grid")}
        >
          <FaThLarge />
        </ToolbarButton>
        <ToolbarButton
          className={classnames(
            "view-btn",
            " justify-content-center",
            "align-items-center",
            { disabled: grid }
          )}
          onClick={() => onViewChange("list")}
        >
          <FaList />
        </ToolbarButton>
      </div>
    </div>
  );
}

SearchToolbar.propTypes = {
  grid: PropTypes.any,
  onPerpageChange: PropTypes.func,
  onSortbyChange: PropTypes.func,
  onViewChange: PropTypes.func,
  perpage: PropTypes.any,
  sortby: PropTypes.any,
};
