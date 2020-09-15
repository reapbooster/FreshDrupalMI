import ImageFile, { ImageFileInterface } from './ImageFile';

import ImageStyleObject, { ImageStyleObjectInterface, HolderImageStyleObject } from './ImageStyleObject';
import Media, { MediaInterface } from './Media';

interface MediaImageInterface extends MediaInterface {

  field_media_image: ImageFileInterface;
  field_photo_subject_name: string;
  field_photo_subject_title: string;
  field_photo_subject_org: string;
  
}

class MediaImage extends Media {

  _field_media_image: ImageFile;

  field_photo_subject_name: string;
  field_photo_subject_title: string;
  field_photo_subject_org: string;

  get srcset() {
    return this._image.image_style_uri;
  }

  get field_media_image(): ImageFileInterface {
    return this._field_media_image;
  }

  set field_media_image(incoming: ImageFileInterface) {
    this._field_media_image = new ImageFile(incoming);
  }

  getStyleObject(): ImageStyleObjectInterface {
    if (!this.field_media_image?.image_style_uri?.length) {
      return new HolderImageStyleObject({
        id: this.id,
        type: this.type,
        view_mode: "full",
      });
    }
    return new ImageStyleObject(this.field_media_image.image_style_uri);
  }

}

export { MediaImage as default, MediaImageInterface }