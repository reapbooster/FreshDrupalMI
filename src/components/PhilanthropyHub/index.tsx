import React from 'react';
import JSONApiUrl from "../../DataTypes/JSONApiUrl";
import {Container, Nav, Tab} from "react-bootstrap";
import ListComponentProps from "../../DataTypes/ListComponentProps";
import DropdownFacet from "../List/DropdownFacet";
import HorizontalMenuFacet from "../List/HorizontalMenuFacet";


const PhilanthropyHub: React.FunctionComponent = (props) => {


  var url = new JSONApiUrl(props.url);
  var all = (
    <Nav
      defaultActiveKey="all"
      variant={"pills"}
      id={props.id.concat('-ALL')}
    >
      <Nav.Item>
        <Nav.Link
          active
          value={"all"}
          eventKey={"all"}
          onSelect={OnSelectClearHandler}>ALL</Nav.Link>
      </Nav.Item>
    </Nav>
  )
  const OnSelectClearHandler = (evt: Event) => {
    console.debug("ON CLICK HANDLER", evt);
    var url = new JSONApiUrl(props.url);

    var toTrigger = new CustomEvent("refresh", {
      bubbles: false,
      cancelable: false,
      detail: {
        url: url,
      }
    });
    document.getElementsByClassName('philanthropy-hub-root')
      .item(0)
      .dispatchEvent(toTrigger);
  }


  return (
    <Container fluid id={"hub-".concat(props.id)}>
      <DropdownFacet
        type={"taxonomy_term--ph_region"}
        id={props.id.concat("-region")}
        label="ph_region"
        field={"field_region"}
        url={"/jsonapi/taxonomy_term/ph_region?jsonapi_include=true"}
      />
      <Tab.Container className={"d-flex justify-content-center"}>
        {all}
        <HorizontalMenuFacet
          url={"/jsonapi/taxonomy_term/ph_focus?jsonapi_include=true"}
          id={props.id.concat("-field_focus")}
          type={"taxonomy_term--ph_focus"}
          label={"ph_focus"}
          field={"field_focus"}
          all={all}
        />
        <HorizontalMenuFacet
          url={"/jsonapi/taxonomy_term/ph_actions?jsonapi_include=true"}
          id={props.id.concat("-field_actions")}
          type={"taxonomy_term--ph_actions"}
          label={"ph_actions"}
          field={"field_actions"}
          all={all}
        />
      </Tab.Container>
      <ListComponentProps {...props} url={url} />
    </Container>
  );
}


export default PhilanthropyHub;
