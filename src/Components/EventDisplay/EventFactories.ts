import EventConference from "../../DataTypes/EventConference";
import EventMeeting from "../../DataTypes/EventMeeting";
import EventSummit from "../../DataTypes/EventSummit";
import { EntityInterface } from "../../DataTypes/Entity";

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
