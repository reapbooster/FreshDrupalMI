import { EventInterface } from 'DataTypes/Event';
import {EventDataFactory} from "Components/EventDisplay/EventDataFactory";
import * as eckStyles from './eck-entity-event.scss';
import {WebComponentBase} from "Utility/WebComponentBase";


const eventDisplayTemplate = document.createElement("template");
eventDisplayTemplate.innerHTML = `
<div class="card" >
    <div class="card-header"><slot name="bundle"></slot></div>
    <div class="card-body">
      <div class="card-title"><slot name="title"></slot></div>
    </div>
  </div>
</div>
`;

customElements.define(
  "eck-entity-event",
  class EckEntityEventElement extends WebComponentBase {
    entityData: EventInterface;

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      const entityData = this.getAttribute('data-entity');
      try {
        const parsed = JSON.parse(entityData);
        this.entityData = EventDataFactory(parsed.data);
      } catch (e) {
        console.error("NO ENTITY DATA:", e.message, entityData );
      }

      this.styles = eckStyles.default.toString();
      this.template = eventDisplayTemplate;
      this.addStyles(shadowRoot);
      this.applyTemplate(shadowRoot);
    }

    getThumbnailUrl = (): string => {
      return this.entityData.field_hero_image?.field_media_image?.imageStyleObject.medium;
    }
  }
);
