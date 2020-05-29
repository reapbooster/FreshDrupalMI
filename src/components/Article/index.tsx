import React from 'react';
import ArticleFull from "./ArticleFull";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";

import EntityComponentBase from '../../DataTypes/EntityComponentBase';
import Slide from "../Slide";
import Loading from "../Loading";

class Article extends EntityComponentBase {

  include = "&"

  componentDidMount(): void {
    if (!this.state.loaded && !this.state.loading) {
      this.getDataForComponent()
    }
  }


  render() {
    if (this.state.loaded) {
      switch(this.props.view_mode) {
        case "card":
          return (
            <Slide {...this.state.attributes.field_promo_slide} view_mode={"card"} />
          );
          break;


        default:
          return (<ArticleFull {...this.state.attributes} />);
      }
    } else if (this.state.loading == true) {
      return (<Loading />);
    } else {
      return (<h1>No data Available</h1>);
    }

  }

}


export default Article;
