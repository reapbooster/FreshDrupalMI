/**
 * Media List Display
 * Use this when the bundle type is unknown. 
 * If the bundle type is known, create a new Bundle-specific list
 * 
 * 
 */


import React from "react";
import {EntityInterface} from "../../DataTypes/Entity";
import MediaDisplay from ".";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import {ListableInterface} from "../../DataTypes/Listable";
import styled, {StyledComponent} from "styled-components";

interface MediaDisplayListProps {
  list: ListableInterface;
  view_mode: string;
  container: StyledComponent,
}

const MediaDisplayList: React.FunctionComponent = (props: MediaDisplayListProps) => {
  const {list, view_mode, container} = props;
  const ContainerDiv = container ?? styled.div`
    max-width: 18rem;
  `;
  return list.items?.map((item: EntityInterface, key: number) => {
    return (
      <>
        <ErrorBoundary key={key}>
          <MediaDisplay
            data={item}
            view_mode={view_mode}
            container={ContainerDiv}
          />
        </ErrorBoundary>
      </>
    )
  });
}

export {MediaDisplayList as default, MediaDisplayListProps}
