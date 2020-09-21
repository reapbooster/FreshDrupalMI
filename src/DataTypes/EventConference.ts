import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";

type EventConferenceInterface = RevisionableEntityInterface;

class EventConference extends RevisionableEntity {}

export { EventConference as default, EventConferenceInterface };
