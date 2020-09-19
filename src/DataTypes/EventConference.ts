import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';

interface EventConferenceInterface extends RevisionableEntityInterface {

}

class EventConference extends RevisionableEntity {

}

export {EventConference as default, EventConferenceInterface}