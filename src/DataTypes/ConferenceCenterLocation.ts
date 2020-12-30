import { AddressFieldInterface } from "../Fields/AddressField";

export interface ConferenceCenterLocationInterface {
  address: AddressFieldInterface;
}

export class ConferenceCenterLocation {
  address: AddressFieldInterface;
  rooms: Array<unknown>;
}

export default ConferenceCenterLocation;
