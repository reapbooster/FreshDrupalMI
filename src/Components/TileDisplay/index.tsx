import React from 'react';
import {EntityInterface} from '../../DataTypes/Entity';
import styled from 'styled-components';
import ListDisplay from '../ListDisplay';

interface TileDisplayProps {
  items: Array<EntityInterface>
  container: React.ElementRef;
}

export TileDisplay = (props: TileDisplayProps) => {

  const {items, container} = props;
  const ContainerComponent = container ?? styled.div`
    display: flex;
  `;

return (
  <>
    <ContainerComponent>
      <ListDisplay items={items} view_mode={"tile"} container={ContainerComponent} />
    </ContainerComponent>
  </>
)


}