
interface ColorObjectInterface {
  color: string;
  opacity: number;
}


class ColorObject {
  color: string;
  opacity: number;

  constructor(incoming: ColorObjectInterface) {
    Object.assign(this, incoming)
  }
}

export  { ColorObject as default, ColorObjectInterface }
