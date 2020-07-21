import React, { useState } from 'react';
import ReportDataInterface from "../../DataTypes/ReportDataInterface";
import { Col, Card } from 'react-bootstrap';
import ImageEntityProps from "../../DataTypes/ImageEntityProps";
import moment from 'moment';


const MediaReport: React.FunctionComponent = (props: ReportDataInterface) => {
  const [ thumbnailImageUrl, setThumbnailImageUrl ] = useState("holder.js/100x100?text=thumbnail&auto=yes");
  var thumbnail = new ImageEntityProps(props.thumbnail);
  if (thumbnail.getData !== undefined) {
    thumbnail.getData()
      .then(res => res.json())
      .then((incoming) => {
        setThumbnailImageUrl(incoming.data.uri.url);
      });
  }
  const created = moment(props.created, moment.ISO_8601);
  const getReport = (props: ReportDataInterface) => {
    return (
      <>
        <Col lg={3} sm={4}>
          <Card className="my-5">
            <Card.Img
              id={"card-image-".concat()}
              src={thumbnailImageUrl} />
            <Card.Body style={{minHeight: "150px"}}>
              <Card.Title>{props.name}</Card.Title>
            </Card.Body>
            <Card.Footer>{created.format('MMMM D, YYYY')}</Card.Footer>
          </Card>
        </Col>
      </>
    );
  }

  return (
    <>
      {getReport(props)}
    </>
  );
}

export default MediaReport;
