import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import * as DataObject from "../../DataTypes/ParagraphFacetExplorer";
import styled from "styled-components";
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import Staff from "../../DataTypes/People/Staff";
import NodeArticle from "../../DataTypes/NodeArticle";
import ListDisplay from "../ListDisplay";
import { Collapse } from "react-bootstrap";
import Select from "react-select";
import ReactPaginate from 'react-paginate';
import TeamDisplay from '../TeamDisplay';


interface ParagraphDisplayFacetExplorerProps {
  data: DataObject.default;
  view_mode: string;
}
const ParagraphDisplayFacetExplorer: React.FunctionComponent = (
  props: ParagraphDisplayFacetExplorerProps
) => {
  const { data } = props;

  console.debug("ParagraphDisplayFacetExplorer: Data from Props ", data);

  const [fetchRan, setFetchRan] = useState(false);
  const [sortOptions, setSortOptions] = useState([{ value: "created", label: "By Date" }, { value: "title", label: "By Title" }]);
  const [contentList, setContentList] = useState(null);
  const [topicsList, setTopicsList] = useState(null);
  const [centersList, setCentersList] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [pageItemOffset, setPageItemOffset] = useState(0);
  const [filterSort, setFilterSort] = useState([]);
  const [filterCenters, setFilterCenters] = useState([]);
  const [filterTopics, setFilterTopics] = useState([]);

  const filterCollections = data.field_collections?.data !== null ? data.field_collections?.name : null;
  const filterTeams = data.field_teams?.data !== null ? data.field_teams?.name : null;

  const apiParams = new DrupalJsonApiParams();

  let ContentListObject = [];
  let TopicsListObject = [];
  let CentersListObject = [];
  let requestURL = '';
  let resultsCount = null;
  let field_items_per_page = data.field_items_per_page
  // Build request URL and URL parameters
  switch (data.field_facet_content_type) {
    case 'article':

      // Set Sort filter
      if (!!filterSort && filterSort?.length !== 0 && !!filterSort.value) {
        apiParams.addSort(filterSort.value);
        console.debug("FilterSort was used: ", filterSort)
      } else {
        console.debug("FilterSort was not used: ", filterSort)
        apiParams.addSort('created', 'DESC');
      }

      apiParams.addPageLimit(field_items_per_page); // Later, change to data.field_items_per_page

      if (filterCollections !== null) {
        apiParams.addFilter('field_collections.name', filterCollections);
      }

      if (filterTeams !== null) {
        apiParams.addFilter('field_teams.name', filterTeams);
      }

      // Use this to show content tagged with selected Topics
      if (filterTopics !== null && filterTopics.length > 0) {
        // if ( "Include only selected Topics" && false ) {
        // apiParams.addFilter('field_topics.name', ['Array Of','Topics'], 'IN');
        apiParams.addFilter('field_topics.name', filterTopics, 'IN');
      }

      // Use this to show content tagged with selected Centers
      // if ( "Include only selected Centers" && false ) {
      if (filterCenters !== null && filterCenters.length > 0) {
        apiParams.addFilter('field_centers.name', filterCenters, 'IN');
      }


      // Use pageItemOffset for pagination, it skips a number of records. meta.count has the total number
      requestURL = '/jsonapi/node/article?jsonapi_include=true&'
        + apiParams.getQueryString();

      if (pageItemOffset !== null) {
        requestURL += '&page[offset]=' + pageItemOffset?.toString();
      }

      console.debug("ParagraphDisplayFacetExplorer: requestURL ", requestURL);
      break;

    case 'staff':

      // Set Sort filter
      if (!!filterSort && filterSort?.length !== 0 && !!filterSort.value) {
        apiParams.addSort(filterSort.value);
        console.debug("FilterSort was used: ", filterSort)
      } else {
        console.debug("FilterSort was not used: ", filterSort)
        apiParams.addSort('field_last_name', 'ASC');
      }

      apiParams.addPageLimit(field_items_per_page); // Later, change to data.field_items_per_page

      if (filterCollections !== null) {
        apiParams.addFilter('field_collections.name', filterCollections);
      }

      if (filterTeams !== null) {
        apiParams.addFilter('field_teams.name', filterTeams);
      }

      if (filterTopics !== null && filterTopics.length > 0) {
        apiParams.addFilter('field_topics.name', filterTopics, 'IN');
      }

      if (filterCenters !== null && filterCenters.length > 0) {
        apiParams.addFilter('field_centers.name', filterCenters, 'IN');
      }

      // Use pageItemOffset for pagination, it skips a number of records. meta.count has the total number
      requestURL = '/jsonapi/people/staff?jsonapi_include=true&'
        + apiParams.getQueryString();

      if (pageItemOffset !== null) {
        requestURL += '&page[offset]=' + pageItemOffset?.toString();
      }

      console.debug("ParagraphDisplayFacetExplorer: requestURL ", requestURL);
      break;
  
    default:
      console.error("No content type specified for Facet Explorer");
      throw new Error("No content type specified for Facet Explorer");
  }

  // Fetch Content and Taxonomy Tag Lists
  if (!fetchRan) {
    setFetchRan(true);

    // Fetch Main Content 
    fetch(requestURL)
      .then((res) => res.json())
      .then((incoming) => {
        resultsCount = incoming.meta.count;
        setPageCount(Math.ceil(resultsCount / field_items_per_page));
        incoming.data.map(
          contentItem => {
            if (data.field_facet_content_type === 'article') {
              ContentListObject.push(new NodeArticle(contentItem));
            }
            if (data.field_facet_content_type === 'staff') {
              ContentListObject.push(new Staff(contentItem));
            }
          }
        )
        setContentList(ContentListObject);
        console.debug("ParagraphDisplayFacetExplorer: contentList ", contentList);
      });

    // Fetch List of Topics for filter list
    if (topicsList === null) {
      fetch('/jsonapi/taxonomy_term/topics?jsonapi_include=true')
        .then((res) => res.json())
        .then((incoming) => {
          incoming.data.map(
            contentItem => {
              TopicsListObject.push({ value: contentItem.name, label: contentItem.name });
            }
          )
          setTopicsList(TopicsListObject);
        });
    }

    // Fetch List of Centers for filter list
    if (centersList === null) {
      fetch('/jsonapi/taxonomy_term/centers?jsonapi_include=true')
        .then((res) => res.json())
        .then((incoming) => {
          incoming.data.map(
            contentItem => {
              CentersListObject.push({ value: contentItem.name, label: contentItem.name });
            }
          )
          setCentersList(CentersListObject);
        });
    }
  }

  const handlePageClick = (page) => {
    setPageItemOffset(page.selected * field_items_per_page);
    console.debug("ParagraphDisplayFacetExplorer pageItemOffset", pageItemOffset);
    console.debug("ParagraphDisplayFacetExplorer page.selected", page.selected);
    setFetchRan(false);
  }

  const selectSort = (t) => {
    setFilterSort(t);
    setFetchRan(false);
    console.debug("FilterSort: ", t)
  }

  const selectTopics = (t) => {
    setFilterTopics(t);
    setFetchRan(false);
  }

  const selectCenters = (t) => {
    setFilterCenters(t);
    setFetchRan(false);
  }

  const FacetExplorerContainer = styled.div`
    max-width: 1500px !important; 

    & .filter-area {
      margin-bottom:30px;
    }
    & .sidebar-content {
      padding:0px 20px;
    }
    & .sidebar-content p {
      color: #999;
      font-size: 14px;
      font-weight: bold;
    }
    & .sidebar-content h5 {
      font-size: 20px;
      font-weight: bold;
    }
    & .sidebar-content h6 {
      color: #999;
      font-size: 14px;
    }

    & .list-display-component > div {
      display: flex;
      & a {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    } 
  `;

  const CustomSelect = styled.div`
    [class$="-control"] {
      border-radius: 0;
      border-color: lightgray;
    }
    .custom-select {
      border-radius: 0;
      border-color: lightgray;
    }
  `;

  return (
    <div>
      <FacetExplorerContainer className="container-fluid py-5">
        <Row>
          <Col lg={3}>
            <div className="filter-area">
              <CustomSelect>
                <Select
                  isMulti
                  closeMenuOnSelect={true}
                  defaultValue={filterSort}
                  placeholder={"Sort order"}
                  options={sortOptions}
                  getOptionLabel={({ label }) => label}
                  getOptionValue={({ value }) => value}
                  onChange={selectSort}
                />
              </CustomSelect>
            </div>
            <div className="filter-area">
              <CustomSelect>
                <Select
                  isMulti
                  closeMenuOnSelect={false}
                  defaultValue={filterTopics}
                  placeholder={"Topics"}
                  options={topicsList}
                  getOptionLabel={({ label }) => label}
                  getOptionValue={({ value }) => value}
                  onChange={selectTopics}
                />
              </CustomSelect>
            </div>
            <div className="filter-area">
              <CustomSelect>
                <Select
                  isMulti
                  closeMenuOnSelect={false}
                  defaultValue={filterCenters}
                  placeholder={"Centers"}
                  options={centersList}
                  getOptionLabel={({ label }) => label}
                  getOptionValue={({ value }) => value}
                  onChange={selectCenters}
                />
              </CustomSelect>
            </div>
            <div className="filter-area sidebar-content">
              <div dangerouslySetInnerHTML={{ __html: data.field_sidebar_content?.value }} />
            </div>
          </Col>
          <Col lg={9}>
            <Row>
              <ListDisplay
                id={"content-list-".concat(data.id)}
                list={contentList}
                view_mode={data.field_view_mode}
              />
            </Row>
          </Col>
        </Row>
      </FacetExplorerContainer>
      <div className="container mb-5 py-4">
        <Row className="pagination-wrapper">
          <Col>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={4}
              onPageChange={handlePageClick}
              containerClassName={'pagination justify-content-center m-0 react-paginate'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </Col>
        </Row>
      </div>
    </div>

  );
};

export { ParagraphDisplayFacetExplorer as default, ParagraphDisplayFacetExplorerProps };
