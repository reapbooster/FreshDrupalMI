import React, { useState } from 'react';
import Loading from '../Loading';
import Entity, { EntityInterface } from '../../DataTypes/Entity';
import Node from '../../DataTypes/Node';
import NodeArticleDisplay from "./NodeArticleDisplay";
import NodeEventDisplay from './NodeEventDisplay';
import NodeOpportunityCardDisplay from './NodeOpportunityCardDisplay';
import NodeLandingPageDisplay from "./NodeLandingPageDisplay";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { EntityComponentProps } from '../../DataTypes/EntityComponentProps';

const NodeBundleComponents = {
  "node--article": NodeArticleDisplay,
  "node--landing_page": NodeLandingPageDisplay,
  "node--event": NodeEventDisplay,
  "node--opportunity": NodeOpportunityCardDisplay,
}

const NodeDisplay: React.FunctionComponent = (props: EntityInterface) => {

  const {nodeData, setNodeData} = useState(Node.factory(props));

  if (!nodeData.hasData()) {
    const ecp = new EntityComponentProps(nodeData);
    ecp.getData(nodeData.getIncluded())
    .then(res => res.json())
    .then((remoteData) => {
      console.debug("NodeData", remoteData);
      setNodeData(Node.factory(remoteData.data));
    });
    return (
      <div>
        <Loading />
      </div>
    )
  }
  if (NodeBundleComponents[props.type] === undefined) {
    console.error('cannot find component', props);
    throw new Error("Cannot find component for props.type ".concat(props.type));
  }
  const Component = NodeBundleComponents[props.type];
  return (
    <ErrorBoundary>
      <Component data={nodeData} />
    </ErrorBoundary>
  );
}

export { NodeDisplay as default, NodeBundleComponents };
