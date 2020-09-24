import React from 'react';
import JSONApiUrl from "./JSONApiUrl";
import {EntityInterface} from "./Entity";

export interface ListableInterface {

  id: string;

  items?: Array<EntityInterface> | undefined;

  refreshItems(url: JSONApiUrl): void;

  url?: string;

  browser: React.Component | React.ReactNodeArray;


}
