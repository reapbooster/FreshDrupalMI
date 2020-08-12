import React from 'react';
import {Button, Card, Badge, Overlay, OverlayTrigger, Tooltip} from 'react-bootstrap';

import TaxonomyTerm, { TaxonomyTermProps } from "../../DataTypes/TaxonomyTerm";
import TextField from "../../DataTypes/TextField";
import LinkList from '../../DataTypes/LinkList';

interface NodeOpportunityCardProps {
  changed: string;
  created: string;
  drupal_internal__nid: number;
  drupal_internal__vid: number;
  field_actions: Array<TaxonomyTerm>;
  field_body: TextField;
  field_focus: Array<TaxonomyTerm>;
  field_region: TaxonomyTerm;
  field_terms: Array<TaxonomyTerm>;
  links: LinkList;
  title: string;
  type: string;
}





const NodeOpportunityCard = (props: NodeOpportunityCardProps) => {

  const clickHandler = (term) => {

    var filter = {};

    const filter_param = term.type.split('_').slice(-1)[0]
    console.log(filter_param);
    filter['field_'.concat(filter_param, '.machine_name')] = term.machine_name;
    // let newFacetValues = facetValues.setActive(machine_name);
    // setFacetValues(newFacetValues);
    //
    var evt = new CustomEvent("refresh", {
      bubbles: false,
      cancelable: false,
      detail: {
        filter: filter
      }
    });
    document.getElementsByClassName('philanthropy-hub-root')
      .item(0)
      .dispatchEvent(evt);
  }

  const getBadge = (props: TaxonomyTermProps, key: number) => {
    console.log(props);
    return (
      <Badge pill id={props.id} variant={"primary"} onClick={ () => { clickHandler(props); }} pointer="" style={{ background: props.field_tag_color && props.field_tag_color.color ? props.field_tag_color.color : false }}>
        {props.name}
      </Badge>
    );
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  return (
    <Card className={"my-2 mx-2"}>
     <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="button-tooltip"><div dangerouslySetInnerHTML={{__html: props.field_body?.value}}></div></Tooltip>}
      >
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>

          {/*  <Card.Text dangerouslySetInnerHTML={{__html: props.field_body?.value}} /> */}

          {props.field_actions?.map(getBadge) ?? []}
          {props.field_focus?.map(getBadge) ?? []}
          {props.field_terms?.map(getBadge) ?? []}

        </Card.Body>
      </OverlayTrigger>
      <Card.Footer className="text-right">
        <Button
          className="mr-sm-2"
          variant="outline"
        >
          <span>View more</span>
        </Button>
      </Card.Footer>
    </Card>
  );

}


export default NodeOpportunityCard;
