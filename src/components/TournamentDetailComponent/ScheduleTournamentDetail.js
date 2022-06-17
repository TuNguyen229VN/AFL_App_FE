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
    user,
    teamCreate,
  } = props;
  const [loading, setLoading] = useState(false);
  const [active, setactive] = useState(true);
  const [allTeam, setAllTeam] = useState(null);
  const [hideShow, setHideShow] = useState(false);
  const [statusUpdateDate, setStatusUpdateDate] = useState(false);
  useEffect(() => {
    getAllTeamInMatch();
  }, [tourDetailId, statusUpdateDate === true]);
  const getAllTeamInMatch = () => {
    setLoading(true);
    const response = getTeamInMatchByTourId(tourDetailId);
    response
      .then((res) => {
        if (res.status === 200) {
          setAllTeam(res.data);
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
            flexDirection: "column",
            lineHeight: 1.6,
          }}
          className="wrap__title"
        >
          <h2 className="title">Mô Tả</h2>
          <p
            style={{
              fontSize: 20,
            }}
          >
            Hình thức thi đấu:{" "}
            {tournamentType === "GroupStage"
              ? "chia bảng"
              : tournamentType === "KnockoutStage"
              ? "loại trưc tiếp"
              : "vòng tròn"}{" "}
            và số đội là {teamCreate}
          </p>
          {tournamentType !== "GroupStage" ?
          <p
            style={{
              fontSize: 20,
            }}
          >
            Ở hình thức này thì{" "}
            {tournamentType === "KnockoutStage"
              ? ""
              : "sẽ có 1 bảng và các đội sẽ thi đấu lần lượt với nhau"}{" "}
          </p> : null }
          {tournamentType === "GroupStage" ? <p
            style={{
              fontSize: 20,
            }}
          >
            Đối với số bảng đấu bằng {groupNumber}, thì hệ thống chúng tôi
            sẽ chia làm{" "}
            {groupNumber == 2 ? "2 bảng A-B" : "4 bảng A-B-C-D"},{" "}
            {groupNumber == 2
              ? teamCreate % 2 === 0
                ? ` mỗi bảng sẽ có ${teamCreate / 2} đội `
                : `bảng A sẽ có ${Math.ceil(
                  teamCreate / 2
                  )} đội, bảng B có ${Math.floor(
                    teamCreate / 2
                  )} đội `
              : groupNumber == 4
              ? teamCreate == 14
                ? ` bảng A-B có 4 đội và C-D sẽ có 3 đội `
                : teamCreate == 15
                ? ` bảng A-B-C có 4 đội và D sẽ có 3 đội `
                : teamCreate % 4 === 0
                ? ` mỗi bảng sẽ có ${teamCreate / 4} đội `
                : ` bảng A có ${Math.ceil(
                  teamCreate / 4
                  )} đội và mỗi bảng sẽ có ${Math.floor(
                    teamCreate / 4
                  )} đội `
              : null}
            và sẽ mặc định lấy 2 đội mạnh nhất mỗi bảng vào vòng loại trực tiếp{" "}
          </p> : null}
          
        </div>

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
