import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';



interface ParagraphPullQuoteInterface extends RevisionableEntityInterface {

}

class ParagraphPullQuote extends RevisionableEntity {

  hasData(): boolean{
    return false;
  }

  getIncluded(): string {
    return "";
  }

}

export {ParagraphPullQuote as default, ParagraphPullQuoteInterface}