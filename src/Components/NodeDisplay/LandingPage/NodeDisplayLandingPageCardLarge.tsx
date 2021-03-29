import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ErrorBoundary from "Utility/ErrorBoundary";
import MediaDisplayImage from "Components/MediaDisplay/MediaDisplayImage";
import NodeLandingPage from "DataTypes/NodeLandingPage";

const CardOuter = styled.a`
  padding: 1em;

  & :hover {
    text-decoration: none;
  }

  & .card-container {
    padding: 0;
    cursor: pointer;
    text-decoration: none;
    width: 100%;
    position: relative;
  }

  & .card-container:hover {
    box-shadow: 0 8px 16px 0 grey;
  }

  & .card-container:hover .card-title {
    color: var(--color-milken-orange) !important;
  }
  & .card-container:hover .card-body div {
    display: unset;
  }
`;

const CardLinkBox = styled.div`
  display: none;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  border-bottom: 4px solid var(--color-milken-orange);
`;

const onClickHandler = (evt) => {
  console.debug("onClickHandler", evt);
  document.location.href = evt.currentTarget.dataset.alias;
};

export interface NodeDisplayLandingPageCardLargeProps {
  data: NodeLandingPage;
  key: number;
}

export const NodeDisplayLandingPageCardLarge = (
  props: NodeDisplayLandingPageCardLargeProps
) => {
  const { data, key } = props;
  return (
    <CardOuter
      // onClick={onClickHandler}
      // data-alias={data.path.alias}
      href={data.path.alias !== null ? data.path.alias : '/node/' + data.drupal_internal__nid}
      key={key}
      className="card border-0 col-sm-12 col-md-4"
    >
      <div className="card-container">
        <Card.Body style={{ padding: 0 }}>
          <ErrorBoundary>
            <MediaDisplayImage
              data={data.field_hero_image}
              view_mode={"medium-raw"}
            />
          </ErrorBoundary>
          <CardLinkBox>
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{
                float: "right",
                color: "white",
                backgroundColor: "var(--color-milken-orange)",
                padding: ".5em",
                width: "3em",
                height: "2.98em",
              }}
            />
          </CardLinkBox>
        </Card.Body>
        <Card.Title
          className="text-uppercase py-3 mb-0 mx-2 font-weight-bold"
          style={{ fontSize: "1.0em", color: "#111" }}
        >
          {data.title}
        </Card.Title>
      </div>
    </CardOuter>
  );
};

export default NodeDisplayLandingPageCardLarge;
