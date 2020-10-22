/**
 * Paragraph List
 * Used to display paragraphs from an entity ref revisions field
 * on a content object.
 *
 *
 *
 */

import React from "react";
import { ParagraphDisplay } from ".";
import { ErrorBoundary } from "../../Utility/ErrorBoundary";
import { ParagraphInterface } from "../../DataTypes/Paragraph";

export interface ParagraphDisplayListProps {
  list?: Array<ParagraphInterface>;
  view_mode: string;
}

export const ParagraphDisplayList = (props: ParagraphDisplayListProps) => {
  const { list, view_mode } = props;
  if (Array.isArray(list)) {
    return (
      list?.map((item, key) => {
        console.log("Paragraph Display List => ", list);
        return <ParagraphDisplay data={item} view_mode={view_mode} key={key} />;
      }) ?? []
    );
  }
  return [];
};

export default ParagraphDisplayList;
