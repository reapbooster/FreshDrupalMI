import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';
import {ColorObjectInterface} from "./ColorObject";
import {SlideInterface} from "./Slide";



interface ParagraphSlideInterface extends RevisionableEntityInterface {
  field_background_color: ColorObjectInterface;
  field_slides: Array<SlideInterface>
}

class ParagraphSlide  {

  field_background_color: ColorObjectInterface;
  field_slides: Array<SlideInterface>;

  constructor(props: ParagraphSlideInterface) {
    Object.assign(this, props);
    this.field_slides = props.field_slides;
    this.field_background_color = props.field_background_color;
    console.debug("ParagraphSlide constructor", this);
  }

  hasData(): boolean{
    return this.field_slides?.length ? true : false;
  }

  getIncluded(): string {
    return "&include=field_slides";
  }

}

export {ParagraphSlide as default, ParagraphSlideInterface}
