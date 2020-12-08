import React from "react";
import { MediaVideoInterface } from "../../DataTypes/MediaVideo";
import {extract,} from 'oembed-parser';
import {Container} from 'react-bootstrap';

export interface VideoFullDisplayProps {
  data: MediaVideoInterface;
}

export const VideoFullDisplay = (props: VideoFullDisplayProps) => {
  const { data } = props;
  const url = data.field_media_oembed_video;

  console.debug("VideoFullDisplay", data);

  const oEmbedObject = extract(url).then((oembed) => {
    console.debug("oEmbed Dump", oembed);
    return oembed;
  }).catch((err) => {
    console.trace(err);
  });

  return (
    <Container fluid="true">
      <div style={{background: '#27262c', width: '100%'}} dangerouslySetInnerHTML={{__html: oEmbedObject.html}} />
      <Container>
        <div className="row">
          <h1>{data.field_media_oembed_video}</h1>
        </div>
        <div className="row" dangerouslySetInnerHTML={{__html: data.field_body?.value}}>

        </div>
      </Container>
    </Container>
  );
};

export default VideoFullDisplay;
