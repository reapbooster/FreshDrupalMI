import { EntityInterface } from "../DataTypes/Entity";
import fetch from "node-fetch";

export class LiveDataFixture {
  type: string;
  entityTypeId: string;
  bundle: string;

  constructor(type: string) {
    this.type = type;
    const [entityTypeId, bundle] = type.split("--");
    this.entityTypeId = entityTypeId;
    this.bundle = bundle;
  }

  async getFixtureData(): Promise<Array<EntityInterface>> {
    return fetch(
      `${process.env.NODE_TESTING_URL}/jsonapi/${this.entityTypeId}/${this.bundle}?jsonapi_include=true`
    )
      .catch((err) => {
        console.error(err.message);
        process.exit(err.code);
      })
      .then((res) => res.json());
  }
}

export default LiveDataFixture;
