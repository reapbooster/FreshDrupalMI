import React from "react";
import { EventInterface } from "../../DataTypes/Event";
import { Jumbotron, Container } from "react-bootstrap";
import moment from "moment";

export interface EventHeroProps {
  data: EventInterface;
}

export const EventHero = (props: EventHeroProps) => {
  const { data } = props;
  const eventDate = moment(data.field_event_date, moment.ISO_8601);

  const jumbotronStyle = {
    minHeight: "300px",
    minWidth: "100%",
    paddingVertical: "1rem",
  };

  return (
    <Jumbotron style={jumbotronStyle} fluid={true}>
      <Container>
        <h1 className={"display-3"}>{data.title}</h1>
        <p className={"lead"}>{eventDate.format("MMMM D, YYYY")}</p>
      </Container>
    </Jumbotron>
  );
};
