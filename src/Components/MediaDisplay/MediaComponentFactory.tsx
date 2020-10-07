import { MediaInterface } from "../../DataTypes/Media";
import MediaDisplayVideo from "./MediaDisplayVideo";
import MediaDisplayImage from "./MediaDisplayImage";
import MediaDisplayReport from "./MediaDisplayReport";
import MediaDisplayPodcastEpisode from "./MediaDisplayPodcastEpisode";

/**
 * Create the View Component
 *
 * @param incoming: MediaInterface
 */
export function MediaComponentFactory(incoming: MediaInterface) {
  console.debug("MediaComponentFactory", incoming);
  switch (incoming.type) {
    case "media--video":
      return MediaDisplayVideo;
    case "media--image":
      return MediaDisplayImage;
    case "media--report":
      return MediaDisplayReport;
    case "media--podcast":
      return MediaDisplayPodcastEpisode;
    default:
      console.error("cannot find component", incoming);
      throw new Error(
        "Cannot find component for props.type ".concat(incoming.type)
      );
  }
}

export default MediaComponentFactory;
