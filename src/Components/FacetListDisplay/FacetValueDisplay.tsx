import React from "react";
import { FacetListInterface, FacetValueInterface } from "../../DataTypes/Facet";
import { Formik, Field, Form } from "formik";

export interface FacetValueDisplayProps {
  formVariable: string;
  facetValue: FacetValueInterface;
  onChangeHandler: Function;
}

export const FacetValueDisplay = (props: FacetValueDisplayProps) => {
  const { facetValue, key, formVariable, onChangeHandler } = props;
  const myMachineName = formVariable.concat("[", facetValue.id, "]");
  return (
    <Field
      type="checkbox"
      id={facetValue.id}
      name={myMachineName}
      value={facetValue.id}
      selected={facetValue.selected}
      onChange={onChangeHandler}
    >
      {facetValue.label}
    </Field>
  );
};

export default FacetValueDisplay;
