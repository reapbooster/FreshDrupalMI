import React, { useState } from "react";
import { ArticleDisplayList } from "./ArticleList";
import ListSource, {
  ListComponentSourceInterface,
} from "../../DataTypes/ListSource";
import Loading from "../Loading";
import { CardColumns } from "react-bootstrap";
import styled from "styled-components";

const IndividualArticleContainer = styled.div`
  max-width: 18rem;
`;

export interface ArticlesBrowserProps {
  source: ListComponentSourceInterface;
  view_mode: string;
}

export const ArticlesBrowser = (props: ArticlesBrowserProps) => {
  console.debug("VideosBrowser", props);
  const { source, view_mode } = props;
  const DataObject = new ListSource(source);
  const [articleSource, setArticleSource] = useState(DataObject);
  console.debug("Video Source", articleSource);
  if (!articleSource.hasData()) {
    articleSource.refresh().then((items) => {
      console.debug("Coming home", items);
      const toSet = new ListSource(articleSource.toObject());
      console.debug("after clone", toSet);
      toSet.items = items;
      setArticleSource(toSet);
    });
    return <Loading />;
  }
  console.debug("VideosBrowser: Source W/Data", articleSource);
  return (
    <>
      <CardColumns>
        <ArticleDisplayList
          list={articleSource.items}
          view_mode={view_mode ?? "card"}
          container={IndividualArticleContainer}
        />
      </CardColumns>
    </>
  );
};

export default ArticlesBrowser;
