import React from "react";
import {MediaInterface} from "../../DataTypes/Media";
import {EntityInterface} from "../../DataTypes/Entity";
import MediaDisplay from ".";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import {ListableInterface} from "../../DataTypes/Listable";

interface MediaDisplayListProps {
  list: ListableInterface;
  view_mode: string;
}

const MediaDisplayList: React.FunctionComponent = (props: MediaDisplayListProps) => {
  const {list, view_mode} = props;
  return list.getItems().map((item: EntityInterface, key: number) => {
    return (
      <>
        <ErrorBoundary key={key}>
          <MediaDisplay
            data={item}
            view_mode={view_mode}
          />
        </ErrorBoundary>
      </>
    )
  });
}

export {MediaDisplayList as default, MediaDisplayListProps}
