import React from 'react';

interface BodyFieldProps {
  data: Array<BodyFieldInterface>
}

interface BodyFieldInterface {
  value: string;
  format: string;
  processed: string;
  summary: string;
}

class BodyField implements BodyFieldInterface {
  value: string;
  format: string;
  processed: string;
  summary: string;

  constructor(incoming: BodyFieldInterface) {
    Object.assign(this, incoming);
  }
}

const BodyFieldDisplay = (props: BodyFieldProps) => {
  console.debug("BodyFieldDisplay", props);
  const articleData = props.data?.map((fieldData: BodyFieldInterface) => fieldData.processed);
  return (
    <article dangerouslySetInnerHTML={{__html: articleData.join()}} />
  );

}

export { BodyField as default, BodyFieldDisplay, BodyFieldInterface, BodyFieldProps };
