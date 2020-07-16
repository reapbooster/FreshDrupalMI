


class ImageStyleObject {

  constructor(values = null) {
    if (values !== null) {
      const reduced = values.reduce(this.reducer);
      console.log("reducer", reduced);
      Object.assign(this, reduced);
      console.log("Image Style Object", this);
    }
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
      dataSizes: "auto",
      className: "lazyload",
      "data-aspectratio": "220/150",
      objectFit: "cover",
    }
  }

}

export default ImageStyleObject;
