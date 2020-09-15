import React from 'react';
import { NodeLandingPageInterface } from '../../DataTypes/Node'

interface NodeLandingPageDisplayProps extends NodeLandingPageInterface {}

const NodeLandingPageDisplay: React.FunctionComponent = (props: NodeLandingPageDisplayProps) => {
  console.debug("Node Landing Page", props);
  if (props.field_content)
  return (
    <>
      <div>
        <h1>NodeLandingPageDisplay</h1>
      </div>
    </>
  )
};

export { NodeLandingPageDisplay as default }