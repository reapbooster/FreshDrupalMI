import React from "react";
import { FacetListInterface, FacetValueInterface } from "../../DataTypes/Facet";
import { Formik, Field, Form } from "formik";

export interface FacetValueDisplayProps {
  formVariable: string;
  facetValue: FacetValueInterface;
  onChangeHandler: Function;
}

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

export const FacetValueDisplay = (props: FacetValueDisplayProps) => {
  const { facetValue, key, formVariable, onChangeHandler } = props;
  const myMachineName = formVariable.concat("[", facetValue.id, "]");
  return (
    <Field
      key={key}
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

FacetValueDisplay.defaultProps = {
  key: generateKey(),
};

export default FacetValueDisplay;
