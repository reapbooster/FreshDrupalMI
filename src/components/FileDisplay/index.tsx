import React, {useState} from 'react';
import {FileInterface} from '../../DataTypes/File'
import ImageFile from "../../DataTypes/ImageFile";
import DocumentFile from "../../DataTypes/DocumentFile";
import ImageFileDisplay from './ImageFileDisplay';
import DocumentFileDisplay from './DocumentFileDisplay';
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";
/**
 * Implementation of the Model:
 *
 * @param incoming: FileInterface
 */

function FileDataFactory(incoming: FileInterface): File {
  switch (incoming.type) {
    case "file--image":
      return new ImageFile(incoming);
    case "file--document":
      return new DocumentFile(incoming);
    default:
      console.error("Cannot determine Data Class", incoming);
      throw new Error("Cannot Determine Data Class for ".concat(incoming.type));
  }
}

/**
 * Implementation of the View
 *
 * @param incoming: FileInterface
 */
function FileComponentFactory(incoming: FileInterface): React.FunctionComponent {
  switch(incoming.type) {
    case "file--image":
      return ImageFileDisplay;
    case "file--document":
      return DocumentFileDisplay;
    default:
      console.error("Cannot determine Data Class", incoming);
      throw new Error("Cannot Determine Data Class for ".concat(incoming.type));
  }
}


/**
 * Implementation of the Controller
 *
 * @param FileDisplayProps
 */
interface FileDisplayProps {
  data: FileInterface;
  key?: number;
  view_mode: string;
}

const FileDisplay = (props) => {
  const [ fileData, setFileData ] = useState(FileDataFactory(props.data));
  if (!fileData.hasData()) {
    const ecp = new EntityComponentProps(fileData);
    ecp.getData(fileData.getIncluded())
      .then(res => res.json)
      .then((ajaxData) => {
        setFileData(FileDataFactory(ajaxData.data));
      });
    return (
      <>
        <Loading />
      </>
    );
  }
  const Component = FileComponentFactory(fileData);
  return (
    <ErrorBoundary key={props.key ?? 0}>
      <Component
        data={fileData} />
    </ErrorBoundary>
  )
}

export {FileDisplay as default, FileDisplayProps, FileComponentFactory, FileDataFactory}
