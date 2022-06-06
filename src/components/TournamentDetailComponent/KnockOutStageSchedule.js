import React, { useState, useEffect } from "react";
import { Bracket, RoundProps } from "react-brackets";
import { Link } from "react-router-dom";
export default function KnockOutStageSchedule(props) {
  const { allTeam, typeView, hostTournamentId } = props;
  const [knockoutTeam, setKnoukoutTeam] = useState(null);
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
          roundCurrent = item.match.round;
          data.push({
            title: item.match.round,
            seeds: [
              {
                id: item.id,
                date: new Date().toDateString(),
                teams: [
                  {
                    name: item.teamName,
                    team: item.team,
                    teamResult: item.result,
                  },
                  {
                    name: allTeam[index + 1].teamName,
                    team: allTeam[index + 1].team,
                    teamResult: allTeam[index + 1].result,
                  },
                ],
              },
            ],
          });
        } else if (roundCurrent === item.match.round) {
          data[indexCurrent].seeds.push({
            id: item.id,
            date: new Date().toDateString(),
            teams: [
              { name: item.teamName, team: item.team, teamResult: item.result },
              {
                name: allTeam[index + 1].teamName,
                team: allTeam[index + 1].team,
                teamResult: allTeam[index + 1].result,
              },
            ],
          });
        } else {
          indexCurrent += 1;
          roundCurrent = item.match.round;
          data.push({
            title: item.match.round,
            seeds: [
              {
                id: item.id,
                date: new Date().toDateString(),
                teams: [
                  {
                    name: item.teamName,
                    team: item.team,
                    teamResult: item.result,
                  },
                  {
                    name: allTeam[index + 1].teamName,
                    team: allTeam[index + 1].team,
                    teamResult: allTeam[index + 1].result,
                  },
                ],
              },
            ],
          });
        }
      }
      //console.log(data);
    });
    if (typeView === "diagram") {
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
    }
    console.log(data);
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
      <Bracket rounds={rounds} />
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
              <th colSpan={5}>Bảng đấu trực tiếp - {item.title}</th>
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
                  {itemSeeds.teams[0].teamId !== 0 &&
                  itemSeeds.teams[1].teamId !== 0 ? (
                    <td>
                      {" "}
                      <Link to={`/match/${itemSeeds.id}/matchDetail`} state={{hostTournamentId}}>
                        Chi tiết
                      </Link>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </table>
        );
      })
    )
  ) : null;
}
