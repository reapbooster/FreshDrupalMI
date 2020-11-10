import React from "react";
import { FacetListInterface } from "../../DataTypes/Facet";
import FacetValueDisplay from "./FacetValueDisplay";
import { Formik, Field, Form } from "formik";

export interface FacetListDisplayProps extends FacetListInterface {
  key: number;
  filterOnChangeHandler: any;
}

export const FacetListOnChangeHandler = (evt) => {
  //TODO: handle change event
  console.debug("Change event triggered");
};

export const FacetListDisplay = (props: FacetListDisplayProps) => {
  const { facets, formProperty, label, key, filterOnChangeHandler } = props;
  return (
    <div data-form-property={formProperty}>
      <h1>{label}</h1>
      <Formik initialValues={} onSubmit={filterOnChangeHandler}>
        <ul>
          {facets.map((item, key) => {
            return (
              <li key={key}>
                <FacetValueDisplay
                  facetValue={item}
                  formVariable={formProperty}
                  onChangeHandler={FacetListOnChangeHandler}
                />
              </li>
            );
          })}
        </ul>
      </Formik>
    </div>
  );
};
