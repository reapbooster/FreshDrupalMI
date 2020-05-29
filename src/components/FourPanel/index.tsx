import React from 'react';
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import {EntityComponentProps, EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import {Card, Col} from 'react-bootstrap';
import moment from "moment";

interface FourPanelViewObjectInterface {
  name: string;
  uuid: string;
  bundle: string;
  thumbnail__target_id: string;
  changed: string;
}

interface FourPanelProps extends EntityComponentPropsInterface {
  items: Array<FourPanelViewObjectInterface>
}


class FourPanel extends EntityComponentBase<FourPanelProps, EntityComponentState> {

  componentDidMount() {
    var me = this;
    if (!this.state.loaded && !this.state.loading) {
      me.setState({ loading: true });
      fetch('/api/v1.0/four-videos?_format=hal_json')
        .then((res) => res.json())
        .then((ajaxData: Array<FourPanelViewObjectInterface>) => {
          console.log("data is back from drupal. Setting state ", ajaxData);
          me.setState({
            loaded: true,
            loading: false,
            attributes: {
              items: ajaxData
            }
          });
        })
    }
  }

  render() {
    if (this.state.loaded) {
      return this.state.attributes.items.map((item: FourPanelViewObjectInterface, key: number) => {
        const created = moment(item.changed, moment.ISO_8601);
        return (
          <Col lg={3} sm={6} key={key}>
            <Card className="my-5">
              <Card.Img
                id={"card-image-".concat()}
                src={item.thumbnail__target_id}/>
              <Card.Body style={{minHeight: "150px"}}>
                <Card.Title><span dangerouslySetInnerHTML={{__html: item.name}}></span></Card.Title>
              </Card.Body>
              <Card.Footer>{created.format('MMMM D, YYYY')}</Card.Footer>
            </Card>
          </Col>
        );
      });
    }
    return (
      <Loading />
    );
  }

}


export default FourPanel;
