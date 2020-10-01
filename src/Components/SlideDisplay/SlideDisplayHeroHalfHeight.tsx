import React, { useState } from "react";
import { SlideDisplayProps } from ".";

import SlideFiftyFifty from "../../DataTypes/SlideFiftyFifty";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";

export const SlideDisplayHeroHalfHeight: React.FunctionComponent = (
  props: SlideDisplayProps
) => {
  console.debug("FiftyFifty", props);
  const { data, view_mode } = props;
  const DataObject = new SlideFiftyFifty(data);
  const [slideData, setSlideData] = useState(DataObject);

  if (!slideData.hasData()) {
    const ecp = new EntityComponentProps(slideData);
    ecp
      .getData(slideData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setSlideData(new SlideFiftyFifty(ajaxData.data));
      });
    return <Loading />;
  }
  const leftOrRight = slideData.type.split("_").pop();
  console.log("HeroHalfHeight", props);
  return (
    <div>
      <h3>Slide--Hero Half Height</h3>
    </div>
  );
};

export default SlideDisplayHeroHalfHeight;
