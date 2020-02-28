import React from 'react';

interface BodyFieldProps {
  data: Array<BodyFieldData>
}

interface BodyFieldData {
  value: string;
  format: string;
  processed: string;
  summary: string;
}

const BodyField = (props: BodyFieldProps) => {
  console.log("BodyField", props);
  const articleData = props.data.map((fieldData: BodyFieldData, key: number) => { return fieldData.processed });
  return (
    <article dangerouslySetInnerHTML={{__html: articleData.join()}}>
    </article>
  );

}

export default BodyField;
