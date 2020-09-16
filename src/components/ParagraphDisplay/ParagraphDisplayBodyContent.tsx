import React from 'react';
import * as DataObject from '../../DataTypes/ParagraphBodyContent';

interface ParagraphDisplayBodyContentProps {
  data: DataObject.default;
  view_mode: string;
}

const ParagraphDisplayBodyContent = (props: ParagraphDisplayBodyContentProps) => {
  console.debug("Paragraph BodyContent", props);
  return (
    <div>
      <h1>Paragraph BodyContent</h1>
    </div>
  )
}

export  { ParagraphDisplayBodyContent as default, ParagraphDisplayBodyContentProps };
