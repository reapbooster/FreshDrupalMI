import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import moment from "moment";
import { NodeArticle, NodeArticleInterface } from "../../DataTypes/NodeArticle";
import SlideDisplay from "../SlideDisplay";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";

export interface ArticleCardProps {
  data: NodeArticleInterface;
  view_mode: string;
  key?: number;
}

const StyledLink = styled.a`
  border: 1px solid orange;
`;

const ArticleCard = (props: ArticleCardProps) => {
  const { data, view_mode, key } = props;
  const DataObject = new NodeArticle(data);
  const [articleData, setArticleData] = useState(DataObject);
  if (!articleData.hasData()) {
    const ecp = new EntityComponentProps(articleData);
    ecp
      .getData(articleData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setArticleData(new NodeArticle(ajaxData.data));
      });
    return <Loading />;
  }
  console.debug("Article Card", articleData);

  const created = moment(articleData.created, moment.ISO_8601);
  return (
    <>
      <Card className="my-5">
        <SlideDisplay
          data={articleData.field_promo_slide}
          view_mode="thumbnail"
        />
        <Card.Body style={{ minHeight: "150px" }}>
          <Card.Title>
            <StyledLink href={articleData.path.alias}>
              {articleData.title}
            </StyledLink>
          </Card.Title>
        </Card.Body>
        <Card.Footer>{created.format("MMMM D, YYYY")}</Card.Footer>
      </Card>
    </>
  );
};

export default ArticleCard;
