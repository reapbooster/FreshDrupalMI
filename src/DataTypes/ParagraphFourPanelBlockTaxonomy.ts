import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';



interface ParagraphFourPanelBlockTaxonomyInterface extends RevisionableEntityInterface {

}

class ParagraphFourPanelBlockTaxonomy extends RevisionableEntity {

  hasData(): boolean{
    return false;
  }

  getIncluded(): string {
    return "";
  }

}

export {ParagraphFourPanelBlockTaxonomy as default, ParagraphFourPanelBlockTaxonomyInterface}