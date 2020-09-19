import React from 'react';
import { Container } from 'react-bootstrap';
import { NodeLandingPageInterface } from '../../DataTypes/NodeLandingPage'
import ParagraphDisplayList from '../ParagraphDisplay/ParagraphDisplayList'

interface NodeLandingPageDisplayProps {
  data: NodeLandingPageInterface;
  view_mode: string;
}

const NodeLandingPageDisplay: React.FunctionComponent = (props: NodeLandingPageDisplayProps) => {

  return (
    <>
      <Container>
        <ParagraphDisplayList items={props.data.field_content} />
      </Container>
    </>
  )
};

export { NodeLandingPageDisplay as default }
