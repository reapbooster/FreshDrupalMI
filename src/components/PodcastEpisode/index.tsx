
import React from 'react';
import {Card, Button, ButtonGroup, Media, Container, Row, Col, Accordion} from 'react-bootstrap';
import MediaPodcastEpisode, {MediaPodcastEpisodeInterface} from '../../DataTypes/MediaPodcastEpisode'
import PodcastEpisodeBody, { PodcastEpisodeBodyProps } from './PodcastEpisodeBody';
import { EntityComponentProps, EntityComponentPropsInterface } from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, { EntityComponentState } from "../../DataTypes/EntityComponentBase";

interface PodcastEpisodeProps extends MediaPodcastEpisodeInterface {
  data: MediaPodcastEpisodeInterface;
  onSelectHandler: any;
  open: boolean;
  key: number;
}

const cardHeaderStyle = {
  borderBottom: "1px solid #dfdfdf",
  background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(223,223,223,1) 100%)"
};

const cardTitleStyle = {
  fontWeight: "bold",
  padding: "1em 1em",
  border: "0px none"
}

const accordionToggleStyle = {
  border: "0px none",
  background: "transparent"
}



class PodcastEpisode extends EntityComponentBase<PodcastEpisodeProps, EntityComponentState> {

  include = "";

  render() {
    console.debug("Podcast Episode Render", this);
    var body = (<p />);
    if (this.props.open === true) {
      const episodeBodyProps = Object.assign(this.state.attributes, this.ecp, this.props?.entityComponentProps);
      body = ( <PodcastEpisodeBody {...episodeBodyProps} open={this.props.open} /> );
    }
      return (
        <Card key={this.props.key}
              data-episode={this.props.field_episode}
              id={this.ecp.id}
        >
          <Card.Header style={cardHeaderStyle}>
            <Accordion.Toggle
              eventKey={this.props.field_episode}
              style={accordionToggleStyle}>
              <Card.Title  style={cardTitleStyle}>
                  <strong>Episode {this.state?.attributes?.field_episode}</strong>&nbsp;&#58;&nbsp;{this.state?.attributes?.field_summary?.value}
              </Card.Title>
            </Accordion.Toggle>
          </Card.Header >
          <Accordion.Collapse eventKey={this.props.field_episode}>
            {body}
          </Accordion.Collapse>
        </Card>
      );
    }


}

export { PodcastEpisode as default, PodcastEpisodeProps };
