import React from 'react';
import * as DataObject from '../../DataTypes/Slide';

export interface SlideDisplayFiftyFiftyProps {
  data: DataObject.default;
  view_mode: string;
}

export const SlideDisplayFiftyFifty : React.FunctionComponent = (props: SlideDisplayFiftyFiftyProps) => {

  console.debug("FiftyFifty", props);

  // ========== BACKGROUND IMAGE STUFF ==========
  const backgroundImageStyleObject = new HolderImageStyleObject();
  const image = new ImageFile(props.data.field_background_image);


  if (image.imageStyleObject) {
    console("I have the data I need:", image);
    backgroundImageStyleObject = image.imageStyleObject;
  } else {
    console.debug('using state to get background image style object', image);
    const [ backgroundImageStyleObject, setBackgroundImageStyleObject ] = useState(backgroundImageStyleObject);
  }
  if (backgroundImageStyleObject.getData !== undefined) {
    backgroundImageStyleObject
      .getData()
      .then(res => res.json())
      .then((incoming) => {
      console.log("response", incoming);
      const image = new ImageFile(incoming.data);
      setBackgroundImageStyleObject(image.imageStyleObject);
    });
  }

  console.log("backgroundImageStyleObject", backgroundImageStyleObject);

  return (
      <div><h3>Slide--Fifty-Fifty</h3></div>
  )

}

export default SlideDisplayFiftyFifty;


