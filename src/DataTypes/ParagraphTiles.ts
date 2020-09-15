import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';



interface ParagraphTilesInterface extends RevisionableEntityInterface {

}

class ParagraphTiles extends RevisionableEntity {

  hasData(): boolean{
    return false;
  }

  getIncluded(): string {
    return "";
  }

}

export {ParagraphTiles as default, ParagraphTilesInterface}