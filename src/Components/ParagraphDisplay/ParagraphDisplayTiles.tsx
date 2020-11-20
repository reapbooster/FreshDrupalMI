import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { ParagraphTilesInterface } from "../../DataTypes/ParagraphTiles";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ParagraphDataFactory from "./ParagraphDataFactory";
import ListDisplay from "../ListDisplay";
import Paragraph, { ParagraphInterface } from "../../DataTypes/Paragraph";

export interface ParagraphDisplayTilesProps {
  data: ParagraphTilesInterface;
}

export interface ParagraphDisplayTilesState {
  data: Paragraph;
  loading: boolean;
  loaded: boolean;
}

export class ParagraphDisplayTiles extends React.Component<
  ParagraphDisplayTilesProps,
  ParagraphDisplayTilesState
> {
  constructor(props) {
    super(props);
    const { data } = props;
    const DataObject = ParagraphDataFactory(data);
    this.state = {
      data: DataObject,
      loading: false,
      loaded: DataObject.hasData(),
    };
    this.scrollOnClickHandler = this.scrollOnClickHandler.bind(this);
  }

  scrollOnClickHandler() {
    // Scoll on click handler goes here
  }

  componentDidMount() {
    const { data, loading } = this.state;
    if (!data.hasData() && !loading) {
      console.debug("Paragraph does not have data", data);
      this.setState({ loaded: false, loading: true });
      const ecp = new EntityComponentProps(data);
      ecp
        .getData(data.getIncluded())
        .then((res) => res.json())
        .then((ajaxData) => {
          const returnedData = ParagraphDataFactory(ajaxData.data);
          this.setState({
            loaded: true,
            loading: false,
            data: returnedData,
          });
        });
    }
  }

  render() {
    const { data, loading, loaded } = this.state;

    if (loading) {
      return (
        <>
          <Loading />
        </>
      );
    }
    if (loaded) {
      return (
        <Container
          fluid={data.field_view_mode == "card" ? true : false}
          className={data.field_view_mode == "card" ? "position-relative overflow-hidden" : ""}
        >
          <ListDisplay
            id={"tiles-list-".concat(data.id)}
            list={data.tiles}
            view_mode={data.field_view_mode}
          />
        </Container>
      );
    }
    return <div />;
  }
}

export default ParagraphDisplayTiles;
