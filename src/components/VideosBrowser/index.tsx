import React from 'react';
import ListComponentSource from '../../DataTypes/ListComponentSource';
import EntityList, {EntityListProps} from '../EntityList';

const VideoBrowser = (props: EntityListProps) => {
  return (
    <>
      <EntityList
        {...props}
      />
    </>
  )
}

export default VideoBrowser;
