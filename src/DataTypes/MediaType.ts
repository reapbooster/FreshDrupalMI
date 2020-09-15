import EntityType, {EntityTypeInterface} from './EntityType';

interface MediaTypeSourceConfigurationInterface{
  thumbnails_directory: string;
  providers: Array<string>;
  source_field: string;
}

interface MeidaTypeFieldMapInterface {
  title: string;
  default_name: string;
  thumbnail_uri: string;
  thumbnail_width: string;
  thumbnail_height: string;
  width: string;
  height: string;
}



interface MediaTypeInterface extends EntityTypeInterface {


  source: string;
  source_configuration: MediaTypeSourceConfigurationInterface;
  field_map: MeidaTypeFieldMapInterface;
  dependencies: Array<string>;
  queue_thumbnail_downloads: false;


}

class MediaType extends EntityType implements MediaTypeInterface {

  source: string;
  source_configuration: MediaTypeSourceConfigurationInterface;
  field_map: MeidaTypeFieldMapInterface;
  dependencies: Array<string>;
  queue_thumbnail_downloads: false;

}

export { MediaType as default, MediaTypeInterface, MediaTypeSourceConfigurationInterface, MeidaTypeFieldMapInterface }