import React from 'react';
import {Button, Card, Badge, Overlay, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {NodeOpportunityInterface} from "../../DataTypes/NodeOpportunity";


interface NodeOpportunityCardProps {
  data: NodeOpportunityInterface;
  view_mode: string;
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

  console.log('NodeOpportunityCard', props);
  const data = props.data;
  return (
    <Card key={data.machine_name}>
     <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="button-tooltip"><div dangerouslySetInnerHTML={{__html: data.field_body?.value}}></div></Tooltip>}
      >
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>

          { data?.field_actions?.map && data?.field_actions?.map(getBadge) }
          { data?.field_focus?.map && data?.field_focus?.map(getBadge) }
          { data?.field_terms?.map && data?.field_terms?.map(getBadge) }

        </Card.Body>
      </OverlayTrigger>
      <Card.Footer className="text-right">
        <Button
          className="mr-sm-2"
          variant="outline"
          href={data?.path?.alias ?? false}
        >
          <span>View more</span>
        </Button>
      </Card.Footer>
    </Card>
  );

}


export default NodeOpportunityCard;
