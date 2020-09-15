import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';



interface ParagraphSlideInterface extends RevisionableEntityInterface {

}

class ParagraphSlide extends RevisionableEntity {

  hasData(): boolean{
    return false;
  }

  getIncluded(): string {
    return "";
  }

}

export {ParagraphSlide as default, ParagraphSlideInterface}