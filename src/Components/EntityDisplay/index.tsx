import React from "react";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { EntityInterface } from "../../DataTypes/Entity";
import EntityComponentFactory from "../EntityBrowser/EntityComponentFactory";

export interface EntityDisplayProps {
  data: EntityInterface | string;
  viewMode?: string;
  view_mode?: string;
  can_edit: boolean;
}

export const EntityDisplay = (props) => {
  console.log("Entity Display: ", props);
  const { data, view_mode, viewMode, can_edit } = props;
  const DataObject = data === data.toString() ? JSON.parse(data).data : data;
  console.log("DataObject", DataObject);
  const Component = EntityComponentFactory(DataObject);
  return (
    <ErrorBoundary>
      <Component
        data={DataObject}
        view_mode={view_mode ?? viewMode}
        can_edit={can_edit}
      />
    </ErrorBoundary>
  );
};

export default EntityDisplay;
