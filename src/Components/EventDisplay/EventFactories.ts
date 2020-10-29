import EventConference from "../../DataTypes/EventConference";
import EventMeeting from "../../DataTypes/EventMeeting";
import EventSummit from "../../DataTypes/EventSummit";
import { EntityInterface } from "../../DataTypes/Entity";
import { EventInterface } from "../../DataTypes/Event";
import EventListItemDisplay from "./EventListItemDisplay";
import { EventCardDisplay } from "./EventCardDisplay";
import { EventDoubleHeightTile } from "./EventDoubleHeightTile";
import { EventFullDisplay } from "./EventFullDisplay";

/**
 * Implementation of the Data Model
 *
 * @param incoming
 */
export const EventDataFactory = (incoming: EntityInterface) => {
  switch (incoming.type) {
    case "event--conference":
      return new EventConference(incoming);
    case "event--meeting":
      return new EventMeeting(incoming);
    case "event--summit":
      return new EventSummit(incoming);
    default:
      console.error("Cannot determine Data Class", incoming);
      throw new Error("Cannot Determine Data Class for ".concat(incoming.type));
  }
};

export const EventComponentFactory = (view_mode: string) => {
  switch (view_mode) {
    case "list":
      return EventListItemDisplay;
    case "card":
    case "tile":
      return EventCardDisplay;
    case "double_height_tile":
      return EventDoubleHeightTile;
    case "full":
      return EventFullDisplay;
    default:
      throw new Error("No valid view mode value.", view_mode);
  }
};
