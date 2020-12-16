import React, { useState } from "react";
import { SlideInterface } from "DataTypes/Slide";
import { SlideFiftyFifty } from "DataTypes/SlideFiftyFifty";
import { EntityComponentProps } from "DataTypes/EntityComponentProps";
import Loading from "../Loading";

export interface SlideDisplayFiftyFiftyProps {
  data: SlideInterface;
  view_mode: string;
}

export const SlideDisplayFiftyFifty: React.FunctionComponent = (
  props: SlideDisplayFiftyFiftyProps
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
  console.log("Slide Fifty Fifty Data:", slideData);
  return (
    <div>
      <h3>Slide--Fifty-Fifty -{leftOrRight}</h3>
    </div>
  );
};

export default SlideDisplayFiftyFifty;
