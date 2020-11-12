import React, { useState } from "react";
import { Card } from "react-bootstrap";
import NodeLandingPage, {
  NodeLandingPageInterface,
} from "../../DataTypes/NodeLandingPage";
import ParagraphDisplayList from "../ParagraphDisplay/ParagraphDisplayList";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import MediaDisplayImage from "../MediaDisplay/MediaDisplayImage";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export interface NodeLandingPageDisplayProps {
  data: NodeLandingPageInterface;
  view_mode: string;
  can_edit: boolean;
  key: number;
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const NodeLandingPageDisplay = (props: NodeLandingPageDisplayProps) => {
  const { data, view_mode, can_edit, key } = props;
  const DataObject = new NodeLandingPage(data);
  const [landingPageData, setLandingPageData] = useState(DataObject);
  if (!landingPageData.hasData()) {
    const ecp = new EntityComponentProps(landingPageData);
    ecp
      .getData(landingPageData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setLandingPageData(new NodeLandingPage(ajaxData.data));
      });
    return (
      <>
        <Loading />
      </>
    );
  }

  const onClickHandler = (evt) => {
    console.debug("onClickHandler", evt);
    document.location.href = evt.currentTarget.dataset.alias;
  };

  console.debug(
    "landing page data ==> ".concat(landingPageData.title),
    landingPageData
  );
  switch (view_mode) {
    case "full":
      console.debug("LandingPageData.items => ", landingPageData.items);
      return (
        <>
          <Container>
            <ParagraphDisplayList
              list={landingPageData.items}
              view_mode={view_mode}
              can_edit={can_edit}
            />
          </Container>
        </>
      );
    case "tile":
      const CardOuter = styled.div`
        margin: 1em;
        width: 100%;
        cursor: pointer;

        &:hover {
          box-shadow: 0 8px 16px 0 grey;
        }
        &:hover .card-title {
          color: var(--color-milken-orange) !important;
        }
        &:hover .card-body div {
          display: unset;
        }

        @media (max-width: 767px) {
          margin: 1em 0;
        }
        @media (min-width: 768px) {
          width: 17em;
        }
        @media (min-width: 1200px) {
          width: 20em;
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

      return (
        <CardOuter
          onClick={onClickHandler}
          data-alias={landingPageData.path.alias}
          key={key}
          className="card border-0"
        >
          <Card.Title
            className="text-center text-uppercase py-3 mb-0 border"
            style={{ fontSize: "1.0em", color: "var(--color-milken-blue)" }}
          >
            {landingPageData.title}
          </Card.Title>
          <Card.Body style={{ padding: 0 }}>
            <ErrorBoundary>
              <MediaDisplayImage
                data={landingPageData.field_hero_image}
                view_mode={"thumbnail"}
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
                  height: "3em",
                }}
              />
            </CardLinkBox>
          </Card.Body>
        </CardOuter>
      );
    default:
      return (
        <div>
          <h4>Don't have a component for this node/view_mode</h4>
        </div>
      );
  }
};

export default NodeLandingPageDisplay;
