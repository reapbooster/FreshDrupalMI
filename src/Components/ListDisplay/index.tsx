/**
 * List Display
 * Use this when you don't know what kind of entities you're displaying.
 *
 *
 *
 */

import React from "react";
import { EntityInterface } from "../../DataTypes/Entity";
import styled, { StyledComponent } from "styled-components";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ListDisplayFactory from "./ListDisplayFactory";

export interface ListDisplayProps {
  id: string;
  list: Array<EntityInterface> | Promise<Array<EntityInterface>>;
  view_mode: string;
  container?: StyledComponent<any, any>;
}

export const ListDisplay = function (props: ListDisplayProps) {
  const { id, list, view_mode, container } = props;
  const ContainerComponent =
    container ??
    styled.div`
      display: flex;
    `;

  console.debug("list display:", list);
  if (!Array.isArray(list)) {
    return (
      <>
        <ContainerComponent>
          <h1>Nothing in list to display</h1>
        </ContainerComponent>
      </>
    );
  }
  return (
    <ContainerComponent id={"list-".concat(id)}>
      {list.map((item: EntityInterface, key: number) => {
        console.debug(" ==> list item:", item);
        const Component = ListDisplayFactory(item);
        return (
          <ErrorBoundary key={key}>
            <Component data={item} view_mode={view_mode} key={key} />
          </ErrorBoundary>
        );
      })}
    </ContainerComponent>
  );
};

export default ListDisplay;
