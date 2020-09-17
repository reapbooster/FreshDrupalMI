import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';
import PathObject, {PathObjectInterface} from './PathObject';
// import NodeEvent from './NodeEvent';
import NodeArticle from './NodeArticle';
import NodeOpportunity from './NodeOpportunity';
import NodeLandingPage from './NodeLandingPage';

interface NodeInterface extends RevisionableEntityInterface {

  drupal_internal__nid: number;
  path: PathObjectInterface;
  promoted: boolean;
  status: boolean;
  sticky: boolean;
  hasData(): boolean;
  getIncluded(): string;

 }

abstract class Node extends RevisionableEntity implements NodeInterface {

  drupal_internal__nid: number;
  _path: PathObject;
  promoted: boolean;
  status: boolean;
  sticky: boolean;

  get path(): PathObjectInterface {
    return this._path;
  }

  set path(incoming: PathObjectInterface) {
    this._path = new PathObject(incoming);
  }

  abstract hasData(): boolean;

  abstract getIncluded(); string;

  public static factory(incoming) {
    console.debug("node.factory", incoming);
    switch (incoming.type) {
      case "node--landing_page":
        return new NodeLandingPage(incoming);
      case "node--opportunity":
        return new NodeOpportunity(incoming);
     // case "node--event":
     //   return new NodeEvent(incoming);
      case "node--article":
        return new NodeArticle(incoming);
      default:
        console.error("Cannot determine Data Class", incoming);
        throw new Error("Cannot Determine Data Class for ".concat(incoming.type));
    }
  }

 }

export { Node as default, NodeInterface }
