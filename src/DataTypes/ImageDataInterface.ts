

interface ImageDataInterface {
  type: string,
  id: string,
  links: object,
  drupal_internal__fid: number,
  langcode: string,
  filename: string,
  uri: ImageUrlDataInterface,
  filemime: string,
  filesize: number,
  status: boolean,
  created: string,
  changed: string,
  image_style_uri: Array<object>,
  uid: object
}

interface ImageUrlDataInterface {
  url: string,
  uri: string,
}


export default ImageDataInterface;
