import React from 'react';
import ParagraphFourTileBlockQueue, { ParagraphFourTileBlockQueueInterface } from '../../DataTypes/ParagraphFourTileBlockQueue';

interface ParagraphMediaTilesFromAViewProps {
  data: ParagraphFourTileBlockQueue;
  view_mode: string;
}

const ParagraphMediaTilesFromAView: React.FunctionComponent = (props: ParagraphMediaTilesFromAViewProps) => {
  console.debug("ParagraphMediaTilesFromAView", props);
  return (
    <div>
      <h1>ParagraphMediaTilesFromAView</h1>
    </div>
  );
}
