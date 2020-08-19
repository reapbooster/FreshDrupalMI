interface ReturnedData {
  data: Array<MenuItemDataInterface>,
  jsonapi: object;
  links: object;
  meta: object;
};

interface MenuItemDataInterface {
  type: string;
  id: string;
  drupal_internal__id: number;
  drupal_internal__revision_id: number;
  langcode: string;
  revision_created: string;
  revision_log_message?: string;
  enabled: boolean;
  title: string;
  description?: string,
  menu_name: string;
  link: object;
  external: boolean;
  rediscover: boolean;
  weight: number;
  expanded: boolean
  parent?: string
  changed: string;
  default_langcode: boolean;
  revision_translation_affected: boolean;
  view_mode: string;
  metatag?: object
  bundle: object;
  revision_user: object;
};

customElements.define('milken-main-navigation',

  class extends HTMLElement {

    getTemplate() : HTMLTemplateElement {
      let templates = document.getElementsByTagName('template');
      return templates.item(0);
    }

    renderChild(item: MenuItemDataInterface) : HTMLElement {
      var itemElement = document.createElement('div');
      itemElement.setAttribute('style', 'border: 1px solid orange;');
      itemElement.setAttribute('id', "menu_link_content--".concat(item.id));
      itemElement.setAttribute('data-parent', item.parent?.replace(/:/g, "--"));
      var toAppend = document.createElement('h3');
      toAppend.innerText = item.title;
      itemElement.appendChild(toAppend);
      return itemElement;
    }

    constructor() {
      super();
      const shadowRoot = this.attachShadow({mode: 'open'});
      console.log("shadowroot", shadowRoot);
      let template = this.getTemplate();
      if (template instanceof HTMLTemplateElement) {
        console.log("Attaching Template", template);
        let templateContent: DocumentFragment = template.content;
        shadowRoot.appendChild(templateContent.cloneNode(true));
      }
      console.log("milken-main-navigation", this.dataset.url);
      fetch(this.dataset.url)
        .then(res => res.json())
        .then( (jsondata: ReturnedData ) => {
          console.log("parsing Items", jsondata.data);
          // turn the items into elements with their uuid as id
          var noParent = [];
          jsondata.data?.map((item) => {
            if (item.parent == null) {
              shadowRoot.appendChild(this.renderChild(item));
            }
            var myParent = document.getElementById("menu_link_content--".concat(item.id));
            if (myParent instanceof HTMLElement) {
              myParent.appendChild(this.renderChild(item));
            } else {
              noParent.push(this.renderChild(item));
            }
          });
          /**
           do {
            for (var i in noParent) {
              var myParent = document.getElementById(noParent[i].parent.replace(/:/g, "--"));
              if (myParent instanceof HTMLElement) {
                let slice = noParent.splice(i, 1);
                myParent.append(slice);
              }
            }
          } while (myParent.length);
             **/
        });

    }
  }

);
