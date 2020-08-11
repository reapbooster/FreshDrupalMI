import React, { useState } from 'react';
import Facet, { FacetProps, FacetValue } from "../../DataTypes/Facet";
import Loading from "../Loading";
import Select from 'react-select'
import {Tab, Text, Nav } from 'react-bootstrap';

const HorizontalMenuFacet = (props: FacetProps) => {

  const [ facetValues, setFacetValues ] = useState(new Facet(props));

  if (!facetValues.hasValues()) {
    facetValues.refresh(setFacetValues);
    return (
      <Select
        isLoading={true}
      />
    )
  }

  let onChangeHandler = (value, { action, removedValue }) => {

    console.log("CLICK", value, action, props, props.field);

    // NOTE: facetValues.setActive - why is it needed?

    const transposedFilter = [];

    // The component already makes the array...
    // Transpose it...

    !!value && value.map( a => {
      transposedFilter[props.field.concat('.machine_name')] = a.value;
    });

    console.log(transposedFilter);

    // TODO: Disable filter until response is returned / throttle reloads on the listener component

    // TODO: Add "All" case

    // filter[props.field.concat('.machine_name')] = machine_name
    // facetValues.setActive(machine_name);
  //   console.debug("changing facet values:", facetValues, filter);
  //   setFacetValues(facetValues);
  //   if (props.all) {
  //     console.debug("setting ALL NAV to NONE:", props.all);
  //     props.all.activeKey = "";
  //   }

    var evt = new CustomEvent("refresh", {
      bubbles: false,
      cancelable: false,
      detail: {
        filter: transposedFilter
      }
    });

    document.getElementsByClassName('philanthropy-hub-root')
      .item(0)
      .dispatchEvent(evt);

  }
  //
  // const onClearHandler = (selectedValue) => {
  //   const all = document.getElementById(props.id.replace(props.field, '-ALL'));
  //   if (props.all) {
  //     console.debug("setting ALL NAv to AKK:", props.all);
  //     // props.all.activeKey = "all";
  //   }
  //   setFacetValues(facetValues.setActive());
  // }

  // document.getElementsByClassName('philanthropy-hub-root')
  //   .item(0)
  //   .addEventListener('clear', onClearHandler);

  let colors = [];

  const options = !facetValues.values ? [] : facetValues.values.map((value, key) => {
    colors.push(value.field_tag_color ?? '');
    return {
      'value': value.machine_name,
      'label': value.name,
      'facet': value
    }
  })


  // const renderedFacets = facetValues.values.map((value: FacetValue, key: number) => {
  //   return (
  //     <Nav.Item
  //       id={value.id}
  //     ><Nav.Link eventKey={value.machine_name}
  //                value={value.machine_name}
  //                onSelect={onSelectHandler}>
  //       {value.name}
  //     </Nav.Link>
  //     </Nav.Item>
  //   );
  // });
  //
  // const activeKey:FacetValue = facetValues.getActive().shift() ?? { label: "All", machine_name: "all" };
  // console.log('props',props);


  return (
    <div>
      <label>{props.label}</label>
      <Select
        options={options}
        isMulti
        onChange={onChangeHandler}
        placeholder={props.label}
      />
    </div>
  );
}

export default HorizontalMenuFacet;
