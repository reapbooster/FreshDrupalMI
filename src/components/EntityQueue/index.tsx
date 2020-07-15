import React from 'react';
import {Col, Grid, Navbar, Row, Nav, NavItem, PanelGroup, Panel, Alert, Container} from 'react-bootstrap';
import {EntityComponentProps, EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";
import Slide from '../Slide';
import Media from '../Media';
import { Card } from 'react-bootstrap';
import NodeDisplay from '../NodeDisplay';

class EntityQueue extends EntityComponentBase<EntityComponentPropsInterface, EntityComponentState> {

  include = '&include=items,items.field_hero_image';

  componentDidMount() {
    if (!this.state.loaded && !this.state.loading) {
      this.getDataForComponent(this.include);
    }
  }

  render() {
      if (this.state?.loaded) {
        return (
          <Container key={this.props.key}>
            <Row className={"d-flex justify-content-center"}>
              {this.state?.attributes?.items.map((item : EntityComponentPropsInterface, key: number) => {
                item.view_mode = this.props.view_mode;
                const ecp = new EntityComponentProps(item);
                console.log("entityQueue Item Render", ecp);
                var content = ( <h1>Entity Queue Item Render</h1> );
                var colspan = Math.floor(12 / this.state?.attributes?.items?.length);
                switch (ecp.entityTypeId) {

                  case "slide":
                    console.log("EntityQueue => Slide!", ecp);
                    return (
                      <Slide {...ecp.toObject()} key={key}/>
                    );
                    break;

                  case "node":
                    console.log("EntityQueue => NODE!", ecp);
                    return ( <NodeDisplay {...ecp.toObject()} key={key} /> );
                    break;

                  case "media":
                    console.log("EntityQueue => Media!", ecp);
                    const MediaComponent = Media.getComponentForBundle(ecp.bundle);
                    return (
                      <Col lg={colspan} sm={12} key={key}>
                        <MediaComponent  {...ecp.toObject()} />
                      </Col>
                    );
                    break;

                  default:
                    return (
                      <Col lg={colspan} sm={12} key={key}>
                        <h1>Unimplemented subqueue type</h1>
                      </Col>
                    );
                }
              })}
            </Row>
          </Container>
        );
      }
      else if (this.state?.loading) {
        return ( <Loading /> )
      } else
      return (
        <h1>No Data Available</h1>
      );
  }

}

export { EntityQueue as default };
