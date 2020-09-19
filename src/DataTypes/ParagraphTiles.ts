import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';



interface ParagraphTilesInterface extends RevisionableEntityInterface {

}

class ParagraphTiles extends RevisionableEntity implements  ParagraphTilesInterface{

  hasData(): boolean{
    return true;
  }

  getIncluded(): string {
    return "";
  }

}

export {ParagraphTiles as default, ParagraphTilesInterface}
