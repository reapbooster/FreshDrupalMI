import { AddressFieldInterface } from "../Fields/AddressField";

export interface OfficeLocationInterface {
  address: AddressFieldInterface;
}

export class OfficeLocation {
  address: AddressFieldInterface;
}

export default OfficeLocation;
