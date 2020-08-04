import React from 'react';
import {Card, Badge} from 'react-bootstrap';

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

  const getBadge = (props: TaxonomyTermProps, key: number) => {
    return (
      <Badge pill id={props.id} variant={"primary"}>
        {props.name}
      </Badge>
    );
  }

  return (
    <Card className={"my-2 mx-2"}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text dangerouslySetInnerHTML={{__html: props.field_body?.value}} />
      </Card.Body>
      <Card.Footer>
        {props.field_actions.map(getBadge)}
        {props.field_focus?.map(getBadge)}
        {props.field_terms?.map(getBadge)}
      </Card.Footer>
    </Card>
  );

}


export default NodeOpportunityCard;
