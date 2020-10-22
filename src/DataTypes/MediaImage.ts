import ImageFile, { ImageFileInterface } from "./ImageFile";

import ImageStyleObject, {
  ImageStyleObjectInterface,
  HolderImageStyleObject,
} from "./ImageStyleObject";
import Media, { MediaInterface } from "./Media";

interface MediaImageInterface extends MediaInterface {
  field_media_image: ImageFileInterface;
  field_photo_subject_name: string;
  field_photo_subject_title: string;
  field_photo_subject_org: string;
}

class MediaImage extends Media implements MediaImageInterface {
  _thumbnail: ImageFile;

  _field_media_image: ImageFile;

  field_media_in_library: boolean;

  field_photo_subject_name: string;

  field_photo_subject_title: string;

  field_photo_subject_org: string;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded(): string {
    return "&include=field_media_image,thumbnail";
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

  get srcset() {
    return this._image.image_style_uri;
  }

  get field_media_image(): ImageFileInterface {
    return this._field_media_image;
  }

  set field_media_image(incoming: ImageFileInterface) {
    this._field_media_image = new ImageFile(incoming);
  }

  get thumbnail(): ImageFileInterface {
    return this._thumbnail;
  }

  set thumbnail(incoming: ImageFileInterface) {
    this._thumbnail = new ImageFile(incoming);
  }

  get imageAttributes(): Record<string, any> {
    if (this.hasData()) {
      return this.styleObject.imageAttributes;
    }
    return null;
  }

  get styleObject(): ImageStyleObjectInterface {
    if (!this.field_media_image?.image_style_uri?.length) {
      return new HolderImageStyleObject({
        id: this.id,
        type: this.type,
        view_mode: "full",
      });
    }
    return new ImageStyleObject(this.field_media_image.image_style_uri);
  }

  getThumbnail(): ImageFileInterface {
    return this.field_media_image?.imageStyleObject?.thumbnail;
  }
}

export { MediaImage as default, MediaImageInterface };
