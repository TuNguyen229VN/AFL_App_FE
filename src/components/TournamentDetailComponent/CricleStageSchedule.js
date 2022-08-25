import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingAction from "../LoadingComponent/LoadingAction";
import { updateDateInMatchAPI } from "../../api/MatchAPI";
import ModalChangeDateInSchedule from "./ModelChangeDateInSchedule";
import { toast } from "react-toastify";
export default function CricleStageSchedule(props) {
  const [allTeamA, setAllTeamA] = useState(null);
  const [allTeamB, setAllTeamB] = useState(null);
  const [matchCurrent, setMatchCurrent] = useState(null);
  const [dateUpdate, setDateUpdate] = useState(null);
  const [teamInUpdate, setTeamInUpdate] = useState(null);
  const [teamDescription, setTeamDescription] = useState(null);
  const [circleTeam, setCircleTeam] = useState(null);
  const {
    allTeam,
    loading,
    hostTournamentId,
    hideShow,
    setHideShow,
    startDate,
    endDate,
    user,
    setStatusUpdateDate,
    statusUpdateDate,
    tourDetail,
    type,
  } = props;
  useEffect(() => {
    if (allTeam !== null) {
      console.log(allTeam);
      const sortAsc = allTeam.sort(
        (objA, objB) =>
          Number(new Date(objA.match.matchDate)) -
          Number(new Date(objB.match.matchDate))
      );
      const teamB = [];
      const teamA = sortAsc.reduce((accumulator, currentValue) => {
        if (currentValue.id % 2 === 1) {
          accumulator.push(currentValue);
        } else {
          teamB.push(currentValue);
        }
        return accumulator;
      }, []);

      const newData = [];
      let index = 0;

      for (const item of teamA) {
        if (newData.length === 0) {
          newData.push({
            title: "Vòng tròn",
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
                    penalty: item.scorePenalty,
                    scoreTieBreak: item.scoreTieBreak,
                  },
                  {
                    name: teamB[index].teamName,
                    team:
                      teamB[index].teamInTournament.team !== null
                        ? teamB[index].teamInTournament.team
                        : null,
                    score: teamB[index].teamScore,
                    teamResult: teamB[index].result,
                    teamInTournamentId: teamB[index].teamInTournamentId,
                    penalty: teamB[index].scorePenalty,
                    scoreTieBreak: teamB[index].scoreTieBreak,
                  },
                ],
              },
            ],
          });
        } else {
          if (item.match.round.includes("tie-break") === false) {
            newData[0].seeds.push({
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
                  penalty: item.scorePenalty,
                  scoreTieBreak: item.scoreTieBreak,
                },
                {
                  name: teamB[index].teamName,
                  team:
                    teamB[index].teamInTournament.team !== null
                      ? teamB[index].teamInTournament.team
                      : null,
                  score: teamB[index].teamScore,
                  teamResult: teamB[index].result,
                  teamInTournamentId: teamB[index].teamInTournamentId,
                  penalty: teamB[index].scorePenalty,
                  scoreTieBreak: teamB[index].scoreTieBreak,
                },
              ],
            });
          } else {
            if (newData[1] === undefined) {
              newData.push({
                title: "Vòng tie-break",
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
                        penalty: item.scorePenalty,
                        scoreTieBreak: item.scoreTieBreak,
                      },
                      {
                        name: teamB[index].teamName,
                        team:
                          teamB[index].teamInTournament.team !== null
                            ? teamB[index].teamInTournament.team
                            : null,
                        score: teamB[index].teamScore,
                        teamResult: teamB[index].result,
                        teamInTournamentId: teamB[index].teamInTournamentId,
                        penalty: teamB[index].scorePenalty,
                        scoreTieBreak: teamB[index].scoreTieBreak,
                      },
                    ],
                  },
                ],
              });
            } else {
              newData[1].seeds.push({
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
                    penalty: item.scorePenalty,
                    scoreTieBreak: item.scoreTieBreak,
                  },
                  {
                    name: teamB[index].teamName,
                    team:
                      teamB[index].teamInTournament.team !== null
                        ? teamB[index].teamInTournament.team
                        : null,
                    score: teamB[index].teamScore,
                    teamResult: teamB[index].result,
                    teamInTournamentId: teamB[index].teamInTournamentId,
                    penalty: teamB[index].scorePenalty,
                    scoreTieBreak: teamB[index].scoreTieBreak,
                  },
                ],
              });
            }
          }
        }
        index += 1;
      }
      setCircleTeam(newData);
      if (type === "description") {
        const desTeam = [];
        for (let item of teamA) {
          if (desTeam.length > 0) {
            const index = desTeam.findIndex(
              (obj) => obj.teamName === item.teamName
            );
            if (index === -1) {
              desTeam.push({
                teamName: item.teamName,
                team:
                  item.teamInTournament.team !== null
                    ? item.teamInTournament.team
                    : null,
              });
            }
          } else {
            desTeam.push({
              teamName: item.teamName,
              team:
                item.teamInTournament.team !== null
                  ? item.teamInTournament.team
                  : null,
            });
          }
        }
        if (desTeam.length < tourDetail.footballTeamNumber) {
          for (let item of teamB) {
            if (desTeam.length > 0) {
              const index = desTeam.findIndex(
                (obj) => obj.teamName === item.teamName
              );
              if (index === -1) {
                desTeam.push({
                  teamName: item.teamName,
                  team:
                    item.teamInTournament.team !== null
                      ? item.teamInTournament.team
                      : null,
                });
              }
            } else {
              desTeam.push({
                teamName: item.teamName,
                team:
                  item.teamInTournament.team !== null
                    ? item.teamInTournament.team
                    : null,
              });
            }
          }
        }
        desTeam.sort(function (a, b) {
          return a.teamName.localeCompare(b.teamName);
        });
        setTeamDescription(desTeam);
      }

      setAllTeamA(teamA);
      setAllTeamB(teamB);
    }
  }, [allTeam]);

  const onChangHandle = (e) => {
    setDateUpdate(e.target.value);
  };
  const changeDateUp = (data) => {
    const updateDate = new Date(data);
    updateDate.setTime(updateDate.getTime() + 7 * 60 * 60 * 1000);
    const splitDateTime = updateDate.toJSON().split("T");
    const numberHour = +splitDateTime[1].split(":")[0];
    return (
      numberHour +
      ":" +
      splitDateTime[1].split(":")[1] +
      " " +
      splitDateTime[0].split("-")[1] +
      "-" +
      splitDateTime[0].split("-")[2] +
      "-" +
      splitDateTime[0].split("-")[0]
    );
  };
  const updateDateInMatch = (dataMatch) => {
    const data = {
      ...dataMatch,
      matchDate: changeDateUp(dateUpdate.toJSON()),
    };
    const response = updateDateInMatchAPI(data);
    response
      .then((res) => {
        if (res.status === 200) {
          setDateUpdate(null);
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
        setDateUpdate(null);
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
  const checkDate = (data, matchDate) => {
    const dateCurrent = new Date();
    const dateData = new Date(data);

    if (+dateCurrent > +dateData) {
      return false;
    } else {
      if (matchDate === null) {
        return true;
      } else {
        const dateMatchCurrent = matchDate.split("T")[0].split("-")[2];
        const onlyDate = dateCurrent.toJSON().split("T")[0].split("-")[2];

        if (Number(dateMatchCurrent) - Number(onlyDate) > 0) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  const changeDate = (data) => {
    const splitDateTime = data.split("T");
    // const numberHour =
    //   +splitDateTime[1].split(":")[0] + 7 > 24
    //     ? +splitDateTime[1].split(":")[0] + 7 - 24
    //     : +splitDateTime[1].split(":")[0] + 7;

    return (
      splitDateTime[1].split(":")[0] +
      ":" +
      splitDateTime[1].split(":")[1] +
      " " +
      splitDateTime[0].split("-")[2] +
      "-" +
      splitDateTime[0].split("-")[1] +
      "-" +
      splitDateTime[0].split("-")[0]
    );
  };
  const [maxDate, setMaxDate] = useState(null);
  const findMaxDate = (data) => {
    const seeds = data.seeds;
    const newDate = [];
    for (const item of seeds) {
      if (item.date !== null) newDate.push(item.date);
    }
    if (newDate.length > 0) {
      const maxDate = Math.max.apply(null, newDate);
      setMaxDate(maxDate);
    } else {
      setMaxDate(null);
    }
  };
  return type === null ? (
    <table className="schedule__table1">
      {loading ? (
        <LoadingAction />
      ) : circleTeam != null ? (
        circleTeam.map((item, index) => {
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
                      ? 8
                      : 7
                  }
                >
                  Bảng đấu - {item.title}
                </th>
              </tr>
              {item.seeds.map((itemSeeds, indexSeeds) => {
                return (
                  <tr key={indexSeeds}>
                    <td>{indexSeeds + 1}</td>
                    <td
                      style={{
                        color: itemSeeds.date != null ? "black" : "black",
                      }}
                    >
                      {itemSeeds.date != null ? (
                        <div style={{ position: "relative" }}>
                        {itemSeeds.match !== null &&
                          itemSeeds.match.tokenLivestream !== "" &&
                          itemSeeds.match.idScreen != 0 &&
                          itemSeeds.match.idScreen != null ? (
                            <img
                              style={{
                                position: "absolute",
                                right: "-30px",
                                borderRadius: "initial",
                                width: "60px",
                                height: "initial",
                              }}
                              className="azz1"
                              src="/assets/img/live.png"
                              alt="live"
                            />
                          ) : null}
                          {changeDate(itemSeeds.date)}
                        </div>
                      ) : (
                        "Chưa có lịch thi đấu"
                      )}
                    </td>
                    {itemSeeds.teams[0].team !== null ? (
                      <td>
                        <Link
                          to={`/teamDetail/${itemSeeds.teams[0].team.id}/inforTeamDetail`}
                        >
                          <p>{itemSeeds.teams[0].name}</p>
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
                        <p>{itemSeeds.teams[0].name}</p>
                        {itemSeeds.teams[0].team !== null ? (
                          <img
                            src={itemSeeds.teams[0].team.teamAvatar}
                            alt="gallery_item"
                          />
                        ) : null}
                      </td>
                    )}

                    <td>
                      <span className="score">
                        {itemSeeds.teams[0].score !== null
                          ? itemSeeds.teams[0].scoreTieBreak !== null
                            ? itemSeeds.teams[0].scoreTieBreak
                            : itemSeeds.teams[0].score
                          : 0}
                      </span>
                      <span className="score"> - </span>
                      <span className="score">
                        {itemSeeds.teams[1].score !== null
                          ? itemSeeds.teams[1].scoreTieBreak !== null
                            ? itemSeeds.teams[1].scoreTieBreak
                            : itemSeeds.teams[1].score
                          : 0}
                      </span>
                      {itemSeeds.teams[0].penalty !== null &&
                      itemSeeds.teams[1].penalty !== null ? (
                        <span className="pen">
                          {" "}
                          ( Luân lưu:{" "}
                          {itemSeeds.teams[0].penalty +
                            " - " +
                            itemSeeds.teams[1].penalty +
                            " "}
                          )
                        </span>
                      ) : null}
                      {/* <div>
                        <span className="score">
                          {itemSeeds.teams[0].penalty !== null
                            ? itemSeeds.teams[0].penalty
                            : null}
                        </span>
                        <span className="score"> {itemSeeds.teams[0].penalty !== null
                            ? "-"
                            : null} </span>
                        <span className="score">
                          {itemSeeds.teams[1].penalty !== null
                            ? itemSeeds.teams[1].penalty
                            : null}
                        </span>
                      </div> */}
                    </td>
                    {itemSeeds.teams[1].team !== null ? (
                      <td>
                        <Link
                          to={`/teamDetail/${itemSeeds.teams[1].team.id}/inforTeamDetail`}
                        >
                          <p>{itemSeeds.teams[1].name}</p>
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
                        <p>{itemSeeds.teams[1].name}</p>
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
                    ((new Date(endDate).getTime() > new Date().getTime() &&
                      itemSeeds.match.matchDate === null) ||
                      (new Date(endDate).getTime() > new Date().getTime() &&
                        new Date(itemSeeds.match.matchDate).getTime() -
                          24 * 60 * 60 * 1000 >
                          new Date().getTime())) ? (
                      <td
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontWeight: 700,
                          lineHeight: 1.6,
                        }}
                        onClick={() => {
                          if (item.title.includes("tie-break")) {
                            findMaxDate(circleTeam[0]);
                          } else {
                            setMaxDate(null);
                          }
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
                    ) : (
                      <td></td>
                    )}
                    {itemSeeds.teams[0].team !== null &&
                    itemSeeds.teams[1].team !== null &&
                    itemSeeds.date !== null ? (
                      <td>
                        {" "}
                        {indexSeeds === item.seeds.length - 1 ? (
                          <Link
                            to={`/match/${itemSeeds.match.id}/matchDetail`}
                            state={{
                              hostTournamentId,
                              tourDetail,
                              index: indexSeeds,
                              title: item.title.includes("tie-break")
                                ? item.title
                                : null,
                            }}
                          >
                            Chi tiết
                          </Link>
                        ) : (
                          <Link
                            to={`/match/${itemSeeds.match.id}/matchDetail`}
                            state={{
                              hostTournamentId,
                              tourDetail,
                              index: 0,
                              title: item.title.includes("tie-break")
                                ? item.title
                                : null,
                            }}
                          >
                            Chi tiết
                          </Link>
                        )}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                );
              })}
            </table>
          );
        })
      ) : (
        <p
          style={{
            padding: 20,
            fontSize: 24,
            fontWeight: 700,
            color: "red",
          }}
        >
          Hệ thống chưa xếp lịch thi đấu cho giải này
        </p>
      )}
      <div className={hideShow ? "overlay active" : "overlay"}></div>
      {matchCurrent != null ? (
        <ModalChangeDateInSchedule
          hideShow={hideShow}
          setHideShow={setHideShow}
          matchCurrent={matchCurrent}
          setMatchCurrent={setMatchCurrent}
          startDate={maxDate !== null ? maxDate : startDate}
          endDate={endDate}
          dateUpdate={dateUpdate}
          onChangHandle={onChangHandle}
          setDateUpdate={setDateUpdate}
          updateDateInMatch={updateDateInMatch}
          teamInUpdate={teamInUpdate}
        />
      ) : null}
    </table>
  ) : (
    <table className="schedule__table">
      <tr>
        <th colSpan={2}>Bảng đấu</th>
      </tr>
      {loading ? (
        <LoadingAction />
      ) : teamDescription != null ? (
        teamDescription.map((item, index) => {
          return (
            <tr key={index}>
              <td
                style={{
                  width: "60%",
                }}
              >
                {index + 1}
              </td>
              {item.team != null ? (
                <td>
                  <Link
                    to={`/teamDetail/${item.team.id}/inforTeamDetail`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.team != null ? (
                      <img
                        src={item.team.teamAvatar}
                        alt="gallery_item"
                        style={{
                          marginRight: 10,
                        }}
                      />
                    ) : null}
                    <p>{item.teamName}</p>
                  </Link>
                </td>
              ) : (
                <td>
                  {item.team != null ? (
                    <img
                      src={item.team.teamAvatar}
                      alt="gallery_item"
                      style={{
                        marginRight: 10,
                      }}
                    />
                  ) : null}
                  <p>{item.teamName}</p>
                </td>
              )}
            </tr>
          );
        })
      ) : (
        <p
          style={{
            padding: 20,
            fontSize: 24,
            fontWeight: 700,
            color: "red",
          }}
        >
          Hệ thống chưa xếp lịch thi đấu cho giải này
        </p>
      )}
    </table>
  );
}
