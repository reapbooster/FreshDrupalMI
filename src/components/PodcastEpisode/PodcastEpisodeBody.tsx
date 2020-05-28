import React, {PropsWithChildren} from "react";
import {Col, Grid, Media, Panel, Row} from "react-bootstrap";
import MilkenImage from "../MilkenImage";
import Audio, {AudioProps} from "../Audio";
import PodcastEpisodeServiceLinks from "./PodcastEpisodeServiceLinks";
import {EntityComponentProps, EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import LinkList from "../../DataTypes/LinkList";
import TextField from "../../DataTypes/TextField";
import ParagraphType from "../../DataTypes/ParagraphType";
import { PodcastServiceLink } from "./index";


interface PodcastEpisodeBodyProps {
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
  field_audio_embed: string;
  field_podcast_image: [];
  field_podcast_service_links: Array<PodcastServiceLink>;
  field_content_alternative_area: TextField;

}


const PodcastEpisodeBody: React.FunctionComponent = (props: PropsWithChildren<PodcastEpisodeBodyProps>) => {
  console.log("Podcast Episode Body incoming props", props);
  let audioEntityInfo = (props.field_audio_file) ? new EntityComponentProps(props.field_audio_file) : {};
  let images = (props?.field_podcast_image?.length) ?
    props?.field_podcast_image?.map((item: EntityComponentPropsInterface, key: number) => {
      console.log("mapping podcast images: ", item);
      const ecp = new EntityComponentProps(item);
      return <MilkenImage entityComponentProps={ecp} key={key} />
    }) : "&nbsp;";

    console.log("PodcastEpisodeBody->field_podcast_image", props.field_podcast_image)
  return (
    <>
      <Panel.Body>
        <Grid className={"col-xs-12 col-lg-12"}>
          <Row>
            <Col xs={12} sm={3}>
              {images}
            </Col>
            <Col xs={12} sm={9}>
              <Row style={{ margin: "auto", }}>
                <Col cellPadding={"1rem"}>
                  <span dangerouslySetInnerHTML={{__html: props.field_content_alternative_area?.value}}
                        className={"text-muted"} >
                  </span>
                  <br />
                  <p>
                    <a href={"/node/".concat(props.parent_id)}
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
                    {...audioEntityInfo}
                  />
                  <br />
                </Col>
              </Row>
              <Row cellPadding={"1rem"}>
                <PodcastEpisodeServiceLinks
                  links={props.field_podcast_service_links}
                />
              </Row>
            </Col>
          </Row>
        </Grid>
      </Panel.Body>
    </>
  );

}

export {PodcastEpisodeBody as default, PodcastEpisodeBodyProps};
