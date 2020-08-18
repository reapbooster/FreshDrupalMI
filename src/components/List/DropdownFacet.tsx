import React, { useState } from 'react';
import Facet, { FacetProps, FacetValue } from "../../DataTypes/Facet";
import Loading from "../Loading";
import {Dropdown, Nav, NavDropdown, NavItem} from 'react-bootstrap';

const DropdownFacet = (props: FacetProps) => {

  const [ facetValues, setFacetValues ] = useState(new Facet(props));

  // TODO: Make these props
  const titleSubject = 'Opportunities';
  const titleValueToEnablePost = 'Global';
  const titleConjunction = 'in';

  if (!facetValues.hasValues()) {
    facetValues.refresh(setFacetValues);
    return (<Loading />);
  }

  const dropdownSelectHandler = (machine_name) => {
    console.log(machine_name);
    var filter = {};
    filter[props.field.concat('.machine_name')] = machine_name
    let newFacetValues = facetValues.setActive(machine_name);
    setFacetValues(newFacetValues);

    var evt = new CustomEvent("refresh", {
      bubbles: false,
      cancelable: false,
      detail: {
        filter: filter
      }
    });
    document.getElementsByClassName('philanthropy-hub-root')
      .item(0)
      .dispatchEvent(evt);
  }

  var renderedFacetValues = facetValues.values.map((value: FacetValue, key: number) => {
    return (
      <Dropdown.Item
        key={key}
        eventKey={value.machine_name}
        value={value.machine_name}
        value={value.machine_name}
      >
        {value.name}
      </Dropdown.Item>
    );
  });

  console.debug("Dropdown Facet:", facetValues);
  const activeKey: FacetValue = facetValues.getActive().shift() || { label: "Global" };
  console.debug("Active Keys:", activeKey);

  let prefix, postfix;

  if(titleSubject && titleValueToEnablePost) {
    prefix = <span className="d-none d-md-inline-block">{activeKey.label != titleValueToEnablePost ? `${titleSubject} ${titleConjunction} `: ''}</span>;
    postfix = (activeKey.label == titleValueToEnablePost ? ' ' + titleSubject : '')
  }
  return (
    <>
      <h1 className="title-dropdown text-center">
        <Dropdown onSelect={dropdownSelectHandler}>
          {prefix}
          <Dropdown.Toggle variant="outline" id={"facet-".concat(facetValues.id)}>
            {activeKey.label}
            {postfix}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {renderedFacetValues}
          </Dropdown.Menu>
        </Dropdown>
      </h1>
      {/* <Nav className={"col col-lg-12 col-sm-12"}>
        <NavItem

        >Choose a region: <NavDropdown
            title={ activeKey.label }
            onSelect={dropdownSelectHandler}
          >

          </NavDropdown>
        </NavItem>
      </Nav >*/}
    </>
  );
}

export default DropdownFacet;
