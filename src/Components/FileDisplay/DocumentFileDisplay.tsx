import React from "react";
import { DocumentFileInterface } from "../../DataTypes/DocumentFile";

interface DocumentFileDisplayProps {
  data: DocumentFileInterface;
  view_mode: string;
}

const DocumentFileDisplay: React.FunctionComponent = (
  props: DocumentFileDisplayProps
) => {
  return (
    <>
      <h1>Document File</h1>
    </>
  );
};

export { DocumentFileDisplay as default, DocumentFileDisplayProps };
