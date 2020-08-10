import React, { useState } from 'react';
import Facet, { FacetProps, FacetValue } from "../../DataTypes/Facet";
import Loading from "../Loading";
import {Tab, Nav  } from 'react-bootstrap';

const HorizontalMenuFacet = (props: FacetProps) => {

  const [ facetValues, setFacetValues ] = useState(new Facet(props));

  if (!facetValues.hasValues()) {
    facetValues.refresh(setFacetValues);
    return (<Loading />);
  }

  const onSelectHandler = (machine_name: string) => {
    console.debug("CLICK", machine_name);
    var filter = {};
    filter[props.field.concat('.machine_name')] = machine_name
    facetValues.setActive(machine_name);
    console.debug("changing facet values:", facetValues, filter);
    setFacetValues(facetValues);
    if (props.all) {
      console.debug("setting ALL NAV to NONE:", props.all);
      props.all.activeKey = "";
    }
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

  const onClearHandler = (selectedValue) => {
    const all = document.getElementById(props.id.replace(props.field, '-ALL'));
    if (props.all) {
      console.debug("setting ALL NAv to AKK:", props.all);
      props.all.activeKey = "all";
    }
    setFacetValues(facetValues.setActive());
  }

  document.getElementsByClassName('philanthropy-hub-root')
    .item(0)
    .addEventListener('clear', onClearHandler);

  const renderedFacets = facetValues.values.map((value: FacetValue, key: number) => {
    return (
      <Nav.Item
        id={value.id}
      ><Nav.Link eventKey={value.machine_name}
                 value={value.machine_name}
                 onSelect={onSelectHandler}>
        {value.name}
      </Nav.Link>
      </Nav.Item>
    );
  });

  const activeKey: FacetValue = facetValues.getActive().shift() ?? { label: "All", machine_name: "all" };

  return (
    <>
      <Nav
        variant={"pills"}
        id={props.id}
      >
        {renderedFacets}
      </Nav>
    </>
  );
}

export default HorizontalMenuFacet;


