

interface TextFieldInterface {
  value: string;
  format: string;
  processed: string;
}

class TextField {

  value: string;
  format: string;
  processed: string;

  constructor(incoming: TextFieldInterface) {
    Object.assign(this, incoming);
  }

  toString() {
    return this.processed;
  }

}


export { TextField as default, TextFieldInterface };
