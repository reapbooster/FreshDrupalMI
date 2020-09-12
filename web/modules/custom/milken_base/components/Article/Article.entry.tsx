
import * as React from "react";
import * as ReactDOM from "react-dom";
import Article from "components/Article";

const ArticleDetail = document.querySelector('article-detail');

ReactDOM.render(
  <Article {...ArticleDetail.dataset} />,
  ArticleDetail
);
