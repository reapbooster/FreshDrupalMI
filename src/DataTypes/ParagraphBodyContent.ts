import BodyField, { BodyFieldDisplay, BodyFieldInterface, BodyFieldProps } from "../Fields/BodyField";
import ColorObject, { ColorObjectInterface } from "./ColorObject";
import Paragraph, { ParagraphInterface } from "./Paragraph";

interface ParagraphBodyContentInterface extends ParagraphInterface {
  field_background?: ColorObjectInterface;
  field_body?: BodyFieldInterface;
  field_num_text_columns: number;
}

class ParagraphBodyContent
  extends Paragraph
  implements ParagraphBodyContentInterface {
  _field_background?: ColorObject;
  _field_body?: BodyFieldProps;
  field_num_text_columns: number;

  constructor(incoming: ParagraphBodyContentInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  get field_background(): ColorObjectInterface {
    return this._field_background;
  }

  set field_background(incoming: ColorObjectInterface) {
    this._field_background = new ColorObject(incoming);
  }

  get field_body(): BodyFieldInterface {
    return this._field_body;
  }

  set field_body(incoming: BodyFieldInterface) {
    this._field_body = new BodyField(incoming);
  }


  getIncluded(): string {
    return "";
  }
}

export { ParagraphBodyContent as default, ParagraphBodyContentInterface };
