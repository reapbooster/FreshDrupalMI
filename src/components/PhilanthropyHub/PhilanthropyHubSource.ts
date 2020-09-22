import { ListComponentPropsInterface } from "../../DataTypes/ListComponentProps";
import ListComponentSource, {
  ListComponentSourceInterface,
} from "../../DataTypes/ListComponentSource";
import {ListableInterface} from "../../DataTypes/Listable";
import {EntityInterface} from '../../DataTypes/Entity';
import JSONApiUrl from "../../DataTypes/JSONApiUrl";

export class PhilanthropyHubSource
  extends ListComponentSource
  implements ListComponentSourceInterface, ListableInterface {

  browser?: React.Component | undefined;
  url?: JSONApiUrl;

  constructor(incoming: ListComponentSourceInterface){
    super(incoming);
    Object.assign(this, incoming);
  }

  static filters: {
    terms: "field_terms";
    actions: "field_actions";
    region: "field_region";
    focus: "field_focus";
  };

  refreshItems(filter) {
    return this.getSourceData();
  }

  getItems(): Array<EntityInterface> {
    return this.getSourceData();
  }

  onHashChanged() {
    console.debug("Hash change trigger");
    const params = new URLSearchParams(window.location.hash.replace("#", ""));
    let newFilter = {};
    // eslint-disable-next-line no-restricted-syntax
    for (let [field, values] of params) {
      field = `field_${field}`;
      values = values.split(",");

      // eslint-disable-next-line no-restricted-syntax
      for (const fieldValue of values) {
        const conjunction = "AND";
        const filterKey = `${field}-${fieldValue}`;
        const groupKey = `${filterKey}-group-${conjunction}`;

        const newValue = {};

        // NOTE: Workaround as per https://www.drupal.org/project/drupal/issues/3066202#comment-13181270
        newValue[`filter[${groupKey}][group][conjunction]`] = conjunction;
        newValue[`filter[${filterKey}][condition][value]`] = fieldValue;
        newValue[
          `filter[${filterKey}][condition][path]`
        ] = `${field}.machine_name`;
        newValue[`filter[${filterKey}][condition][memberOf]`] = groupKey;

        newFilter = {
          ...newFilter,
          ...newValue,
        };
      }
    }
    console.debug("New params", newFilter);
    this.refresh(newFilter);
  }

  notifyListComponent(newFilter: Object) {
    const evt = new CustomEvent("refresh", {
      bubbles: false,
      cancelable: false,
      detail: {
        filter: newFilter,
      },
    });
    document.querySelector("#list-component-root").dispatchEvent(evt);
  }

  public static getDefaultSource(): Promise<ListComponentPropsInterface> {
    console.debug("getting default source", process.env);
    return fetch(process.env.CONFIG_FILE)
      .then((data) => {
        return new PhilanthropyHubSource(data);
      });
  }


}

export default PhilanthropyHubSource;
