import React from "react";
import ParagraphAuthor from "../../DataTypes/ParagraphAuthor";

export interface ParagraphDisplayAuthorProps {
  data: ParagraphAuthor;
  view_mode: string;
  key?: number;
}

export const ParagraphDisplayAuthor = (props: ParagraphAuthorProps) => {
  return (
    <div>
      <h1>Paragraph Author {props.data.title}</h1>
    </div>
  );
};

export default ParagraphDisplayAuthor;
