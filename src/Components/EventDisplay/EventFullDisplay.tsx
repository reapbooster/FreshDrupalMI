import React, { useState } from "react";
import { Row, Tabs, Tab, Nav, Navbar, Col } from "react-bootstrap";
import { EventInterface } from "../../DataTypes/Event";
import { EventDataFactory } from "./EventFactories";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import { EventHero } from "./EventHero";
import { EventProgram } from "./EventProgram";
import { EventSponsors } from "./EventSponsors";
import { EventSpeakers } from "./EventSpeakers";
import Loading from "../Loading";
import ParagraphDisplayList from "../ParagraphDisplay/ParagraphDisplayList";

export interface EventFullDisplayProps {
  data: EventInterface;
  gridID: string;
}

export const EventFullDisplay = (props: EventFullDisplayProps) => {
  const { data } = props;
  const DataObject = EventDataFactory(data);
  const [eventData, setEventData] = useState(DataObject);
  if (!eventData.hasData()) {
    const ecp = new EntityComponentProps(eventData);
    ecp
      .getData(eventData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const DO = EventDataFactory(ajaxData.data);
        setEventData(DO);
      })
      .catch((err) => {
        console.error("Error response from JSONAPI:", err);
      });
    return <Loading />;
  }
  return (
    <>
      <EventHero data={eventData} />
      <Tab.Container
        id={"event-tabs".concat(eventData.id)}
        defaultActiveKey="overview"
      >
        <Row p={3} className={"bg-light text-dark"}>
          <Col sm={12}>
            <Nav variant={"pills"} justify={true}>
              <Nav.Item>
                <Nav.Link eventKey={"overview"}>Overview</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={"program"}>Program</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={"speakers"}>Speakers</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={"sponsors"}>Sponsors</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Tab.Content id={"event-tabs-content-".concat(eventData.id)}>
              <Tab.Pane eventKey="overview" title="Overview">
                <h3>Overview</h3>
                <ParagraphDisplayList
                  view_mode="full"
                  list={eventData.field_content}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="program" title="Program">
                <EventProgram
                  gridID={eventData.field_grid_event_id}
                  data={eventData}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="speakers" title="Speakers">
                <EventSpeakers
                  gridID={eventData.field_grid_event_id}
                  data={eventData}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="sponsors" title="Sponsors">
                <EventSponsors
                  gridID={eventData.field_grid_event_id}
                  data={eventData}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default EventFullDisplay;
