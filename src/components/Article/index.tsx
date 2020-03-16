import React from 'react';
import ArticleFull from "./ArticleFull";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";

class Article extends React.Component<EntityComponentProps, EntityComponentProps> {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount(): void {
    this.fetchNodeData();
  }

  fetchNodeData() {
    let me = this;
    fetch(`/jsonapi/${this.props.entityTypeId}/${this.props.bundle}/${this.props.id}?jsonapi_include=1&include=field_promo_slide`)
      .then(res => res.json())
      .then((ajaxData) => {
        console.log('data is back from drupal', ajaxData);
        me.setState({ data: ajaxData.data });
      });
  }

  render() {
    if (this.state.data.id !== undefined) {
      switch(this.props.view_mode) {
        case "small":

          break;


        default:
          return (<ArticleFull {...this.state.data} />);
      }
    }
    return (<div>Content Loading</div>);

  }

}


export default Article;
