import ContentDatatype, { ContentDatatypeInterface } from "./ContentDatatype";
import TextField from "../Fields/TextField";
import { EventInterface } from "./Event";
import { PeopleInterface } from "./People";

export interface NodeSessionFieldStartEnd {
  value: string;
  value_end: string;
}

export interface NodeSessionInterface extends ContentDatatypeInterface {
  field_long_description: TextField;
  field_private: boolean;
  field_short_summary: string;
  field_start_end: NodeSessionFieldStartEnd;
  field_url: string;
  field_event: EventInterface;
  field_people: Array<PeopleInterface>;
}

export class NodeSession
  extends ContentDatatype
  implements NodeSessionInterface {
  field_long_description: TextField;
  field_private: boolean;
  field_short_summary: string;
  field_start_end: NodeSessionFieldStartEnd;
  field_url: string;
  field_event: EventInterface;
  field_people: Array<PeopleInterface>;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  hasData(): boolean {
    return this.status !== undefined;
  }
}

export default NodeSession;
