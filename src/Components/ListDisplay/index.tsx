/**
 * List Display
 * Use this when you don't know what kind of entities you're displaying.
 *
 *
 *
 */

import React, { useRef } from "react";
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
      &::-webkit-scrollbar {
        display: none;
      }
    `;

  const ArrowWrapper = styled.span`
    height: 100%;
    font-size: 3em;
    position: absolute;
    right: 0;
    top: 0;
    box-shadow: 0 0 0.5em 0.65em #fff;
  `;

  const ArrowRight = styled.span`
    position: absolute;
    right: 10%;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
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

  const refListDisplay = useRef(null);
  const onArrowRightClick = () => {
    refListDisplay.current.scrollLeft <
    refListDisplay.current.scrollWidth - refListDisplay.current.offsetWidth
      ? (refListDisplay.current.scrollLeft =
          refListDisplay.current.scrollLeft + 238)
      : (refListDisplay.current.scrollLeft = "0");
  };

  return (
    <ContainerComponent
      id={"list-".concat(id)}
      className={`${
        props.view_mode == "tile"
          ? "d-flex flex-wrap justify-content-center"
          : props.view_mode == "card"
          ? "d-flex justify-content-lg-center justify-content-xs-start overflow-auto"
          : ""
      }`}
      ref={refListDisplay}
      style={{ scrollBehavior: "smooth" }}
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

      {props.view_mode == "card" ? (
        <ArrowWrapper className={"d-lg-none my-a"} onClick={onArrowRightClick}>
          <ArrowRight>
            <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
          </ArrowRight>
        </ArrowWrapper>
      ) : null}
    </ContainerComponent>
  );
};

export default ListDisplay;
