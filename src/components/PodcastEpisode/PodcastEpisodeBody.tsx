import React, {PropsWithChildren} from "react";
import {Col, Card, Media, Accordion, Row, Container} from "react-bootstrap";
import MilkenImage from "../MilkenImage";
import Audio, {AudioProps} from "../Audio";
import PodcastEpisodeServiceLinks from "./PodcastEpisodeServiceLinks";
import {EntityComponentProps, EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import LinkList from "../../DataTypes/LinkList";
import TextField from "../../DataTypes/TextField";
import ParagraphType from "../../DataTypes/ParagraphType";
import { PodcastServiceLink } from "./index";
import MediaImage, {MediaImageProps} from '../Media/MediaImage'
import PathObject from "../../DataTypes/PathObject";

interface PodcastEpisodeBodyProps {
  id: string;
  type: string;
  links: LinkList;
  status: boolean;
  created: string;
  langcode: string;
  path: PathObject
  parent_type: string;
  field_summary: TextField;
  paragraph_type: ParagraphType;
  field_episode: number;
  field_transcript: object;
  field_media_audio_file: AudioProps;
  parent_field_name: string;
  field_audio_embed: string;
  field_media_image: MediaImageProps;
  field_service_links: Array<PodcastServiceLink>;
  field_content_alternative_area: TextField;
  field_body: TextField;
}


const PodcastEpisodeBody: React.FunctionComponent = (props: PropsWithChildren<PodcastEpisodeBodyProps>) => {
  console.debug("Podcast Episode Body incoming props", props);
  return (
    <>
      <Card.Body>
        <Container className={"col-xs-12 col-lg-12"}>
          <Row>
            <Col xs={12} sm={3}>
              <MediaImage field_media_image={props.field_media_image} height={"120px"} />
            </Col>
            <Col xs={12} sm={9}>
              <Row style={{ margin: "auto", }}>
                <Col cellPadding={"1rem"}>
                  <span dangerouslySetInnerHTML={{__html: props.field_body?.value}}
                        className={"text-muted"} >
                  </span>
                  <br />
                  <p>
                    <a href={props.path.alias}
                       style={{
                         color: "#ff6633",
                         fontWeight: "bold",
                       }}>LEARN MORE ></a>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className={"col-md-10"}>
                  <br />
                  <Audio
                    {...props.field_media_audio_file}
                  />
                  <br />
                </Col>
              </Row>
              <Row cellPadding={"1rem"}>
                <PodcastEpisodeServiceLinks
                  links={props.field_service_links}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </>
  );

}

export {PodcastEpisodeBody as default, PodcastEpisodeBodyProps};
