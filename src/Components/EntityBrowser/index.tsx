import React, { useState } from "react";
import Loading from "../Loading";
import { CardDeck, CardColumns, Container } from "react-bootstrap";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import EntityBrowserSource from "./EntityBrowserSource";
import EntityComponentFactory from "./EntityComponentFactory";
import BundleBrowser from "./BundleBrowser";

export interface EntityBrowserProps {
  source: EntityBrowserSource;
}

export const EntityBrowser = (props: EntityBrowserProps) => {
  const { source } = props;
  const view_mode = props.source.view_mode;
  const SourceDataObject = new EntityBrowserSource(source);
  const [sourceData, setSourceData] = useState(SourceDataObject);
  if (!sourceData.hasData()) {
    sourceData.refresh().then((sourceWithItems) => {
      sourceWithItems.view_mode = view_mode;
      setSourceData(sourceWithItems);
    });
    return <Loading />;
  }
  return (
    <Container fluid={true}>
      <h2 className={"text-center"}>Browse {sourceData.bundle}</h2>
      <BundleBrowser bundle={sourceData.bundle} />
      <ErrorBoundary>
        <CardColumns>
          {sourceData.items?.map((item, key) => {
            const Component = EntityComponentFactory(item);
            return (
              <Component
                key={key}
                data={item}
                view_mode={sourceData.view_mode}
              />
            );
          })}
        </CardColumns>
      </ErrorBoundary>
    </Container>
  );
};

export default EntityBrowser;
