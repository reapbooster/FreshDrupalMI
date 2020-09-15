import Entity, {EntityInterface} from "./Entity";
import ImageStyleObject, { ImageStyleObjectInterface } from './ImageStyleObject';
import File, {FileInterface} from './File';

interface ImageFileMetaDataInterface {
  alt: string;
  title: string;
  width: number;
  height: number;
}


interface ImageFileInterface extends FileInterface {
  filemime: string;
  filename: string;
  filesize: number;
  image_style_uri: Array<object>;
  meta: ImageFileMetaDataInterface;
  status: boolean;

}

class ImageFile extends File implements FileInterface {
  filemime: string;
  filename: string;
  filesize: number;
  _image_style_uri: ImageStyleObjectInterface;
  meta: ImageFileMetaDataInterface;
  status: boolean;

  constructor(incoming: ImageFileInterface) {
    const incomingImageStyles = incoming.image_style_uri || null;
    delete incoming.image_style_uri;
    super(incoming);
    if (incomingImageStyles) {
      this.setImageStyles(incomingImageStyles);
    }
  }

  get imageMultiUrl(): string {
    return this.imageStyleObject.srcSet();
  }

  get imageStyleObject(): ImageStyleObjectInterface | null {
    return this._image_style_uri ?? null;
  }

  set image_style_uri(incoming: ImageStyleObjectInterface) {
    this._image_style_uri = incoming;
  }

  setImageStyles(incoming: Array<object>) {
    this._image_style_uri = ImageStyleObject.factory(incoming);
  }

}


export { ImageFile as default, ImageFileInterface, ImageFileMetaDataInterface }
