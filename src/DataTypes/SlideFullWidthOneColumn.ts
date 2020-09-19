import Slide, {SlideInterface, SlideKeyValueText, SlideKeyValueTextInterface} from "./Slide";
import ColorObject, {ColorObjectInterface} from "./ColorObject";
import ImageFile, {ImageFileInterface} from "./ImageFile";
import SlideType, {SlideTypeInterface} from "./SlideType";
import Link, {LinkInterface} from './LinkList';


interface SlideFullWidthOneColumnInterface extends SlideInterface {

  field_background_color: ColorObjectInterface;
  field_link: boolean;
  field_promoted: boolean;
  field_published: boolean;
  field_text_color: ColorObjectInterface;
  slide_type: SlideTypeInterface;
  field_background_image: ImageFileInterface;
  field_slide_text: Array<SlideKeyValueTextInterface>;

}

class SlideFullWidthOneColumn  implements SlideFullWidthOneColumnInterface {

  private _field_background_color: ColorObjectInterface;
  private _field_background_image: ImageFile;
  private _field_link: Link;
  private _field_slide_text: Array<SlideKeyValueTextInterface>;
  private _field_text_color: ColorObjectInterface;
  private _slide_type: SlideType;
  field_promoted: boolean;
  field_published: boolean;

  constructor(incoming: SlideInterface) {
    Object.assign(this, incoming);
    this.field_background_color = incoming.field_background_color ?? null;
    this.field_background_image = incoming.field_background_image ?? null;
    this.field_link = incoming.field_link ?? null;
    this.field_slide_text = incoming.field_slide_text ?? null;
    console.debug('SlideFullWidthOneColumn', this);
  }

  get field_background_color(): ColorObjectInterface {
    return this._field_background_color;
  }

  set field_background_color(value: ColorObjectInterface) {
    this._field_background_color = new ColorObject(value);
  }

  get field_background_image(): ImageFileInterface {
    return this._field_background_image;
  }

  set field_background_image(value: ImageFileInterface) {
    this._field_background_image = new ImageFile(value);
  }

  get field_link(): LinkInterface {
    return this._field_link;
  }

  set field_link(value: LinkInterface) {
    this._field_link = new Link(value);
  }

  get field_slide_text(): Array<SlideKeyValueTextInterface> {
    return this._field_slide_text;
  }

  set field_slide_text(value: Array<SlideKeyValueTextInterface>) {
    this._field_slide_text = value.map((item) => new SlideKeyValueText(item));
  }

  get field_text_color(): ColorObjectInterface {
    return this._field_text_color;
  }

  set field_text_color(value: ColorObjectInterface) {
    this._field_text_color = value;
  }

  get slide_type(): SlideType {
    return this._slide_type;
  }

  set slide_type(value: SlideType) {
    this._slide_type = value;
  }
}

export {SlideFullWidthOneColumn as default, SlideFullWidthOneColumnInterface};
