import React from 'react';
import JSONApiUrl from "./JSONApiUrl";
import {EntityInterface} from "./Entity";

export interface ListableInterface {

  id: string;

  getItems(): Array<EntityInterface>;

  refreshItems(url: JSONApiUrl): void;

  url?: JSONApiUrl;

  browser: React.Component | React.ReactNodeArray;


}
