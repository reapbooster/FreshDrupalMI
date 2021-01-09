import * as MainNavigationCss from "./main-navigation.scss";

const menuColumnTemplate = document.createElement("template");
menuColumnTemplate.innerHTML = `
  <style></style>
  <div>
    <slot name="column-title"></slot>
    <slot name="column-content"></slot>
  </div>
`;

customElements.define(
  "menu-column",
  class MenuColumn extends HTMLElement {
    constructor() {
      super();
      const shadowroot = this.attachShadow({ mode: "open" });
      const clone = menuColumnTemplate.content.cloneNode(true);
      shadowroot.appendChild(clone);
      document
        .querySelector("style")
        .innerText.concat(MainNavigationCss.default.toString());
    }
  }
);
