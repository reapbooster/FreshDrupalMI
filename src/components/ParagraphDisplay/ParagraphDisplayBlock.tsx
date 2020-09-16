import React from 'react';
import ParagraphBlock from '../../DataTypes/ParagraphBlock';

interface ParagraphDisplayBlockProps {
  data: ParagraphBlock;
  view_mode: string;
}

const ParagraphDisplayBlock = (props: ParagraphDisplayBlockProps) => {
  console.debug("Paragraph Block", props);
  return (
    <div>
      <h1>Paragraph Block</h1>
    </div>
  )
}

export { ParagraphDisplayBlock as default, ParagraphDisplayBlockProps };
