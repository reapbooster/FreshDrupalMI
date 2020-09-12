import React from 'react';
import { EntityComponentProps, EntityComponentPropsInterface } from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";
import {Col, Container} from "react-bootstrap";
import EntityQueue from '../EntityQueue'

interface ParagraphItemsFromAnEntityQueueProps extends EntityComponentPropsInterface {
  key: number;
  field_subqueue: EntityComponentPropsInterface;
  field_view_mode: string;
}


class ParagraphItemsFromAnEntityQueue extends EntityComponentBase<ParagraphItemsFromAnEntityQueueProps, EntityComponentState> {

  static defaultProps = {
    view_mode: "full"
  }

  render(): React.ReactNode {
    console.debug("Paragraph ItemsFromAnEntityQueue", this.props, this.state);
    if (this.state.loaded) {
      return (
        <Col lg={12} key={this.props.key}>
          <Container py={"2rem"}>
            <EntityQueue {...this.props.field_subqueue} view_mode={this.props.field_view_mode} />
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

export default ParagraphItemsFromAnEntityQueue;
