import React from 'react'
import {EventInterface} from '../../DataTypes/Event';

export interface EventProgramProps {
  gridID: string;
}

export const EventProgram = (props: EventProgramProps) => {
  const { gridID } = props;

  return (
    <div>
      <h1>Event Program for EventID: {gridID}</h1>
    </div>
  );
}

export default EventProgram;
