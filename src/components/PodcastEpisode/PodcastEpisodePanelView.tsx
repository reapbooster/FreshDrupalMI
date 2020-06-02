import React, { useState } from 'react';
import {Panel} from "react-bootstrap";
import EntityComponentProps, { EntityComponentPropsInterface } from '../../DataTypes/EntityComponentProps'

const PodcastEpisodePanelView: React.FunctionComponent = (props) => {



  return (
    <Panel key={props.field_episode}
           id={props.id}
           eventKey={props.field_episode} >
      <Panel.Heading>
        <Panel.Title toggle>
          <span>Episode {props.field_episode}</span>&nbsp;&#58;&nbsp;{props.field_summary?.value}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Collapse>
        {body}
      </Panel.Collapse>
    </Panel>
  )

}

export default PodcastEpisodePanelView;
