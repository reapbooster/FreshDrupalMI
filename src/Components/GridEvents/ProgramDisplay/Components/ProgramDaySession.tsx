import React, { useEffect, useState } from "react";
import moment from "moment";
import ProfileSummary from "./ProfileSummary";
import { Collapse, Row, Col } from "react-bootstrap";
import _ from "lodash";
import styled from "styled-components";

import { NodeSessionInterface } from "../../../DataTypes/NodeSession";

interface ProgramDaySessionProps {
  session: any;
  viewMode: number;
  getSpeakerById: any;
  getTrackById: any;
}

const SPEAKER_PIC_DEFAULT = "/sites/default/files/Missing%20Photo_0.jpg";

const ProgramDaySession: React.FC<ProgramDaySessionProps> = (
  props: ProgramDaySessionProps
) => {
  const { session, viewMode, getSpeakerById, getTrackById } = props;

  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {}, [session]);

  const renderSessionTime = (session: any) => {
    let startTime = moment(session.field_panel_start_time, "hh:mm").format(
      "H:mm"
    );
    let endTime = moment(session.field_panel_end_time, "kk:mm").format("H:mm");
    return (
      <div>
        {startTime} {session.field_pday}
        <br />
        to
        <br />
        {endTime} {session.field_epday}
      </div>
    );
  };

  const summary = (
    <p dangerouslySetInnerHTML={{ __html: session?.field_description }} style={{ fontSize: "1.154em" }} />
  );

  const renderSpeakerGroup = (speakers: Array<any>) => {
    return _(speakers)
      .map((s) => getSpeakerById(s.id))
      .sortBy((s) => s?.first_name)
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
    if (session?.field_speakers && session?.field_speakers.length > 0) {
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
          if (role == "Cancelled") {
            return false;
          }

          let weight = role.charCodeAt(0);

          if (role == "Moderator") {
            weight = 0;
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
            .replace(/((?<!^)[A-Z](?![A-Z]))(?=\S)/g, " $1")
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
        <div className="text-center">
          {session?.field_tracks
            .split(", ")
            .map(getTrackById)
            .filter(Boolean)
            .map((track) => {
              return (
                <span
                  className="badge badge-secondary"
                  dangerouslySetInnerHTML={{ __html: track?.title }}
                ></span>
              );
            })}
        </div>
      );
    }
  };

  const renderTitleOnly = () => {
    return (
      <>
        <div className="program-day-session-wrapper">
          <Row className="mb-3">
            <Col>
              <h4 dangerouslySetInnerHTML={{ __html: session?.title }}
                className="m-0"
                style={{ fontSize: "1.54em" }}
              ></h4>
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
            <div id="session-collapse-content">
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
    return (
      <>
        <div className="program-day-session-wrapper">
          <Row className="mb-3">
            <Col>
              <h4 dangerouslySetInnerHTML={{ __html: session?.title }}
                className="m-0"
              ></h4>
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
          {summary}
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
    return (
      <>
        {<h4 dangerouslySetInnerHTML={{ __html: session?.title }}></h4>}
        <p
          dangerouslySetInnerHTML={{ __html: session?.field_description }}
          className="mb-4"
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
          style={{ flex: "0 0 7em" }}
        >
          {renderSessionTime(session)}
        </div>
        <div className="col">{renderSessionContent()}</div>
      </div>
    </div>
  );
};

export default ProgramDaySession;
