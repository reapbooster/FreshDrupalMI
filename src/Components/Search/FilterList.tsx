import React from "react";
import { FacetListInterface } from "../../DataTypes/Facet";
import FacetListDisplay from "./FacetListDisplay";

interface FilterListProps {
  filters: Array<FacetListInterface>;
  currentActiveRequest: boolean;
}

const FilterList: React.FunctionComponent<FilterListProps> = (
  props: FilterListProps
) => {
  console.log("Filter List Props:", props);
  const { filters, currentActiveRequest } = props;
  if (filters.length >= 1) {
    return (
      <>
        {filters.map((facetList: FacetListInterface, key: number) => {
          <FacetListDisplay {...facetList} key={key} />;
        })}
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
