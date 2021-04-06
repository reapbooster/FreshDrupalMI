import React, { useState, useEffect } from "react";
import moment from "moment";

import ProgramDaySession from "./ProgramDaySession";
import ProgramDayHeader from "./ProgramDayHeader";
import NodeSession, {
  NodeSessionInterface,
} from "../../../DataTypes/NodeSession";

interface ProgramDayProps {
  date: string;
  terms: string[];
  tracks: string[];
  viewMode: number;
  panels: object[];
  getSpeakerById: any;
  getTrackById: any;
  open: boolean;
}

const ProgramDay: React.FC<ProgramDayProps> = (props: ProgramDayProps) => {
  const {
    date,
    open,
    terms,
    tracks,
    viewMode,
    panels,
    getSpeakerById,
    getTrackById,
  } = props;

  const [opened, setOpened] = useState<boolean>(!!open);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="programday-container">
      <ProgramDayHeader
        date={date}
        opened={opened}
        onToggleOpen={() => setOpened(!opened)}
      />
      {opened ? (
        panels.length > 0 ? (
          <div className="programday-sessions-container">
            {panels.map((panel, index) => (
              <ProgramDaySession
                key={index}
                session={panel}
                viewMode={viewMode}
                getSpeakerById={getSpeakerById}
                getTrackById={getTrackById}
              />
            ))}
          </div>
        ) : (
          <p>No elements</p>
        )
      ) : null}
    </div>
  );
};

export default ProgramDay;
