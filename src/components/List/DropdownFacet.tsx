import React, { useState } from 'react';
import Facet, { FacetProps, FacetValue } from "../../DataTypes/Facet";
import Loading from "../Loading";
import {Nav, NavDropdown, NavItem} from 'react-bootstrap';

const DropdownFacet = (props: FacetProps) => {
  const [ facetValues, setFacetValues ] = useState(new Facet(props));

  const dropdownSelectHandler = (machine_name) => {
    var values = facetValues.getValuesForJsonAPIFilters();
    setFacetValues(facetValues.setActive(machine_name));
    var evt = new CustomEvent("refresh", {
      bubbles: false,
      cancelable: false,
      detail: {
        filter: {
          "field_region.machine_name": machine_name
        }
      }
    });
    document.getElementsByClassName('philanthropy-hub-root')
      .item(0)
      .dispatchEvent(evt);
  }

  if (!facetValues.hasValues()) {
    facetValues.refresh(setFacetValues);
    return (<Loading />);
  }
  var renderedFacetValues = facetValues.values.map((value: FacetValue, key: number) => {
    return (
      <NavDropdown.Item
        eventKey={value.machine_name}
        value={value.machine_name}
        id={value.id}
      >
        {value.name}
      </NavDropdown.Item>
    );
  });
  console.debug("Dropdown Facet:", facetValues);
  const activeKey: FacetValue = facetValues.getActive().shift() || { label: "Global" };
  console.debug("Active Keys:", activeKey);
  return (
    <>
      <Nav>
        <NavItem
          id={"facet-".concat(facetValues.id)}
        >Choose a region: <NavDropdown
            title={ activeKey.label }
            onSelect={dropdownSelectHandler}
          >
            {renderedFacetValues}
          </NavDropdown>
        </NavItem>
      </Nav>
    </>
  );
}

export default DropdownFacet;


