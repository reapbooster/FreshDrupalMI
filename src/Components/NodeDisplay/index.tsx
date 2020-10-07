import React, { useState } from "react";
import Loading from "../Loading";
import { EntityInterface } from "../../DataTypes/Entity";
import { NodeInterface } from "../../DataTypes/Node";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import NodeComponentFactory from "./NodeComponentFactory";
import NodeDataFactory from "./NodeDataFactory";
import ErrorBoundary from "../../Utility/ErrorBoundary";

/**
 * Create the Controller
 *
 * @param props: NodeDisplayProps
 */

export interface NodeDisplayProps {
  data: NodeInterface;
  view_mode: string;
  key?: number;
}

export const NodeDisplay = (props: EntityInterface) => {
  const { data, view_mode, key } = props;
  const DataObject = NodeDataFactory(data);
  const [nodeData, setNodeData] = useState(DataObject);
  console.debug("NodeDisplay => ".concat(nodeData.type), nodeData);
  if (!nodeData.hasData()) {
    const ecp = new EntityComponentProps(nodeData);
    ecp
      .getData(nodeData.getIncluded())
      .then((res) => res.json())
      .then((remoteData) => {
        console.debug("NodeData back from json", remoteData);
        const DataFactory = NodeDataFactory(remoteData.data);
        setNodeData(DataFactory);
      });
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const Component = NodeComponentFactory(nodeData);
  return (
    <ErrorBoundary>
      <Component data={nodeData} view_mode={view_mode} />
    </ErrorBoundary>
  );
};

export default NodeDisplay;
