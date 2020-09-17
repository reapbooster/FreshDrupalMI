import React from 'react';
import EntityList, { EntityListProps } from '../EntityList';

const ReportsBrowser = (props: EntityListProps) => {
  return (
    <>
      <EntityList 
        {...props}
      />
    </>
  )
}

export { ReportsBrowser as default } ;
