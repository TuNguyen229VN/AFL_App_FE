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
  return type === null ? (
    <table className="schedule__table">
      <tr>
        <th
          colSpan={
            user != undefined && user.userVM.id === hostTournamentId ? 8 : 7
          }
        >
          Bảng đấu vòng tròn
        </th>
      </tr>

      {loading ? (
        <LoadingAction />
      ) : allTeamA != null && allTeamB != null ? (
        allTeamA.map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td
                style={{
                  color: item.match.matchDate != null ? "black" : "black",
                }}
              >
                {item.match.matchDate != null
                  ? changeDate(item.match.matchDate)
                  : "Chưa có lịch thi đấu"}
              </td>
              {/* <td>{index + 1}</td> */}
              {item.teamInTournament.team != null ? (
                <td>
                  <Link
                    to={`/teamDetail/${item.teamInTournament.team.id}/inforTeamDetail`}
                  >
                    <p>{item.teamName}</p>
                    {item.teamInTournament.team != null ? (
                      <img
                        src={item.teamInTournament.team.teamAvatar}
                        alt="gallery_item"
                      />
                    ) : null}
                  </Link>
                </td>
              ) : (
                <td>
                  <p>{item.teamName}</p>
                  {item.teamInTournament.team != null ? (
                    <img
                      src={item.teamInTournament.team.teamAvatar}
                      alt="gallery_item"
                    />
                  ) : null}
                </td>
              )}

              <td>
                <span className="score">
                  {item.teamScore !== null ? item.teamScore : 0}
                </span>
                <span className="score"> - </span>
                <span className="score">
                  {allTeamB[index].teamScore !== null
                    ? allTeamB[index].teamScore
                    : 0}
                </span>
              </td>
              {allTeamB[index].teamInTournament.team ? (
                <td>
                  {" "}
                  <Link
                    to={`/teamDetail/${allTeamB[index].teamInTournament.team.id}/inforTeamDetail`}
                  >
                    {allTeamB[index].teamInTournament.team != null ? (
                      <img
                        src={allTeamB[index].teamInTournament.team.teamAvatar}
                        alt="gallery_item"
                      />
                    ) : null}
                    <p>{allTeamB[index].teamName}</p>
                  </Link>{" "}
                </td>
              ) : (
                <td>
                  {allTeamB[index].teamInTournament.team != null ? (
                    <img
                      src={allTeamB[index].teamInTournament.team.teamAvatar}
                      alt="gallery_item"
                    />
                  ) : null}
                  <p>{allTeamB[index].teamName}</p>
                </td>
              )}

              {(user != undefined &&
                user.userVM.id === hostTournamentId &&
                new Date(endDate).getTime() > new Date().getTime() &&
                item.match.matchDate === null) ||
              (new Date(endDate).getTime() > new Date().getTime() &&
                new Date(item.match.matchDate).getTime() - 24 * 60 * 60 * 1000 >
                  new Date().getTime()) ? (
                <td
                  onClick={() => {
                    setHideShow(true);
                    setMatchCurrent(item.match);
                    setStatusUpdateDate(false);
                    setTeamInUpdate(
                      item.teamName + " - " + allTeamB[index].teamName
                    );
                  }}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontWeight: 700,
                    lineHeight: 1.6,
                  }}
                >
                  {item.match.matchDate != null ? "Chỉnh sửa " : "Cập nhật "}{" "}
                  ngày
                </td>
              ) : (
                <td></td>
              )}

              {item.teamInTournament.team !== null &&
              allTeamB[index].teamInTournament.team !== null ? (
                <td>
                  {" "}
                  {index === allTeamA.length - 1 ? (
                    <Link
                      to={`/match/${item.match.id}/matchDetail`}
                      state={{ hostTournamentId, tourDetail, index }}
                    >
                      Chi tiết
                    </Link>
                  ) : (
                    <Link
                      to={`/match/${item.match.id}/matchDetail`}
                      state={{ hostTournamentId, tourDetail, index: 0 }}
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
          startDate={startDate}
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
                      <img src={item.team.teamAvatar} alt="gallery_item" />
                    ) : null}
                  </Link>
                </td>
              ) : (
                <td>
                  <p>{item.teamName}</p>
                  {item.team != null ? (
                    <img src={item.team.teamAvatar} alt="gallery_item" />
                  ) : null}
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
