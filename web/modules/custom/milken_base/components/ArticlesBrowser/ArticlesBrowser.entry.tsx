
import React from "react";
import ReactDOM from "react-dom";
import ArticlesBrowser from "components/ArticlesBrowser";

const ArticlesBrowserContainer = document.querySelector('articles-browser');

const ArticlesBrowserSource = {
  id: ArticlesBrowserContainer.dataset.id,
  type: ArticlesBrowserContainer.dataset.type,
  view_mode: ArticlesBrowserContainer.dataset.viewMode,
  url: ArticlesBrowserContainer.dataset.url
}

ReactDOM.render(
  <ArticlesBrowser source={ArticlesBrowserSource} />,
  ArticlesBrowserContainer
);


