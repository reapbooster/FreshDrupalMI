import React from "react";

export interface SearchResultProps {
  search_api_excerpt: string;
  search_api_relevance: number;
  uuid: string;
  label: string;
  jsonapi_type: string;
  url: string;
  bundle: string;
  entity_type_id: string;
}

export const SearchResult = (props: SearchResultProps) => {
  const {
    search_api_excerpt,
    search_api_relevance,
    uuid,
    label,
    jsonapi_type,
    url,
    bundle,
    entity_type_id,
  } = props;

  return (
    <div
      data-entity-type-id={entity_type_id}
      data-bundle={bundle}
      data-url={url}
      data-type={jsonapi_type}
      data-uuid={uuid}
      data-relevance={search_api_relevance}
    >
      <div data-property="search-api-excerpt">{search_api_excerpt}</div>
      <div data-property="search-api-relevance">{search_api_relevance}</div>
      <div data-property="link">
        <a href={url} title={label}>
          {label}
        </a>
      </div>
    </div>
  );
};

export default SearchResult;
