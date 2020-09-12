import React from 'react';
import EntityComponentBase from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";
import ArticleFull from './ArticleFull';
import ArticleCard from "./ArticleCard";
import ErrorBoundary from "../../Utility/ErrorBoundary";




class Article extends EntityComponentBase {

  include = "&include=field_promo_slide,field_promo_slide.field_background_image"


  componentDidMount(): void {
    if (!this.state.loaded && !this.state.loading) {
      this.getDataForComponent(this.include)
    }
  }

  render() {
    if (this.state.loaded) {
      switch (this.props.view_mode) {
        case "card":
          return (
            <ErrorBoundary>
              <ArticleCard {...this.state.attributes} />
            </ErrorBoundary>
          );

        default:
          return (
            <ErrorBoundary>
              <ArticleFull {...this.state.attributes} />
            </ErrorBoundary>
          );
      }
    } else if (this.state.loading == true) {
      return (<Loading />);
    } else {
      return (<h1>No data Available</h1>);
    }

  }

}


export default Article;
