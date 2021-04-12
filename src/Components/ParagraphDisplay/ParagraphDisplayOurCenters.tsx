import React from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import styled from "styled-components";

const data = [
  {
    name: "Asia Center",
    image: "https://milkeninstitute.org/sites/default/files/gettyimages-962204474-170667a_0.jpg",
    description: "Extends the reach and impact of the Milken Institute to the Asia-Pacific region",
    link: "https://milkeninstitute.org/centers/asia-center"
  },
  {
    name: "Center for Financial Markets",
    image: "https://milkeninstitute.org/sites/default/files/gettyimages-637513348-170667a.jpg",
    description: "Conducts research and constructs programs designed to facilitate the smooth and efficient operation of financial markets",
    link: "https://milkeninstitute.org/centers/center-for-financial-markets"
  },
  {
    name: "Center for the Future of Aging",
    image: "https://milkeninstitute.org/sites/default/files/kayak-new-2_1.jpg",
    description: "Promotes healthy, productive, and purposeful aging",
    link: "https://milkeninstitute.org/centers/center-for-the-future-of-aging"
  },
  {
    name: "Center for Public Health",
    image: "https://milkeninstitute.org/sites/default/files/grocery-store-health.jpg",
    description: "Promotes sustainable solutions that lead to better health for individuals and communities",
    link: "https://milkeninstitute.org/centers/center-for-public-health"
  },
  {
    name: "Center for Regional Economics and California Center",
    image: "https://milkeninstitute.org/sites/default/files/future-of-work-program.jpg",
    description: "Analyzes the dynamics that drive job creation and promote industry expansion",
    link: "https://milkeninstitute.org/centers/center-for-regional-economics"
  },
  {
    name: "Center for Strategic Philanthropy",
    image: "https://milkeninstitute.org/sites/default/files/center-for-strategic-philanthropy-hero.jpg",
    description: "Maximizes social return on investments by improving the deployment of philanthropic capital",
    link: "https://milkeninstitute.org/centers/center-for-strategic-philanthropy"
  },
  {
    name: "FasterCures",
    image: "https://milkeninstitute.org/sites/default/files/fastercures-hero-1.jpg",
    description: "Accelerates biomedical research and treatments for patients, improving the system for all",
    link: "https://milkeninstitute.org/centers/fastercures"
  },
  {
    name: "Financial Innovations Labs",
    image: "https://milkeninstitute.org/sites/default/files/financial-innovations-lab-feature%20%281%29.jpg",
    description: "Financial Innovations Labs tackle funding gaps around a specific economic development issue by holding a microscope to the problem and analyzing it from every angle.",
    link: "https://milkeninstitute.org/financial-innovations-labs"
  },
  {
    name: "Global Market Development",
    image: "https://milkeninstitute.org/sites/default/files/gmd.jpg",
    description: "Working with government partners in emerging and developing economies to build strong, domestic financial markets",
    link: "https://milkeninstitute.org/centers/global-market-development"
  },
  {
    name: "Milken Center for Advancing the American Dream (MCAAD)",
    image: "https://milkeninstitute.org/sites/default/files/CAAD%20Hero_Darker.jpg",
    description: "MCAAD believes anyone with a dream, and the drive to achieve it, should have the opportunity to make it come true.",
    link: "https://milkeninstitute.org/center-for-advancing-the-american-dream"
  },
];

interface ParagraphDisplayOurCentersProps {
  data: any;
}

const ParagraphDisplayOurCenters: React.FunctionComponent = (
  props: ParagraphDisplayOurCentersProps
) => {
  // const { data } = props;

  const centersList = data.map((item, index) => {
    return (
      <li
        key={index}
        data-key={index}
        className={'list-group-item' + (index === 0 ? ' active' : '')}
        onClick={setActive}
      >{item.name}</li>
    )
  })

  function setActive(e) {
    let allListItems = document.querySelectorAll("li.list-group-item");
    [...allListItems].map(item => {
      item.classList.remove("active")
    })
    e.target.classList.add("active");

    let allCentersCardItems = document.querySelectorAll(".our-centers--center-card");
    [...allCentersCardItems].map(item => {
      item.classList.remove("active")
    })

    let targetKey = e.target.dataset.key;
    document
      .getElementById(`our-centers--center-card-${targetKey}`)
      .classList
      .add("active");
  }

  const centersCard = data.map((item, index) =>
    <Card
      key={index}
      className={"our-centers--center-card" + (index === 0 ? ' active' : '')}
      id={`our-centers--center-card-${index}`}
    >
      <div className="card-header p-0">
        <a href={item.link}>
          <img
            src={item.image}
            alt="Center Image"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </a>
      </div>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <a className="center-link" href={item.link}>{item.name}</a>
          <p>{item.description}</p>
        </div>
        <a href={item.link} className="btn-milken-orange mt-0 align-self-start">Learn More</a>
      </div>
    </Card>
  )

  const CentersWrapper = styled.div`

    & .container {
      @media screen and (max-width: 992px) {
        max-width: 95%;
      }
    }

    & h2 {
      font-family: "LatoWebBlack";
      font-size: 2.5em;
    }

    & .centersList {
      & h4 {
        letter-spacing: 2px;
        color: rgba(53,54,60,0.54);
        font-size: 1em;
        font-weight: bold;
        margin-bottom: 1.5em;
      }
      & .list-group-item {
        cursor: pointer;
        border: none;
        border-left: 3px solid transparent;
        color: dimgray;
        line-height: 1.43;

        &.active, :hover {
          color: var(--color-milken-orange);
          border-left: 3px solid var(--color-milken-orange);
          background-color: #f0f2f4;
        }
      }
    }

    & .centersCard {
      & .our-centers--center-card {
        display: none;
        border: none;

        &.active {
          display: block;
        }

        & .card-header {
          height: 18em;
        }

        & .card-body {
          background-color: #f1f4f6;
          color: dimgray;
          min-height: 15em;

          & p {
            margin-top: 0.5em;
            font-size: 1.15em;
          }

          & .center-link {
            font-family: "LatoWebBold";
            color: #35363c;
            font-size: 1.45em;
          }
        }
      }
    }
  `

  console.debug("ParagraphDisplayOurCenters: Data ", data);

  return (
    <CentersWrapper className="my-5">
      <Container>
        <h2 className="text-center mb-5">Our centers</h2>
        <Row>
          <Col xs={12} md={5} className="centersList">
            <h4>CENTERS AND PRACTICE AREAS</h4>
            <ul className="list-group mb-5">
              {centersList}
            </ul>
          </Col>
          <Col xs={12} md={7} className="centersCard">
            {centersCard}
          </Col>
        </Row>
      </Container>
    </CentersWrapper>
  );
};

export { ParagraphDisplayOurCenters as default, ParagraphDisplayOurCentersProps };
