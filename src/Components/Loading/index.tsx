import React from "react";
import FontAwesomeIcon from "react-fontawesome";


const Loading = () => {
  return (
    <figure style={{margin: "20px auto"}}>
      <FontAwesomeIcon name="spinner" size={"5x"} />
      <figcaption>Loading...</figcaption>
    </figure>
  )
}

export default Loading;
