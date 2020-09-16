import RevisionableEntity, {RevisionableEntityInterface} from '../DataTypes/RevisionableEntity';
import ColorObject, {ColorObjectInterface} from './ColorObject';
import { ImageObject } from './ImageObject';
import ImageFile, {ImageFileInterface} from './ImageFile';
import LinkList, { LinkListInterface } from "./LinkList";
import LinkField, {LinkFieldInterface} from '../Fields/LinkField';
import SlideType, {SlideTypeInterface} from './SlideType';

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
  field_background_color: ColorObjectInterface;
  field_background_image: ImageFileInterface,
  slide_type: SlideTypeInterface,
  drupal_internal__id: number;
  field_link: LinkField,
  field_promoted: boolean,
  field_published: boolean,
  field_slide_text: Array<SlideKeyValueTextInterface>
  field_text_color: ColorObject,

}

class Slide extends RevisionableEntity implements SlideInterface{
  _field_slide_text: SlideKeyValueTextInterface[];
  _field_background_color: ColorObject;
  _field_background_image: ImageObject;
  _field_link: LinkField;
  _field_slide_text: Array<SlideKeyValueTextInterface>;
  _field_text_color: ColorObject;
  _slide_type: SlideType;
  drupal_internal__id: number;
  field_promoted: boolean;
  field_published: boolean;

  get field_background_image(): ImageFileInterface {
    return this._field_background_image;
  }

  set field_background_image(incoming: ImageFileInterface) {
    this._field_background_image = new ImageFile(incoming);
  }

  get field_background_color(): ColorObjectInterface {
    return this._field_background_color;
  }

  set field_background_color(incoming: ColorObjectInterface) {
    this._field_background_color = new ColorObject(incoming);
  }

  get slide_type(): SlideTypeInterface {
    return this._slide_type;
  }

  set slide_type(incoming: SlideTypeInterface) {
    this._slide_type = new SlideType(incoming);
  }
  
  get field_text_color(): ColorObjectInterface {
    return this.field_text_color;
  }

  set field_text_color(incoming: ColorObjectInterface) {
    this.field_text_color = new ColorObject(incoming);
  }

  get field_link(): LinkFieldInterface {
    return this._field_link;
  }

  set field_link(incoming: LinkFieldInterface) {
    this._field_link = new LinkField(incoming);
  }

  get field_slide_text(): SlideKeyValueTextInterface[] {
    return this._field_slide_text;
  }

  set field_slide_text(incoming: SlideKeyValueTextInterface[]) {
    this._field_slide_text = incoming.map((item: SlideKeyValueTextInterface) => new SlideKeyValueText(item));
  }
 
}


export { Slide as default, SlideKeyValueTextInterface, SlideKeyValueText, SlideInterface }
