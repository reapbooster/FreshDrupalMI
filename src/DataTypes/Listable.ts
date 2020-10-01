import JSONApiUrl from "./JSONApiUrl";
import { EntityInterface } from "./Entity";

export interface ListableInterface {
  id: string;

  items?: Array<EntityInterface> | undefined;

  refresh(url: JSONApiUrl): Promise<Array<EntityInterface>>;

  url?: string;

  browser: boolean;
}
