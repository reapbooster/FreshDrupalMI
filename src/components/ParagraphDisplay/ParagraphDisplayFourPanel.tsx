import React from 'react';
import * as DataObject from '../../DataTypes/ParagraphFourPanel';

interface ParagraphDisplayFourPanelProps  {
  data: DataObject.ParagraphFourPanelInterface;
  view_mode: string;
}


const ParagraphDisplayFourPanel: React.FunctionComponent = (props: ParagraphDisplayFourPanelProps) => {
  console.debug("ParagraphFourPanel", props);
  return (
    <div>
      <h1>Paragraph Four Panel</h1>
    </div>
  )

}

export  {ParagraphDisplayFourPanel as default, ParagraphDisplayFourPanelProps};
