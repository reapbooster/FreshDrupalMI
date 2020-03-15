

interface EntityComponentPropsInterface {
  view_mode?: string;
  id?: string;
  entityTypeId?: string;
  bundle?: string;
  data?: object;
  items?: Array<any>;
  type?: string;
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

  constructor(incoming?: EntityComponentPropsInterface) {
    if (incoming?.type) {
      const entityInfo = incoming.type.split("--");
      incoming.entityTypeId = entityInfo[0];
      incoming.bundle = entityInfo[1];
    }
    this.setData(incoming);
  }

  toObject() : EntityComponentPropsInterface {
    return {
      view_mode: this.view_mode,
      id: this.id,
      entityTypeId: this.entityTypeId,
      bundle: this.bundle,
      data: this.data,
      items: this.items
    };
  }

  async getData(): Promise<any> {
    if (this.entityTypeId && this.bundle && this.id) {
      let me = this;
      return fetch(`/jsonapi/${this.entityTypeId}/${this.bundle}/${this.id}?jsonapi_include=1`)
        .then(res => res.json())
        .then((ajaxData) => {
          console.log('data is back from drupal', ajaxData);
          me.setData({ 'data' : ajaxData.data });
          return ajaxData.data;
        })
        .catch(err => console.error(err));
    } else {
      throw Error("Not enough data to get image!");
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

}




export { EntityComponentProps, EntityComponentPropsInterface, JSONAPIEntityReferenceData };
