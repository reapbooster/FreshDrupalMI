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
        <div key={key}>
          <h1>Session: {sessionData.title}</h1>
        </div>
      );
  }
  return <div>No Data</div>;
};

export default NodeDisplaySession;
