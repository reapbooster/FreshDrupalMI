import React from 'react';
import { Container } from 'react-bootstrap';
import NodeLandingPage, { NodeLandingPageInterface } from '../../DataTypes/NodeLandingPage'
import ParagraphDisplay from '../ParagraphDisplay';
import {ParagraphList} from "../ParagraphList";

interface NodeLandingPageDisplayProps {
  data: NodeLandingPageInterface;
  view_mode: string;
}

const NodeLandingPageDisplay: React.FunctionComponent = (props: NodeLandingPageDisplayProps) => {

  return (
    <>
      <Container>
        <ParagraphList items={props.data.field_content} />
      </Container>
    </>
  )
};

export { NodeLandingPageDisplay as default }
