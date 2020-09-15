import {EntityComponentProps} from "./EntityComponentProps";

interface ImageStyleAttributesInterface {
  srcSet: string;
  className: string;
  "data-aspectratio": string;
  "data-sizes": string;
  style: object;
}

interface ImageStyleObjectInterface {
  srcSet: string;
  imageAttributes: ImageStyleAttributesInterface;
}


class ImageStyleObject implements ImageStyleObjectInterface {

  thumbnail: string;
  medium: string;
  large: string;
  fullscreen: string;
  [propName: string]: any; // Other sizes

  constructor(values: Array<object> = null) {
    if (values !== null) {
      this.reduce(values);
    }
  }

  reduce(values) {
    console.debug("Values reducer:", values);
    const reduced = values.reduce(this.reducer);
    Object.assign(this, reduced);
  }

  reducer(accumulator = {}, currentValue, idx, sourceArray ) {
    const keys = Object.keys(currentValue);
    accumulator[keys[0]] = currentValue[keys[0]];
    return accumulator;
  }
  
  getStyleByMachineName(styleName: string) : string | null {
    return this[styleName] as string ?? null;
  }

  get srcSet(): string {
    return `${this.thumbnail} 100w, ${this.medium} 220w, ${this.large} 480w, ${this.fullscreen} 1920w`;
  }

  get imageAttributes() : ImageStyleAttributesInterface {
    return {
      srcSet: this.getSrcSet(),
      className: "lazyload",
      "data-aspectratio": "220/150",
      "data-sizes": "auto",
      style: {
        objectFit: "cover",
      }
    }
  }
}


class HolderImageStyleObject implements ImageStyleObjectInterface {

  include: "&include=field_media_image,bundle"
  ecp: EntityComponentProps;

  constructor(props) {
    console.log("HolderImageStyleObject", props);
    if (props.id && props.type) {
      this.ecp = new EntityComponentProps(props);
    }
  }

  get srcSet() {
    return `"holder.js/100x100" 100w, "holder.js/220x220" 220w, "holder.js/480x480" 480w, "holder.js/1920x1080" 1920w`;
  }

  async getData() {
    console.debug(this.ecp);
    return this.ecp.getData(this.include);
  }

  get imageAttributes() {
    return {
      srcSet: this.getSrcSet(),
      className: "lazyload",
      "data-aspectratio": "220/150",
      "data-sizes": "auto",
      style: {
        objectFit: "cover",
      }
    }
  }

  getStyleByMachineName(): string {
    return this.srcSet;
  }

}

export {ImageStyleObject as default, HolderImageStyleObject, ImageStyleObjectInterface};
