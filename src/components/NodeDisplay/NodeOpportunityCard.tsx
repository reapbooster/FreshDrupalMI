import React from 'react';
import {Button, Card, Badge, Overlay, OverlayTrigger, Tooltip} from 'react-bootstrap';

import TaxonomyTerm, { TaxonomyTermProps } from "../../DataTypes/TaxonomyTerm";
import TextField from "../../DataTypes/TextField";
import LinkList from '../../DataTypes/LinkList';

import { useQueryState } from 'use-location-state';

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

    const params = new URLSearchParams(window.location.hash.replace('#', ''));

    const filter_param = term.type.split('_').slice(-1)[0];
    const newValue = term.machine_name;

    let currentValue = params?.get(filter_param)?.split(',') || [];
    if(!currentValue.includes(newValue)) {
      currentValue.push(newValue);

      params.set(filter_param, currentValue);

      window.location.hash = params;
      window.dispatchEvent(new HashChangeEvent("hashchange"))
    }

  }

  const getBadge = (props: TaxonomyTermProps, key: number) => {
    if(!props.field_visibility) { return; }
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
    <Card key={props.machine_name}>
     <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="button-tooltip"><div dangerouslySetInnerHTML={{__html: props.field_body?.value}}></div></Tooltip>}
      >
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>

          { props?.field_actions?.map && props?.field_actions?.map(getBadge) }
          { props?.field_focus?.map && props?.field_focus?.map(getBadge) }
          { props?.field_terms?.map && props?.field_terms?.map(getBadge) }

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
