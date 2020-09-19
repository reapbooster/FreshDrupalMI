import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';



interface ParagraphBodyContentInterface extends RevisionableEntityInterface {

}

class ParagraphBodyContent extends RevisionableEntity {

  hasData(): boolean{
    return true;
  }

  getIncluded(): string {
    return "";
  }

}

export {ParagraphBodyContent as default, ParagraphBodyContentInterface}
