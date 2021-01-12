import React from "react";
import styled from "styled-components";
import { SlideDisplay } from "../SlideDisplay";
import { SlideInterface } from "../../DataTypes/Slide";
import Loading from "../Loading";
import { KeyValueTextFieldDisplay } from "../../Fields/KeyValueTextFieldDisplay";
export interface SlideShowProps {
  items?: Array<SlideInterface>;
  view_mode: string;
}

export const SlideShow = (props: SlideShowProps) => {
  console.debug("SlideShow", props);
  const { items, view_mode } = props;
  if (items.length === 0) {
    return <Loading />;
  }
  if (items.length === 1) {
    return <SlideDisplay data={items[0]} view_mode={view_mode} />;
  }

  const SlideshowIndicatorsList = styled.ol`
    margin: 0;
    align-items: flex-end;
    
    & > li {
      height: 100%;
      display: block;
      margin: 0px;
      background: rgb(46, 46, 52);
      flex-grow: 1;
      flex-shrink: 0;
      text-indent: 0px;
      opacity: 1;
      color: rgb(134, 135, 139);
      border-left: 1px solid rgb(21, 22, 24);
      border-right: 1px solid rgb(21, 22, 24);
      cursor: pointer;
      
      &.active{
        padding-top: 7px;
        box-shadow: 0px -5px 15px 0px black;
        margin-top: 5px;
        border-color: transparent;
        background-color: #0063ca;
      }

      & .h2 {
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 2px;
        color: white;
        font-family: 'LatoWeb';
        font-weight: lighter;
      }
        
      & .h1 {
        font-size: 1rem;
        color: white;
        font-weight: lighter;
        font-family: 'LatoWeb';
      }
    }  
  `;

  const KeyValueTextFieldDisplayContainer = styled.div`
    margin: 1rem;
  `;

  return (
    <div className="carousel slide" data-ride="carousel" id="SlideShowCarousel">
      <SlideshowIndicatorsList className="carousel-indicators">
        {items.map((item, key) => {
          return (
            <li
              key={key}
              className={key === 0 ? " active" : ""}
              data-target="#SlideShowCarousel"
              data-slide-to={key}
              title={item.title ?? "default-value"}
              id={"indicator-".concat(item.id)}
            >
              <KeyValueTextFieldDisplayContainer>
                <KeyValueTextFieldDisplay
                  data={item.field_slide_text?.slice(0, 2)}
                />
              </KeyValueTextFieldDisplayContainer>
            </li>
          );
        })}
      </SlideshowIndicatorsList>
      <div className="carousel-inner">
        {items.map((slide: SlideInterface, key: number) => {
          console.debug("Sending to slide display...", slide);
          return (
            <div
              className={"carousel-item ".concat(key === 0 ? "active" : "")}
              key={key}
              id={slide.id}
            >
              <SlideDisplay
                data={slide}
                view_mode={props.view_mode ?? "full"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

SlideShow.defaultProps = {
  items: [],
  view_mode: "full",
};

export default SlideShow;
