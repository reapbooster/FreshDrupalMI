import React from 'react';
import JSONApiUrl from "../../DataTypes/JSONApiUrl";
import {Container} from "react-bootstrap";
import ListComponentProps from "../../DataTypes/ListComponentProps";
import DropdownFacet from "../List/DropdownFacet";



const PhilanthropyHub: React.FunctionComponent = (props) => {



  var url = new JSONApiUrl(props.url);
  return (
    <Container fluid id={"hub-".concat(props.id)}>
      <DropdownFacet
        type={"taxonomy_term--ph_region"}
        id={props.id}
        label="ph_region"
        url={"/jsonapi/taxonomy_term/ph_region?jsonapi_include=true"}
      />
      <ListComponentProps {...props} url={url} />
    </Container>
  );
}


export default PhilanthropyHub;
