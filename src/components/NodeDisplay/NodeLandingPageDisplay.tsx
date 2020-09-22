import React, {useState} from 'react';
import {Card} from 'react-bootstrap'
import { Container } from 'react-bootstrap';
import NodeLandingPage, { NodeLandingPageInterface } from '../../DataTypes/NodeLandingPage'
import ParagraphDisplayList from '../ParagraphDisplay/ParagraphDisplayList'
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import Loading from '../Loading';

interface NodeLandingPageDisplayProps {
  data: NodeLandingPageInterface;
  view_mode: string;
}

const NodeLandingPageDisplay: React.FunctionComponent = (props: NodeLandingPageDisplayProps) => {
  const { data, view_mode } = props;
  if (!data instanceof NodeLandingPage) {
    data = new NodeLandingPage(data)
  }
  const [landingPageData, setLandingPageData] = useState(data);
  if (!landingPageData.hasData()) {
    var ecp = new EntityComponentProps(landingPageData);
    ecp.getData(landingPageData.getIncluded())
      .then(res => res.json())
      .then(ajaxData => {
        setLandingPageData(new NodeLandingPage(ajaxData.data));
      });
    return (
      <>
        <Loading />
      </>
    );
  }
  console.debug("landing page data", landingPageData);
  switch(view_mode) {
    case "full":
      return (
        <>
          <Container>
            <ParagraphDisplayList
              list={landingPageData} view_mode={view_mode} />
          </Container>
        </>
      );
    case "tiles":
      return (
        <>
          <Card>
            <Card.title>{landingPageData.title}</Card.title>
            <Card.Body>
              <p>Image Goes here</p>
            </Card.Body>
          </Card>
        </>
      );
  }

};

export { NodeLandingPageDisplay as default }
