import React, {useState} from "react";
import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";

interface GridEventsSpeakersProps {
  grid_id: string;
  view_mode?: string;
}

const GridEventsSpeakers: React.FunctionComponent = (
  props: GridEventsSpeakersProps
) => {
  const { grid_id, view_mode } = props;

  console.debug("GridEventsSpeakers: grid_id ", grid_id);
  const [fetchRan, setFetchRan] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  
  let elJumbotron = document.querySelector(".jumbotron"); 
  if (!!elJumbotron) {
    elJumbotron.style.minHeight='unset';
    elJumbotron?.querySelector('.slide-text').classList.remove('hero-tall');
    elJumbotron?.querySelector('.slide-text').classList.add('hero-short');
  }
    
  // Fetch Content and Taxonomy Tag Lists
  if(!fetchRan) {
    setFetchRan(true);

    // Fetch Main Content 
    fetch("/api/v1.0/grid_speakers?_format=json&sort_order=ASC&items_per_page=1000&eventid=" + grid_id)
    .then((res) => res.json())
    .then((incoming) => {
      setFetchedData(incoming);
      console.debug(": fetchedData ", fetchedData);
    });
    
  }

  if (fetchedData == null) {
    return (
      <div class="alert alert-warning" role="alert">Loading Speaker Data</div>
    );
  }

  const MainContainer = styled.div`
    & .container {
      text-align: center;
    }

    .letter-anchor-links {
      position: relative;
      width: 100%;
      padding: 1.5rem;
      
      & .section-letter {
        & h2 {
          font-family: 'LatoWeb';
          font-weight: bold;
          margin: 0;
          padding-bottom: 1em;
          border-bottom: 2px solid lightgray;
        }
      }

      & .hidden-link-div {
        width: 100%;
        height: 5em;
        position: absolute;
        top: -7em;
        display: block;
        z-index: -5;
      }
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

    & .alphabetLinks {
      & a {
        color: #444;
        font-size: 1.3em;
        font-family: 'LatoWebHeavy';
        min-width: 1em;
        border-bottom: 3px solid transparent;

        &.disabled {
          color: #CCC !important;
          border-bottom: 3px solid transparent !important;
        }

        &.active, :hover :not(.disabled) {
          color: #0066cc;
          border-bottom: 3px solid #0066cc;
        }
      }
    }
  `;


  const handleActiveLink = (clickedLink) => {
    document
      .querySelectorAll(".alphabetLinks a")
      .forEach(allLinks => allLinks.classList.remove('active'));

    clickedLink.currentTarget.classList.add('active');
  }

  const alphabetArray = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  let matchingLetters = [];
  let groupedSpeakers = fetchedData.reduce((r, e) => {
    let group = e.field_last_name[0].toUpperCase();
    if(!r[group]) {
      r[group] = {group, children: [e]}
      matchingLetters.push(group);
    } else {
      r[group].children.push(e);
    }
    return r;
  }, {})
  console.debug("SPEAKERS GROUPED: ", groupedSpeakers);

  let speakersHTML = [];
  for( const speakerGroup in groupedSpeakers ) {
    speakersHTML.push(
      <>
        <div className="letter-anchor-links">
          <div name={speakerGroup} id={speakerGroup} className="hidden-link-div"></div>
          <div className="section-letter">
            <h1>{speakerGroup}</h1>
          </div>
        </div>
        {
          groupedSpeakers[speakerGroup]?.children?.map((item, key) => {
            let imagePath = (item.field_biopic == null || item.field_biopic == 'null' )
              ? '/sites/default/files/styles/large/public/Missing%20Photo_0.jpg'
              : 'https://grid.milkeninstitute.org/events/speakers/' + item.field_biopic;

            return (
              <a 
                className="col-sm-6 col-md-4 col-lg-3 p-4 text-center text-decoration-none text-dark"
                href={`/events/${grid_id}/speakers/${item.id}`}  
              >
                <img src={imagePath} />
                <p className="font-weight-bold m-0 mt-3">{item.field_first_name} {item.field_last_name}</p>
                <p dangerouslySetInnerHTML={{__html: item.field_description}} />
                {/* <p className="">{item.field_description}</p> */}
              </a>
            );
          })
        }
      </>
    );

  }

  return (
    <MainContainer className="container py-5">
      <Row className="alphabetLinks d-flex flex-wrap justify-content-center py-4">
        { 
          alphabetArray.map((item, key) => {
            let linkClassNames = "mx-2 pt-2 text-center text-decoration-none"; 
            linkClassNames += matchingLetters.includes(item) 
              ? ' enabled' 
              : ' disabled';
            let linkValue = matchingLetters.includes(item) ? "#" + item : null;
            
            return ( 
              <a 
                className={linkClassNames} 
                href={linkValue}
                onClick={handleActiveLink} 
              >
                {item}
              </a> 
            );
          })
        }
      </Row>
      <Row>
        { 
          speakersHTML.map((item, key) => {
            return ( item );
          })
        }   
      </Row>
    </MainContainer>
  );
};

export { GridEventsSpeakers as default, GridEventsSpeakersProps };
