const slideDisplayTemplate = document.createElement("template");

slideDisplayTemplate.innerHTML = `
  <div
    style="border: 3px solid white;padding: 1rem; max-width: 2rem; margin-right: 1rem;"
  >
    <slot name="background-image-thumbnail"></slot>
    <slot name="title"></slot>
  </div>
`;

customElements.define(
  "slide-display",
  class SlideDisplay extends HTMLElement {
    mountPoint: HTMLElement;

    constructor() {
      super();
      console.debug("SlideDisplay", this, this.attributes);
      const shadowRoot = this.attachShadow({ mode: "open" });
      this.mountPoint = document.createElement("div");
      shadowRoot.appendChild(this.mountPoint);
      const clone = slideDisplayTemplate.content.cloneNode(true);
      this.mountPoint.appendChild(clone);
    }

    connectedCallback() {
      console.debug("connected callback", this);
    }
  }
);
