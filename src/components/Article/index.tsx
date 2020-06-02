import React from 'react';
import EntityComponentBase from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";
import {Card, Col} from "react-bootstrap";
import moment from 'moment';
import styled from 'styled-components'


const StyledLink = styled.a`
    border: 1px solid orange;
`;


class Article extends EntityComponentBase {

  include = "&include=field_promo_slide,field_promo_slide.field_background_image"


  componentDidMount(): void {
    if (!this.state.loaded && !this.state.loading) {
      this.getDataForComponent(this.include)
    }
  }




  render() {
    if (this.state.loaded) {
      switch(this.props.view_mode) {
        case "card":
          const item = this.state.attributes;
          const created = moment(item.changed, moment.ISO_8601);
          return (
              <Card className="my-5">
                <Card.Img
                  id={"card-image-".concat()}
                  src={item.field_promo_slide?.field_background_image?.image_style_uri[7]?.thumbnail}/>
                <Card.Body style={{minHeight: "150px"}}>
                  <Card.Title><StyledLink href={item.path.alias}>{item.title}</StyledLink></Card.Title>
                </Card.Body>
                <Card.Footer>{created.format('MMMM D, YYYY')}</Card.Footer>
              </Card>
          );
          break;


        default:
          return (<ArticleFull {...this.state.attributes} />);
      }
    } else if (this.state.loading == true) {
      return (<Loading />);
    } else {
      return (<h1>No data Available</h1>);
    }

  }

}


export default Article;
