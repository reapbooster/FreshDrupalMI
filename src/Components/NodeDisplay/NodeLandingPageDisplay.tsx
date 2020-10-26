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
      return (
        <Card
          onClick={onClickHandler}
          data-alias={landingPageData.path.alias}
          key={key}
          style={{ width: '20em', margin: '1em' }}
        >
          <Card.Title 
            className="text-center text-uppercase my-3"
            style={{ fontSize: '1.2em' }}
          >
            {landingPageData.title}
          </Card.Title>
          <Card.Body
            style={{ padding: 0 }}
          >
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
