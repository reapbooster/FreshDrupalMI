import RevisionableEntity, {RevisionableEntityInterface} from '../DataTypes/RevisionableEntity';

interface SlideKeyValueTextInterface {
  key: string;
  description: string;
  value: string;
  format: string;
  processed: string;
}

class SlideKeyValueText {
  key: string;
  description: string;
  value: string;
  format: string;
  processed: string;

  constructor(incoming: SlideKeyValueTextInterface) {
    Object.assign(this, incoming);
  }
}


interface SlideInterface extends RevisionableEntityInterface {
  drupal_internal__id: number;
}

abstract class Slide extends RevisionableEntity implements SlideInterface{
  drupal_internal__id: number;
}


export { Slide as default, SlideKeyValueTextInterface, SlideKeyValueText, SlideInterface }
