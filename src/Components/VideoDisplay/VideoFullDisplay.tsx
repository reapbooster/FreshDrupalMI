import React from "react";
import { MediaVideoInterface } from "../../DataTypes/MediaVideo";

export interface VideoFullDisplayProps {
  data: MediaVideoInterface;
}

export const VideoFullDisplay = (props: VideoFullDisplayProps) => {
  const { data } = props;
  console.debug("VideoFullDisplay", data);
  return (
    <div>
      <iframe
        src={"/media/oembed?maxwidth=0&maxheight=0&url=".concat(
          data.field_media_oembed_video
        )}
        width="100%"
        height="420"
        frameBorder="0"
        allowTransparency
        class="media-oembed-content"
        controls={true}
      />
    </div>
  );
};

export default VideoFullDisplay;
