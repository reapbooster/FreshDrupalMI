
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
  console.debug("ParagraphFourPanel", props);
  return (
    <div>
      <h1>Paragraph Four Panel</h1>
    </div>
  )

}

export  {ParagraphFourPanel as default, ParagraphFourPanelProps};
