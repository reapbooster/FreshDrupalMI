import fetch from "node-fetch";
import { EntityInterface } from "../DataTypes/Entity";
import { JSONApiUrl } from "../DataTypes/JSONApiUrl";

export class LiveDataFixture {
  type: string;

  entityTypeId: string;

  bundle: string;

  url: JSONApiUrl;

  constructor(type: string, includeString = "") {
    this.type = type;
    const [entityTypeId, bundle] = type.split("--");
    this.entityTypeId = entityTypeId;
    this.bundle = bundle;
    this.url = new JSONApiUrl(
      this.getBaseUrl().concat(
        `/jsonapi/${entityTypeId}/${bundle}?jsonapi_include=true&`,
        includeString
      )
    );
  }

  async getFixtureData(): Promise<Array<EntityInterface>> {
    return fetch(this.url.toString())
      .catch((err) => {
        console.error(err.message);
        process.exit(err.code);
      })
      .then((res) => res.json());
  }

  getBaseUrl() {
    return (
      process.env.NODE_TESTING_URL ??
      "https://live-freshdrupalmi.pantheonsite.io/"
    );
  }
}

export default LiveDataFixture;
