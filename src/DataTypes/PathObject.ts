

interface PathObjectInterface {

  alias: string;
  pid: number;
  langcode: string;

}

class PathObject {

  alias: string;
  pid: number;
  langcode: string;

  constructor(incoming: PathObjectInterface) {
    Object.assign(this, incoming);
  }

}


export  { PathObject as default, PathObjectInterface };
