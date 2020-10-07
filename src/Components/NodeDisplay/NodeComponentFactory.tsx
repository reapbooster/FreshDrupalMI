import NodeArticleDisplay from "./NodeArticleDisplay";
import NodeLandingPageDisplay from "./NodeLandingPageDisplay";
import NodeEventDisplay from "./NodeEventDisplay";
import NodeOpportunityCardDisplay from "./NodeOpportunityCardDisplay";

/**
 * Create View Component
 *
 * @param incoming: NodeInterface
 */
export const NodeComponentFactory = (incoming) => {
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
};

export default NodeComponentFactory;
