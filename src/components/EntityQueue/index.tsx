import React from 'react';
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";

import List from '../List';

class EntityQueue extends EntityComponentBase<EntityComponentPropsInterface, EntityComponentState> {

  include = '&include=items,items.field_hero_image';

  componentDidMount() {
    if (this.state.loading == false && this.state.loaded == false) {
      console.debug("now, get data for component");
      this.getDataForComponent(this.include);
    }
  }

  render() {
    console.debug("EntityQueue render: ", this.props, this.state);
      if (this.state?.loaded && this.state.attributes?.items?.length) {
        return (
          <List id={this.props.id}
                items={this.state.attributes.items}
                view_mode={this.props.view_mode}
                entityTypeId={this.props.entityTypeId}
                browser={false}
          />
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
