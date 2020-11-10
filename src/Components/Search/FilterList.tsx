import React from "react";
import { Form } from "react-bootstrap";
import { FacetListInterface } from "../../DataTypes/Facet";

interface FilterListProps {
  filters: Array<FacetListInterface>;
  currentActiveRequest: boolean;
}

const FilterList: React.FunctionComponent<FilterListProps> = (
  props: FilterListProps
) => {
  console.log("Filter List Props:", props);
  if (props.filters.length >= 1) {
    return (
      <>
        <Form>
          {props.filters.map((facetType: FacetInterface, key: number) => (
            <FacetType {...facetType} key={key} />
          ))}
        </Form>
      </>
    );
  } else {
    return <div></div>;
  }
};

FilterList.defaultProps = {
  filters: [],
};

export default FilterList;
