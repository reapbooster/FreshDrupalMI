import Entity, {EntityInterface} from "./Entity";
import ParagraphsType, {ParagraphsTypeInterface} from "./ParagraphsType";





interface ParagraphInterface extends EntityInterface {

  paragraph_type: ParagraphsTypeInterface;

  created: string;
  default_langcode: boolean;
  langcode: string;
  parent_field_name: string;
  parent_id: string;
  parent_type: string;
  status: boolean;


}


abstract class Paragraph extends Entity implements ParagraphInterface{

  _paragraph_type: ParagraphsType;

  _created: Date;
  default_langcode: boolean;
  langcode: string;
  parent_field_name: string;
  parent_id: string;
  parent_type: string;
  status: boolean;


  get paragraph_type(): ParagraphsTypeInterface {
    return this._paragraph_type;
  }

  set paragraph_type(incoming: ParagraphsTypeInterface) {
    this._paragraph_type = new ParagraphsType(incoming);
  }

  abstract hasData(): boolean;

  abstract getIncluded(): string;

}


export {Paragraph as default, ParagraphInterface}
