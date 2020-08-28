import React from 'react';
import SlideDataInterface from '../../DataTypes/SlideDataInterface';


const FiftyFifty : React.FunctionComponent = (props: SlideDataInterface) => {

    console.debug("FiftyFifty", props);

    return (
        <div><h3>Fifty-Fifty</h3></div>
    )

}

export default FiftyFifty;


