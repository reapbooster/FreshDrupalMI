import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';
import {ColorObjectInterface} from "./ColorObject";
import BodyField, { BodyFieldInterface } from "../Fields/BodyField";



interface ParagraphPullQuoteInterface extends RevisionableEntityInterface {
  field_alignment: string;
  field_background_color: ColorObjectInterface;
  field_body: BodyFieldInterface;
  field_text_size: string;
}

class ParagraphPullQuote extends RevisionableEntity {

  field_alignment: string;
  field_text_size: string;
  private _field_background_color: ColorObjectInterface;
  private _field_body: BodyField;

  get field_background_color(): ColorObjectInterface {
    return this._field_background_color;
  }

  set field_background_color(value: ColorObjectInterface) {
    this._field_background_color = value;
  }

  get field_body(): BodyFieldInterface {
    return this._field_body;
  }

  set field_body(value: BodyFieldInterface) {
    this._field_body = new BodyField(value);
  }


  hasData(): boolean{
    return true;
  }

  getIncluded(): string {
    return "";
  }

}

export {ParagraphPullQuote as default, ParagraphPullQuoteInterface}
