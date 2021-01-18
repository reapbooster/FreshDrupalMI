import {PeopleInterface} from "./index";
import Experts from "./Experts";
import Speakers from './Speakers';
import Staff from './Staff';


export const DataTypePeopleFactory  = (props: PeopleInterface) => {

  switch(props.type) {
    case "staff":
      return new Staff(props);
    case "experts":
      return new Experts(props);
    case "speakers":
      return new Speakers(props);
    default:
      throw new Error("No People type defined for: ".concat(props.type));
  }
}

export default DataTypePeopleFactory;
