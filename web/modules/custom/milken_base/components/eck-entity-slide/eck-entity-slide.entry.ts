
import ImageFile from "DataTypes/ImageFile";

const slideDisplayTemplate = document.createElement("template");

slideDisplayTemplate.innerHTML = `
<style type="text/css">
.card {
    padding: .5rem;
    margin: 0 .5rem;
    background-color: #dfdfdf;
    border-radius: .5em;
}

.card-body {
    width: 20rem;
    height: 10rem;
    padding: .5rem;
    margin: .5rem;
    border: 1px solid #dfdfdf;
    boxShadow: 2px 2px #aaa;
    background-color: white;
    border-radius: .5em;
}

</style>
<div class="card" >
    <div class="card-header">

    </div>
    <div class="card-body">
      <slot name="title"></slot>
      <div class="card-title"><slot name="title"></slot></div>
    </div>
  </div>
</div>
`;

customElements.define(
  "eck-entity-slide",
  class EckEntitySlide extends HTMLElement {
    mountPoint: HTMLElement;
    entityData: Record<string, unknown>;

    constructor() {
      super();
      const parsed = JSON.parse(this.getAttribute('data-entity'));
      this.entityData =
        Object.assign(
          parsed.data.attributes,
          parsed.data.relationships
        );
      this.entityData.links = parsed.links;
      const toAppend = document.createElement('h5');
      toAppend.slot = "title";
      toAppend.textContent = this.entityData.title;
      this.appendChild(toAppend)
      console.debug("eck-entity-slide", this.entityData);
      const shadowRoot = this.attachShadow({ mode: "open" });
      this.mountPoint = document.createElement("div");
      shadowRoot.appendChild(this.mountPoint);
      const clone = slideDisplayTemplate.content.cloneNode(true);
      this.mountPoint.appendChild(clone);
    }

    connectedCallback() {
    }
  }
);
