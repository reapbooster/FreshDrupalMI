import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import PodcastEpisodeServiceLinks from "./PodcastEpisodeServiceLinks";
import AudioFileDisplay from "../FileDisplay/AudioFileDisplay";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import styled, { StyledComponent } from "styled-components";
import { MediaPodcastEpisodeInterface } from "../../DataTypes/MediaPodcastEpisode";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import moment from "moment";
import AuthorsDisplay from "../AuthorsDisplay";
import { TagsDisplay } from "../TagsDisplay";
import { SocialDisplay } from "../SocialDisplay";

export interface PodcastEpisodeFullProps extends MediaPodcastEpisodeInterface {
  data: MediaPodcastEpisodeInterface;
  view_mode: string;
  container: StyledComponent;
}


export const PodcastEpisodeFull: React.FunctionComponent = (
  props: PodcastEpisodeFullProps
) => {
  const { data, view_mode, container } = props;

  const PodcastHero = styled.div`
    background: url(${data.field_promo_image.field_media_image.uri.url}); 
    background-position: center;
    background-size: cover;
    color: white;
    min-height: calc(13em + 0.5*25vw);
    position: relative;
    
    & .slide-text {
      display: block;
      font-size: calc(0.4em + 0.6 * 1vw);
      padding-left: 7.5vw;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      & h2 {
        font-family: 'LatoWebItalic';
        text-transform: uppercase;
        font-size: 1.25em;
      }
      
      & h1 {
        font-size: 2.5em;
        font-family: 'LatoWebBlack';
      }
    }
  `;

  const ElMainContentWrapper = styled.div`
    width: 90%;
    margin: 2em auto;

    & .podcast-title {
      font-size: 1.25em;
      font-style: italic;
      font-family: 'LatoWebBold';
      text-transform: uppercase;      
    }

    & .section-social {
      order: 1;
    }
    & .section-content {
      order: 2;
      & .embedded-entity img {
        max-width: 100%;
      }
      @media only screen and (max-width: 1199px) {
        order: 3;
        padding-top: 1.5em;
      }
    }
    & .section-tags {
      order: 3;
      @media only screen and (max-width: 1199px) {
        order: 2;
      }
      & .published-date {
        font-family: LatoWebItalic;
        font-size: 1.25em;
        color: #999AA3;
        letter-spacing: 0;
        line-height: 1.8em;
        margin-top: 0;
        margin-bottom: 1em;
      }
    }
  `;

  const RowPodcastGuests = styled.div`
    font-size: 0.85em;

    @media (max-width: 399.98px) {
      justify-content: center;
    }

    & .bubble-image-container {
      width: 8em;
      height: 8em;
      border-radius: 50%;
      overflow: hidden;
      flex: 0 0 8em;
      padding: 0;
      margin: 1.5em;

      & img {
        width: 8em;
        height: 8em;
      }
    }

    & .podcast-guest-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 2em;
      @media (max-width: 399.98px) {
        align-items: center;
        min-width: 100%;
      }
    }

    & h4 {
      font-size: 1.2em; 
      font-weight: bold; 
      margin: 1em 0 0.2em 0;
    }

    & h5 {
      font-size: 1.2em; 
      margin: 0 0 0.2em 0;
    }
  `;

  const LearnMoreLink = styled.a`
    color: var(--color-milken-orange);
    font-weight: bold;
  `;


  const created = moment(data.created, "ddd MMM DD YYYY Z");

  let tagList = [];

  if (data.field_tags?.length !== undefined && data.field_tags.length > 0) {
    data.field_tags.map(
      (item) => {
        tagList.push({ link_uri: '', tag: item.name });
      }
    )
  }
  if (data.field_topics?.length !== undefined && data.field_topics.length > 0) {
    data.field_topics.map(
      (item) => {
        tagList.push({ link_uri: '', tag: item.name });
      }
    )
  }
  if (data.field_regions?.length !== undefined && data.field_regions.length > 0) {
    data.field_regions.map(
      (item) => {
        tagList.push({ link_uri: '', tag: item.name });
      }
    )
  }

  //TODO: get a default slide if field_promo_slide is empty

  let authorList = [];

  if (data.field_people?.length !== undefined && data.field_people.length > 0) {
    data.field_people.map(
      (item) => {
        authorList.push({
          photo: item.field_photo[0],
          name: item.field_first_name + " " + item.field_last_name,
          pgtitle: item.field_pgtitle,
          link: "/people/" + item.drupal_internal__id,
        });
      }
    )
  }


  console.debug("PodcastEpisodeFull", props);
  return (
    <>
      <PodcastHero>
        <div className="slide-text">
          <h2>Podcast Series</h2>
          <h1>{data.name}</h1>
        </div>
      </PodcastHero>
      <ElMainContentWrapper className="container-fluid">
        <Row>
          <Col xs="12" lg="6" xl="1" className="section-social">
            <SocialDisplay data={{ "name": data.name }}></SocialDisplay>
          </Col>
          <Col xs="12" xl="8" className="section-content">
            <Row>
              <Col>
                <h2 className='podcast-title'>Episode {data.field_episode}: {data.field_summary?.value}</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                {data.field_guests.map((item) => {
                  return (
                    <RowPodcastGuests className="row">
                      <Col className="bubble-image-container">
                        <ErrorBoundary>
                          <ImageFileDisplay
                            data={item.field_photo[0]}
                            view_mode="thumbnail-raw"
                            style={{ objectFit: "cover" }}
                          />
                        </ErrorBoundary>
                      </Col>
                      <Col className="podcast-guest-info">
                        <h4>{item.field_first_name} {item.field_middle_name} {item.field_last_name}</h4>
                        <h5>{item.field_pgtitle}</h5>
                      </Col>
                    </RowPodcastGuests>
                  )
                })}
              </Col>
            </Row>
            <Row>
              <Col>
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
                  <Col>
                    <br />
                    <ErrorBoundary>
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
          </Col>
          <Col xs="12" lg="6" xl="3" className="section-tags pt-4 pt-lg-0">
            <div className="container published-date">{"Published " + created.format('MMMM D, YYYY')}</div>
            <AuthorsDisplay data={{ authorList: authorList }} />
            <TagsDisplay data={{ tagList: tagList }} />
          </Col>
        </Row>
      </ElMainContentWrapper>
    </>
  );
};

export default PodcastEpisodeFull;
