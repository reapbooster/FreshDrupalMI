import React, { useState } from "react";
import MediaReport, { MediaReportInterface } from "../../DataTypes/MediaReport";
import { Card, Col } from "react-bootstrap";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import moment from "moment";
import styled from "styled-components";
import DocumentFileDisplay from "../FileDisplay/DocumentFileDisplay";

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

  switch (view_mode) {
    case "card":
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
        <CardWrapper
          className="card my-5 mx-2 text-align-left flex-shrink-1"
          key={key}
        >
          <a
            href={
              reportData.path.alias
                ? reportData.path.alias
                : "/media/" + reportData.drupal_internal__mid
            }
            data-drupal-id={reportData.drupal_internal__mid}
            data-drupal-type={reportData.type}
            data-uuid={reportData.id}
            style={{ maxWidth: "319px" }}
          >
            <CustomCardHeader>
              <ImageFileDisplay
                data={reportData.field_cover}
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

    case "full":
      const HeaderWrapper = styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        background: var(--color-milken-blue);
        padding: 3em;

        @media (max-width: 992px) {
          flex-wrap: wrap-reverse;
          font-size: 0.9em;
        }
        @media (min-width: 1200px) {
          padding: 3em 5em;
        }
      `;
      const ReportImageWrapper = styled.div`
        flex: 1 1 25%;
        max-width: 391px;
        @media (max-width: 992px) {
          flex-basis: 100%;
          margin: auto;
        }
      `;
      const TitleWrapper = styled.div`
        color: white;
        flex: 3 0 66%;

        @media (max-width: 992px) {
          flex-basis: 100%;
          padding-bottom: 2em;
        }
        @media (min-width: 993px) {
          padding-left: 3em;
        }
        @media (min-width: 1201px) {
          padding-left: 4em;
        }
      `;
      const MobileButtonWrapper = styled.div`
        margin-top: 3em;
        text-align: center;

        @media (max-width: 992px) {
          display: block;
        }
        @media (min-width: 993px) {
          display: none;
        }
      `;
      const NormalButtonWrapper = styled.div`
        text-align: left;

        @media (max-width: 992px) {
          display: none;
        }
        @media (min-width: 993px) {
          display: block;
        }
      `;
      return (
        <HeaderWrapper>
          <ReportImageWrapper>
            <ImageFileDisplay
              data={reportData.field_cover}
              view_mode="thumbnail"
              className={"card-img"}
              style={{ maxWidth: "100%" }}
              srcsetSizes="(max-width: 1000px) 200px, 400px"
            />
            <MobileButtonWrapper>
              <DocumentFileDisplay
                data={reportData.field_media_file}
                label="Download PDF"
              ></DocumentFileDisplay>
            </MobileButtonWrapper>
          </ReportImageWrapper>
          <TitleWrapper>
            <i style={{ fontSize: "1.2em", fontWeight: "bold" }}>REPORT</i>
            <h1>{reportData.name}</h1>
            <NormalButtonWrapper>
              <DocumentFileDisplay
                data={reportData.field_media_file}
                label="Download PDF"
              ></DocumentFileDisplay>
            </NormalButtonWrapper>
          </TitleWrapper>
        </HeaderWrapper>
      );

    default:
      return (
        <div>
          <h4>Don't have a component for this node/view_mode</h4>
        </div>
      );
  }
};

export default MediaDisplayReport;
