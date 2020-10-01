import React, {useState} from 'react';
import styled from 'styled-components';
import {Container, Row, Tabs, Tab} from 'react-bootstrap';
import {EventInterface} from "../../DataTypes/Event";
import {EventDataFactory} from "./EventFactories";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import { EventHero } from './EventHero';
import { EventProgram} from "./EventProgram";
import { EventSponsors } from './EventSponsors';
import { EventSpeakers } from './EventSpeakers';
import Loading from "../Loading";
import ParagraphDisplayList from "../ParagraphDisplay/ParagraphDisplayList";

export interface EventFullDisplayProps {
  data: EventInterface;
  view_mode: string;
  gridID: string;
}

export const EventFullDisplay = (props: EventFullDisplayProps) => {
  const {data} = props;
  var DataObject = EventDataFactory(data);
  const [eventData, setEventData] = useState(DataObject);
  if (!eventData.hasData()) {
    const ecp = new EntityComponentProps(eventData);
    ecp.getData(eventData.getIncluded())
      .then(res => res.json())
      .then(ajaxData => {
        var DO = EventDataFactory(ajaxData.data);
        setEventData(DO);
      });
    return <Loading />;
  }
  return (
    <>
      <Container>
        <Row>
          <EventHero data={eventData} />
          <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
            <Tab eventKey="overview" title="Overview">
              <h3>Overview</h3>
            </Tab>
            <Tab eventKey="program" title="Program">
              <h3>Program</h3>
            </Tab>
            <Tab eventKey="speakers" title="Speakers">
              <h3>Speakers</h3>
            </Tab>
            <Tab eventKey="sponsors" title="Sponsors">
              <h3>Sponsors</h3>
            </Tab>
            <Tab.Content>
              <Tab.Pane accessKey="overview">
                <ParagraphDisplayList view_mode="full" list={eventData} />
              </Tab.Pane>
              <Tab.Pane accessKey="program">
                <EventProgram  gridID={eventData.field_grid_event_id} />
              </Tab.Pane>
              <Tab.Content accessKey="speakers">
                <EventSpeakers gridID={eventData.field_grid_event_id} />
              </Tab.Content>
              <Tab.Content accessKey="sponsors">
                <EventSponsors gridID={eventData.field_grid_event_id} />
              </Tab.Content>
            </Tab.Content>
          </Tabs>
        </Row>
      </Container>
    </>
  )

}

export default EventFullDisplay;
