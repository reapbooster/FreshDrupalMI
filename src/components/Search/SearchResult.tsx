import * as React from 'react';
import { Media } from 'react-bootstrap';


interface SearchResultProps {
  search_api_relevance: number,
  nid: number,
  title: string,
  search_api_excerpt: string,
  created: string,
  type: string,
  field_department?: string
}


const SearchResult: React.FunctionComponent = (props: SearchResultProps) => {
  const api_excerpt = () => {
    console.log("SearchResult... parsing", props);
    if (props.search_api_excerpt !== null){
      return (<p dangerouslySetInnerHTML={{__html: props.search_api_excerpt}} className={"text-muted"}></p>);
    } else {
      return (<p></p>);
    }
  }
  return (
    <>
    <Media>
      <Media.Body>
        <h5>{props.title}</h5>
        {api_excerpt()}
      </Media.Body>
    </Media>
    </>
  )
};

SearchResult.defaultProps = {
  search_api_relevance: 0,
  nid: 0,
  title: "Default Value",
  search_api_excerpt: "",
  created: "",
  type: "article",
}

export default SearchResult;
