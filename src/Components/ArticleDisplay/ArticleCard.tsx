import React, { useState } from 'react';
import {Card} from 'react-bootstrap';
import styled from 'styled-components'
import NodeArticle, {NodeArticleInterface} from "../../DataTypes/NodeArticle";
import moment from 'moment';
import {SlideDataFactory, SlideComponentFactory} from "../SlideDisplay";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";


export interface ArticleCardProps {
  data: NodeArticleInterface;
  view_mode: string;
  key?: number;
}

const StyledLink = styled.a`
    border: 1px solid orange;
`;

const ArticleCard = ( props: ArticleDatatype.default ) => {
  const {data, view_mode, key} = props;
  const DataObject = new NodeArticle(data);
  const [articleData, setArticleData] = useState(DataObject);
  if (!articleData.hasData()) {
    const ecp = EntityComponentProps(articleData);
    ecp.getData(articleData.getIncluded())
      .then(res => res.json())
      .then(ajaxData => {
        setArticleData(new NodeArticle(ajaxData.data));
      });
    return (<Loading />);
  }
  console.debug("Article Card", articleData);
  var slide = [];
  if (articleData.field_promo_slide) {
    const promoSlide = SlideDataFactory(articleData.field_promo_slide);
    const SlideComponent = SlideComponentFactory(articleData.field_promo_slide);
    slide = (
      <ErrorBoundary>
        <SlideComponent
          data={promoSlide}
          view_mode={"card"} />
      </ErrorBoundary>
    );
  }


  const created = moment(articleData.created, moment.ISO_8601);
  return (
      <>
        <Card className="my-5">
          {slide}
          <Card.Body style={{minHeight: "150px"}}>
              <Card.Title><StyledLink href={articleData.path.alias}>{articleData.title}</StyledLink></Card.Title>
          </Card.Body>
          <Card.Footer>{created.format('MMMM D, YYYY')}</Card.Footer>
        </Card>
      </>
  );

}

export default ArticleCard;
