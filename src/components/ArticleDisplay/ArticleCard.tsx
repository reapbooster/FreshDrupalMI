import React, { useState } from 'react';
import {Card} from 'react-bootstrap';
import styled from 'styled-components'
import * as ArticleDatatype from '../../DataTypes/Article'
import moment from 'moment';


const StyledLink = styled.a`
    border: 1px solid orange;
`;

const ArticleCard = ( props: ArticleDatatype.default ) => {
  const created = moment(props.created, moment.ISO_8601);
  return (
      <>
        <Card className="my-5">
          <Card.Img
              id={"card-image-".concat()}
              src={props.field_promo_slide?.field_background_image?.image_style_uri[7]?.thumbnail}/>
          <Card.Body style={{minHeight: "150px"}}>
              <Card.Title><StyledLink href={props.path.alias}>{props.title}</StyledLink></Card.Title>
          </Card.Body>
          <Card.Footer>{created.format('MMMM D, YYYY')}</Card.Footer>
        </Card>
      </>
  );

}

export default ArticleCard;
