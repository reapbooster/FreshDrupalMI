import React, { useState } from "react";
import NodeLandingPage, {
  NodeLandingPageInterface,
} from "DataTypes/NodeLandingPage";
import { EntityComponentProps } from "DataTypes/EntityComponentProps";
import MediaDisplayImage from "MediaDisplay/MediaDisplayImage";
import Loading from "Components/Loading";
import styled from "styled-components";
import NodeDisplayLandingPageTile from "./NodeDisplayLandingPageTile";
import NodeDisplayLandingPageFull from "./NodeDisplayLandingPageFull";
import ErrorDisplay from "Utility/ErrorDisplay";

export interface NodeLandingPageDisplayProps {
  data: NodeLandingPageInterface;
  view_mode: string;
  can_edit: boolean;
  key: number;
}

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
        const newDO = new NodeLandingPage(ajaxData.data);
        setLandingPageData(newDO);
      });
    return (
      <>
        <Loading />
      </>
    );
  }

  console.debug(
    "landing page data ==> ".concat(landingPageData.title),
    landingPageData
  );
  switch (view_mode) {
    case "full":
      return (
        <NodeDisplayLandingPageFull
          data={landingPageData}
          key={key}
          can_edit={can_edit}
        />
      );
    case "tile":
      return <NodeDisplayLandingPageTile data={landingPageData} key={key} />;
    default:
      return (
        <ErrorDisplay
          error={
            new Error(
              "No component for Landing Ppage display: ".concat(view_mode)
            )
          }
        />
      );
  }
};

export default NodeLandingPageDisplay;
