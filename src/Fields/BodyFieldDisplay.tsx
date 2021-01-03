import React from "react";
import { BodyFieldInterface } from "./BodyField";

export interface BodyFieldProps {
  data: Array<BodyFieldInterface> | BodyFieldInterface;
}

export const BodyFieldDisplay = (props: BodyFieldProps) => {
  const { data } = props;
  console.debug("BodyFieldDisplay", data);
  const articleText = Array.isArray(data)
    ? data?.map((fieldData: BodyFieldInterface) => fieldData.processed).join()
    : data.processed;
  return <article dangerouslySetInnerHTML={{ __html: articleText }} />;
};

export default BodyFieldDisplay;
