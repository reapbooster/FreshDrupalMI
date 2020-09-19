import Dependencies, { DependenciesInterface } from "./Dependencies";


interface ParagraphsDependenciesInterface extends DependenciesInterface { }

class ParagraphsDependencies extends Dependencies { }

interface ParagraphsTypeInterface {
  type: string;
  id: string;
  dependencies?: ParagraphsDependenciesInterface;
}

class ParagraphsType {
  type: string;
  id: string;
  _dependencies?: ParagraphsDependencies;

  constructor(incoming: ParagraphsTypeInterface) {
    Object.assign(this, incoming);
  }


  get dependencies(): ParagraphsDependenciesInterface {
    return this._dependencies;
  }

  set dependencies(incoming: ParagraphsDependenciesInterface) {
    this._dependencies = new ParagraphsDependencies(incoming);
  }

}


export { ParagraphsType as default, ParagraphsDependencies, ParagraphsDependenciesInterface, ParagraphsTypeInterface };
