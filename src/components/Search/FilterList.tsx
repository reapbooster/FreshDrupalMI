import React from 'react';
import {Form} from 'react-bootstrap';
import {FacetType, FacetDisplay, FacetInterface, FacetTypeProps} from './Facet';

interface FilterListProps {
  filters: Array<FacetTypeProps>
}

const FilterList: React.FunctionComponent<FilterListProps> = (props: FilterListProps ) => {
  console.log("Filter List Props:", props);
  if (props.filters.length >= 1) {
    return (
      <>
        <Form>
          {props.filters.map((facetType: FacetInterface, key: number) => <FacetType {...facetType} key={key} />)}
        </Form>
      </>
    );
  } else {
    return (<div></div>);
  }

}

FilterList.defaultProps = {
  filters: []
}


export default FilterList;
