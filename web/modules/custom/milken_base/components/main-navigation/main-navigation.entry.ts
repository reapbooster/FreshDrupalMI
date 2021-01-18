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
      this.classList.add("hide-menu");
      document
        .querySelector("#menu-reveal")
        .addEventListener("click", this.toggle.bind(this));
        
    }

    toggle() {
      console.log("toggle", this);
      if (this.classList.contains("invisible")) {
        this.classList.remove("invisible");
      }
      if (this.classList.contains("d-flex")) {
        this.classList.remove("d-flex");
        this.classList.add("hide-menu");
      } else {
        this.classList.add("d-flex");
        this.classList.remove("hide-menu");
      }
      document.querySelector("#menu-reveal").classList.toggle("fa-times");
    }
  }
);
