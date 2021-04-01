import React, { useEffect, useState } from "react";
import moment from "moment";
import ProfileSummary from "./ProfileSummary";
import { Collapse } from "react-bootstrap";
import _ from "lodash";

import { NodeSessionInterface } from "../../../DataTypes/NodeSession";
import htmlDecode from "../../../../Utility/Functions.ts";

interface ProgramDaySessionProps {
  session: any;
  viewMode: number;
  getSpeakerById: any;
}

const SPEAKER_PIC_DEFAULT = "http://via.placeholder.com/150/cccccc/ffffff";

const ProgramDaySession: React.FC<ProgramDaySessionProps> = (
  props: ProgramDaySessionProps
) => {
  const { session, viewMode, getSpeakerById } = props;

  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {}, [session]);

  const renderSessionTime = (session: any) => {
    let startTime = moment(session.field_panel_start_time, "hh:mm").format(
      "H:mm"
    );
    let endTime = moment(session.field_panel_end_time, "kk:mm").format("H:mm");
    return (
      <div>
        {startTime} <br /> to <br /> {endTime}
      </div>
    );
  };

  const titleNode = (
    <h5 dangerouslySetInnerHTML={{ __html: htmlDecode(session.title) }}></h5>
  );

  const summary = (
    <p dangerouslySetInnerHTML={{ __html: session?.field_description }} />
  );

  const renderSpeakerGroup = (speakers: array) => {
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
        .orderBy("weight")
        .map(({ speakers, mrole }) => {
          let suffix = "";
          if (["Speaker", "Moderator"].includes(mrole) && speakers.length > 1) {
            suffix = "s";
          }
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

  const renderTitleOnly = () => {
    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-4">
          {titleNode}
          <div>
            <button
              className="btn"
              aria-controls="session-collapse-content"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "View Less" : "View More"}
            </button>
          </div>
        </div>
        <Collapse in={expanded}>
          <div id="session-collapse-content">
            {summary}
            {renderSpeakers(session)}
          </div>
        </Collapse>
      </>
    );
  };

  const renderTitleSummary = () => {
    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-4">
          {titleNode}
          <div>
            <button
              className="btn"
              aria-controls="session-collapse-content"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "View Less" : "View More"}
            </button>
          </div>
        </div>
        {summary}
        <Collapse in={expanded}>
          <div id="session-collapse-content">{renderSpeakers(session)}</div>
        </Collapse>
      </>
    );
  };

  const renderDetail = () => {
    return (
      <>
        {titleNode}
        <p
          dangerouslySetInnerHTML={{ __html: session?.field_description }}
          className="mb-4"
        />
        {renderSpeakers(session)}
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
        <div className="cole-sm-3 col-lg-2">{renderSessionTime(session)}</div>
        <div className="cole-sm-9 col-lg-10">{renderSessionContent()}</div>
      </div>
    </div>
  );
};

export default ProgramDaySession;
