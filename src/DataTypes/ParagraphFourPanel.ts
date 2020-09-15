import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';



interface ParagraphFourPanelInterface extends RevisionableEntityInterface {

}

class ParagraphFourPanel extends RevisionableEntity {

  hasData(): boolean{
    return false;
  }

  getIncluded(): string {
    return "";
  }

}

export {ParagraphFourPanel as default, ParagraphFourPanelInterface}