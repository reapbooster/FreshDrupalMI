import React, {useState} from "react";
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import styled from "styled-components";
import FilterDates from './FilterDates';
import FilterTracks from './FilterTracks';
import FormatSelect from './FormatSelect';
import moment from 'moment';
import ProgramDay from './ProgramDay';
import { getProgramDay } from '../../api/index.js';
import NodeProgramDay from '../../DataTypes/NodeProgramDay';
import SearchBar from './SearchBar';
// import './event.scss';

interface GridEventsProgramProps {
  grid_id: string;
  view_mode?: string;
}

const GridEventsProgram: React.FunctionComponent = (
  props: GridEventsProgramProps
) => {
  const { grid_id, view_mode } = props;

  console.debug("GridEventsProgram: grid_id ", grid_id);
  const [fetchRan, setFetchRan] = useState(false);
  const [fetchedPanelData, setFetchedPanelData] = useState(null);
  
  // Fetch Content and Taxonomy Tag Lists
  if(!fetchRan) {
    setFetchRan(true);

    // Fetch Main Content 
    fetch("/api/v1.0/grid_panels?_format=json&sort_order=ASC&items_per_page=1000&eventid=" + grid_id)
    .then((res) => res.json())
    .then((incoming) => {
      setFetchedPanelData(incoming);
      console.debug("GridEventsProgram: fetchedPanelData ", fetchedPanelData);
    });    
  }

  if (fetchedPanelData == null) {
    return (
      <div class="alert alert-warning" role="alert">Loading Speaker Data</div>
    );
  }
  
  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }

  let panelsByDay = groupBy(fetchedPanelData, 'field_panel_date_string')
  console.debug("GridEventsProgram: panelsByDay ", panelsByDay);

  let panelDaysList = [];
  let panelsHTML = [];
  let panelDayKey = 0;
  for(const panelGroup in panelsByDay) {
    console.debug("GridEventsProgram: panelGroup ", panelGroup);
    panelDaysList.push(panelGroup);
    panelsHTML.push( 
      <Card>
        <Accordion.Toggle as={Card.Header} variant="link" eventKey={panelDayKey}>
          {panelGroup}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={panelDayKey}>
            <>
              {panelsByDay[panelGroup].map((panel, index) => {
                console.debug("GridEventsProgram: panelsByDay[panelGroup] loop ", panel);
                return (
                  <Card.Body>
                    <div>
                      <p>{panel.title}</p>
                    </div>
                  </Card.Body>
                );
              }
              )}
            </>
        </Accordion.Collapse>
      </Card>
    );
    panelDayKey++;
  }

  console.debug("GridEventsProgram: panelsHTML ", panelsHTML);


  const MainContainer = styled.div`
  
    .container {
      text-align: center; 
    }

    & a {
      font-size: 0.75em; 
      transition: 'all 0.5s ease';
    }

    & img {
      width: 100%;
    }
    @media screen and (min-width: 1200px){
      font-size: 1.25em;
    }

  `;

  
  const handleFilterDisplayToggle = () => {
    // toggle filter display
  };

  return (
    <MainContainer className="container py-5">
      <div id="events">
          <Container>
              <Row className="my-3">
                  <Col sm={5} md={3}>
                      <button className="btn btn-warning" onClick={handleFilterDisplayToggle}>
                          HIDE FILTERS
                      </button>
                  </Col>
                  <Col sm={7} md={6} className="form-horizontal">
                      {/* <FormatSelect
                          formatOptions={formatOptions}
                          format={format}
                          onChange={handleFormatChange}
                      /> */}
                  </Col>
                  <Col sm={6} md={3}>
                      {/* <button className="btn btn-warning" onClick={handlePrintPage}>
                          PRINT THIS FORMAT
                      </button> */}
                  </Col>
              </Row>
              {/* <SearchBar
                  term={term}
                  terms={terms}
                  count={sessions.length}
                  onInputChange={handleInputChange}
                  onInputPress={handleInputPress}
                  onRemoveTerm={handleRemoveTerm}
                  onRemoveAllTerms={handleRemoveAllTerms}
              /> */}
              <Row>
                  <Col sm={6} md={4} lg={3}>
                      {/* <FilterDates
                          datesOptions={datesOptions}
                          dates={dates}
                          countPrograms={countPrograms}
                          onClickDate={handleClickDate}
                          onClickAllDates={handleClickAllDates}
                          onClickNoneDates={handleClickNoneDates}
                      />
                      <FilterTracks
                          tracksOptions={tracksOptions}
                          tracks={tracks}
                          countTracks={countTracks}
                          onClickTrack={handleClickTrack}
                          onClickAllTracks={handleClickAllTracks}
                          onClickNoneTracks={handleClickNoneTracks}
                      /> */}
                  </Col>
                  <Col sm={6} md={8} lg={9} style={{ marginTop: -67 }}>
                      <div className="programday-list">
                        <Accordion>
                          {panelsHTML.map((item, key) => 
                            {
                              return (item)
                            }
                          )}
                        </Accordion>
                              {/* <ProgramDay
                                  key={index}
                                  field_grid_event_id={item.field_grid_event_id}
                                  field_program_date={item.field_program_date}
                                  terms={terms}
                                  tracks={tracks}
                                  viewMode={format}
                                  onSessionsLoad={handleSessionsLoad}
                              /> */}
                      </div>
                  </Col>
              </Row>
          </Container>
      </div>
    </MainContainer>
  );
};

export { GridEventsProgram as default, GridEventsProgramProps };
