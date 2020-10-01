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
  return (
    list?.map((item, key) => {
      return (
        <>
          <ErrorBoundary key={key}>
            <ParagraphDisplay data={item} view_mode={view_mode} />
          </ErrorBoundary>
        </>
      );
    }) ?? []
  );
};

export default ParagraphDisplayList;
