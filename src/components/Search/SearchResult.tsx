import * as React from 'react';


interface SearchResultProps {
  search_api_relevance: number,
  nid: number,
  title: string,
  search_api_excerpt?: string,
  created?: string,
  type?: string,
  field_department?: string
}


const SearchResult: React.FunctionComponent = (props: SearchResultProps) => {

  const render = (props: SearchResultProps) => {
    return <h4>{props.title}</h4>
  }

}

SearchResult.defaultProps = {
  search_api_relevance: 0,
  nid: 0,
  title: "Default Value",
}

export default SearchResult;
