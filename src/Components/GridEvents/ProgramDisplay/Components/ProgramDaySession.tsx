import React, { useEffect, useState } from "react";
import moment from "moment";
import ProfileSummary from "./ProfileSummary";
import { Collapse, Row, Col } from "react-bootstrap";
import _ from "lodash";
import styled from "styled-components";

import { NodeSessionInterface } from "../../../DataTypes/NodeSession";

interface ProgramDaySessionProps {
  displayRooms: boolean;
  getSpeakerById: any;
  getTrackById: any;
  session: any;
  timeZone: string;
  viewMode: number;
}

const SPEAKER_PIC_DEFAULT = "/sites/default/files/Missing%20Photo_0.jpg";

const ProgramDaySession: React.FC<ProgramDaySessionProps> = (
  props: ProgramDaySessionProps
) => {
  const { displayRooms, getSpeakerById, getTrackById, session, timeZone, viewMode } = props;

  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {}, [session]);

  session.displayRooms = displayRooms;

  const renderSessionTime = (session: any) => {
    let startTime = moment(session.field_panel_start_time, "hh:mm").format(
      "H:mm"
    );
    let endTime = moment(session.field_panel_end_time, "kk:mm").format("H:mm");
    return (
      <div className="mt-3">
        <div>
          {startTime} {session.field_pday} - {endTime} {session.field_epday}{" "}
          {timeZone?.toUpperCase()}
        </div>
        {session.displayRooms ? <div>{session.field_rooms}</div> : null}
      </div>
    );
  };

  const summary = (
    <p
      dangerouslySetInnerHTML={{
        __html: session?.field_description.replace("”", "").replace("”", ""),
      }}
      style={{ fontSize: "1.154em" }}
    />
  );

  const renderSpeakerGroup = (speakers: Array<any>) => {
    return _(speakers)
      .map((s) => getSpeakerById(s.id))
      .sortBy((s) => s?.field_last_name.toLowerCase())
      .map((speakerData: any, index: number) => {
        const profile: any = {
          title: speakerData?.title,
          avatar: speakerData?.field_biopic
            ? `https://grid.milkeninstitute.org/events/speakers/${speakerData.field_biopic}`
            : SPEAKER_PIC_DEFAULT,
          link: `/grid_speakers/${speakerData?.id}`,
          job: speakerData?.field_description ?? "",
        };
        return <ProfileSummary key={index} profile={profile} />;
      })
      .filter(Boolean)
      .value();
  };

  const renderSpeakers = (session: any) => {
    if (
      session?.field_speakers &&
      session?.field_speakers.length > 0 &&
      session?.field_speaker_roles &&
      session?.field_speaker_roles.length > 0
    ) {
      const speakerIds = session.field_speakers
        .split(",")
        .map((id: any) => parseInt(id));

      // Return when empty
      if (speakerIds?.length < 1) {
        return;
      }

      // Decode cuneiform dates :)
      const speakerRoles = session?.field_speaker_roles
        .split("]|[")
        .map((r) => {
          let role = r.replace(/[^a-zA-Z0-9:]+/g, "").split(":");

          return {
            id: role[0],
            role: role[1],
          };
        });

      return _(speakerRoles)
        .groupBy("role")
        .map((speakers, role) => {
          if (
            role == "Accepted" ||
            role == "ApprovedtoInvite" ||
            role == "Cancelled" ||
            role == "Declined" ||
            role == "Invited" ||
            role == "Pending" ||
            role == "Suggested" ||
            role == "Undefined"
          ) {
            return false;
          }

          let weight = role.charCodeAt(0);

          
          if (role == "WelcomingRemarks" || role == "WelcomeRemarks") {
            weight = 1;
          }
          if (role == "OpeningRemarks") {
            weight = 2;
          }
          if (role == "IntroductoryRemarks" || role == "IntroductionBy") {
            weight = 3;
          }
          if (role == "Host") {
            weight = 4;
          }
          if (role == "Guest") {
            weight = 5;
          }
          if (role == "Moderator" || role == "Interviewer" || role == "Judge") {
            weight = 6;
          }
          if (role == "Speaker") {
            weight = 7;
          }
          if (role == "Presenter") {
            weight = 8;
          }
          if (role == "Performer") {
            weight = 9;
          }
          if (role == "ClosingRemarks") {
            weight = 10;
          }

          return {
            speakers: speakers,
            weight: weight,
            mrole: role,
          };
        })
        .filter(Boolean)
        .orderBy("weight")
        .map(({ speakers, mrole }) => {
          let suffix = "";
          if (
            ["Speaker", "Moderator", "Guest", "Host"].includes(mrole) &&
            speakers.length > 1
          ) {
            suffix = "s";
          }
          // Split camelcase strings
          mrole = mrole
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase());
          return (
            <div className="speaker-role-group" key={mrole}>
              <h5>
                {mrole}
                {suffix}
              </h5>
              {renderSpeakerGroup(speakers)}
            </div>
          );
        })
        .value()
        .filter(Boolean);
    }
  };

  const renderTracks = (session: any) => {
    if (session?.field_tracks && session?.field_tracks.length > 0) {
      return (
        <div className="text-center tracks-wrapper">
          {session?.field_tracks
            .split(", ")
            .map(getTrackById)
            .filter(Boolean)
            .map((track) => {
              return (
                <span
                  className="badge badge-secondary"
                  dangerouslySetInnerHTML={{ __html: track?.title }}
                  key={track?.title}
                ></span>
              );
            })}
        </div>
      );
    }
  };

  const renderTitleOnly = () => {
    let video = session?.field_video
      ? ` <a href="/media/${session?.field_video}"><i className="far fa-play-circle" /></a>`
      : "";
    return (
      <>
        <div className="program-day-session-wrapper">
          <Row>
            <Col>
              <h4
                dangerouslySetInnerHTML={{ __html: session?.title + video }}
                className="m-0"
              />
              {renderSessionTime(session)}
            </Col>
            <Col className="view-more-link">
              <button
                className="btn m-0"
                aria-controls="session-collapse-content"
                aria-expanded={expanded}
                onClick={() => setExpanded(!expanded)}
                style={{ minWidth: "0" }}
              >
                {expanded ? "View Less" : "View More"}
              </button>
            </Col>
          </Row>
          <Collapse in={expanded}>
            <div className="mt-3 " id="session-collapse-content">
              {summary}
              {renderSpeakers(session)}
              {renderTracks(session)}
            </div>
          </Collapse>
        </div>
      </>
    );
  };

  const renderTitleSummary = () => {
    let video = session?.field_video
      ? ` <a href="/media/${session?.field_video}"><i class="far fa-play-circle" /></a>`
      : "";
    return (
      <>
        <div className="program-day-session-wrapper">
          <Row>
            <Col>
              <h4
                dangerouslySetInnerHTML={{ __html: session?.title + video }}
                className="m-0"
              />
              {renderSessionTime(session)}
            </Col>
            <Col className="view-more-link">
              <button
                className="btn m-0"
                aria-controls="session-collapse-content"
                aria-expanded={expanded}
                onClick={() => setExpanded(!expanded)}
                style={{ minWidth: "0" }}
              >
                {expanded ? "View Less" : "View More"}
              </button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>{summary}</Col>
          </Row>
          <Collapse in={expanded}>
            <div id="session-collapse-content">
              {renderSpeakers(session)}
              {renderTracks(session)}
            </div>
          </Collapse>
        </div>
      </>
    );
  };

  const renderDetail = () => {
    let video = session?.field_video
      ? ` <a href="/media/${session?.field_video}"><i class="far fa-play-circle" /></a>`
      : "";
    return (
      <>
        {<h4 dangerouslySetInnerHTML={{ __html: session?.title + video }} />}
        {renderSessionTime(session)}
        <p
          className="mt-3 mb-4"
          dangerouslySetInnerHTML={{
            __html: session?.field_description
              .replace("”", "")
              .replace("”", ""),
          }}
        />
        {renderSpeakers(session)}
        {renderTracks(session)}
      </>
    );
  };

  const renderSessionContent = () => {
    console.log("viewMode", viewMode);

    switch (viewMode) {
      case 1:
        return renderTitleSummary();
      case 2:
        return renderDetail();
      default:
        return renderTitleOnly();
    }
  };

  return (
    <div className="programday-session">
      <div className="row">
        <div
          className="col time-col d-flex justify-content-center text-center"
          style={{ flex: "0 0 2vw", padding: 0 }}
        >
          {/* {renderSessionTime(session)} */}
        </div>
        <div className="col">{renderSessionContent()}</div>
      </div>
    </div>
  );
};

export default ProgramDaySession;
