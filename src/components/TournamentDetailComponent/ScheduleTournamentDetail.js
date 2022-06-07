import React, { useState, useEffect } from "react";
import "./styles/style.css";
import LoadingAction from "../LoadingComponent/LoadingAction";
import { getTeamInMatchByTourId } from "../../api/TeamInMatchAPI";

import KnockOutStageSchedule from "./KnockOutStageSchedule";
import CricleStageSchedule from "./CricleStageSchedule";

function ScheduleTournamentDetail(props) {
  const {
    tourDetailId,
    tournamentType,
    hostTournamentId,
    groupNumber,
    startDate,
    endDate,
    user
  } = props;
  const [loading, setLoading] = useState(false);
  const [active, setactive] = useState(true);
  const [allTeam, setAllTeam] = useState(null);
  const [hideShow, setHideShow] = useState(false);
  const [statusUpdateDate,setStatusUpdateDate] = useState(false);
  useEffect(() => {
    getAllTeamInMatch();
  }, [tourDetailId, statusUpdateDate === true]);
  const getAllTeamInMatch = () => {
    setLoading(true);
    const response = getTeamInMatchByTourId(tourDetailId);
    response
      .then((res) => {
        if (res.status === 200) {
          setAllTeam(res.data.teamsInMatch);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="teamdetail__content schedule__tour">
        <div
          style={{
            marginTop: 30,
          }}
          className="wrap__title"
        >
          <h2 className="title">Lịch thi đấu</h2>
          <div className="option__view">
            <p
              className={active ? "active" : ""}
              onClick={() => {
                setactive(true);
              }}
            >
              Danh sách
            </p>
            {tournamentType !== "CircleStage" ? (
              <p
                className={!active ? "active" : ""}
                onClick={() => {
                  setactive(false);
                }}
              >
                Biểu đồ
              </p>
            ) : null}
          </div>
        </div>
        {active ? (
          <div className="wrap__table">
            {tournamentType !== "CircleStage" ? (
              <KnockOutStageSchedule
                tournamentType={tournamentType}
                hostTournamentId={hostTournamentId}
                typeView="result"
                allTeam={allTeam}
                hideShow={hideShow}
                setHideShow={setHideShow}
                startDate={startDate}
                endDate={endDate}
                user={user}
                setStatusUpdateDate={setStatusUpdateDate}
                statusUpdateDate={statusUpdateDate}
              />
            ) : (
              <CricleStageSchedule
                hostTournamentId={hostTournamentId}
                loading={loading}
                allTeam={allTeam}
                hideShow={hideShow}
                setHideShow={setHideShow}
                startDate={startDate}
                endDate={endDate}
                user={user}
                setStatusUpdateDate={setStatusUpdateDate}
                statusUpdateDate={statusUpdateDate}
              />
            )}
          </div>
        ) : (
          <KnockOutStageSchedule
            groupNumber={groupNumber}
            tournamentType={tournamentType}
            allTeam={allTeam}
            typeView="diagram"
          />
        )}
      </div>
      {loading ? <LoadingAction /> : null}
    </>
  );
}

export default ScheduleTournamentDetail;
