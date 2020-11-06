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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

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
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar { display: none; }
    `;

    const ArrowWrapper = styled.span`
      height: 100%;
      font-size: 3em;
      position: absolute;
      right: 0;
      box-shadow: -15px 0 1em 1.5em rgba(255,255,255,0.9);
    `

    const ArrowRight = styled.span`
      position: absolute;
      right: 10%;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);    
  `

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
    <ContainerComponent 
      id={"list-".concat(id)}
      className={ `${ 
        ( props.view_mode == "tile" ) ? 
        "d-flex flex-wrap justify-content-center" : 
        ( props.view_mode == "card" ) ? "d-flex justify-content-lg-center justify-content-xs-start overflow-auto" : ""}` 
      }
    >
      {list.map((item: EntityInterface, key: number) => {
        console.debug(" ==> list item:", item);
        const Component = ListDisplayFactory(item);
        return (
          <ErrorBoundary key={key}>
            <Component data={item} view_mode={view_mode} key={key} />
          </ErrorBoundary>
        );
      })}

      {( props.view_mode == "card" ) ? 
        <ArrowWrapper className={ "d-lg-none" }>
          <ArrowRight>
            <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
          </ArrowRight>
        </ArrowWrapper>
        : null }
        
    </ContainerComponent>
  );
};

export default ListDisplay;
