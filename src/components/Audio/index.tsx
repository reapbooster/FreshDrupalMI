import React, { useState } from 'react';
import Loading from "../Loading";
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import {GenericFileUri} from "../../DataTypes/GenericFile";
import LinkProperty from '../../DataTypes/LinkProperty';

interface AudioEntityProps {
  type: string;
  id: string;
  links: LinkProperty;
  drupal_internal__fid?: number;
  filename?: string;
  uri?: GenericFileUri;
  filemime?: string;
  filesize?: number;
  status?: boolean;
  created?: string;
  changed?: string;
}

const Audio = (props: AudioEntityProps) => {
  if (props.uri?.url) {
    return (
      <>
        <audio controls src={props.uri?.url} style={{ width: "100%", marginBottom: "2rem", }}/>
      </>
    );
  }

  return (
    <>
      <Loading/>
    </>
  );
}



export default Audio;
