import React, { useState, useEffect } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import PhilanthopyHubSource from './PhilanthopyHubSource';
import DropdownFacet from "../List/DropdownFacet";
import HorizontalMenuFacet from "../List/HorizontalMenuFacet";
import NodeListDisplay from '../NodeDisplay/NodeDisplayList';
import PhilanthropyHubSource from "./PhilanthopyHubSource";

export interface PhilanthropyHubProps {
  source: PhilanthopyHubSource;
  view_mode: string;
}

const PhilanthropyHub: React.FunctionComponent = (props: PhilanthropyHubProps) => {
  console.debug("Philanthropy Hub", props);
  const {source, view_mode} = props;
  useEffect(() => {
    onHashChanged();
    window.addEventListener("hashchange", onHashChanged);
    return () => window.removeEventListener("hashchange", onHashChanged);
  }, [window.location.hash]);

  source.getSourceData();

  return (
    <Container fluid id={"hub-".concat(props.id)}>
      <DropdownFacet
        type="taxonomy_term--ph_region"
        id={props.id.concat("-region")}
        label="Region"
        urlParam="ph_region"
        field="field_region"
        url="/jsonapi/taxonomy_term/ph_region?jsonapi_include=true"
        titleSubject="Opportunities"
        titleValuesToEnablePostfix={["All", "Global"]}
        titleConjunction="in"
        allOptionTitle="All"
      />

      <Container className="filter-horizontal py-3 py-5@m">
        <Row className="d-flex justify-content-md-center">
          <Col>
            <HorizontalMenuFacet
              url="/jsonapi/taxonomy_term/ph_focus?jsonapi_include=true"
              id={props.id.concat("-field_focus")}
              type="taxonomy_term--ph_focus"
              label="Focus"
              urlParam="ph_focus"
              field="field_focus"
            />
          </Col>
          <Col>
            <HorizontalMenuFacet
              url="/jsonapi/taxonomy_term/ph_actions?jsonapi_include=true"
              id={props.id.concat("-field_actions")}
              type="taxonomy_term--ph_actions"
              label="Actions"
              urlParam="ph_actions"
              field="field_actions"
            />
          </Col>
        </Row>
      </Container>

      <div id="philanthropy-hub-root">
        <NodeListDisplay
          items={source.items}
          loadAll
          className="card-columns"
          url={source.url}
        />
      </div>
    </Container>
  );
};

PhilanthropyHub.defaultProps = {
  source: PhilanthropyHubSource.getDefaultSource(),
  view_mode: "card",
}

export default PhilanthropyHub;