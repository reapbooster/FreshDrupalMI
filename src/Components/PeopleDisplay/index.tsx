import React, { useState } from "react";
import DataTypePeopleFactory from '../../DataTypes/People/Factory'
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import { SocialMediaLinkInterface } from "../../Fields/SocialMediaLink";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import { PeopleInterface } from "../../DataTypes/People";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import moment from "moment";
import { TagsDisplay } from "../TagsDisplay"
import { SocialDisplay } from "../SocialDisplay"
import Loading from "../Loading";

export interface PeopleDisplayProps {
  data: PeopleInterface;
  key?: string;
  view_mode: string;
}

// TODO: support more than one bundle of people. Currently only supports "staff".
export const PeopleDisplay = (props: PeopleDisplayProps) => {
  const { data, key, view_mode } = props;
  const DataObject = DataTypePeopleFactory(data);
  const [staffData, setStaffData] = useState(DataObject);
  const [fetchRan, setFetchData] = useState(false);

  if (!staffData.hasData() || !fetchRan) {
    const ecp = new EntityComponentProps(DataObject);
    ecp
      .getData(DataObject.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const newDO = DataTypePeopleFactory(ajaxData.data);
        setStaffData(newDO);
        setFetchData(true);
      });
  }

  if (!staffData.hasData()) {
    return <Loading />;
  }

  console.debug("PeopleDisplay: staffData.hasData()", staffData.hasData());

  console.debug("PeopleDisplay: Component should have data by now:", staffData);
  switch (view_mode) {
    case 'card':
      return (
        <a
          className="col-sm-6 col-md-4 col-lg-3 p-4 text-center text-decoration-none text-dark"
          style={{ fontSize: '0.75em', transition: 'all 0.5s ease' }}
          href={staffData.path.alias}
        >
          <ImageFileDisplay
            data={staffData.field_photo[0]}
            view_mode="large"
            className={"card-img"}
            style={{ maxWidth: "100%" }}
            srcsetSizes="(max-width: 1000px) 200px, 400px"
          />
          <p className="font-weight-bold m-0 mt-3">{staffData.field_first_name} {staffData.field_last_name}</p>
          <p style={{ color: 'dimgray' }}>{staffData.field_pgtitle}</p>
        </a>
      );

    default:

      const PersonElMainWrapper = styled.div`
      `;

      const HeroWrapper = styled.div`
        background: var(--color-milken-blue);
        width: 100%;
        & .nameTitle {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0;
        }

        @media only screen and (max-width: 767.98px) {
          padding-top: 55.25%;
        }
      `;

      const ElMainContentWrapper = styled.div`
        & .section-social {
          order: 1;
        }
        & .section-content {
          order: 2;
          @media only screen and (max-width: 1199.98px) {
            order: 3;
            padding-top: 1.5em;
    
          }
        }
        & .section-tags {
          order: 3;
          @media only screen and (max-width: 1199.98px) {
            order: 2;
          }
        }
      `;

      const NameTitle = styled.div`
        color: #fff;
        width: 450px;
        margin: 0px 106px 0 113px;
        padding: 40px 20px 37px 20px;

        & a {
          color: var(--color-milken-orange);
          letter-spacing: 2px;
          font-family: 'LatoWebBlack';
          text-transform: uppercase;
          font-size: 0.9em;
        }

        & h1 {
          font-family: 'LatoWebBlack';
          font-size: 3rem;
          margin: 27px 0 18px;
        }
        
        & h5 {
          font-size: 1.7em;
        }
      `;

      let teamList = [];

      staffData.field_teams.map(
        (item) => {
          teamList.push({link_uri: '', tag: item.name});
        }
      )

      return (
        <PersonElMainWrapper className="container-fluid p-0">
          <Row className="no-gutters">
            <Col>
              <HeroWrapper>
                <Row>
                  <Col lg="6" className="nameTitle">
                    <NameTitle>
                      <a href="#" onClick={() => { history.back() }}>&lt; Back to previous page</a>
                      <h1>{staffData.field_first_name} {staffData.field_last_name}</h1>
                      <h5>{staffData.field_pgtitle}</h5>
                    </NameTitle>
                  </Col>
                  <Col lg="6">
                    <img src={staffData?.field_photo[0]?.uri?.url} />
                  </Col>
                </Row>
              </HeroWrapper>
            </Col>
          </Row>
          <Row>
            <ElMainContentWrapper className="container-fluid" style={{ width: "90%", margin: "2em auto" }}>
              <Row>
                <Col xs="12" lg="6" xl="1" className="section-social">
                  <SocialDisplay data={{ "name": data.name }}></SocialDisplay>
                </Col>
                <Col xs="12" xl="8" className="section-content">
                  <p>{staffData.field_biotext}</p>
                </Col>
                <Col xs="12" lg="6" xl="3" className="section-tags">
                  <TagsDisplay data={
                    {
                      published_date_string: "",
                      tagList: teamList
                    }
                  }></TagsDisplay>
                </Col>
              </Row>
            </ElMainContentWrapper>
          </Row>
        </PersonElMainWrapper>
      );
  }
};

export default PeopleDisplay;