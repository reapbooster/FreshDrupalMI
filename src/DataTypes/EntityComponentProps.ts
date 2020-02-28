

interface EntityComponentPropsInterface {
  view_mode: string;
  id: string;
  entityTypeId: string;
  bundle: string;
  data: object;
}

interface JSONAPIEntityReferenceData {
  type: string;
  id: string;

}

class EntityComponentProps implements EntityComponentPropsInterface {

  view_mode: string;
  id: string;
  entityTypeId: string;
  bundle: string;
  data: object;

  constructor(data?: EntityComponentPropsInterface) {
    if (data) {
      Object.assign(this, data);
    }
    console.log("entity components props", this);
  }

  public static fromJSONAPIEntityReferenceData(ref: JSONAPIEntityReferenceData) {

    const entityInfo = ref.type.split("--");
    return new EntityComponentProps({
      id: ref.id,
      entityTypeId: entityInfo[0],
      bundle: entityInfo[1],
      view_mode: 'full',
      data: {}
    });
  }

  toObject() : EntityComponentPropsInterface {
    return {
      view_mode: this.view_mode,
      id: this.id,
      entityTypeId: this.entityTypeId,
      bundle: this.bundle,
      data: this.data
    };
  }


}





export { EntityComponentProps, EntityComponentPropsInterface, JSONAPIEntityReferenceData };
