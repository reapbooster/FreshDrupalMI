import React from 'react';
import {NodeInterface} from "../../DataTypes/Node";
import NodeDisplay from '../EventDisplay';

interface NodeDisplayListProps {
  items: Array<NodeInterface>;
  view_mode: string;
}


const NodeDisplayList: React.FunctionComponent = (props: NodeDisplayListProps) => {
  return (
    <>
      {props.items.map((item) => {
        return (
          <NodeDisplay item={item} view_mode={props.view_mode} />
        );
      })}
    </>
  );
}

export {NodeDisplayList as default, NodeDisplayListProps}
