import React, { useState, useEffect } from "react";
import { Bracket, RoundProps } from "react-brackets";
import { Link } from "react-router-dom";
import ModalChangeDateInSchedule from "./ModelChangeDateInSchedule";
import { updateDateInMatchAPI } from "../../api/MatchAPI";
import { toast } from "react-toastify";
import { excuteDate } from "./CheckMaxDateSchedule";
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
    tourDetail,
  } = props;
  console.log(groupNumber);
  const [matchCurrent, setMatchCurrent] = useState(null);
  const [knockoutTeam, setKnoukoutTeam] = useState(null);
  const [dateUpdate, setDateUpdate] = useState(null);
  const [teamInUpdate, setTeamInUpdate] = useState(null);
  const [teamDescription, setTeamDescription] = useState(null);
  const [indexSchedule, setIndexSchedule] = useState(null);
  const [findMaxDate, setFindMaxDate] = useState(null);
  useEffect(() => {
    if (allTeam != null) {
      devideRound();
    }
  }, [allTeam]);

  const devideRound = () => {
    const data = [];
    let roundCurrent = null;
    let indexCurrent = 0;
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
                name:
                  allTeam[index + 1].teamName !== undefined
                    ? allTeam[index + 1].teamName
                    : "Đội ...",
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
    for (let item of data) {
      item.seeds.sort(
        (objA, objB) =>
          Number(new Date(objA.date)) - Number(new Date(objB.date))
      );
    }
    if (typeView === "description") {
      data.splice(groupNumber, data.length);
      const desTeam = [];
      for (let index in data) {
        desTeam.push({
          title: data[index].title,
          seeds: [],
        });
        for (let itemData of data[index].seeds) {
          for (let seedTeam of itemData.teams) {
            if (desTeam[index].seeds.length > 0) {
              const findIndex = desTeam[index].seeds.findIndex(
                (obj) => obj.teamName === seedTeam.name
              );
              if (findIndex === -1) {
                desTeam[index].seeds.push({
                  teamName: seedTeam.name,
                  team: seedTeam.team !== null ? seedTeam.team : null,
                });
              }
            } else {
              desTeam[index].seeds.push({
                teamName: seedTeam.name,
                team: seedTeam.team !== null ? seedTeam.team : null,
              });
            }
          }
        }
        desTeam[index].seeds.sort(function (a, b) {
          return a.teamName.localeCompare(b.teamName);
        });
      }

      setTeamDescription(desTeam);
    }
    if (typeView === "result") {
      const findDate = excuteDate(data, tournamentType, tourDetail);
      console.log(findDate);
      setFindMaxDate(findDate);
    }

    setKnoukoutTeam(data);
  };
  const editDate = (date) => {
    const newDate = date.toJSON().split("T")[0];
    const newTime = date.toLocaleTimeString();
    const fullDate =
      +newDate.split("-")[1] +
      "/" +
      (+newDate.split("-")[2] + 1) +
      "/" +
      +newDate.split("-")[0];
    return fullDate + " " + newTime;
  };
  const findStateDate = () => {
    if (tournamentType === "GroupStage") {
      if (indexSchedule >= 0 && indexSchedule < tourDetail.groupNumber) {
        return startDate;
      } else {
        let newStartDate = null;
        for (let i = indexSchedule - 1; i >= tourDetail.groupNumber - 1; i--) {
          if (findMaxDate[i].maxDate !== null) {
            newStartDate = findMaxDate[i].maxDate;
            break;
          }
        }
        if (newStartDate === null) {
          return endDate;
        } else {
          return editDate(newStartDate);
        }
      }
    } else {
      if (indexSchedule === 0) {
        return startDate;
      } else {
        let newStartDate = null;
        for (let i = indexSchedule - 1; i >= 0; i--) {
          if (findMaxDate[i].maxDate !== null) {
            newStartDate = findMaxDate[i].maxDate;
            break;
          }
        }
        if (newStartDate === null) {
          return endDate;
        } else {
          return editDate(newStartDate);
        }
      }
    }
  };
  const findEndate = () => {
    console.log(indexSchedule);
    if (tournamentType === "GroupStage") {
      if (indexSchedule === knockoutTeam.length - 1) {
        return endDate;
      } else {
        let endDateNew = null;
        const index =
          indexSchedule >= 0 && indexSchedule < tourDetail.groupNumber
            ? tourDetail.groupNumber
            : indexSchedule + 1;
        for (let i = index; i < findMaxDate.length; i++) {
          if (findMaxDate[i].minDate !== null) {
            endDateNew = findMaxDate[i].minDate;
            break;
          }
        }
        if (endDateNew === null) {
          return endDate;
        } else {
          return editDate(endDateNew);
        }
      }
    } else {
      if (indexSchedule === knockoutTeam.length - 1) {
        return endDate;
      } else {
        let endDateNew = null;
        for (let i = indexSchedule + 1; i < findMaxDate.length; i++) {
          if (findMaxDate[i].minDate !== null) {
            endDateNew = findMaxDate[i].minDate;
            break;
          }
        }
        if (endDateNew === null) {
          return endDate;
        } else {
          return editDate(endDateNew);
        }
      }
    }
  };
  const calcAllTeamRoundOne = () => {
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
    console.log(dateUpdate.toJSON());
    //someDate.setTime(someDate.getTime() + 1 * 60 * 60 * 1000);

    const data = {
      ...dataMatch,
      matchDate: changeDateUp(dateUpdate.toJSON()),
    };

    const response = updateDateInMatchAPI(data);
    response
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
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

  const rounds = knockoutTeam != null ? [...knockoutTeam] : null;
  const changeDate = (data) => {
    const splitDateTime = data.split("T");
    const numberHour = +splitDateTime[1].split(":")[0] + 0;
    return (
      splitDateTime[0].split("-")[2] +
      "-" +
      splitDateTime[0].split("-")[1] +
      "-" +
      splitDateTime[0].split("-")[0] +
      " " +
      numberHour +
      ":" +
      splitDateTime[1].split(":")[1]
    );
  };

  const changeDateUp = (data) => {
    const updateDate = new Date(data);
    updateDate.setTime(updateDate.getTime() + 7 * 60 * 60 * 1000);

    const splitDateTime = updateDate.toJSON().split("T");
    const numberHour = +splitDateTime[1].split(":")[0];
    return (
      splitDateTime[0].split("-")[1] +
      "-" +
      splitDateTime[0].split("-")[2] +
      "-" +
      splitDateTime[0].split("-")[0] +
      " " +
      numberHour +
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
    ) : typeView === "description" ? (
      <div>
        {teamDescription !== null
          ? teamDescription.map((itemIn, indexIn) => {
              return (
                <table
                  key={indexIn}
                  style={{
                    marginBottom: 50,
                  }}
                  className="schedule__table"
                >
                  <tr>
                    <th colSpan={2}>Bảng đấu - {itemIn.title}</th>
                  </tr>
                  {itemIn.seeds.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {item.team != null ? (
                          <td>
                            <Link
                              to={`/teamDetail/${item.team.id}/inforTeamDetail`}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  marginRight: 10,
                                }}
                              >
                                {item.teamName}
                              </p>
                              {item.team != null ? (
                                <img
                                  src={item.team.teamAvatar}
                                  alt="gallery_item"
                                />
                              ) : null}
                            </Link>
                          </td>
                        ) : (
                          <td>
                            <p>{item.teamName}</p>
                            {item.team != null ? (
                              <img
                                src={item.team.teamAvatar}
                                alt="gallery_item"
                              />
                            ) : null}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </table>
              );
            })
          : null}
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
                      ? 8
                      : 7
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
                        color: itemSeeds.date != null ? "black" : "black",
                      }}
                    >
                      {itemSeeds.date != null
                        ? changeDate(itemSeeds.date)
                        : "Chưa có lịch thi đấu"}
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
                          ? itemSeeds.teams[0].score
                          : 0}
                      </span>
                      <span className="score"> - </span>
                      <span className="score">
                        {itemSeeds.teams[1].score !== null
                          ? itemSeeds.teams[1].score
                          : 0}
                      </span>
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
                    {(user != undefined &&
                      user.userVM.id === hostTournamentId &&
                      new Date(endDate).getTime() > new Date().getTime() &&
                      itemSeeds.match.matchDate === null) ||
                    (new Date(endDate).getTime() > new Date().getTime() &&
                      new Date(itemSeeds.match.matchDate).getTime() -
                        24 * 60 * 60 * 1000 >
                        new Date().getTime()) ? (
                      <td
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontWeight: 700,
                          lineHeight: 1.6,
                        }}
                        onClick={() => {
                          setIndexSchedule(index);
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
                    itemSeeds.teams[1].team !== null ? (
                      <td>
                        {" "}
                        <Link
                          to={`/match/${itemSeeds.match.id}/matchDetail`}
                          state={{
                            hostTournamentId,
                            tourDetail,
                            index,
                            title: item.title,
                            dateValidate:
                              findMaxDate !== null &&
                              index + 1 < knockoutTeam.length
                                ? findMaxDate[index + 1]
                                : index + 1 == knockoutTeam.length
                                ? {
                                  ...findMaxDate[index],
                                  minDate: undefined
                                }
                                : null,
                          }}
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
            startDate={findStateDate()}
            endDate={findEndate()}
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
