import {EntityComponentProps} from "./EntityComponentProps";


class ImageStyleObject {

  constructor(values = null) {
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

  public static factory(values) {
    var toReturn = Object.assign({}, this);
    toReturn.constructor(values);
    return toReturn;
  }

  getStyleByMachineName(styleName) {
    return (this[styleName] !== undefined)? this[styleName] : null;
  }

  getSrcSet() {
    return `${this['thumbnail']} 100w, ${this['medium']} 220w, ${this['large']} 480w, ${this['fullscreen']} 1920w`;
  }

  getImgAttributes() {
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


class HolderImageStyleObject {

  include: "&include=field_media_image,bundle"
  ecp: EntityComponentProps;

  constructor(props) {
    if (props.id && props.type) {
      this.ecp = new EntityComponentProps(props);
    }
  }

  getSrcSet() {
    return '"holder.js/100x100" 100w, "holder.js/220x220" 220w, "holder.js/480x480" 480w, "holder.js/1920x1080" 1920w'
  }

  getData() {
    return this.ecp.getData(this.include)
  }

  getImgAttributes() {
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

export {ImageStyleObject as default, HolderImageStyleObject};
