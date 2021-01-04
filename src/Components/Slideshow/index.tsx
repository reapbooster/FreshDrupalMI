import React from "react";
import styled from "styled-components";
import { SlideDisplay } from "../SlideDisplay";
import { SlideInterface } from "../../DataTypes/Slide";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import Loading from "../Loading";
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

  const slideshowIndicatorsListStyle = {
    position: "absolute",
    bottom: "-25px",
  };

  const slideShowIndicatorStyle = {
    height: "8rem",
    backgroundColor: "#666",
    flexGrow: 1,
    flexShrink: 0,
  };

  return (
    <div className="carousel slide" data-ride="carousel" id="SlideShowCarousel">
      <ol className="carousel-indicators" style={slideshowIndicatorsListStyle}>
        {items.map((item, key) => {
          return (
            <li
              style={slideShowIndicatorStyle}
              key={key}
              className={key === 0 ? " active" : ""}
              data-target="#SlideShowCarousel"
              data-slide-to={key}
            >
              {item.label}
            </li>
          );
        })}
      </ol>
      <div className="carousel-inner">
        {items.map((slide: SlideInterface, key: number) => {
          console.debug("Sending to slide display...", slide);
          return (
            <div
              className={"carousel-item ".concat(key === 0 ? "active" : "")}
              key={key}
              id={slide.id}
            >
              <ErrorBoundary>
                <SlideDisplay
                  data={slide}
                  view_mode={props.view_mode ?? "full"}
                />
              </ErrorBoundary>
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
