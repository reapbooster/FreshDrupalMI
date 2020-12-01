import * as PathUtility from "path";
import LinkList, { LinkListInterface } from "./LinkList";
import EntityComponentProps from "./EntityComponentProps";
import JSONApiUrl from "./JSONApiUrl";

export interface EntityInterface {
  changed?: string;
  created?: string;
  id: string;
  links?: LinkListInterface;
  type: string;
  [x: string]: unknown;
}

export abstract class Entity implements EntityInterface {
  id: string;

  type: string;

  private _changed?: Date;

  private _created?: Date;

  private _links?: LinkList;

  [x: string]: unknown;

  constructor(incoming: EntityInterface) {
    Object.assign(this, incoming);
  }

  get links(): LinkListInterface | undefined {
    return this._links;
  }

  set links(incoming: LinkListInterface) {
    this._links = new LinkList(incoming);
  }

  get created(): string | undefined {
    return this._created?.toString();
  }

  set created(incoming: string) {
    if (incoming) {
      this._created = new Date(incoming);
    }
  }

  get changed(): string | undefined {
    return this._changed?.toString();
  }

  set changed(incoming: string) {
    if (incoming) {
      this._changed = new Date(incoming);
    }
  }

  get baseDataUrl(): JSONApiUrl {
    return new JSONApiUrl(
      PathUtility.join("jsonapi", this.type.replace("--", "/"), this.id),
      new URLSearchParams("jsonapi_include=true")
    );
  }

  refreshValues(): Promise<EntityInterface> {
    const self = this;
    const ecp = new EntityComponentProps(this);
    return ecp
      .getData(this.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        Object.assign(self, ajaxData.data);
        return self;
      });
  }

  hasData() {
    return this._created !== undefined;
  }

  getIncluded() {
    return "";
  }

  valid() {
    return typeof this.id === "string" && typeof this.type === "string";
  }
}

export default Entity;
