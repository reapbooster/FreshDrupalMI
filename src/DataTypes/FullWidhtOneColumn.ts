import Slide, {SlideInterface, SlideKeyValueTextInterface} from "./Slide";
import {ColorObjectInterface} from "./ColorObject";
import {ImageObjectInterface} from "./Image";


interface FullWidhtOneColumnInterface extends SlideInterface {

  field_background_color: ColorObjectInterface;
  field_link: null,
  field_promoted: false,
  field_published: true,
  field_text_color: ColorObjectInterface,
  slide_type: object,
  field_background_image: ImageObjectInterface,
  field_slide_text: Array<SlideKeyValueTextInterface>

}

class FullWidthOneColumn extends Slide implements FullWidhtOneColumnInterface {



}
