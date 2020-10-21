import React, { useState } from "react";
import MediaReport, { MediaReportInterface } from "../../DataTypes/MediaReport";
import { Card, Col } from "react-bootstrap";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import moment from "moment";

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
  const created = moment(reportData.changed, moment.ISO_8601);
  return (
    <Card key={key}>
      <ImageFileDisplay
        data={reportData.getThumbnail()}
        view_mode="thumbnail"
        className={"card-img"}
      />
      <Card.Body style={{ minHeight: "150px" }}>
        <Card.Title>
          <a
            href={reportData.path.alias}
            data-drupal-id={reportData.drupal_internal__mid}
            data-drupal-type={reportData.type}
            data-uuid={reportData.id}
          >
            {reportData.name}
          </a>
        </Card.Title>
      </Card.Body>
      <Card.Footer>{created.format("MMMM D, YYYY")}</Card.Footer>
    </Card>
  );
};

export default MediaDisplayReport;
