import React, { useState, useEffect } from "react";
import { Bracket, RoundProps } from "react-brackets";
import { Link } from "react-router-dom";
import ModalChangeDateInSchedule from "./ModelChangeDateInSchedule";
import { updateDateInMatchAPI } from "../../api/MatchAPI";
import { toast } from "react-toastify";
export default function KnockOutStageSchedule(props) {
  const {
    allTeam,
    typeView,
    hostTournamentId,
    tournamentType,
    groupNumber,
    hideShow,
    setHideShow,
    startDate,
    endDate,
    user,
    setStatusUpdateDate,
    statusUpdateDate,
  } = props;

  const [matchCurrent, setMatchCurrent] = useState(null);
  const [knockoutTeam, setKnoukoutTeam] = useState(null);
  const [dateUpdate, setDateUpdate] = useState(null);
  const [teamInUpdate, setTeamInUpdate] = useState(null);
  useEffect(() => {
    if (allTeam != null) {
      devideRound();
    }
  }, [allTeam]);

  const devideRound = () => {
    const data = [];
    let roundCurrent = null;
    let indexCurrent = 0;
    console.log(allTeam);
    allTeam.map((item, index) => {
      if (index % 2 === 0) {
        if (roundCurrent === null) {
          roundCurrent =
            tournamentType == "GroupStage"
              ? item.match.groupFight
              : item.match.round;
          data.push({
            title:
              tournamentType == "GroupStage"
                ? item.match.groupFight
                : item.match.round,
            seeds: [
              {
                id: item.id,
                date: item.match.matchDate,
                match: item.match,
                teams: [
                  {
                    name: item.teamName,
                    team:
                      item.teamInTournament.team !== null
                        ? item.teamInTournament.team
                        : null,
                    score: item.teamScore,
                    teamResult: item.result,
                    teamInTournamentId: item.teamInTournamentId,
                  },
                  {
                    name: allTeam[index + 1].teamName,
                    team:
                      allTeam[index + 1].teamInTournament.team !== null
                        ? allTeam[index + 1].teamInTournament.team
                        : null,
                    score: allTeam[index + 1].teamScore,
                    teamResult: allTeam[index + 1].result,
                    teamInTournamentId: allTeam[index + 1].teamInTournamentId,
                  },
                ],
              },
            ],
          });
        } else if (
          roundCurrent ===
          (tournamentType == "GroupStage"
            ? item.match.groupFight
            : item.match.round)
        ) {
          data[indexCurrent].seeds.push({
            id: item.id,
            date: item.match.matchDate,
            match: item.match,
            teams: [
              {
                name: item.teamName,
                team:
                  item.teamInTournament.team !== null
                    ? item.teamInTournament.team
                    : null,
                score: item.teamScore,
                teamResult: item.result,
                teamInTournamentId: item.teamInTournamentId,
              },
              {
                name: allTeam[index + 1].teamName,
                team:
                  allTeam[index + 1].teamInTournament.team !== null
                    ? allTeam[index + 1].teamInTournament.team
                    : null,
                score: allTeam[index + 1].teamScore,
                teamResult: allTeam[index + 1].result,
                teamInTournamentId: allTeam[index + 1].teamInTournamentId,
              },
            ],
          });
        } else {
          indexCurrent += 1;
          roundCurrent =
            tournamentType == "GroupStage"
              ? item.match.groupFight
              : item.match.round;
          data.push({
            title:
              tournamentType == "GroupStage"
                ? item.match.groupFight
                : item.match.round,
            seeds: [
              {
                id: item.id,
                match: item.match,
                date: item.match.matchDate,
                teams: [
                  {
                    name: item.teamName,
                    team:
                      item.teamInTournament.team !== null
                        ? item.teamInTournament.team
                        : null,
                    score: item.teamScore,
                    teamResult: item.result,
                    teamInTournamentId: item.teamInTournamentId,
                  },
                  {
                    name: allTeam[index + 1].teamName,
                    team:
                      allTeam[index + 1].teamInTournament.team !== null
                        ? allTeam[index + 1].teamInTournament.team
                        : null,
                    score: allTeam[index + 1].teamScore,
                    teamResult: allTeam[index + 1].result,
                    teamInTournamentId: allTeam[index + 1].teamInTournamentId,
                  },
                ],
              },
            ],
          });
        }
      }
    });
    if (typeView === "diagram" && tournamentType != "GroupStage") {
      const nullTeamRoundOne = calcAllTeamRoundOne() - data[0].seeds.length;
      console.log(calcAllTeamRoundOne());
      if (nullTeamRoundOne > 0) {
        let countI = 1;
        for (let i = 0; i < nullTeamRoundOne; i++) {
          data[0].seeds.splice(countI, 0, {
            id: null,
            date: null,
            teams: [
              { name: null, team: null, teamResult: null },
              { name: null, team: null, teamResult: null },
            ],
          });
          countI += 2;
        }
      }
    } else if (typeView === "diagram" && tournamentType == "GroupStage") {
      data.splice(0, groupNumber);
    }
    console.log(data);
    setKnoukoutTeam(data);
  };

  const calcAllTeamRoundOne = () => {
    console.log(allTeam);
    if (
      (allTeam.length % 2 === 0
        ? allTeam.length / 2
        : Math.floor(allTeam.length / 2) + 1) > 8
    ) {
      return 8;
    } else if (
      (allTeam.length % 2 === 0
        ? allTeam.length / 2
        : Math.floor(allTeam.length / 2) + 1) > 4
    ) {
      return 4;
    } else return 2;
  };

  const onChangHandle = (e) => {
    setDateUpdate(e.target.value);
  };

  const updateDateInMatch = (dataMatch) => {
    const data = {
      ...dataMatch,
      matchDate: dateUpdate,
    };
    const response = updateDateInMatchAPI(data);
    response
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setStatusUpdateDate(true);
          setHideShow(false);
          toast.success("Thay đổi ngày giờ trận đấu thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(err);
      });
  };

  const checkDate = (data) => {
    const date =
      new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate();
    const month =
      new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1;
    const time = data.split("T");
    const conditon = time[0];

    let dateCurrent = new Date(
      time[0].split("-")[0] + "-" + month + "-" + date
    );
    let dateData = new Date(conditon);

    if (+dateCurrent > +dateData) {
      return false;
    } else {
      return true;
    }
  };

  const rounds = knockoutTeam != null ? [...knockoutTeam] : null;
  const changeDate = (data) => {
    const splitDateTime = data.split("T");
    return (
      splitDateTime[0].split("-")[2] +
      "-" +
      splitDateTime[0].split("-")[1] +
      "-" +
      splitDateTime[0].split("-")[0] +
      " " +
      splitDateTime[1].split(":")[0] +
      ":" +
      splitDateTime[1].split(":")[1]
    );
  };
  return knockoutTeam !== null ? (
    typeView === "diagram" ? (
      <div
        style={{
          marginTop: 50,
        }}
      >
        <Bracket rounds={rounds} />
      </div>
    ) : (
      <div>
        {knockoutTeam.map((item, index) => {
          return (
            <table
              style={{
                marginBottom: 50,
              }}
              key={index}
              className="schedule__table"
            >
              <tr>
                <th
                  colSpan={
                    user != undefined && user.userVM.id === hostTournamentId
                      ? 9
                      : 8
                  }
                >
                  Bảng đấu trực tiếp - {item.title}
                </th>
              </tr>
              {item.seeds.map((itemSeeds, indexSeeds) => {
                return (
                  <tr key={indexSeeds}>
                    <td>{indexSeeds + 1}</td>
                    <td
                      style={{
                        color: itemSeeds.date != null ? "black" : "red",
                      }}
                    >
                      {itemSeeds.date != null
                        ? changeDate(itemSeeds.date)
                        : "Chưa cập nhật"}
                    </td>
                    {itemSeeds.teams[0].team !== null ? (
                      <td>
                        <Link
                          to={`/teamDetail/${itemSeeds.teams[0].team.id}/inforTeamDetail`}
                        >
                          {itemSeeds.teams[0].name}
                          {itemSeeds.teams[0].team !== null ? (
                            <img
                              src={itemSeeds.teams[0].team.teamAvatar}
                              alt="gallery_item"
                            />
                          ) : null}
                        </Link>
                      </td>
                    ) : (
                      <td>
                        {itemSeeds.teams[0].name}
                        {itemSeeds.teams[0].team !== null ? (
                          <img
                            src={itemSeeds.teams[0].team.teamAvatar}
                            alt="gallery_item"
                          />
                        ) : null}
                      </td>
                    )}

                    <td>
                      <span className="score">{itemSeeds.teams[0].score}</span>
                      <span className="score"> - </span>
                      <span className="score">{itemSeeds.teams[1].score}</span>
                    </td>
                    {itemSeeds.teams[1].team !== null ? (
                      <td>
                        <Link
                          to={`/teamDetail/${itemSeeds.teams[1].team.id}/inforTeamDetail`}
                        >
                          {itemSeeds.teams[1].name}
                          {itemSeeds.teams[1].team !== null ? (
                            <img
                              src={itemSeeds.teams[1].team.teamAvatar}
                              alt="gallery_item"
                            />
                          ) : null}
                        </Link>
                      </td>
                    ) : (
                      <td>
                        {itemSeeds.teams[1].name}
                        {itemSeeds.teams[1].team !== null ? (
                          <img
                            src={itemSeeds.teams[1].team.teamAvatar}
                            alt="gallery_item"
                          />
                        ) : null}
                      </td>
                    )}
                    {user != undefined &&
                    user.userVM.id === hostTournamentId &&
                    checkDate(endDate) ? (
                      <td
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontWeight: 700,
                          lineHeight: 1.6,
                        }}
                        onClick={() => {
                          setHideShow(true);
                          setMatchCurrent(itemSeeds.match);
                          setStatusUpdateDate(false);
                          setTeamInUpdate(
                            itemSeeds.teams[0].name +
                              " - " +
                              itemSeeds.teams[1].name
                          );
                        }}
                      >
                        {itemSeeds.date != null ? "Chỉnh sửa " : "Cập nhật "}{" "}
                        ngày
                      </td>
                    ) : null}
                    {itemSeeds.teams[0].team !== null &&
                    itemSeeds.teams[1].team !== null ? (
                      <td>
                        {" "}
                        <Link
                          to={`/match/${itemSeeds.id}/matchDetail`}
                          state={{ hostTournamentId }}
                        >
                          Chi tiết
                        </Link>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                );
              })}
            </table>
          );
        })}
        <div className={hideShow ? "overlay active" : "overlay"}></div>
        {matchCurrent != null ? (
          <ModalChangeDateInSchedule
            hideShow={hideShow}
            setHideShow={setHideShow}
            matchCurrent={matchCurrent}
            startDate={startDate}
            endDate={endDate}
            dateUpdate={dateUpdate}
            setDateUpdate={setDateUpdate}
            onChangHandle={onChangHandle}
            updateDateInMatch={updateDateInMatch}
            teamInUpdate={teamInUpdate}
          />
        ) : null}
      </div>
    )
  ) : null;
}
