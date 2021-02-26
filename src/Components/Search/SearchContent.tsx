import PropTypes from "prop-types";
import React from "react";
import ContentCard from "./SearchCard";
import ContentRow from "./SearchRow";

export default function SearchContent(props) {
  function renderCardView(contents) {
    return (
      <div className="row">
        {contents.map((content, index) => (
          <div key={index} className="col-lg-3 col-sm-6 col-xs-12 mb-5">
            <SearchCard
              id={content?.attributes.uuid}
              image={
                content?.attributes?.path?.alias ??
                "https://placehold.it/800x600"
              }
              type={content?.type.split("--")[0].toUpperCase()}
              title={content?.attributes.title}
              text={content?.search_api_excerpt}
            />
          </div>
        ))}
      </div>
    );
  }

  function renderListView(contents) {
    return (
      <div className="d-flex flex-column">
        {contents.map((content, index) => (
          <div key={index}>
            <SearchRow
              id={content?.attributes.uuid}
              image={content?.attributes?.path?.alias}
              type={content?.attributes.type}
              title={content?.attributes.title}
              text={content?.search_api_excerpt}
            />
          </div>
        ))}
      </div>
    );
  }

  if (props.contents?.length > 0) {
    return (
      <div className="d-flex">
        {props.isGrid
          ? renderCardView(props.contents)
          : renderListView(props.contents)}
      </div>
    );
  } else {
    return <div>Sorry, we can't find any contents</div>;
  }
}

SearchContent.propTypes = {
  contents: PropTypes.array,
  isGrid: PropTypes.bool,
};
