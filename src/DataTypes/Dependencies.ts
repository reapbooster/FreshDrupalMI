
interface DependenciesInterface {
  config?: Array<string>;
  content?: Array<string>;
  module?: Array<string>;
}


class Dependencies {
  config?: Array<string>;
  content?: Array<string>;
  module?: Array<string>;

  constructor(incoming: DependenciesInterface) {
    Object.assign(this, incoming);
  }

}

export {Dependencies as default, DependenciesInterface}
