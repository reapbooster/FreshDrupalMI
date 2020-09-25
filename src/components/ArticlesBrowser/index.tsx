import React, {useState} from 'react';
import NodeDisplayList from '../NodeDisplay/NodeDisplayList';
import ListSource, {ListComponentSourceInterface} from "../../DataTypes/ListSource";
import Loading from "../Loading";
import {CardColumns} from 'react-bootstrap';
import styled from "styled-components";

const IndividualArticleContainer = styled.div`
  max-width: 18rem;
`

export interface ArticlesBrowserProps {
  source: ListComponentSourceInterface;
  view_mode: string;
}

export const ArticlesBrowser = (props: ArticlesBrowserProps) => {
  console.debug("VideosBrowser", props);
  const source = new ListSource(props.source);
  const [ articleSource, setArticleSource ] = useState(source);
  console.debug('Video Source', articleSource );
  if (!articleSource.hasData()) {
    articleSource.refreshItems()
      .then((items) => {
        console.debug("Coming home", items, this);
        var toSet = new ListSource(articleSource.toObject());
        console.debug("after clone", toSet);
        toSet.items = items;
        setArticleSource(toSet);
      });
    return (<Loading />);
  }
  console.debug("VideosBrowser: Source W/Data", articleSource);
  return (
    <>
      <CardColumns>
        <NodeDisplayList
          list={articleSource}
          view_mode={props.view_mode ?? "card"}
          container={IndividualArticleContainer}
        />
      </CardColumns>
    </>
  )
}

export default ArticlesBrowser;
