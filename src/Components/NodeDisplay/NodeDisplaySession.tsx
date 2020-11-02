import React, { useState } from "react";
import NodeSession, { NodeSessionInterface } from "../../DataTypes/NodeSession";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";

export interface NodeDisplaySessionProps {
  data: NodeSessionInterface;
  key?: number;
  view_mode: string;
}

export const NodeDisplaySession = (props: NodeDisplaySessionProps) => {
  const { data, key, view_mode } = props;
  const DataObject = new NodeSession(data);
  const [sessionData, setSeessionData] = useState(DataObject);
  if (!sessionData.hasData()) {
    const ecp = new EntityComponentProps();
    ecp
      .getData(sessionData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const obj = new NodeSession(ajaxData.data);
        setSeessionData(obj);
      });
    return <Loading />;
  }
  switch (view_mode) {
    default:
      return (
        <div
          data-id={sessionData.uuid}
          data-drupal-internal-nid={sessionData.drupal_internal__nid}
          data-entity-type={sessionData.type}
        >
          <span data-field="title">{sessionData.title}</span>
          <span data-field="start">{sessionData.field_start_end.value}</span>
          <span data-field="end">{sessionData.field_start_end.value_end}</span>
          <span data-field="summary">{sessionData.field_short_summary}</span>
          <span data-field="long-description">
            {sessionData.field_long_description}
          </span>
        </div>
      );
  }
  return <div>No Data</div>;
};

export default NodeDisplaySession;
