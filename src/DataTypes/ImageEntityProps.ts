import {EntityComponentProps} from "./EntityComponentProps";
import ImageDataInterface from "./ImageDataInterface";


class ImageEntityProps extends EntityComponentProps {

  data: Promise<ImageDataInterface>;

}


export default ImageEntityProps;
