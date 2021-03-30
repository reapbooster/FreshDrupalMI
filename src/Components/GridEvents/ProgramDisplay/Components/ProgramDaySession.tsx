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

  const renderSpeakers = (session: any) => {
    if (session?.field_speakers && session?.field_speakers.length > 0) {
      const speakerIds = session.field_speakers
        .split(",")
        .map((id: any) => parseInt(id));
      if (speakerIds?.length < 1) {
        return;
      }

      return _.sortBy(speakerIds, (speaker: any) => {
        return speaker.field_first_name;
      })
        .map((speakerId: number, index: number) => {
          let speakerData = getSpeakerById(speakerId);

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

            {/*<h5>Moderator</h5>
                        <ProfileSummary profile={session?.field_moderator} />
                        <h5>Speakers</h5> */}

            {/*<h6>Tracks</h6>
                        {/* <p>
                            {session.field_tracks &&
                                session.field_tracks.map((track: any, index: number) =>
                                    index < session.field_tracks.length - 1 ? (
                                        <>{track} | </>
                                    ) : (
                                        <>{track}</>
                                    )
                                )}
                        </p> */}
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
          <div id="session-collapse-content">
            {renderSpeakers(session)}
            {/* <h5>Moderator</h5>
                        <ProfileSummary profile={session.field_moderator} />
                        <h5>Speakers</h5>
                        {session.field_speakers &&
                            session.field_speakers.map((speaker, index) => (
                                <ProfileSummary key={index} profile={speaker} />
                            ))} */}
          </div>
        </Collapse>
      </>
    );
  };

  const renderDetail = () => {
    return (
      <>
        {titleNode}

        {/* <h5>Moderator</h5>
                <ProfileSummary profile={session.field_moderator} />
                <h5>Speakers</h5> */}
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
