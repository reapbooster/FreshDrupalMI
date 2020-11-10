import React from "react";
import { Form } from "react-bootstrap";
import { FacetListInterface, FacetValueInterface } from "../../DataTypes/Facet";

export type FacetListDisplayProps = FacetListInterface;

export const FacetListDisplay = (props: FacetListDisplayProps) => {
  const { label, formProperty, facets } = props;
  return (
    <Form.Group controlId={props.formProperty}>
      <Form.Label>{label}</Form.Label>
      {facets.map((item, key) => {
        return (
          <Form.Check
            id={formProperty.concat("-checkbox-", item.id)}
            key={key}
            type="checkbox"
            value={item.id}
            label={item.label}
          />
        );
      })}
    </Form.Group>
  );
};

export default FacetListDisplay;
