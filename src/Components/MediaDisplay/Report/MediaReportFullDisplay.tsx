import styled from "styled-components";
import ImageFileDisplay from "Components/FileDisplay/ImageFileDisplay";
import DocumentFileDisplay from "Components/FileDisplay/DocumentFileDisplay";
import React from "react";
import { MediaReportInterface } from "DataTypes/MediaReport";
import ErrorBoundary from "../../../Utility/ErrorBoundary";
import ErrorDisplay from "../../../Utility/ErrorDisplay";
import { Row, Col } from "react-bootstrap";
import AuthorsDisplay from "../../AuthorsDisplay";
import {TagsDisplay} from "../../TagsDisplay";
import {SocialDisplay} from "../../SocialDisplay";
import ParagraphDisplayList from "../../ParagraphDisplay/ParagraphDisplayList";
import moment from "moment";

export interface MediaReportFullDisplayProps {
  data: MediaReportInterface;
  key: number;
}

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

const ElMainContentWrapper = styled.div`
& .section-social {
  order: 1;
}
& .section-content {
  order: 2;
  @media only screen and (max-width: 1199px) {
    order: 3;
    padding-top: 1.5em;

  }
}
& .section-tags {
  order: 3;
  @media only screen and (max-width: 1199px) {
    order: 2;
  }
  & .published-date {
    font-family: LatoWebItalic;
    font-size: 1.25em;
    color: #999AA3;
    letter-spacing: 0;
    line-height: 1.8em;
    margin-top: 0;
    margin-bottom: 1em;
  }
}
`;


export const MediaReportFullDisplay = (props: MediaReportFullDisplayProps) => {
  const { data, key } = props;
  if (!data.valid) {
    return <ErrorDisplay error={new Error("DataObject is not valid")} />;
  }

  const created = moment(data.created, "ddd MMM DD YYYY Z");

  let tagList = [];

  if (data.field_tags.length !== undefined && data.field_tags.length > 0) {
    data.field_tags.map(
      (item) => {
        tagList.push({link_uri: '', tag: item.name});
      }
    )
  }
  if (data.field_topics.length !== undefined && data.field_topics.length > 0) {
    data.field_topics.map(
      (item) => {
        tagList.push({link_uri: '', tag: item.name});
      }
    )
  }
  if (data.field_regions.length !== undefined && data.field_regions > 0) {
    data.field_regions.map(
      (item) => {
        tagList.push({link_uri: '', tag: item.name});
      }
    )
  }
  if (data.field_collections.length !== undefined && data.field_collections.length > 0) {
    data.field_collections.map(
      (item) => {
        tagList.push({link_uri: '', tag: item.name});
      }
    )
  }

  let authorList = [];

  if (data.field_authors.length !== undefined && data.field_authors.length > 0) {
    data.field_authors.map(
      (item) => {
        authorList.push({ 
          photo: item.field_photo[0],
          name: item.field_first_name + " " + item.field_last_name, 
          pgtitle: item.field_pgtitle, 
          link: "/people/" + item.drupal_internal__id,
        });
      }
    )
  }

  return (
    <>
      <HeaderWrapper key={key}>
        <ReportImageWrapper>
          <ImageFileDisplay
            data={data.field_cover}
            view_mode="thumbnail"
            className={"card-img"}
            style={{ maxWidth: "100%" }}
            srcsetSizes="(max-width: 1000px) 200px, 400px"
          />
          <MobileButtonWrapper>
            <ErrorBoundary>
              <DocumentFileDisplay
                data={data.field_media_file}
                label="Download PDF"
              ></DocumentFileDisplay>
            </ErrorBoundary>
          </MobileButtonWrapper>
        </ReportImageWrapper>
        <TitleWrapper>
          <i style={{ fontSize: "1.2em", fontWeight: "bold" }}>REPORT</i>
          <h1>{data.name}</h1>
          <NormalButtonWrapper>
            <ErrorBoundary>
              <DocumentFileDisplay
                data={data.field_media_file}
                label="Download PDF"
              ></DocumentFileDisplay>
            </ErrorBoundary>
          </NormalButtonWrapper>
        </TitleWrapper>
      </HeaderWrapper>
      <ElMainContentWrapper className="container-fluid" style={{ width: "90%", margin: "2em auto" }}>
          <Row>
            <Col xs="12" lg="6" xl="1" className="section-social">
              <SocialDisplay data={{"name": data.name}}></SocialDisplay>
            </Col>
            <Col xs="12" xl="8" className="section-content">
              <ErrorBoundary>
                <ParagraphDisplayList
                  list={data.field_content}
                  view_mode="full"
                />
              </ErrorBoundary>
            </Col>
            <Col xs="12" lg="6" xl="3" className="section-tags">
            <div className="published-date">{"Published " + created.format('MMMM D, YYYY')}</div>
              <AuthorsDisplay data={{authorList: authorList}} />
              <TagsDisplay data={{tagList: tagList}} />
            </Col>
          </Row>
        </ElMainContentWrapper>
    </>
  );
};

export default MediaReportFullDisplay;
