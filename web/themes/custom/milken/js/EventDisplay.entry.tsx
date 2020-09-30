
import React from "react";
import ReactDOM from "react-dom";
import {EventFullDisplay} from "Components/EventDisplay/EventFullDisplay";

const EventDetail = document.querySelector('event-detail');

const EventDetailData = {
  entityTypeId: EventDetail.dataset.entityTypeId,
  bundle: EventDetail.dataset.bundle,
  drupalInternalId: EventDetail.dataset.drupalInternalId,
  id: EventDetail.dataset.id,
  type: EventDetail.dataset.type
}

ReactDOM.render(
  <EventFullDisplay data={EventDetailData} view_mode={EventDetail.dataset.viewMode} gridID={EventDetail.dataset.fieldEventGridId} />,
  EventDetail
);
