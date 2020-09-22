import Node, { NodeInterface } from "./Node";

export interface NodeOpportunityInterface extends NodeInterface {

}

class NodeOpportunity extends Node implements NodeOpportunityInterface{

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded() {
    return "";
  }

  hasData(): boolean {
    return true;
  }

}

export { NodeOpportunity as default, NodeOpportunityInterface };
