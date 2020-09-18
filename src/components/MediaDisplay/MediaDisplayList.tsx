import React from "react";
import {MediaInterface} from "../../DataTypes/Media";
import {EntityInterface} from "../../DataTypes/Entity";
import MediaDisplay from ".";
import ErrorBoundary from "../../Utility/ErrorBoundary";

interface MediaDisplayListProps {
  items: Array<MediaInterface>;
  view_mode: string;
}

const MediaDisplayList: React.FunctionComponent = (props: MediaDisplayListProps) => {
  if (props.items?.length) {
    return props.items.map((item: EntityInterface, key: number) => {
      return (
        <>
            <MediaDisplay
              key={key}
              data={item}
              view_mode={props.view_mode}
            />
        </>
      )
    });
  } else {
    return (
      <>
        <h1 className="visually-hidden">No Media Items to render</h1>
      </>
    )
  }
}

export {MediaDisplayList as default, MediaDisplayListProps}
