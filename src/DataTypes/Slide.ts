import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";

export interface SlideKeyValueTextInterface {
  key: string;
  description: string;
  value: string;
  format: string;
  processed: string;
}

export class SlideKeyValueText {
  key: string;

  description: string;

  value: string;

  format: string;

  processed: string;

  constructor(incoming: SlideKeyValueTextInterface) {
    Object.assign(this, incoming);
  }
}

export interface SlideInterface extends RevisionableEntityInterface {
  drupal_internal__id: number;
  getBackgroundImageCss: ReturnType<string>;
}

export abstract class Slide
  extends RevisionableEntity
  implements SlideInterface {
  drupal_internal__id: number;

  getBackgroundImageCss(): string {
    return this.field_background_image
      ? `background-image: url(${this.field_background_image.imageStyleObject?.backgroundImageSet});`
      : "";
  }
}

export default Slide;
