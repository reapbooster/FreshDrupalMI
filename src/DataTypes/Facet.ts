export interface FacetValueInterface {
  id: string;
  value: string;
  label: string;
  selected: boolean;
}

export class FacetValue implements FacetValueInterface {
  id: string;
  value: string;
  label: string;
  selected: boolean;

  constructor(incoming) {
    Object.assign(this, incoming);
  }
}

export interface FacetListInterface {
  label: string;
  formProperty: string;
  facets: Array<FacetValueInterface>;
}

export class FacetList implements FacetListInterface {
  label: string;
  formProperty: string;
  facets: Array<FacetValue>;

  constructor(incoming: FacetListInterface) {
    Object.assign(this, incoming);
  }

  addFacet(incoming: FacetValue) {}
}
