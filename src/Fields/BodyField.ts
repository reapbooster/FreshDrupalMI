import React from 'react';

interface BodyFieldProps {
  data: Array<BodyFieldInterface> | BodyFieldInterface;
}

export interface BodyFieldInterface {
  value: string;
  format: string;
  processed: string;
  summary: string;
}

export class BodyField implements BodyFieldInterface {
  value: string;
  format: string;
  processed: string;
  summary: string;

  constructor(incoming: BodyFieldInterface) {
    Object.assign(this, incoming);
  }
}

export const BodyFieldDisplay = (props: BodyFieldProps) => {
  const { data } = props;
  console.debug("BodyFieldDisplay", data);
  const articleText = Array.isArray(data) ?
    data?.map((fieldData: BodyFieldInterface) => fieldData.processed).join() :
    data.processed
  ;
  return (
    <article dangerouslySetInnerHTML={{__html: articleText}} />
  );

}

export default BodyField;
