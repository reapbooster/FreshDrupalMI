import React from "react";
import { FacetListInterface } from "../../DataTypes/Facet";
import FacetValueDisplay from "./FacetValueDisplay";
import { Formik, Field, Form } from "formik";
import uuidv4 from "../../Utility/uuidv4";

export interface FacetListDisplayProps extends FacetListInterface {
  key: number;
  filterOnChangeHandler: any;
}

export const FacetListOnChangeHandler = (evt) => {
  //TODO: handle change event
  console.debug("Change event triggered", evt);
};

export const FacetListDisplay = (props: FacetListDisplayProps) => {
  console.log("Facet List Display:", props);
  const { facets, formProperty, label, key, filterOnChangeHandler } = props;
  return (
    <div data-form-property={formProperty} key={key}>
      <h1>{label}</h1>
      <Formik onSubmit={filterOnChangeHandler}>
        <Form>
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
        </Form>
      </Formik>
    </div>
  );
};

FacetListDisplay.defaultProps = {
  facets: [],
  key: Math.floor(Math.random() * Math.floor(99999)),
};

export default FacetListDisplay;
