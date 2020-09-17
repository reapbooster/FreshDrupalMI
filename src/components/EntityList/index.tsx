import React, { useState } from 'react';
import ErrorBoundary from '../../Utility/ErrorBoundary';
import {EntityInterface} from '../../DataTypes/Entity';
import ListComponentSource, {ListComponentSourceInterface} from '../../DataTypes/ListComponentSource';

interface EntityListProps {
  source?: ListComponentSourceInterface;
  items?: Array<EntityInterface>;
  view_mode: string;
  ListItemComponent: React.ReactElement;
}


const EntityList: React.FunctionComponent = (props: EntityListProps) => {

  if ((props.items?.length ?? 0) == 0) {
    const [items, setItems] = useState([]);
    const source = new ListComponentSource(props.source);
    source.getSourceData()
      .then((res => res.json))
      .then((results) => {
        setItems(results.data);
      })
  } 

  const Component = props.ListItemComponent;  
    return (
      <>
        <entity-list>
          {props.items.map((item: EntityInterface, key: number) => {
              return (
                <ErrorBoundary key={key}>
                  <Component data={item} view_mode={props.view_mode} />
                </ErrorBoundary>
              )
            })
          }
        </entity-list>
      </>
    );

}

export {EntityList as default, EntityListProps}