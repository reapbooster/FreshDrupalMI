import EntityComponentBase, { EntityComponentState } from "../../DataTypes/EntityComponentBase";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import { ImageObject } from "../../DataTypes/ImageObject";
import Video from "../Video";

const MediaBundleComponents = {
  video: Video,
  image: ImageObject,
}


class Media  {

  public static getComponentForBundle(bundleId) {
    return ( MediaBundleComponents[bundleId] || null );
  }

}

export {Media as default, MediaBundleComponents};
