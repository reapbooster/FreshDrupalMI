import PropTypes from "prop-types";
import React from "react";
import SearchCard from "./SearchCard";
import SearchRow from "./SearchRow";

export default function SearchResults(props) {
  const { queryString } = props;

  const itemProps = (content) => {
    return {
      id: content?.uuid,
      image:
        content?.field_photo ??
        content?.field_thumbnail_uri ??
        content.field_title_card_image ??
        content?.field_cover ??
        "https://placehold.it/800x600",
      type: content?.entity_type_id,
      title: content?.label ?? content?.title,
      text: content?.search_api_excerpt,
      // text: "",
      link: content?.url,
    };
  };

  function renderCardView(contents) {
    return (
      <div className="row">
        {contents.map((content, index) => (
          <div
            key={index}
            className="col-lg-2 col-md-3 col-sm-6 col-xs-12 mb-5"
          >
            <SearchCard {...itemProps(content)} />
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
            <SearchRow {...itemProps(content)} />
          </div>
        ))}
      </div>
    );
  }

  if (props.contents?.length > 0) {
    return (
      <div className="search-results container-fluid">
        {props.isGrid
          ? renderCardView(props.contents)
          : renderListView(props.contents)}

        {queryString}
      </div>
    );
  } else {
    return <div>Sorry, we can't find any contents</div>;
  }
}

SearchResults.propTypes = {
  contents: PropTypes.array,
  isGrid: PropTypes.bool,
  queryString: PropTypes.string,
};
