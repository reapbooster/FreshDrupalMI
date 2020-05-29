
import React from 'react';
import {Col, Grid, Navbar, Row, Nav, NavItem, PanelGroup, Panel, Alert, Container} from 'react-bootstrap';
import { EntityComponentPropsInterface } from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";
import EntityQueue from '../EntityQueue';

interface ParagraphFourPanelProps extends EntityComponentPropsInterface {
  key: number;
  field_queue?: EntityComponentPropsInterface;
  field_term?: EntityComponentPropsInterface;
}


class ParagraphFourPanel extends EntityComponentBase<ParagraphFourPanelProps, EntityComponentState> {

  static defaultProps = {
    view: "card"
  }

  render(): React.ReactNode {
    console.log("Paragraph Slide", this.props, this.state);
    if (this.state.loaded) {
      if (this.state.attributes?.field_queue) {
        return (
          <div key={this.props.key}>
            <EntityQueue
              view={"card"}
              {...this.state.attributes?.field_queue} />
          </div>
        )
      }
      return (
        <h1>ParagraphFourPanel</h1>
      )
    } else if (this.state.loading) {
      return(
        <div key={this.props.key}>
          <Loading />
        </div>
      );
    } else {
      return (
        <h1 key={this.props.key}>No Content Available</h1>
      )
    }
  }

}

export default ParagraphFourPanel;
