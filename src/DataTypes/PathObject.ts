export interface PathObjectInterface {
  alias: string;
  pid: number;
  langcode: string;
}

export default class PathObject implements PathObjectInterface {
  alias: string;

  pid: number;

  langcode: string;

  constructor(incoming: PathObjectInterface) {
    Object.assign(this, incoming);
  }
}
