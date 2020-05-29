
import React from 'react';
import {Col, Grid, Navbar, Row, Nav, NavItem, PanelGroup, Panel, Alert, Container} from 'react-bootstrap';
import {EntityComponentProps, EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";
import Slide from '../Slide';

class EntityQueue extends EntityComponentBase<EntityComponentPropsInterface, EntityComponentState> {

  include = '&field_queue';

  componentDidMount() {
    this.renderQueueItem = this.renderQueueItem.bind(this);
    if (!this.loaded && !this.loading) {
      this.getDataForComponent(this.include);
    }
  }

  render() {
      if (this.state?.attributes?.items?.length) {
        return (
          <Container key={this.props.key}>
            <Row>
              {this.state?.attributes?.items.map(this.renderQueueItem)}
            </Row>
          </Container>
        );
      }
      return (
        <h1>Entity Queue Render</h1>
      );
  }

  renderQueueItem(item: EntityComponentPropsInterface , key: number) {
    console.log("entityQueue Item Render", item);
    const ecp = new EntityComponentProps(item);
    var content = ( <h1>Entity Queue Item Render</h1> );
    switch (ecp.entityTypeId) {
      case "slide":
        content = (<Slide {...ecp.toObject()} view_mode={"card"} />);
        break;

      default:
        console.log("I don't know what to do with this: ".concat(ecp.entityTypeId), ecp);
    }

    const colspan = Math.floor(12 / this.state?.attributes?.items?.length);
    return (
      <Col lg={colspan} sm={12} key={key}>
        {content}
      </Col>
    )
  }


}

export { EntityQueue as default };
