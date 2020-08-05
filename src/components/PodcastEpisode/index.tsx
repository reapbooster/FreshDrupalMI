
import React from 'react';
import {Card, Button, ButtonGroup, Media, Container, Row, Col, Accordion} from 'react-bootstrap';
import PodcastEpisodeBody, { PodcastEpisodeBodyProps } from './PodcastEpisodeBody';
import { EntityComponentProps, EntityComponentPropsInterface } from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, { EntityComponentState } from "../../DataTypes/EntityComponentBase";

interface PodcastEpisodeProps extends EntityComponentPropsInterface {
  onSelectHandler: any;
  open: boolean;
  key: number;
}



class PodcastEpisode extends EntityComponentBase<PodcastEpisodeProps, EntityComponentState> {

  include = "&include=field_media_image,field_media_audio_file";

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
          <Card.Header style={{
            borderBottom: "1px solid #dfdfdf",
            background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(223,223,223,1) 100%)"
          }}>
            <Accordion.Toggle
              eventKey={this.props.field_episode}
              style={{
                border: "0px none",
                background: "transparent"
              }}>
              <Card.Title  style={{
                fontWeight: "bold",
                padding: "1em 1em",
                border: "0px none"
              }}>
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

export { PodcastEpisode as default };
