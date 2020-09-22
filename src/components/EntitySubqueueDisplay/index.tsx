import React, {useState} from 'react';
import {EntitySubqueue, EntityQueue } from '../../DataTypes/EntitySubqueue';
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import List from '../List';
import { EntityInterface } from "../../DataTypes/Entity";

export interface EntitySubqueueDisplayProps {
  items: Array<EntityInterface>;
  view_mode: string;
}

export const EntitySubqueueDisplay = (props) => {

  const [entitySubqueueData, setEntitySubqueueData] = useState(new EntityQueue(props.data));

  if (!entitySubqueueData.hasData()) {
    const ecp = new EntityComponentProps(entitySubqueueData);
    ecp.getData(entitySubqueueData.getIncluded())
      .then(res => res.json())
      .then(ajaxData => {
        console.debug('EntitySubqueue back from ajax call');
        setEntitySubqueueData(new EntitySubqueue(ajaxData.data));
      });
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <List id={entitySubqueueData.id}
                items={entitySubqueueData.items}
                view_mode={props.view_mode}
                entityTypeId={entitySubqueueData.queue?.entity_settings?.target_type}
                browser="false"
          />
    </>
  )

}

export default EntitySubqueueDisplay;
