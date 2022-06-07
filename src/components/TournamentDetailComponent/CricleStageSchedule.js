import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingAction from "../LoadingComponent/LoadingAction";
import { updateDateInMatchAPI } from "../../api/MatchAPI";
import ModalChangeDateInSchedule from "./ModelChangeDateInSchedule";
export default function CricleStageSchedule(props) {
  const [allTeamA, setAllTeamA] = useState(null);
  const [allTeamB, setAllTeamB] = useState(null);
  const [matchCurrent, setMatchCurrent] = useState(null);
  const [dateUpdate,setDateUpdate] = useState(null);
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
  } = props;
  useEffect(() => {
    if (allTeam !== null) {
      const teamB = [];
      const teamA = allTeam.reduce((accumulator, currentValue) => {
        if (currentValue.id % 2 === 1) {
          accumulator.push(currentValue);
        } else {
          teamB.push(currentValue);
        }
        return accumulator;
      }, []);
      setAllTeamA(teamA);
      setAllTeamB(teamB);
    }
  }, [allTeam]);

  const onChangHandle = (e) => {
    setDateUpdate(e.target.value);
  } 

  const updateDateInMatch = (dataMatch) => {
    const data = {
      ...dataMatch,
      matchDate: dateUpdate,
    }
    
    const response = updateDateInMatchAPI(data);
    response.then(res => {
      if(res.status === 201){
        setStatusUpdateDate(true);
      }
      
    }).catch(err =>{
      console.error(err);
    })
  }

  return (
    <table className="schedule__table">
      <tr>
        <th
          colSpan={
            user != undefined && user.userVM.id === hostTournamentId ? 7 : 6
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
            <tr>
              <td
                style={{
                  color: item.match.matchDate != null ? "black" : "red",
                }}
              >
                {item.match.matchDate != null
                  ? item.match.matchDate
                  : "Chưa cập nhật"}
              </td>
              {/* <td>{index + 1}</td> */}
              <td>
                {item.teamName}
                <img
                  src="/assets/img/homepage/banner1.jpg"
                  alt="gallery_item"
                />
              </td>
              <td>
                <span className="score">{item.teamScore}</span>
                <span className="score"> - </span>
                <span className="score">{allTeamB[index].teamScore}</span>
              </td>
              <td>
                <img
                  src="/assets/img/homepage/banner1.jpg"
                  alt="gallery_item"
                />
                {allTeamB[index].teamName}
              </td>
              <div className={hideShow ? "overlay active" : "overlay"}></div>
              {user != undefined && user.userVM.id === hostTournamentId ? (
                <td
                  onClick={() => {
                    setHideShow(true);
                    setMatchCurrent(item.match);
                    setStatusUpdateDate(false);
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
              ) : null}

              {item.teamId !== 0 && allTeamB[index].teamId !== 0 ? (
                <td>
                  {" "}
                  <Link
                    to={`/match/${item.match.id}/matchDetail`}
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
      {matchCurrent != null ?
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
      /> : null }
    </table>
  );
}
