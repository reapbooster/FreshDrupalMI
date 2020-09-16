import React from 'react';
import { EntityComponentProps, EntityComponentPropsInterface } from "../../DataTypes/EntityComponentProps";
import * as ParagraphDataObject from '../../DataTypes/ParagraphFourTileBlockQueue';
import Loading from "../Loading";
import {Col, Container} from "react-bootstrap";
import EntityQueue from '../EntityQueue'

interface ParagraphItemsFromAnEntityQueueProps {
  data: ParagraphDataObject.ParagraphFourTileBlockQueueInterface;
  view_mode: string;
}


const ParagraphItemsFromAnEntityQueue: React.FunctionComponent = (props: ParagraphItemsFromAnEntityQueueProps) {

  console.debug("ParagraphItemsFromAnEntityQueue", props);
  return (
    <Col lg={12} key={this.props.key}>
      <Container py={"2rem"}>
        <EntityQueue data={props.data} view_mode={props.view_mode ?? "full"} />
      </Container>
    </Col>
  );

}

export  { ParagraphItemsFromAnEntityQueue as default, ParagraphItemsFromAnEntityQueueProps };
