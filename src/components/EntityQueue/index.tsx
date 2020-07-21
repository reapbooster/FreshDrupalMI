import React from 'react';
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";

import List from '../List';

class EntityQueue extends EntityComponentBase<EntityComponentPropsInterface, EntityComponentState> {

  include = '&include=items,items.field_hero_image';

  componentDidMount() {
    if (!this.state.loaded && !this.state.loading) {
      this.getDataForComponent(this.include);
    }
  }

  render() {
      if (this.state?.loaded) {
        return (
          <List id={this.state.id}
                items={this.state.attributes.items} />
        );

      }
      else if (this.state?.loading) {
        return ( <Loading /> )
      } else
      return (
        <h1>No Data Available</h1>
      );
  }

}

export { EntityQueue as default };
