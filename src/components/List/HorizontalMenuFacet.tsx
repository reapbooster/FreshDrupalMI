import React, { useState } from 'react';
import Facet, { FacetProps, FacetValue } from "../../DataTypes/Facet";
import Loading from "../Loading";
import Select from 'react-select'
import {Tab, Text, Nav } from 'react-bootstrap';
import { useQueryState } from 'use-location-state';


const HorizontalMenuFacet = (props: FacetProps) => {

  const [ facetValues, setFacetValues ] = useState(new Facet(props));
  const [ fieldTerms, setFieldTerms ] = useQueryState(props.field.replace("field_", ""), "");

  if (!facetValues.hasValues()) {
    facetValues.refresh(setFacetValues);
    return (
      <Select
        isLoading={true}
      />
    )
  }


  let onChangeHandler = (value, { action, removedValue }) => {

    setFieldTerms(value?.map( v => { return v.value; }).toString());

  }

  let colors = [];

  const options = !facetValues.values ? [] : facetValues.values.map((value, key) => {
    colors.push(value.field_tag_color ?? '');
    return {
      'value': value.machine_name,
      'label': value.name
    }
  })

  const readFieldTerms = !facetValues.values ? [] : facetValues.values.map((value, key) => {
    const activeValues = fieldTerms.split(',');
    if(activeValues.includes(value.machine_name)) {
      return {
        'value': value.machine_name,
        'label': value.name
      }
    }
  });

  return (
    <div>
      {/*<label>{props.label}</label>*/}
      <Select
        value={readFieldTerms}
        options={options}
        isMulti
        onChange={onChangeHandler}
        placeholder={props.label}
      />
    </div>
  );
}

export default HorizontalMenuFacet;
