


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

}

export default ImageStyleObject;
