
import styles from './node-landing-page.scss';
import { NodeLandingPageInterface } from "DataTypes/NodeLandingPage";
import NodeDataFactory from "Components/NodeDisplay/NodeDataFactory";

const nodeLandingPageDisplayTemplate = document.createElement("template");

nodeLandingPageDisplayTemplate.innerHTML = `
<div class="card" >
    <div class="card-header"></div>
    <div class="card-body">
      <slot name="title"></slot>
      <div class="card-title"><slot name="title"></slot></div>
    </div>
  </div>
</div>
`;

customElements.define(
  "node-landing-page",
  class NodeLandingPage extends HTMLElement {
    mountPoint: HTMLElement;
    entityData: NodeLandingPageInterface;

    constructor() {
      super();
      const parsed = JSON.parse(this.getAttribute('data-entity'));
      this.entityData = NodeDataFactory(parsed.data);
      const toAppend = document.createElement('h5');
      toAppend.slot = "title";
      toAppend.textContent = this.entityData.title;
      this.appendChild(toAppend);
      const shadowRoot = this.attachShadow({ mode: "open" });
      this.mountPoint = document.createElement("div");
      shadowRoot.appendChild(this.mountPoint);
      const style = document.createElement('style');
      style.textContent = styles;
      shadowRoot.appendChild(style);
      if (this.nextElementSibling.classList.contains('dropbutton-wrapper')) {
        this.mountPoint.appendChild(this.nextElementSibling);
      }

      const clone = nodeLandingPageDisplayTemplate.content.cloneNode(true);
      this.mountPoint.appendChild(clone);

    }

    connectedCallback = () => {
      this.mountPoint.querySelector('.card').setAttribute('style', "");
    }
  }
);
