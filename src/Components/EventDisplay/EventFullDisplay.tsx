import React from "react";
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
import { EventProgram } from "./EventProgram";
import { EventSponsors } from "./EventSponsors";
import { EventSpeakers } from "./EventSpeakers";
import Loading from "../Loading";
import ParagraphDisplayList from "../ParagraphDisplay/ParagraphDisplayList";
import { Event } from "../../DataTypes/Event";
import "bootstrap/dist/css/bootstrap.min.css";

export interface EventFullDisplayProps {
  bundle: string;
  canEdit: boolean;
  class: string;
  drupalInternalId: string;
  drupalSelector: string;
  entityTypeId: string;
  gridId: string;
  id: string;
  type: string;
  viewMode: string;
}

export interface EventFullDisplayState {
  data: Event;
  loading: boolean;
  loaded: boolean;
  gridId: string;
  view_mode: string;
  entityTypeId: string;
  bundle: string;
  can_edit: boolean;
}

export class EventFullDisplay extends React.Component<
  EventFullDisplayProps,
  EventFullDisplayState
> {
  constructor(props) {
    super(props);
    console.debug("EventFullDisplay => construct", props);
    const DataObject = {
      id: props.id,
      type: props.type,
    };
    this.state = {
      data: EventDataFactory(DataObject),
      loading: false,
      loaded: false,
      gridId: props.gridId,
      view_mode: props.viewMode,
      entityTypeId: props.entityTypeId,
      bundle: props.bundle,
      can_edit: props.canEdit,
    };
  }

  componentDidMount() {
    const { data } = this.state;
    if (!data.hasData()) {
      this.setState({ loading: true });
      const ecp = new EntityComponentProps(data);
      ecp
        .getData(data.getIncluded())
        .then((res) => res.json())
        .then((ajaxData) => {
          const DataObject = EventDataFactory(ajaxData.data);
          this.setState({
            loading: false,
            loaded: true,
            data: DataObject,
          });
        })
        .catch((err) => {
          console.error(
            "EventFullDisplay => Error response from JSONAPI:",
            err
          );
        });
    }
  }

  webComponentConnected() {
    console.debug("EventFullDisplay => webComponentConnected", this);
  }

  render() {
    console.debug("EventFullDisplay => Render", this.props, this.state);
    const { data, loading, loaded } = this.state;
    if (loaded === true) {
      return (
        <>
          <EventHero data={data} />
          <Container
            id={"event-tabs".concat(data.id)}
            defaultActiveKey="overview"
          >
            <Row p={3} className={"bg-light text-dark"}>
              <Col sm={12}>
                <Nav tabs justified role="tablist">
                  <NavItem>
                    <NavLink
                      data-toggle="tab"
                      role="tab"
                      aria-controls="overview"
                      aria-selected="true"
                      href="#overview"
                      active
                    >
                      Overview
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      data-toggle="tab"
                      role="tab"
                      aria-controls="program"
                      aria-selected="false"
                      href="#program"
                    >
                      Program
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      data-toggle="tab"
                      role="tab"
                      aria-controls="speakers"
                      aria-selected="false"
                      href="#Speakers"
                    >
                      Speakers
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      data-toggle="tab"
                      role="tab"
                      aria-controls="sponsors"
                      aria-selected="false"
                      href="sponsors"
                    >
                      Sponsors
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="tab-content">
                  <div
                    className="tab-pane active"
                    id="overview"
                    role="tabpanel"
                    aria-labelledby="overview"
                    title="Overview"
                  >
                    <h3>Overview</h3>
                    <ParagraphDisplayList
                      view_mode="full"
                      list={data.field_content}
                    />
                  </div>
                  <div
                    className="tab-pane active"
                    id="program"
                    role="tabpanel"
                    aria-labelledby="program"
                    title="Program"
                  >
                    <EventProgram
                      gridID={data.field_grid_event_id}
                      data={data}
                    />
                  </div>
                  <div
                    className="tab-pane active"
                    id="speakers"
                    role="tabpanel"
                    aria-labelledby="speakers"
                    title="Program"
                  >
                    <EventSpeakers
                      gridID={data.field_grid_event_id}
                      data={data}
                    />
                  </div>
                  <div
                    className="tab-pane active"
                    id="sponsors"
                    role="tabpanel"
                    aria-labelledby="sponsors"
                    title="Sponsors"
                  >
                    <EventSponsors
                      gridID={data.field_grid_event_id}
                      data={data}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      );
    } else if (loading === true || (loading === false && loaded === false)) {
      console.debug("EventFullDisplay => Loading", this.props, this.state);
      return <Loading />;
    }
    return <div>No Data To Render</div>;
  }
}

export default EventFullDisplay;
