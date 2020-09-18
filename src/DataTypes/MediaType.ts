import EntityType, {EntityTypeInterface} from './EntityType';

interface MediaTypeSourceConfigurationInterface{
  thumbnails_directory?: string;
  providers?: Array<string>;
  source_field?: string;
}

interface MediaTypeFieldMapInterface {
  title: string;
  name: string;
  default_name: string;
  thumbnail_uri: string;
  thumbnail_width: string;
  thumbnail_height: string;
  width: string;
  height: string;
}

class MediaTypeFieldMap {
  title: string;
  name: string;
  default_name: string;
  thumbnail_uri: string;
  thumbnail_width: string;
  thumbnail_height: string;
  width: string;
  height: string;

  constructor(incoming: MediaTypeFieldMapInterface) {
    Object.assign(this, incoming);
  }

  get label(): string {
    return this.title || this.name;
  }
}


interface MediaTypeInterface extends EntityTypeInterface {

  source: string;
  source_configuration: MediaTypeSourceConfigurationInterface;
  field_map: MediaTypeFieldMapInterface;
  dependencies: Array<string>;
  queue_thumbnail_downloads: false;

}

class MediaType extends EntityType implements MediaTypeInterface {

  source: string;

  private _source_configuration: MediaTypeSourceConfigurationInterface;
  private _field_map: MediaTypeFieldMap;

  dependencies: Array<string>;
  queue_thumbnail_downloads: false;

  get source_configuration(): MediaTypeSourceConfigurationInterface {
    return this._source_configuration;
  }

  set source_configuration(value: MediaTypeSourceConfigurationInterface) {
    this._source_configuration = value;
  }

  get field_map(): MediaTypeFieldMapInterface {
    return this._field_map;
  }

  set field_map(value: MediaTypeFieldMapInterface) {
    this._field_map = new MediaTypeFieldMap(value);
  }

}

export { MediaType as default, MediaTypeInterface, MediaTypeSourceConfigurationInterface, MediaTypeFieldMap, MediaTypeFieldMapInterface }
