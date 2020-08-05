
import React from 'react';
import { EntityComponentProps, EntityComponentPropsInterface } from "../../DataTypes/EntityComponentProps";
import SlideDataInterface from "../../DataTypes/SlideDataInterface";
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";
import {Col, Container} from "react-bootstrap";

interface ParagraphSlideProps extends EntityComponentPropsInterface {
  key: number;
  field_slides: Array<SlideDataInterface>;
  field_text_size: string;
}


class ParagraphPullQuote extends EntityComponentBase<ParagraphSlideProps, EntityComponentState> {

  static defaultProps = {
    view_mode: "full"
  }

  render(): React.ReactNode {
    console.log("Paragraph Pull Quote", this.props, this.state);
    if (this.state.loaded) {
      return (
        <Col lg={12}>
          <Container py={"2rem"}>
            <h1 className={"this.state.attributes.field_text_size"}
                dangerouslySetInnerHTML={{__html: this.state.attributes.field_body.processed}}></h1>
          </Container>
        </Col>
      )
    } else if (this.state.loading) {
      return(
        <Col key={this.props.key}>
          <Loading />
        </Col>
      );
    } else {
      return (
        <Col key={this.props.key}><h1>No Content Available</h1></Col>
      )
    }
  }

}

export default ParagraphPullQuote;
