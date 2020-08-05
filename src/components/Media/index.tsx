import EntityComponentBase, { EntityComponentState } from "../../DataTypes/EntityComponentBase";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import MediaImage from './MediaImage';
import MediaVideo from "./MediaVideo";
import MediaReport from "./MediaReport";
import MediaPodcast from "./MediaPodcast";

const MediaBundleComponents = {
  video: MediaVideo,
  image: MediaImage,
  report: MediaReport,
  podcast: MediaPodcast,
}


class Media {

  public static getComponentForBundle(bundleId) {
    return ( MediaBundleComponents[bundleId] || null );
  }

}

export {Media as default, MediaBundleComponents};
