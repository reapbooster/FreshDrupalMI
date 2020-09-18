import React, { useState } from 'react';
import * as DataObject from '../../DataTypes/MediaReport';
import { Col, Card } from 'react-bootstrap';
import MediaDisplayImage from './MediaDisplayImage'

interface MediaReportProps {
  data: DataObject.MediaReportInterface;
  view_mode: string;
}


const MediaReport: React.FunctionComponent = (props: ReportDataInterface) => {



  return (
    <>
      <Col lg={3} sm={4} key={props.key}>
          <a className="card my-5"
                href={"report/".concat(props.drupal_internal__mid)}
                data-drupal-id={props.drupal_internal__mid}
                data-drupal-type={props.type}
                data-uuid={props.id}>
            <MediaDisplayImage data={props.data.field_cover} view_mode="thumbnail" />
            <Card.Body style={{minHeight: "150px"}}>
              <Card.Title>{props.name}</Card.Title>
            </Card.Body>
            <Card.Footer>{created.format('MMMM D, YYYY')}</Card.Footer>
          </a>
        </Col>
    </>
  );
}

export default MediaReport;
