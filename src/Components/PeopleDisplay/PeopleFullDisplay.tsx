import React from 'react';
import { Container, Row, Col, Image } from "react-bootstrap";
import styled from "styled-components";
import { TagsDisplay } from "../TagsDisplay"
import { SocialDisplay } from "../SocialDisplay"

const PersonFullDisplay = ( props: any ) => {
  
  const { data } = props;
  
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
      font-size: 1.5em;
    }
  `;

  let teamList = [];
  if (data.field_teams.length !== undefined && data.field_teams.length > 0) {
    data.field_teams.map(
      (item) => {
        teamList.push({link_uri: '', tag: item.name});
      }
    );
  }

  return (
    <PersonElMainWrapper className="container-fluid p-0">
      <Row className="no-gutters">
        <Col>
          <HeroWrapper>
            <Row>
              <Col lg="6" className="nameTitle">
                <NameTitle>
                  <a href="#" onClick={() => { history.back() }}>&lt; Back to previous page</a>
                  <h1>{data.field_first_name} {data.field_last_name}</h1>
                  <h5>{data.field_pgtitle}</h5>
                </NameTitle>
              </Col>
              <Col lg="6">
                <img src={data?.field_photo[0]?.uri?.url} />
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
              <p>{data.field_biotext}</p>
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
  
            };
export default PersonFullDisplay;