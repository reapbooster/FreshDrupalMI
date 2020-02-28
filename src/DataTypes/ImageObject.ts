
interface ImageMetaData {
  alt: string;
  title: string;
  width: number;
  height: number;
}


interface ImageObject {
  type: string;
  id: string;
  meta: ImageMetaData;
}



export { ImageMetaData, ImageObject }
