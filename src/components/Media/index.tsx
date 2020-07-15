import EntityComponentBase, { EntityComponentState } from "../../DataTypes/EntityComponentBase";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import Video from "../Video";
import MediaImage from './MediaImage';

const MediaBundleComponents = {
  video: Video,
  image: MediaImage,
}


class Media {

  public static getComponentForBundle(bundleId) {
    return ( MediaBundleComponents[bundleId] || null );
  }

}

export {Media as default, MediaBundleComponents};
