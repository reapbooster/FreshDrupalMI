import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import NodeLandingPage, {
  NodeLandingPageInterface,
} from "../../DataTypes/NodeLandingPage";
import ParagraphDisplayList from "../ParagraphDisplay/ParagraphDisplayList";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import MediaDisplayImage from "../MediaDisplay/MediaDisplayImage";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface NodeLandingPageDisplayProps {
  data: NodeLandingPageInterface;
  view_mode: string;
  can_edit: boolean;
}

export const NodeLandingPageDisplay = (props: NodeLandingPageDisplayProps) => {
  const { data, view_mode, can_edit } = props;
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
    "landing page data => ".concat(landingPageData.title),
    landingPageData
  );
  switch (view_mode) {
    case "full":
      return (
        <>
          <Container>
            <ParagraphDisplayList
              list={landingPageData.field_content}
              view_mode={view_mode}
              can_edit={can_edit}
            />
          </Container>
        </>
      );
    case "tile":
      return (
        <Card onClick={onClickHandler} data-alias={landingPageData.path.alias}>
          <Card.Title className="text-center">
            {landingPageData.title}
          </Card.Title>
          <Card.Body>
            <ErrorBoundary>
              <MediaDisplayImage
                data={landingPageData.field_hero_image}
                view_mode={"thumbnail"}
              />
            </ErrorBoundary>
          </Card.Body>
        </Card>
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
