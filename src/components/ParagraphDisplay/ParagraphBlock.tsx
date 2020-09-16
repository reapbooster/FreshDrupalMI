import React from 'react';
import ParagraphBlock from '../../DataTypes/ParagraphBlock';

interface ParagraphBlockProps {
  data: ParagraphBlock,
}

const ParagraphBlock = (props: ParagraphBlockProps) => {
  console.debug("Paragraph Block", props);
  return (
    <div>
      <h1>Paragraph Block</h1>
    </div>
  )
}

export default ParagraphBlock;
