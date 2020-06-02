
import React from 'react';
import {Panel, Button, ButtonGroup, Media, Grid, Row, Col} from 'react-bootstrap';
import PodcastEpisodeBody, { PodcastEpisodeBodyProps } from './PodcastEpisodeBody';
import { EntityComponentProps, EntityComponentPropsInterface } from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, { EntityComponentState } from "../../DataTypes/EntityComponentBase";

interface PodcastEpisodeProps extends EntityComponentPropsInterface {
  onSelectHandler: any;
  open: boolean;
}



class PodcastEpisode extends EntityComponentBase<PodcastEpisodeProps, EntityComponentState> {

  include = "&include=field_podcast_image,field_audio_file";

  render() {
    console.log("Podcast Episode Render", this);
    var body = (<p />);
    if (this.props.open === true) {
      const episodeBodyProps = Object.assign(this.state.attributes, this.ecp, this.props?.entityComponentProps);
      body = ( <PodcastEpisodeBody {...episodeBodyProps} open={this.props.open} /> );
    }
      return (
        <Panel key={this.props.field_episode}
               id={this.ecp.id}
               eventKey={this.props.field_episode} >
          <Panel.Heading>
            <Panel.Title toggle style={{fontWeight: "bold", padding: "1em 1em", }}>
                <span>Episode {this.state?.attributes?.field_episode}</span>&nbsp;&#58;&nbsp;{this.state?.attributes?.field_summary?.value}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            {body}
          </Panel.Collapse>
        </Panel>
      );
    }


}

export { PodcastEpisode as default };
