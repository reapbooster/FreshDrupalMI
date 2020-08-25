const MilkenArticleDetailTemplate = document.createElement('template');
MilkenArticleDetailTemplate.innerHTML = `
  <div class="container-flud">
    <div class="row">
      <div class="col">
        <slot name="field_content"></slot>
      </div>
    </div>
  </div>
`;

customElements.define('article-detail',

  class extends HTMLElement {

    container: HTMLElement;
    menuReveal: HTMLElement;

    showHide(evt = null) {
      console.log(this.container);
      this.container.style.display =  (this.container.style.display == "none") ? "block" : "none";
    }

    constructor() {
      super();
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(MilkenArticleDetailTemplate.content.cloneNode(true));
    }
  }
);
