import React from 'react';
import * as DataObject from '../../DataTypes/ParagraphBodyContent';

interface ParagraphBodyContentProps {
  data: DataObject.default;
  view_mode: string;
}

const ParagraphBodyContent = (props: ParagraphBodyContentProps) => {
  console.debug("Paragraph BodyContent", props);
  return (
    <div>
      <h1>Paragraph BodyContent</h1>
    </div>
  )
}

export default ParagraphBodyContent;
