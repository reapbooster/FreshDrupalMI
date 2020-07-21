

interface EntityComponentPropsInterface {
  view_mode?: string;
  id?: string;
  entityTypeId?: string;
  bundle?: string;
  data?: object;
  items?: Array<any>;
  type?: string;
  error?: Error;
  onSelectHandler?: any;
  open?: boolean;
}

interface JSONAPIEntityReferenceData {
  type: string;
  id: string;
  data?: object;
  items?: Array<any>;
}

class EntityComponentProps implements EntityComponentPropsInterface {

  view_mode: string;
  id: string;
  entityTypeId: string;
  bundle: string;
  data?: object;
  items?: Array<any>;
  key: number;
  error: Error;
  onSelectHandler: any;
  open?: boolean;

  constructor(incoming?: EntityComponentPropsInterface) {
    var propCopy = Object.assign({}, incoming);
    if (propCopy?.type) {
      const entityInfo = incoming.type?.split("--");
      if (entityInfo !== null) {
        propCopy.entityTypeId = entityInfo[0];
        propCopy.bundle = entityInfo[1];
      }
    }
    this.setData(propCopy);
  }

  toObject() : EntityComponentPropsInterface {
    return {
      view_mode: this.view_mode,
      id: this.id,
      entityTypeId: this.entityTypeId,
      bundle: this.bundle,
      data: this.data,
      items: this.items,
      error: this.error,
      onSelectHandler: this.onSelectHandler,
      open: this.open,
    };
  }

  async getData(include: string = ""): Promise<any> {
    console.log("get Data called: ", this);
    if (this.entityTypeId && this.bundle) {
      return fetch(`/jsonapi/${this.entityTypeId}/${this.bundle}/${this.id || ""}?jsonapi_include=1${include}`)
        .catch(this.handleError);
    } else {
      this.handleError(new Error("Not Enough Data to make a getData call"));
    }
  }

  setData(incoming = null) {
    if (incoming) {
      Object.assign(this, incoming);
    }
  }

  hasData(): boolean {
    return ( this.data !== undefined && this.data !== null );
  }

  handleError(err) {
    this.error = err;
    console.log("Entity Component Props has encountered an error with fetching the data:", err);
  }

  get loaded() {
    return this.hasData();
  }

  get label() {
    return this.title || this.name || null;
  }




}




export { EntityComponentProps, EntityComponentPropsInterface, JSONAPIEntityReferenceData };
