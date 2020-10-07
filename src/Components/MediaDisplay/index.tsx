import React, { useState } from "react";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { MediaInterface } from "../../DataTypes/Media";
import MediaComponentFactory from "./MediaComponentFactory";
import MediaDataFactory from "./MediaDataFactory";

/**
 * Create the Controller
 *
 * @param props: MediaDisplayProps
 */

export interface MediaDisplayProps {
  key?: number;
  data: MediaInterface;
  view_mode: string;
}

export const MediaDisplay: React.FunctionComponent = (
  props: MediaDisplayProps
) => {
  const { key, data, view_mode } = props;
  const [mediaData, setMediaData] = useState(MediaDataFactory(data));
  console.debug("MediaDisplay", props, mediaData);
  if (!mediaData.hasData()) {
    const ecp = new EntityComponentProps(mediaData);
    ecp
      .getData(mediaData.getIncluded())
      .then((res) => res.json())
      .then((remoteData) => {
        console.debug("Media Remote Data", remoteData);
        setMediaData(MediaDataFactory(remoteData.data));
      });
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const Component = MediaComponentFactory(mediaData);
  console.debug("get MediaDisplayComponent", Component);
  return (
    <ErrorBoundary key={key ?? 0}>
      <Component
        data={mediaData}
        view_mode={view_mode}
        style={{ width: "18rem" }}
      />
    </ErrorBoundary>
  );
};

export default MediaDisplay;
