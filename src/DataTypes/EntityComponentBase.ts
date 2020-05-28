import { EntityComponentProps } from './EntityComponentProps';
import React from 'react';

interface EntityComponentState {
  loading: boolean,
  loaded: boolean,
  error: boolean,
  key: number,
  attributes: {}
}

abstract class EntityComponentBase extends React.Component<EntityComponentProps, EntityComponentState> {

  ecp: EntityComponentProps;

  include?: string;

  protected constructor(props: EntityComponentProps) {
    super(props);
    this.ecp = new EntityComponentProps(props);
    this.state = {
      loading: false,
      loaded: this.ecp.hasData(),
      error: false,
      key: props.key,
      attributes: Object.assign({}, props)
    }
    this.getDataForComponent = this.getDataForComponent.bind(this);
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.state.loading == false && this.state.loaded == false && this.props.open == true) {
      console.log("now, get data for component");
      this.getDataForComponent(this.include);
    }
  }

  getDataForComponent(include) {
    console.log("get data for component firing!", this);
    const me = this;
    this.setState({loading: true});
    return this.ecp.getData(include)
      .then(res => res.json())
      .then((ajaxData) => {
        console.log("ajax data back from remote", ajaxData);
        me.setState({
          loading: false,
          loaded: true,
          attributes: ajaxData?.data
        });
      });
  }

  render(): React.ReactNode {
    return "Override the render function to implement";
  }

}

export { EntityComponentBase as default, EntityComponentState };
