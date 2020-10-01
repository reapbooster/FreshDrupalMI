import React from 'react';

export interface EventSpeakersProps {
  gridID: string;
}

export const EventSpeakers = (props: EventSpeakersProps) => {
  const { gridID } = props;

  return (
    <div>
      <h1>Speakers for EventID: {gridID}</h1>
    </div>
  );

}
