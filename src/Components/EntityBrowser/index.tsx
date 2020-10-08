import React, { useState } from "react";
import Loading from "../Loading";
import { CardColumns } from "react-bootstrap";
import styled from "styled-components";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import EntityBrowserSource from "./EntityBrowserSource";
import EntityComponentFactory from "./EntityComponentFactory";

const IndividualItemContainer = styled.div`
  max-width: 18rem;
`;

export interface EntityBrowserProps {
  source: EntityBrowserSource;
}

export const EntityBrowser = (props: EntityBrowserProps) => {
  console.debug("PROPS", props);
  const { source } = props;
  const view_mode = props.source.view_mode;
  console.debug("Entity Browser", source, view_mode);
  const SourceDataObject = new EntityBrowserSource(source);
  const [sourceData, setSourceData] = useState(SourceDataObject);
  console.debug("Entity Source", sourceData);
  if (!sourceData.hasData()) {
    sourceData.refresh().then((sourceWithItems) => {
      sourceWithItems.view_mode = view_mode;
      setSourceData(sourceWithItems);
    });
    return <Loading />;
  }
  console.debug("EntityBrowser: Source W/Data", sourceData, view_mode);
  return (
    <>
      <CardColumns>
        {sourceData.items.map((item, key) => {
          const Component = EntityComponentFactory(item);
          return (
            <ErrorBoundary key={key}>
              <Component
                data={item}
                view_mode={sourceData.view_mode}
                container={IndividualItemContainer}
              />
            </ErrorBoundary>
          );
        })}
      </CardColumns>
    </>
  );
};

export default EntityBrowser;
