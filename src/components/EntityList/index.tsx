import React from 'react';
import ErrorBoundary from '../../Utility/ErrorBoundary';
import {EntityInterface} from '../../DataTypes/Entity';

interface EntityListProps {
  items: Array<EntityInterface>;
  view_mode: string;
  ListItemComponent: React.ReactElement;
}


const EntityList: React.FunctionComponent = (props: EntityListProps) => {

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