import React from "react";
import ReactDOM from "react";
import EntityDisplay from "Components/EntityDisplay";

const EntityDisplayContainer = document.querySelector("entity-display");

const EntityDisplayProps = EntityDisplayContainer.dataset;

ReactDOM.render(
  <EntityDisplay {...EntityDisplayProps} />,
  EntityDisplayContainer
);
