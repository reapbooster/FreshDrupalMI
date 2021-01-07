const menuColumnTemplate = document.createElement("template");
menuColumnTemplate.innerHTML = `
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
    }
  }
);
