import {DrupalDefaultEntityInterface, DrupalDefaultEntityValues} from "./DrupalDefaultEntityAttributes";

interface GenericFileInterface extends DrupalDefaultEntityInterface {
  uri: GenericFileUri;
  filemime: string;
  filesize: number;
}

interface GenericFileUri {
  value: string;
  url: string;
}

class GenericFile extends DrupalDefaultEntityValues {
  uri: GenericFileUri;
  filemime: string;
  filesize: number;
}


export { GenericFile as default, GenericFileInterface, GenericFileUri }
