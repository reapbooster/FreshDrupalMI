import React, { useState } from "react";
import {
  Row,
  Nav,
  NavItem,
  NavLink,
  Col,
  Container,
} from "@bootstrap-styled/v4";

import { EventDataFactory } from "./EventFactories";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import { EventHero } from "./EventHero";
import Loading from "../Loading";
import ParagraphDisplayList from "../ParagraphDisplay/ParagraphDisplayList";
import { Event, EventInterface } from "../../DataTypes/Event";
import { ParagraphTabInterface } from "../../DataTypes/ParagraphTab";

if (String.ucWords === undefined) {
  String.prototype.ucWords = function () {
    const str = this.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function (s) {
      return s.toUpperCase();
    });
  };
}

export interface EventFullDisplayProps {
  data: EventInterface;
}

export const getNavTabs = (
  paragraphTab: ParagraphTabInterface,
  key: number
) => {
  return (
    <NavItem key={key}>
      <NavLink
        data-toggle="tab"
        role="tab"
        aria-controls={paragraphTab.admin_title}
        aria-selected={false}
        href={"#".concat(paragraphTab.admin_title.toLowerCase())}
        active={false}
      >
        {paragraphTab.admin_title.toString().ucWords()}
      </NavLink>
    </NavItem>
  );
};

export const getTabPanes = (
  paragraphTab: ParagraphTabInterface,
  key: number
) => {
  return (
    <div className="tab-content" key={key}>
      <div
        className={"tab-pane-"}
        id="overview"
        role="tabpanel"
        aria-labelledby="overview"
        title="Overview"
      >
        <h3>{paragraphTab.admin_title?.toString().ucWords()}</h3>
        <ParagraphDisplayList
          view_mode="full"
          list={paragraphTab.field_tab_content}
        />
      </div>
    </div>
  );
};

export const EventFullDisplay = (props: EventFullDisplayProps) => {
  console.debug("EventFullDisplay => Render", props);
  const { data } = props;
  const DataObject = EventDataFactory(data);
  const [eventData, setEventData] = useState(DataObject);

  if (!eventData.hasData()) {
    const ecp = new EntityComponentProps(eventData);
    ecp
      .getData(eventData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const DataObject = EventDataFactory(ajaxData.data);
        setEventData(DataObject);
      });
    return <Loading />;
  }
  console.debug("Event should have data now:", eventData);
  return (
    <>
      <Container fluid={true}>
        <EventHero data={eventData.field_hero_image} />
        <Container
          id={"event-tabs".concat(data.id)}
          defaultActiveKey="overview"
          fluid={true}
        >
          <Row p={3} className={"bg-light text-dark"}>
            <Col sm={12}>
              <Nav tabs justified role="tablist">
                {eventData.field_content_tabs.map((item, key) => {
                  return getNavTabs(item, key);
                })}
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              {eventData.field_content_tabs.map((item, key) => {
                return getTabPanes(item, key);
              })}
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default EventFullDisplay;
