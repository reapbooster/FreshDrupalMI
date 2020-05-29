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
      columnCount: Number(this.props.field_field_num_text_columns || 1)
    };
    console.log("Paragraph Text", this.props, this.state);
    if (this.state.loaded) {
      return (
        <Container>
          <Row>
            <Col>
              <div style={textStyle}
                   dangerouslySetInnerHTML={{__html: this.state.attributes.field_body.value}} />
            </Col>
          </Row>
        </Container>
      );
    } else if (this.state.loading) {
      return (
        <div key={this.props.key}>
          <Loading/>
        </div>
        );
    } else {
      return (
        <>
          <h1 key={this.props.key}>No Content Available</h1>
        </>
      )
    }
  }

}

export default ParagraphText;
