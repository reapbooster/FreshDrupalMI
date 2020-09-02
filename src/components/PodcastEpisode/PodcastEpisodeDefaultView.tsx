import React, { useState } from 'react';
import {EntityComponentProps, EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import LinkList from "../../DataTypes/LinkList";
import TextField from "../../DataTypes/TextField";
import ParagraphType from "../../DataTypes/ParagraphType";
import {AudioProps} from "../Audio";
import {PodcastServiceLink} from "./index";
import Loading from "../Loading";
import MilkenImage, {MilkenImageAttributes} from '../MilkenImage';
import {Row, Col, Container, Panel} from "react-bootstrap";

class PodcastEpisodeData {
  id: string;
  type: string;
  links: LinkList;
  status: boolean;
  created: string;
  langcode: string;
  parent_id: string;
  parent_type: string;
  field_summary: TextField;
  paragraph_type: ParagraphType;
  field_episode: number;
  field_transcript: object;
  field_audio_file: AudioProps;
  parent_field_name: string;
  field_podcast_image: [];
  field_podcast_service_links: Array<PodcastServiceLink>;
  field_content_alternative_area: TextField;

  constructor(values) {
    for (var idx in values) {
      if (values.hasOwnProperty(idx)){
        this[idx] = values[idx];
      }
    }
  }

  isEmpty() {
    return (!this.id);
  }

}


const PodcastEpisodeDefaultView: React.FunctionComponent = (props: EntityComponentPropsInterface) => {
  const [paragraphData, setParagraphData] = useState(new PodcastEpisodeData())
  if (paragraphData.isEmpty()) {
    var ecp = new EntityComponentProps(props);
    ecp.getData('?include=field_audio_file,field_podcast_image,field_podcast_image.image&jsonapi_include=true')
      .then(res => res.json())
      .then((ajaxData) => {
        setParagraphData(new PodcastEpisodeData(ajaxData.data));
      });
    return (
      <>
      <Loading />
      </>
    );
  }
  console.log("Paragraph Data", paragraphData);
  return (
    <>
      <Container>
        <Row>
          <Col lg={12} sm={12}>
            <h1><span>Episode {paragraphData.field_episode}:</span>&nbsp;&#58;&nbsp;{paragraphData.field_summary.value}</h1>
            {paragraphData.field_podcast_image.map((item, key) => {
              console.log("Milken Image Data", item);
              const imageData = new MilkenImageAttributes(item);
              return (
                <MilkenImage imageData={imageData} key={key} />
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );


}

export default PodcastEpisodeDefaultView;
