import { EntityInterface } from "../../DataTypes/Entity";
import ParagraphDisplay from "../ParagraphDisplay";
import NodeDisplay from "../NodeDisplay";
import MediaDisplay from "../MediaDisplay";
import EventDisplay from "../EventDisplay";

export const ListDisplayFactory = (item: EntityInterface) => {
  const [entityTypeId, bundle] = item.type.split("--");
  console.debug("list display factory", entityTypeId);
  switch (entityTypeId) {
    case "paragraph":
      return ParagraphDisplay;
    case "node":
      return NodeDisplay;
    case "media":
      return MediaDisplay;
    case "event":
      return EventDisplay;

    default:
      console.error(`missing display component for ${entityTypeId}`);
      throw new Error(`Missing config for ${entityTypeId}`);
  }
};

export default ListDisplayFactory;
