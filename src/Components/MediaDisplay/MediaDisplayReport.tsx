import React, { useState } from "react";
import MediaReport, { MediaReportInterface } from "../../DataTypes/MediaReport";
import { Card, Col } from "react-bootstrap";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import moment from "moment";
import styled from "styled-components";

export interface MediaDisplayReportProps {
  data: MediaReportInterface;
  view_mode: string;
  key: number;
}

export const MediaDisplayReport: React.FunctionComponent = (
  props: MediaDisplayReportProps
) => {
  const { data, view_mode, key } = props;
  const DataObject = new MediaReport(data);
  const [reportData, setReportData] = useState(DataObject);
  if (!reportData.hasData()) {
    const ecp = new EntityComponentProps(reportData);
    ecp
      .getData(reportData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const DataObject = new MediaReport(ajaxData.data);
        setReportData(DataObject);
      });
  }
  
  const CardWrapper = styled.div`
    min-width: 222px;

    &:hover {
      box-shadow: 0 8px 16px 0 grey;
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

  const created = moment(reportData.changed, "ddd MMM DD YYYY Z");

  console.debug("Thumbnail: ", reportData.getThumbnail());
  return (
    <CardWrapper className="card my-5 mx-2 text-align-left flex-shrink-1" key={key}>
      <a
        href={reportData.path.alias}
        data-drupal-id={reportData.drupal_internal__mid}
        data-drupal-type={reportData.type}
        data-uuid={reportData.id}
        style={{ maxWidth: "319px" }}
      >
        <CustomCardHeader>
          <ImageFileDisplay
            data={reportData.field_media_file}
            view_mode="thumbnail"
            className={"card-img"}
            style={{ maxWidth: "100%" }}
            srcsetSizes="(max-width: 1000px) 200px, 400px"
          />
          <DateWrapper>{created.format("MMMM D, YYYY")}</DateWrapper>
        </CustomCardHeader>
        <Card.Body style={{ minHeight: "5em", paddingBottom: "0" }}>
          <Card.Title style={{ fontSize: "1em", marginBottom: "0" }}>
              {reportData.name}
          </Card.Title>
        </Card.Body>
        <Card.Footer className="bg-white border-0">
          Authors and Tags
        </Card.Footer>
      </a>
    </CardWrapper>
  );
};

export default MediaDisplayReport;
