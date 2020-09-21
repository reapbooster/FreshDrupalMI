import Node, { NodeInterface } from "./Node";

type NodeEventInterface = NodeInterface;

class NodeEvent extends Node implements NodeEventInterface {
  hasData(): boolean {
    return false;
  }

  getIncluded() {
    return "";
  }
}

export { NodeEvent as default, NodeEventInterface };
