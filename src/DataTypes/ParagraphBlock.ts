import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';



interface ParagraphBlockInterface extends RevisionableEntityInterface {

}

class ParagraphBlock extends RevisionableEntity {

  hasData(): boolean{
    return false;
  }

  getIncluded(): string {
    return "";
  }

}

export {ParagraphBlock as default, ParagraphBlockInterface}