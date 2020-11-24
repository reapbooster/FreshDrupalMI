import React, { useState } from "react";
import DocumentFile, {
  DocumentFileInterface,
} from "../../DataTypes/DocumentFile";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";

interface DocumentFileDisplayProps {
  data: DocumentFileInterface;
  view_mode: string;
  label?: string;
}

const DocumentFileDisplay: React.FunctionComponent = (
  props: DocumentFileDisplayProps
) => {
  const { data, view_mode, label } = props;
  const DataObject = new DocumentFile(data);
  const [documentData, setDocumentData] = useState(DataObject);
  if (!documentData?.hasData()) {
    const ecp = new EntityComponentProps(documentData);
    ecp
      .getData(documentData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        console.debug("MilkenDocument data back from JSON", ajaxData);
        const DataObject = new DocumentFile(ajaxData.data);
        setDocumentData(DataObject);
      });
  }

  return (
    <>
      <a
        href={documentData.uri.url}
        style={{
          background: "var(--color-milken-orange)",
          color: "white",
          fontWeight: "bold",
          letterSpacing: "0.1em",
          padding: "1em",
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        {label ? label : documentData.filename}
      </a>
    </>
  );
};

export { DocumentFileDisplay as default, DocumentFileDisplayProps };
