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
  view_mode: string;
}

export const EntityBrowser = (props: EntityBrowserProps) => {
  console.debug("VideosBrowser", props);
  const { source, view_mode } = props;
  const SourceDataObject = new EntityBrowserSource(source);
  const [sourceData, setSourceData] = useState(SourceDataObject);
  console.debug("Entity Source", sourceData);
  if (!sourceData.hasData()) {
    sourceData.refresh().then((sourceWithItems) => {
      setSourceData(sourceWithItems);
    });
    return <Loading />;
  }
  const Component = EntityComponentFactory(source);
  console.debug("EntityBrowser: Source W/Data", sourceData);
  return (
    <>
      <CardColumns>
        {sourceData.items.map((item, key) => {
          return (
            <ErrorBoundary key={key}>
              <Component
                data={item}
                view_mode={view_mode}
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
