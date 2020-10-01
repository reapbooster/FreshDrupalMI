import React, { useState } from "react";
import MediaReport, { MediaReportInterface } from "../../DataTypes/MediaReport";
import { Card, Col } from "react-bootstrap";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import moment from "moment";

export interface MediaDisplayReportProps {
  data: MediaReportInterface;
  view_mode: string;
}

export const MediaDisplayReport: React.FunctionComponent = (
  props: MediaDisplayReportProps
) => {
  const { data, view_mode } = props;
  const [reportData, setReportData] = useState(new MediaReport(data));
  if (!reportData.hasData()) {
    const ecp = new EntityComponentProps(reportData);
    ecp
      .getData(reportData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setReportData(new MediaReport(ajaxData.data));
      });
  }
  const created = moment(reportData, moment.ISO_8601);
  return (
    <>
      <Col lg={3} sm={4}>
        <a
          className="card my-5"
          href={"report/".concat(reportData.drupal_internal__mid)}
          data-drupal-id={reportData.drupal_internal__mid}
          data-drupal-type={reportData.type}
          data-uuid={reportData.id}
        >
          <ImageFileDisplay
            data={reportData.getThumbnail()}
            view_mode="thumbnail"
          />
          <Card.Body style={{ minHeight: "150px" }}>
            <Card.Title>{reportData.name}</Card.Title>
          </Card.Body>
          <Card.Footer>{created.format("MMMM D, YYYY")}</Card.Footer>
        </a>
      </Col>
    </>
  );
};

export default MediaDisplayReport;
