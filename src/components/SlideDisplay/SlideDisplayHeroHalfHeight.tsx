import React from 'react';
import {SlideDisplayProps} from '.';
import Slide from '../../DataTypes/SlideDataInterface';

export const SlideDisplayHeroHalfHeight : React.FunctionComponent = (props: SlideDisplayProps) => {
    console.log("HeroHalfHeight", props);
    return (
        <div><h3>Slide--Hero Half Height</h3></div>
    )
}

export default SlideDisplayHeroHalfHeight;
