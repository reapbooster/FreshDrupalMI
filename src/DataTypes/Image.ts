import Entity, {EntityInterface} from "./Entity";

interface ImageMetaDataInterface {
  alt: string;
  title: string;
  width: number;
  height: number;
}


interface ImageInterface extends EntityInterface{
  meta: ImageMetaDataInterface;
}

class Image extends Entity implements ImageInterface {

}


export { Image as default, ImageInterface, ImageMetaDataInterface }
