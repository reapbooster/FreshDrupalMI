import ColorObject from "./ColorObject";
import LinkList from "./LinkList";
import JSONApiUrl from "./JSONApiUrl";

interface FacetValueInterface {
  type?: string;
  id?: string;
  machine_name?: string;
  links?: LinkList;
  weight?: number;
  name?: string;
  title?: string;
  value?: string;
  selected?: boolean;
  field_tag_icon?: object;
  field_tag_color?: ColorObject;
  field_visibility?: boolean;
}

class FacetValue {
  type?: string;

  id?: string;

  machine_name?: string;

  links?: LinkList;

  weight?: number;

  value?: string;

  name?: string;

  title?: string;

  selected?: boolean;

  field_tag_icon?: object;

  field_tag_color?: ColorObject;

  field_visibility?: boolean;

  constructor(incoming) {
    Object.assign(this, incoming);
  }

  get label(): string {
    return this.title || this.name || this.id;
  }
}

interface FacetProps {
  url: JSONApiUrl;
  id: string;
  type: string;
  label: string;
  field: string;
  defaultSelected: boolean;
  values?: Array<FacetValue>;
  onChangeHandler?: Function;
  onClearHandler?: Function;
  allowMultiple: boolean;
}

class Facet {
  url: JSONApiUrl;

  _label: string;

  _values: Array<FacetValue>;

  defaultSelected: boolean;

  dispatcher: HTMLElement;

  allowMultiple = false;

  constructor(incoming: FacetProps) {
    Object.assign(this, incoming);
    this.dispatcher = document.createElement("nav");
  }

  hasValues() {
    return this.values?.length || 0;
  }

  async getData(query = ""): Promise<any> {
    console.debug("get Data called: ", this);
    if (this.url) {
      console.debug("Facet is calling url: ", this.url.toString());
      return fetch(this.url.toString()).catch(this.handleError);
    }
    this.handleError(new Error("No URL to make a refresh call"));
  }

  refresh(done): Promise<any> {
    const self = this;
    return this.getData()
      .then((res) => res.json())
      .then((ajaxData) => {
        done(
          new Facet({
            url: this.url,
            id: this.id,
            type: this.type,
            label: this.label,
            values: ajaxData.data,
          })
        );
      });
  }

  handleError(err) {
    this.error = err;
    console.error(
      "Entity Component Props has encountered an error with fetching the items:",
      err
    );
  }

  get label() {
    return this.title || this.name;
  }

  set label(value: string) {
    this.title = value;
  }

  get values() {
    return this._values;
  }

  clone(): Facet {
    const toReturn = new Facet();
    Object.assign(toReturn, this);
    return toReturn;
  }

  set values(values: Array<FacetValueInterface>) {
    // this.dispatcher.dispatchEvent(new FacetChangeEvent({ values: values }));
    this._values = values.map((value) => new FacetValue(value));
  }

  addValue(value: FacetValueInterface) {
    if (!value instanceof FacetValue) {
      value = new FacetValue(value);
    }
    this._values.push(value);
  }

  setActive(machine_name) {
    const toReturn = this.clone();
    if (this.allowMultiple === false) {
      // if you don't allow mutliple, set everything
      // to false and turn on the one you need
      toReturn.setInactiveItem();
    }
    return toReturn.setActiveItem(machine_name);
  }

  setInactive(machine_name) {
    return this.clone().setInactiveItem(machine_name);
  }

  setActiveItem(machine_name = null) {
    const self = this;
    this._values.map((value: FacetValue, key) => {
      if (value.machine_name == machine_name) {
        self.values[key].selected = true;
      } else {
        self.values[key].selected = false;
      }
    });
    return self;
  }

  setInactiveItem(machine_name = null) {
    const self = this;
    this._values.map((value: FacetValue, key) => {
      if (machine_name === null || value.machine_name == machine_name) {
        self.values[key].selected = false;
      }
    });
    return self;
  }

  getActive(): Array<FacetValue> {
    return this.values
      .map((value) => {
        if (value.selected == true) {
          return value;
        }
        return null;
      })
      .filter((obj) => {
        return obj;
      });
  }

  getValuesForJsonAPIFilters() {
    const toReturn = {};
    for (const v in this._values) {
      toReturn[this._values[v].machine_name] = this._values[v].value;
    }
    return toReturn;
  }
}

interface FacetChangeEventProps {
  values: Array<FacetValue>;
}

class FacetChangeEvent extends Event {
  facetValues: Array<FacetValue>;

  constructor(props: FacetChangeEventProps) {
    super(props);
    this.facetValues = props.values;
  }
}

export { Facet as default, FacetValue, FacetProps };
