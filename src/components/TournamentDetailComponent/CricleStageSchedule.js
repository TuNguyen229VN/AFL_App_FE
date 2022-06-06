import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingAction from "../LoadingComponent/LoadingAction";
export default function CricleStageSchedule(props) {
  const [allTeamA, setAllTeamA] = useState(null);
  const [allTeamB, setAllTeamB] = useState(null);
  const { allTeam, loading, hostTournamentId } = props;
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
      console.log(teamA)
    }
  }, [allTeam]);
  return (
    <table className="schedule__table">
      <tr>
        <th colSpan={5}>Bảng đấu vòng tròn</th>
      </tr>

      {loading ? (
        <LoadingAction />
      ) : allTeamA != null && allTeamB != null ? (
        allTeamA.map((item, index) => {
          return (
            <tr>
              <td>20-11-2021 11h30</td>
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
              {(item.teamId !== 0) && (allTeamB[index].teamId !== 0) ? (
                <td>
                  {" "}
                  <Link to={`/match/${item.match.id}/matchDetail`} state={{hostTournamentId}}>
                    Chi tiết
                  </Link>
                </td>
              ) :  <td></td>}
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
