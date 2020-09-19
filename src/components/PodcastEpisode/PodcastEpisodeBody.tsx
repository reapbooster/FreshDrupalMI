import React, {PropsWithChildren} from "react";
import {Col, Card, Media, Accordion, Row, Container} from "react-bootstrap";
import PodcastEpisodeServiceLinks from "./PodcastEpisodeServiceLinks";

import MediaImage from '../../DataTypes/MediaImage';
import styled from 'styled-components';
import { MediaPodcastEpisodeInterface, MediaPodcastServiceLinkInterface } from "../../DataTypes/MediaPodcastEpisode";

interface PodcastEpisodeBodyProps extends MediaPodcastEpisodeInterface {
 
}

const learnMoreLink = styled.a`
    color: #ff6633
    font-weight: bold;
`;



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
                    <learnMoreLink href={props.path.alias}>LEARN MORE ></learnMoreLink>
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
