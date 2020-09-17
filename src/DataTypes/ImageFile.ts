import Entity, {EntityInterface} from "./Entity";
import ImageStyleObject, { ImageStyleObjectInterface } from './ImageStyleObject';
import File, {FileInterface} from './File';

interface ImageFileMetaDataInterface {
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
}


interface ImageFileInterface extends FileInterface {
  filemime: string;
  filename: string;
  filesize: number | string;
  image_style_uri: Array<object>;
  meta: ImageFileMetaDataInterface;
  status: boolean;

}

class ImageFile extends File implements ImageFileInterface {
  filemime: string;
  filename: string;
  filesize: number | string;
  _image_style_uri: ImageStyleObject;
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
  
  get image_style_uri() : ImageStyleObjectInterface {
    return this._image_style_uri;
  }

  set image_style_uri(incoming) {
    this._image_style_uri = new ImageStyleObject(incoming);
  }

  hasData(): boolean {
    return (intval(this.filesize) > 0);
  }
  
  getIncluded(): string {
    return "";
  }

  get imageMultiUrl(): string {
    return this.imageStyleObject.srcSet();
  }

  get imageStyleObject(): ImageStyleObjectInterface | null {
    return this._image_style_uri ?? null;
  }

  setImageStyles(incoming: Array<object>) {
    this._image_style_uri = ImageStyleObject.factory(incoming);
  }

}


export { ImageFile as default, ImageFileInterface, ImageFileMetaDataInterface }
