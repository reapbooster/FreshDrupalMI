import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import * as DataObject from "../../DataTypes/ParagraphLinkBar";
import styled from "styled-components";

interface ParagraphDisplayLinkBarProps {
  data: DataObject.default;
}

const ParagraphDisplayLinkBar: React.FunctionComponent = (
  props: ParagraphDisplayLinkBarProps
) => {
  const { data } = props;

  // Redirect /events/xxxxx to /events/xxxxx/overview for Events Pages with a LinkBar
  let validUrlSegmentList = window.location.pathname.split('/').filter((item)=>{if(item.trim() !== '')return item;});
  if(validUrlSegmentList.length === 2 && validUrlSegmentList[0] === 'events'){
    location.assign('/' + validUrlSegmentList[0] + '/' + validUrlSegmentList[1] + '/overview');
  }


  console.debug("ParagraphDisplayLinkBar: Data ", data);

  const LinkBarContainer = styled.div`
    background-color: #27262C;
    font-family: LatoWebBold;

    & a {
      color: #FFF;
      text-decoration: none;
      & h2 {
        font-size: 0.7em;
        padding: 2.75em 0 !important;
      }
    }

    & .active {
      background-color: #07060A;
    }

    & .row:hover .active {
      background-color: #27262C;
    }

    & .col:hover, .active:hover {
      background-color: #07060A !important;
      transition: background-color .5s;
    }
  
    @media screen and (min-width: 1200px){
      font-size: 1.25em;
    }
  `;

  return (
    <LinkBarContainer className="container-fluid">
      <Row>
        {
          data.field_links.map((item, key) => {
            item.uri = item.uri.replace("internal:", "");
            let activeLinkClass = (window.location.pathname == item.uri) ? "active" : "";
            return (
              <Col className={activeLinkClass}>
                <a
                  data-link-uri={item.uri}
                  href={item.uri}
                >
                  <h2 className="text-center text-uppercase m-0">
                    {item.title}
                  </h2>
                </a>
              </Col>
            );
          })
        }
      </Row>
    </LinkBarContainer>
  );
};

export { ParagraphDisplayLinkBar as default, ParagraphDisplayLinkBarProps };
