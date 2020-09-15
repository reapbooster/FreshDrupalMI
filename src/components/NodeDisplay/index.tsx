import React from 'react';
import Entity, { EntityInterface } from '../../DataTypes/Entity';
import Node from '../../DataTypes/Node';
import NodeArticleDisplay from "./NodeArticleDisplay";
import NodeEventDisplay from './NodeEventDisplay';
import NodeOpportunityCardDisplay from './NodeOpportunityCardDisplay';
import NodeLandingPageDisplay from "./NodeLandingPageDisplay";
import ErrorBoundary from "../../Utility/ErrorBoundary";

const NodeBundleComponents = {
  "node--article": NodeArticleDisplay,
  "node--landing_page": NodeLandingPageDisplay,
  "node--event": NodeEventDisplay,
  "node--opportunity": NodeOpportunityCardDisplay,
}

const NodeDisplay: React.FunctionComponent = (props: EntityInterface) => {
  if (!props instanceof Entity) {
    const dataWrapper = Node.factory(props);
  } else {
    const dataWrapper = props;
  }
  if (NodeBundleComponents[props.type] === undefined) {
    console.log('cannot find component', props);
    throw new Error("Cannot find component for props.type ".concat(props.type));
  }
  const Component = NodeBundleComponents[props.type];
  return (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
}

export { NodeDisplay as default, NodeBundleComponents };
