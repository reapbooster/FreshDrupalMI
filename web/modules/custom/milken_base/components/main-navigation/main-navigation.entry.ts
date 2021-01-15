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
      const style = document.createElement("style");
      style.innerText = MainNavigationCss.default.toString();
      document.querySelector("head").appendChild(style);
    }
  }
);

customElements.define(
  "milken-menu-main",
  class MilkenMenuMain extends HTMLElement {
    constructor() {
      super();
      this.classList.remove("d-flex");
      this.classList.add("d-none");
      document
        .querySelector("#menu-reveal")
        .addEventListener("click", this.toggle.bind(this));
    }

    toggle() {
      console.log("toggle", this);
      if (this.classList.contains("d-flex")) {
        this.classList.remove("d-flex");
        this.classList.add("d-none");
      } else {
        this.classList.add("d-flex");
        this.classList.remove("d-none");
      }
    }
  }
);
