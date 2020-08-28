class SlideDisplay extends HTMLElement {

  template: HTMLTemplateElement;
  container: HTMLElement;

  constructor() {
    super();
    console.debug(this.dataset);
    this.getTemplate = this.getTemplate.bind(this);
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.template = this.getTemplate(this.dataset.viewMode);
    shadowRoot.appendChild(this.template.content);
    const container = shadowRoot.getElementById('slide-container-'.concat(this.id));
    container.style.setProperty('background-image', "url(".concat(this.dataset.backgroundImage, ")"));
    container.style.setProperty('background-size', 'cover');
    container.style.setProperty('background-position', 'center center');
    container.className = 'col col-lg-3 col-md-4 col-sm-6 col-xs-12';
    container.title = this.dataset.title;
    shadowRoot.querySelector('div.card-title').setAttribute('style', 'display:none');
    console.debug("SlideDisplay constructor", this);
  }

  getTemplate(view_mode: string = "full") {
    var toReturn = document.createElement('template');
    switch (view_mode) {

      default:
        toReturn.innerHTML = `
            <style>
              :host {
                width: 20rem;
                display:inline-block;
              }
            </style>
            <div id="slide-container-${this.id}" title="">
              <div class="card">
                <div class="card-title">
                  <slot name="title"></slot>
                </div>
                <div class="card-body" style="min-height: 150px">
                  <slot name="slide-text"></slot>
                </div>
                <div class="card-footer">
                  <slot name="operations"></slot>
                </div>
            </div>
          </div>
      `;

    }
    return toReturn;
  }
}

customElements.define('slide-display', SlideDisplay);
//export default SlideDisplay;
