import React from 'react';
import { Form } from "react-bootstrap";


interface FacetInterface {
  facetName: string,
  facetItemsReturned: number,
}

const FacetDisplay = ({facetName, facetItemsReturned}: FacetInterface) => ( <Form.Check
  type="checkbox"
  value={facetName}
  label={`${facetName} (${facetItemsReturned})`}
/> );





interface FacetTypeProps {
  facetTypeName: string,
  facetTypeId: string,
  items: Array<FacetInterface>
}

const FacetType = (props : FacetTypeProps) => (
  <Form.Group controlId={props.facetTypeId}>
    <Form.Label>{props.facetTypeName}</Form.Label>
    {props.items.map((facet: FacetInterface, key: number) => (
      <FacetDisplay
        key={key}
        {...facet}
      />))}
  </Form.Group>
)



export { FacetType, FacetDisplay, FacetInterface, FacetTypeProps }

