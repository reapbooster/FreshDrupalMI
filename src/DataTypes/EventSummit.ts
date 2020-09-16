import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';

interface EventSummitInterface extends RevisionableEntityInterface {

}

class EventSummit extends RevisionableEntity {

}

export {EventSummit as default, EventSummitInterface}