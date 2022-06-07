import React, { useState, useEffect } from "react";
import { Bracket, RoundProps } from "react-brackets";
import { Link } from "react-router-dom";
import ModalChangeDateInSchedule from "./ModelChangeDateInSchedule";
export default function KnockOutStageSchedule(props) {
  const {
    allTeam,
    typeView,
    hostTournamentId,
    tournamentType,
    groupNumber,
    hideShow,
    setHideShow,
  } = props;
  const [knockoutTeam, setKnoukoutTeam] = useState(null);
  const [matchCurrent,setMatchCurrent] = useState(null);
 
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
          roundCurrent = item.match.groupFight;
          data.push({
            title: item.match.groupFight,
            seeds: [
              {
                id: item.id,
                date: new Date().toDateString(),
                match: item.match,
                teams: [
                  {
                    name: item.teamName,
                    team: item.team,
                    teamResult: item.result,
                    teamId: item.teamId,
                  },
                  {
                    name: allTeam[index + 1].teamName,
                    team: allTeam[index + 1].team,
                    teamResult: allTeam[index + 1].result,
                    teamId: allTeam[index + 1].teamId,
                  },
                ],
              },
            ],
          });
        } else if (roundCurrent === item.match.groupFight) {
          data[indexCurrent].seeds.push({
            id: item.id,
            date: new Date().toDateString(),
            match: item.match,
            teams: [
              {
                name: item.teamName,
                team: item.team,
                teamResult: item.result,
                teamId: item.teamId,
              },
              {
                name: allTeam[index + 1].teamName,
                team: allTeam[index + 1].team,
                teamResult: allTeam[index + 1].result,
                teamId: allTeam[index + 1].teamId,
              },
            ],
          });
        } else {
          indexCurrent += 1;
          roundCurrent = item.match.groupFight;
          data.push({
            title: item.match.groupFight,
            seeds: [
              {
                id: item.id,
                match: item.match,
                date: new Date().toDateString(),
                teams: [
                  {
                    name: item.teamName,
                    team: item.team,
                    teamResult: item.result,
                    teamId: item.teamId,
                  },
                  {
                    name: allTeam[index + 1].teamName,
                    team: allTeam[index + 1].team,
                    teamResult: allTeam[index + 1].result,
                    teamId: allTeam[index + 1].teamId,
                  },
                ],
              },
            ],
          });
        }
      }
      console.log(data);
    });
    if (typeView === "diagram" && tournamentType != "GroupStage") {
      const nullTeamRoundOne = calcAllTeamRoundOne() - data[0].seeds.length;
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
    setKnoukoutTeam(data);
  };

  const calcAllTeamRoundOne = () => {
    if (allTeam.length > 8) {
      return 8;
    } else if (allTeam.length > 4) {
      return 4;
    } else return 2;
  };

  const rounds = knockoutTeam != null ? [...knockoutTeam] : null;

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
      knockoutTeam.map((item, index) => {
        return (
          <table
            style={{
              marginBottom: 50,
            }}
            key={index}
            className="schedule__table"
          >
            <tr>
              <th colSpan={7}>Bảng đấu trực tiếp - {item.title}</th>
            </tr>
            {item.seeds.map((itemSeeds, indexSeeds) => {
              return (
                <tr key={indexSeeds}>
                  <td>{itemSeeds.date}</td>
                  {/* <td>{index + 1}</td> */}
                  <td>
                    {itemSeeds.teams[0].name}
                    <img
                      src="/assets/img/homepage/banner1.jpg"
                      alt="gallery_item"
                    />
                  </td>
                  <td>
                    <span className="score">0</span>
                    <span className="score"> - </span>
                    <span className="score">0</span>
                  </td>
                  <td>
                    <img
                      src="/assets/img/homepage/banner1.jpg"
                      alt="gallery_item"
                    />
                    {itemSeeds.teams[1].name}
                  </td>
                  
                  <div
                    className={hideShow ? "overlay active" : "overlay"}
                  ></div>
                  <td
                    onClick={() => {
                      setHideShow(true);
                      setMatchCurrent(itemSeeds.match);
                    }}
                  >
                    Cập nhật ngày
                  </td>
                  {itemSeeds.teams[0].teamId !== 0 &&
                  itemSeeds.teams[1].teamId !== 0 ? (
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
            <ModalChangeDateInSchedule hideShow={hideShow} setHideShow={setHideShow} />
          </table>
        );
      })
    )
  ) : null;
}
