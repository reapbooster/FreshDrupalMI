import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { EntityComponentPropsInterface } from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, { EntityComponentState } from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";
import TextField from "../../DataTypes/TextField";

interface ParagraphTextProps extends EntityComponentPropsInterface {
  key: number;
  field_body: TextField;
  field_num_text_columns: number;
}


class ParagraphText extends EntityComponentBase<ParagraphTextProps, EntityComponentState> {

  static defaultProps = {
    view_mode: "full"
  }

  render() {
    const textStyle={
      columnCount: Number(this.props.field_field_num_text_columns || 1),
      paddingTop: "2rem",
      paddingBottom: "2rem",
    };
    console.log("Paragraph Text", this.props, this.state);
    if (this.state.loaded) {
      return (
        <Col key={this.props.key} lg={12}>
          <Container>
            <p style={textStyle}
               dangerouslySetInnerHTML={{__html: this.state.attributes.field_body.value}} />
          </Container>
        </Col>
      );
    } else if (this.state.loading) {
      return (
        <Col key={this.props.key} lg={12}>
          <Loading/>
        </Col>
        );
    } else {
      return (
        <Col
          key={this.props.key}
          lg={12}><h1 key={this.props.key}>No Content Available</h1></Col>
      )
    }
  }

}

export default ParagraphText;
