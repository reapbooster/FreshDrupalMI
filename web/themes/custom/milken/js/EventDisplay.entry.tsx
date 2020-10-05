import React from "react";
import ReactDOM from "react-dom";
import { EventFullDisplay } from "Components/EventDisplay/EventFullDisplay";
import BootstrapProvider from "@bootstrap-styled/provider";
import * as retargetEvents from "react-shadow-dom-retarget-events";
import ErrorBoundary from "../../../../../src/Utility/ErrorBoundary";

export class MilkenWrapper extends HTMLElement {
  mountPoint: HTMLElement;
  props: Record<string, any>;

  constructor() {
    super();
    this.props = this.dataset;
    console.debug("MilkenWRapper", this, this.attributes);
    this.getComponents = this.getComponents.bind(this);
    this.mountPoint = document.createElement("div");
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styleSheet = document.createElement("link");
    styleSheet.setAttribute("rel", "stylesheet");
    // TODO: Make this dynamic from the webpack compile's css subset
    styleSheet.setAttribute(
      "href",
      "/libraries/bootstrap/css/boostrap.min.css"
    );
    shadowRoot.appendChild(styleSheet);
    shadowRoot.appendChild(this.mountPoint);
    ReactDOM.render(this.getComponents(), this.mountPoint);
    retargetEvents(shadowRoot);
  }

  getComponents() {
    return (
      <BootstrapProvider>
        <ErrorBoundary>
          <EventFullDisplay {...this.props} />
        </ErrorBoundary>
      </BootstrapProvider>
    );
  }
}

window.customElements.define("event-detail", MilkenWrapper);

/**
 * <EventFullDisplay
 * data={eventDetailData}
 * view_mode={this.dataset.viewMode}
 * gridID={this.dataset.gridId}
 * can_edit={this.dataset.canEdit}
 * />,
 */
