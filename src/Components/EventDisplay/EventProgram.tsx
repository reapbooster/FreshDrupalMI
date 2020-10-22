import React from "react";
import { EventInterface } from "../../DataTypes/Event";
import JSONApiUrl from "./JSONApiUrl";

export interface EventProgramProps {
  gridID: string;
  data: EventInterface;
}

export const EventProgram = (props: EventProgramProps) => {
  const { gridID, data } = props;
  const query = new JSONApiUrl("/jsonapi/event/".concat(data.bundle.name));

  return (
    <div>
      <h1>Event Program for EventID: {gridID}</h1>
    </div>
  );
};

export default EventProgram;
