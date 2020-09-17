import React from 'react';
import ListComponentSource from '../../DataTypes/ListComponentSource';
import EntityList, {EntityListProps} from '../EntityList';

const EventsBrowser = (props: EntityListProps) => {
  return (
    <>
      <EntityList 
        {...props}
      />
    </>
  )
}

export {EventsBrowser as default};
