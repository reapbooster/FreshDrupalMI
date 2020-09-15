
import React from 'react';
import {Col, Grid, Navbar, Row, Nav, NavItem, PanelGroup, Panel, Alert, Container} from 'react-bootstrap';
import { EntityComponentPropsInterface } from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";
import EntityQueue from '../EntityQueue';
import ParagraphFourPanel from '../../DataTypes/ParagraphFourPanel';
import FourPanel from "../FourPanel";

interface ParagraphFourPanelProps extends EntityComponentPropsInterface {
  data: ParagraphFourPanel;
}


const ParagraphFourPanel: React.FunctionComponent = (props: ParagraphFourPanelProps) => {



    console.debug("Paragraph FourPanel", this.props, this.state);
    if (this.state.loaded) {
      
    } else if (this.state.loading) {
      return(
        <Col key={this.props.key}>
          <Loading />
        </Col>
      );
    } else {
      return (
        <h1 key={this.props.key}>No Content Available</h1>
      )
    }


}

export default ParagraphFourPanel;
