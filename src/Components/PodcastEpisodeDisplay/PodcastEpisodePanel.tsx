import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import PodcastEpisodeServiceLinks from "./PodcastEpisodeServiceLinks";
import AudioFileDisplay from "../FileDisplay/AudioFileDisplay";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import styled, { StyledComponent } from "styled-components";
import { MediaPodcastEpisodeInterface } from "../../DataTypes/MediaPodcastEpisode";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface PodcastEpisodePanelProps extends MediaPodcastEpisodeInterface {
  data: MediaPodcastEpisodeInterface;
  view_mode: string;
  container: StyledComponent;
}


export const PodcastEpisodePanel: React.FunctionComponent = (
  props: PodcastEpisodePanelProps
) => {
  const { data, view_mode, container } = props;

  const LearnMoreLink = styled.a`
    color: var(--color-milken-orange);
    font-weight: bold;
  `;

  console.debug("PodcastEpisodePanel", props);
  return (
    <>
      <Card.Body>
        <Container className={"col-xs-12 col-lg-12"}>
          <Row>
            <Col xs={12} sm={3}>
              <ErrorBoundary>
                <div
                  style={{
                    width: "8em",
                    height: "8em",
                    borderRadius: "50%",
                    margin: "auto",
                    overflow: "hidden",
                  }}
                >
                  <ImageFileDisplay
                    data={data.field_media_image}
                    view_mode="thumbnail-raw"
                    style={{
                      width: "8em",
                      height: "8em",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  
                </div>
              </ErrorBoundary>
            </Col>
            <Col xs={12} sm={9}>
              <Row style={{ margin: "auto" }}>
                <Col cellPadding={"1rem"}>
                  <span
                    dangerouslySetInnerHTML={{ __html: data.field_body?.value }}
                    className={"text-muted"}
                  ></span>
                  <br />
                  <p>
                    <LearnMoreLink href={data.path.alias}>
                      LEARN MORE &gt;
                    </LearnMoreLink>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className={"col-md-10"}>
                  <br />
                  <ErrorBoundary>
                    {console.debug("PodcastEpisodePanel: AudioFile Render ", data.field_episode)}
                    <AudioFileDisplay
                      data={data.field_media_audio_file}
                      view_mode={"full"}
                    />
                  </ErrorBoundary>
                  <br />
                </Col>
              </Row>
              <Row cellPadding={"1rem"}>
                <PodcastEpisodeServiceLinks links={data.field_service_links} />
              </Row>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </>
  );
};

export default PodcastEpisodePanel;
