import React, { useState, useEffect } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { useQueryState } from "use-location-state";
import history from "history/browser";
import JSONApiUrl from "../../DataTypes/JSONApiUrl";
import ListComponentProps from "../../DataTypes/ListComponentProps";
import DropdownFacet from "../List/DropdownFacet";
import HorizontalMenuFacet from "../List/HorizontalMenuFacet";

import "./PhilantropyHub.scss";

const PhilanthropyHub: React.FunctionComponent = props => {
  const filters = [
    "field_terms",
    "field_actions",
    "field_region",
    "field_focus"
  ];

  const url = new JSONApiUrl(props.url);

  const notifyListComponent = (newFilter: Object) => {
    const evt = new CustomEvent("refresh", {
      bubbles: false,
      cancelable: false,
      detail: {
        filter: newFilter
      }
    });
    document
      .getElementsByClassName("list-component")
      .item(0)
      .dispatchEvent(evt);
  };

  const onHashChanged = () => {
    console.debug("Hash change trigger");

    const params = new URLSearchParams(window.location.hash.replace("#", ""));

    let newFilter = {};
    for (let [field, values] of params) {
      field = `field_${field}`;
      values = values.split(",");

      for (const fieldValue of values) {
        const conjunction = "AND";
        const filterKey = `${field}-${fieldValue}`;
        const groupKey = `${filterKey}-group-${conjunction}`;

        const newValue = {};

        // NOTE: Workaround as per https://www.drupal.org/project/drupal/issues/3066202#comment-13181270
        newValue[`filter[${groupKey}][group][conjunction]`] = conjunction;
        newValue[`filter[${filterKey}][condition][value]`] = fieldValue;
        newValue[
          `filter[${filterKey}][condition][path]`
        ] = `${field}.machine_name`;
        newValue[`filter[${filterKey}][condition][memberOf]`] = groupKey;

        newFilter = {
          ...newFilter,
          ...newValue
        };
      }
    }

    console.debug("New params", newFilter);

    notifyListComponent(newFilter);
  };

  useEffect(() => {
    onHashChanged();
    window.addEventListener("hashchange", onHashChanged);
    return () => window.removeEventListener("hashchange", onHashChanged);
  }, [window.location.hash]);

  // TODO: Add All / None toggle

  // var all = (
  //
  //   <Nav
  //     defaultActiveKey="all"
  //     variant={"pills"}
  //     id={props.id.concat('-ALL')}
  //   >
  //     <Nav.Item>
  //       <Nav.Link
  //         active
  //         value={"all"}
  //         eventKey={"all"}
  //         onSelect={OnSelectClearHandler}>ALL</Nav.Link>
  //     </Nav.Item>
  //   </Nav>
  // )
  // const OnSelectClearHandler = (evt: Event) => {
  //   console.debug("ON CLICK HANDLER", evt);
  //   var url = new JSONApiUrl(props.url);
  //
  //   var toTrigger = new CustomEvent("refresh", {
  //     bubbles: false,
  //     cancelable: false,
  //     detail: {
  //       url: url,
  //     }
  //   });
  //   document.getElementsByClassName('philanthropy-hub-root')
  //     .item(0)
  //     .dispatchEvent(toTrigger);
  // }

  // useEffect(() => {
  // console.log("Current filter state", filterState);

  // console.log(fieldActions);

  //
  // });

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

      <div className="philanthropy-hub-root">
        <ListComponentProps
          {...props}
          loadAll
          className="card-columns"
          url={url}
        />
      </div>
    </Container>
  );
};

export default PhilanthropyHub;
