import * as React from "react";
import { Media } from "react-bootstrap";

interface SearchResultProps {
  relevance: number;
  uuid: string;
  entityTypeId: string;
  bundle: string;
  id: string;
  label: string;
  excerpt: string;
  url: string;
}

const SearchResult: React.FunctionComponent = (props: SearchResultProps) => {
  const api_excerpt = () => {
    console.log("SearchResult... parsing", props);
    if (props.excerpt !== null) {
      return (
        <p
          dangerouslySetInnerHTML={{ __html: props.excerpt }}
          className={"text-muted"}
        ></p>
      );
    } else {
      return <p></p>;
    }
  };
  return (
    <>
      <Media>
        <Media.Body>
          <h5>
            <a href={props.url}>{props.label}</a>
          </h5>
          {api_excerpt()}
        </Media.Body>
      </Media>
    </>
  );
};

SearchResult.defaultProps = {
  relevance: 0,
  uuid: "",
  entityTypeId: "node",
  bundle: "article",
  id: "",
  label: "",
  excerpt: "",
  url: "/",
};

export default SearchResult;
export { SearchResultProps };
