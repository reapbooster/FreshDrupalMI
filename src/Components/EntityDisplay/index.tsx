import React from "react";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { EntityInterface } from "../../DataTypes/Entity";
import EntityComponentFactory from "../EntityBrowser/EntityComponentFactory";

export interface EntityDisplayProps {
  data: EntityInterface;
  view_mode: string;
}

export const EntityDisplay = (props) => {
  const { data, view_mode } = props;
  const Component = EntityComponentFactory(data);
  return (
    <ErrorBoundary>
      <Component data={data} view_mode={view_mode} />
    </ErrorBoundary>
  );
};

export default EntityDisplay;
