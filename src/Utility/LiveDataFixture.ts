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

  async getFixtureData(include = ""): Promise<Array<EntityInterface>> {
    return fetch( this.getBaseUrl().concat(
      `/jsonapi/${this.entityTypeId}/${this.bundle}?jsonapi_include=true&`.concat(
        include
      ))
    )
      .catch((err) => {
        console.error(err.message);
        process.exit(err.code);
      })
      .then((res) => res.json());
  }

  getBaseUrl() {
    return process.env.NODE_TESTING_URL ?? "https://live-freshdrupalmi.pantheonsite.io/"
  }
}

export default LiveDataFixture;
