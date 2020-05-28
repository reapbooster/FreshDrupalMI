import React from 'react';
import {Col, Grid, Navbar, Row, Nav, NavItem, PanelGroup, Panel, Alert, Container} from 'react-bootstrap';
import PodcastEpisode, {PodcastEpisodeProps} from "../PodcastEpisode";
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import ParagraphSlide from "../Paragraphs/ParagraphSlide";
import ParagraphText from "../Paragraphs/ParagraphText";
import ParagraphFourPanel from "../Paragraphs/ParagraphFourPanel";

interface ParagraphProps extends EntityComponentPropsInterface {
  items: Array<EntityComponentPropsInterface>;
}


export const ParagraphList: React.FunctionComponent = (props: ParagraphProps) => {

  const paragraphRenderer = (item: EntityComponentPropsInterface, key: number) => {
    console.log("Paragraph Renderer:", item);
    switch (item.bundle) {
      case "slide":
        return (
          <Row key={key}><Col lg={12}>
            <ParagraphSlide
              {...item}
              data={{loaded: true}}
            />
          </Col></Row>
        );

      case "body_content_alternative":
        return (
          <Row key={key}><Col lg={12}>
            <ParagraphText
              {...item}
              data={{loaded: true}}
            />
          </Col></Row>

        );

      case "four_tile_block_queue":
        return (
          <Row key={key}><Col lg={12}>
            <ParagraphFourPanel
              {...item}
              data={{loaded: true}} />
          </Col></Row>
        );

      case "four_tile_block_taxonomy":
        return (
          <Row key={key}><Col lg={12}>
            <ParagraphFourPanel
              {...item}
              data={{loaded: true}} />
          </Col></Row>

        );

      default:
        return (
          <Row key={key}><Col lg={12}>
            <h1>Cannot render paragraph type.</h1>
          </Col></Row>
        );
      }
    }


  if (props.items?.length) {
    return (
      <Container>
        {props.items.map(paragraphRenderer)}
      </Container>
    )
  } else {
    return (<h1>Paragraph list Component</h1>)
  }
}


export default ParagraphList;
