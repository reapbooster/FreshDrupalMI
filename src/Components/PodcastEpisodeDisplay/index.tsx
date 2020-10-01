import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import MediaPodcastEpisode, {
  MediaPodcastEpisodeInterface,
} from "../../DataTypes/MediaPodcastEpisode";
import PodcastEpisodeBody from "./PodcastEpisodeBody";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface PodcastEpisodeProps extends MediaPodcastEpisodeInterface {
  data: MediaPodcastEpisodeInterface;
  onSelectHandler: any;
  open: boolean;
  key: number;
}

const cardHeaderStyle = {
  borderBottom: "1px solid #dfdfdf",
  background:
    "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(223,223,223,1) 100%)",
};

const cardTitleStyle = {
  fontWeight: "bold",
  padding: "1em 1em",
  border: "0px none",
};

const accordionToggleStyle = {
  border: "0px none",
  background: "transparent",
};

export const PodcastEpisodeDisplay = (props: PodcastEpisodeProps) => {
  console.debug("Podcast Episode Display", props);
  const { data, onSelectHandler, open, key } = props;
  const DataObject = new MediaPodcastEpisode(data);
  const [episodeData, setEpisodeData] = useState(DataObject);
  console.debug("Stated EpisodeData", episodeData);
  if (!episodeData.hasData()) {
    const ecp = new EntityComponentProps(episodeData);
    ecp
      .getData(data.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setEpisodeData(new MediaPodcastEpisode(ajaxData.data));
      });
  }
  let body = <p />;
  if (open) {
    body = <PodcastEpisodeBody data={episodeData} open={open} />;
  }
  return (
    <Card
      key={key}
      data-episode={episodeData.field_episode}
      id={episodeData.id}
    >
      <Card.Header style={cardHeaderStyle}>
        <Accordion.Toggle
          eventKey={episodeData.field_episode}
          style={accordionToggleStyle}
        >
          <Card.Title style={cardTitleStyle}>
            <strong>Episode {episodeData.field_episode}</strong>
            &nbsp;&#58;&nbsp;{episodeData.field_summary?.value}
          </Card.Title>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={episodeData.field_episode}>
        <ErrorBoundary>{body}</ErrorBoundary>
      </Accordion.Collapse>
    </Card>
  );
};

export default PodcastEpisodeDisplay;
