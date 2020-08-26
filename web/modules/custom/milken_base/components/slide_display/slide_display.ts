

const SlideTemplates = {

  full: {},

  card: `
    <div class="card my-5">
      <slot name="image" />
      <div class="card-body" style={{minHeight: "150px"}}>
        <div class="card-title"><slot name="title"></slot></div>
      </div>
      <div class="card-footer"><slot name="created"></slot></div>
    </div>
  `

}


customElements.define('slide', class extends HTMLElement {

  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    const template = SlideTemplates[this.dataset.view_mode ?? 'card'];
    shadowRoot.appendChild(template);
  }

});
