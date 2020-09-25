import React, { useState } from 'react';
import Loading from '../Loading';
import Entity, { EntityInterface } from '../../DataTypes/Entity';
import Node, {NodeInterface} from '../../DataTypes/Node';
import NodeArticleDisplay from "./NodeArticleDisplay";
import NodeEventDisplay from './NodeEventDisplay';
import NodeOpportunityCardDisplay from './NodeOpportunityCardDisplay';
import NodeLandingPageDisplay from "./NodeLandingPageDisplay";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { EntityComponentProps } from '../../DataTypes/EntityComponentProps';
import NodeLandingPage from "../../DataTypes/NodeLandingPage";
import NodeOpportunity from "../../DataTypes/NodeOpportunity";
import NodeEvent from "../../DataTypes/NodeEvent";
import NodeArticle from "../../DataTypes/NodeArticle";

/**
 * Create Data Model
 *
 * @param incoming: NodeInterface
 */
function NodeDataFactory(incoming: NodeInterface): Node {
  console.debug("NodeDataFactory", incoming);
  switch (incoming.type) {
    case "node--landing_page":
      return new NodeLandingPage(incoming);
    case "node--opportunity":
      return new NodeOpportunity(incoming);
    case "node--event":
      return new NodeEvent(incoming);
    case "node--article":
      return new NodeArticle(incoming);
    default:
      console.error("Cannot determine Data Class", incoming);
      throw new Error("Cannot Determine Data Class for ".concat(incoming.type));
  }
}

/**
 * Create View Component
 *
 * @param incoming: NodeInterface
 */
function NodeComponentFactory(incoming) : React.FunctionComponent {
  console.debug("NodeComponentFactory", incoming);
  switch (incoming.type) {
    case "node--article":
      return NodeArticleDisplay;
    case "node--landing_page":
      return NodeLandingPageDisplay;
    case "node--event":
      return NodeEventDisplay;
    case "node--opportunity":
      return NodeOpportunityCardDisplay;
    default:
      console.error("Cannot determine Component", incoming);
      throw new Error("Cannot Determine Component for ".concat(incoming.type));
  }
}


/**
 * Create the Controller
 *
 * @param props: NodeDisplayProps
 */

interface NodeDisplayProps {
  key?: number;
  data: NodeInterface;
  view_mode: string;
}

const NodeDisplay: React.FunctionComponent = (props: EntityInterface) => {
  const {key, data, view_mode} = props;
  const [ nodeData, setNodeData ] = useState(NodeDataFactory(data));
  console.debug("NodeDisplay", nodeData);
  if (!nodeData.hasData()) {
    const ecp = new EntityComponentProps(nodeData);
    ecp.getData(nodeData.getIncluded())
    .then(res => res.json())
    .then((remoteData) => {
      console.debug("NodeData back from json", remoteData);
      setNodeData(NodeDataFactory(remoteData.data));
    });
    return (
      <div>
        <Loading />
      </div>
    )
  }
  const Component = NodeComponentFactory(nodeData.data);
  return (
    <ErrorBoundary key={key ?? 0}>
      <Component
        data={nodeData}
        view_mode={view_mode} />
    </ErrorBoundary>
  );
}

export { NodeDisplay as default, NodeDisplayProps, NodeDataFactory, NodeComponentFactory };
