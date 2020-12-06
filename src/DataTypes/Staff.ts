import { People } from "./People";
import { SocialMediaLinkInterface } from "../Fields/SocialMediaLink";
import { TaxonomyTermInterface } from "./TaxonomyTerm";
import { ImageFileInterface } from "./ImageFile";

export interface StaffInterface {
  field_first_name: string;

  field_last_name: string;

  field_pgtitle: string;

  field_social_media: Array<SocialMediaLinkInterface>;

  field_centers: Array<TaxonomyTermInterface>;

  field_event: TaxonomyTermInterface;

  field_status: boolean;

  field_photo: ImageFileInterface;

  field_email: string;

  field_biotext: string;
}

export class Staff extends People {
  field_first_name: string;

  field_last_name: string;

  field_pgtitle: string;

  field_social_media: Array<SocialMediaLinkInterface>;

  field_centers: Array<TaxonomyTermInterface>;

  field_event: TaxonomyTermInterface;

  field_status: boolean;

  field_photo: ImageFileInterface;

  field_email: string;

  field_biotext: string;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded(): string {
    return "&include=field_photo";
  }
}

export default Staff;
