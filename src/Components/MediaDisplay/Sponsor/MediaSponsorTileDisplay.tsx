import styled from "styled-components";
import moment from "moment";
import ImageFileDisplay from "Components/FileDisplay/ImageFileDisplay";
import { Card } from "react-bootstrap";
import React from "react";
import MediaSponsorLogo from "DataTypes/MediaSponsorLogo";
import ErrorBoundary from "../../../Utility/ErrorBoundary";
import ErrorDisplay from "../../../Utility/ErrorDisplay";

export interface MediaSponsorTileDisplayProps {
  data: MediaSponsorLogo;
  key?: number;
  display_size?: string;
}

const CardWrapper = styled.div`
  min-width: 222px;

  &:hover {
    box-shadow: 0 8px 16px 0 grey;
  }

  & a {
    max-width: 319px;
    color: #35363C;
    text-decoration: none;

    & .h5 {
      font-weight: bold;
    }
  }

`;

const CustomCardHeader = styled.div`
  position: relative;
`;

const DateWrapper = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.53);
  color: white;
  text-align: right;
  padding-right: 0.5em;
  position: absolute;
  bottom: 0;
`;

export const MediaSponsorTileDisplay = (props: MediaSponsorTileDisplayProps) => {
  const { data, key, display_size } = props;
  if (!data.valid) {
    return <ErrorDisplay error={new Error("DataObject is not valid")} />;
  }

  return (
    <CardWrapper
      className="card my-4 mx-2 text-align-left flex-shrink-1"
      key={key}
    >
      <ErrorBoundary>
        <a
          href={
            data.path.alias
              ? data.path.alias
              : "/media/" + data.drupal_internal__mid
          }
          data-drupal-id={data.drupal_internal__mid}
          data-drupal-type={data.type}
          data-uuid={data.id}
        >
          <CustomCardHeader>
            <ImageFileDisplay
              data={data.field_media_image}
              view_mode="large"
              className={"card-img"}
              style={{ maxWidth: "100%" }}
              srcsetSizes="(max-width: 1000px) 200px, 400px"
            />
            {display_size}
          </CustomCardHeader>
        </a>
      </ErrorBoundary>
    </CardWrapper>
  );
};

export default MediaSponsorTileDisplay;
