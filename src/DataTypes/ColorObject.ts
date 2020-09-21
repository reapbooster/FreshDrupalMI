export interface ColorObjectInterface {
  color: string;
  opacity: number;
}

export default class ColorObject implements ColorObjectInterface {
  color: string;

  opacity: number;

  constructor(incoming: ColorObjectInterface) {
    this.color = incoming.color;
    this.opacity = incoming.opacity;
  }
}
