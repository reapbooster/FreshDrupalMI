import React from 'react';
import {Col, Grid, Navbar, Row, Nav, NavItem, PanelGroup, Panel, Alert, Container} from 'react-bootstrap';
import PodcastEpisode, {PodcastEpisodeProps} from "../PodcastEpisode";
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import ParagraphSlide from "../Paragraphs/ParagraphSlide";
import ParagraphText from "../Paragraphs/ParagraphText";
import ParagraphFourPanel from "../Paragraphs/ParagraphFourPanel";
import Paragraphs from '../Paragraphs';
interface ParagraphProps extends EntityComponentPropsInterface {
  items: Array<EntityComponentPropsInterface>;
}


export const ParagraphList: React.FunctionComponent = (props: ParagraphProps) => {

  const paragraphRenderer = (item: EntityComponentPropsInterface, key: number) => {
    console.log("Paragraph Renderer:", item);
    const Component = Paragraphs.getComponentForBundle(item.bundle);
    const rowStyle = {
      "backgroundColor": (item.field_background || "#fff")
    }
    return (
      <Row key={key} style={rowStyle}>
        <Component
          {...item}
          data={{loaded: true}}
        />
      </Row>
    );

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
