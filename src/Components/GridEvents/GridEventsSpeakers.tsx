import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";
import Loading from "../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {AllHtmlEntities} from 'html-entities';

interface GridEventsSpeakersProps {
  gridId: string;
  view_mode?: string;
}

const GridEventsSpeakers: React.FunctionComponent = (
  props: GridEventsSpeakersProps
) => {
  const { gridId, view_mode } = props;

  console.debug("GridEventsSpeakers: gridId ", gridId);
  const [fetchRan, setFetchRan] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  let elJumbotron = document.querySelector(".jumbotron");
  if (!!elJumbotron) {
    elJumbotron.style.minHeight = 'unset';
    elJumbotron?.querySelector('.slide-text').classList.remove('hero-tall');
    elJumbotron?.querySelector('.slide-text').classList.add('hero-short');
  }

  // Fetch Content and Taxonomy Tag Lists
  if (!fetchRan) {
    // Fetch Main Content 
    fetch("/api/v1.0/grid_speakers?_format=json&sort_order=ASC&items_per_page=1000&eventid=" + gridId)
      .then((res) => res.json())
      .then((incoming) => {
        setFetchedData(incoming);
        console.debug(": fetchedData ", fetchedData);
        setFetchRan(true);
      });

  }

  if (fetchedData == null) {
    return (
      <Loading />
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
      font-size: 1em; 
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

    & .icons a {
      font-size: 2em;
      padding: 0.2em 0.3em;
      color: #2d699f;

      &:hover {
        color: #1d4568;
      }
    }
  `;

  const handleActiveLink = (clickedLink) => {
    document
      .querySelectorAll(".alphabetLinks a")
      .forEach(allLinks => allLinks.classList.remove('active'));

    clickedLink.currentTarget.classList.add('active');
  }

  const alphabetArray = "abcdefghijklmnopqrsŞtuvwxyz".toUpperCase().split("");
  let matchingLetters = [];
  console.log("MATCHINGLETTERS SORTED: ", matchingLetters.sort());
  let groupedSpeakers = fetchedData.reduce((r, e) => {
    let group = AllHtmlEntities.decode(AllHtmlEntities.decode(e.field_last_name))[0].toUpperCase();
    if (!r[group]) {
      r[group] = { group, children: [e] }
      matchingLetters.push(group);
    } else {
      r[group].children.push(e);
    }
    return r;
  }, {});
  console.debug("SPEAKERS GROUPED: ", groupedSpeakers);

  // Sort groupedSpeakers Object
  const ordered = Object.keys(groupedSpeakers).sort().reduce(
    (obj, key) => { 
      obj[key] = groupedSpeakers[key]; 
      return obj;
    }, 
    {}
  );
  
  console.log('Re-Sorted SPEAKERS GROUPED: ', ordered);
  // groupedSpeakers = ordered;

  let speakersHTML = [];
  for (const speakerGroup in groupedSpeakers) {
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
            let imagePath = (item.field_biopic == null || item.field_biopic == 'null' || item.field_biopic == '')
              ? '/sites/default/files/styles/large/public/Missing%20Photo_0.jpg'
              : 'https://grid.milkeninstitute.org/events/speakers/' + item.field_biopic;

            let facebook, instagram, linkedin, twitter;
            if (item.field_facebook !== '') {
              facebook = <a href={item.field_facebook} target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
            };
            if (item.field_instagram !== '') {
              let intagram_url = item.field_instagram.includes('instagram.com') ? 
                item.field_instagram : 
                'https://www.instagram.com/' + item.field_instagram.replace('@','');
              instagram = <a href={intagram_url} target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
            };
            if (item.field_linkedin !== '') {
              linkedin = <a href={item.field_linkedin} target="_blank"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            };
            if (item.field_twitter !== '') {
              twitter = <a href={item.field_twitter.includes('https://twitter.com/') ? item.field_twitter : 'https://twitter.com/' + item.field_twitter} target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
            };

            return (
              <a
                className="col-sm-6 col-md-4 col-lg-3 p-4 text-center text-decoration-none text-dark"
                href={`/events/${gridId}/speakers/${item.id}`}
                target="_blank"
              >
                <img src={imagePath} />
                <p className="font-weight-bold m-0 mt-3" dangerouslySetInnerHTML={{
                    __html: (item.field_first_name + ' ' + item.field_last_name).replace(/&amp;/g, "&"),
                  }} 
                />
                <p dangerouslySetInnerHTML={{ __html: item.field_description.replace(/&amp;/g, "&") }} />
                <p className="icons m-0">{facebook} {instagram} {linkedin} {twitter}</p>
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
            return (item);
          })
        }
      </Row>
    </MainContainer>
  );
};

export { GridEventsSpeakers as default, GridEventsSpeakersProps };
