import React from "react";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { EntityInterface } from "../../DataTypes/Entity";
import EntityComponentFactory from "../EntityBrowser/EntityComponentFactory";

export interface EntityDisplayProps {
  data: EntityInterface;
  view_mode: string;
  can_edit: boolean;
}

export const EntityDisplay = (props) => {
  const { data, view_mode, can_edit } = props;
  const Component = EntityComponentFactory(data);
  return (
    <ErrorBoundary>
      <Component data={data} view_mode={view_mode} can_edit={can_edit} />
    </ErrorBoundary>
  );
};

export default EntityDisplay;
