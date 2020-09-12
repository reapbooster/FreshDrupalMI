import React from 'react';

import { EntityComponentPropsInterface } from '../../DataTypes/EntityComponentProps';

import NodeArticle from "./NodeArticle";
import NodeEvent from './NodeEvent';
import NodeOpportunityCard from './NodeOpportunityCard';
import LandingPage from "../LandingPage";
import ErrorBoundary from "../../Utility/ErrorBoundary";

const NodeBundleComponents = {
  "node--article": NodeArticle,
  "node--landing_page": LandingPage,
  "node--event": NodeEvent,
  "node--opportunity": NodeOpportunityCard,
}

const NodeDisplay: React.FunctionComponent = (props: EntityComponentPropsInterface) {
  if (NodeBundleComponents[props.type] === undefined) {
    console.log('cannot find component', props);
    throw new Error("Cannot find component for props.type ".concat(props.type));
  }
  const Component = NodeBundleComponents[props.type];
  return (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
}

export { NodeDisplay as default, NodeBundleComponents };
