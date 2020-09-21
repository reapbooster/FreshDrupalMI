import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";

type EventSummitInterface = RevisionableEntityInterface;

class EventSummit extends RevisionableEntity {}

export { EventSummit as default, EventSummitInterface };
