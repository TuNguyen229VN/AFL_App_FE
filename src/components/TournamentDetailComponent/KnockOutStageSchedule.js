import React, { useState, useEffect } from "react";
import { Bracket, RoundProps } from "react-brackets";

export default function KnockOutStageSchedule(props) {
  const { allTeam } = props;
  const [knockoutTeam, setKnoukoutTeam] = useState(null);
  useEffect(() => {
    if (allTeam != null) {
      devideRound();
    }
  },[]);

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
                  { name: item.teamName },
                  { name: allTeam[index + 1].teamName },
                ],
              },
            ],
          });
        } else if (roundCurrent === item.match.round) {
          console.log(indexCurrent);
          data[indexCurrent].seeds.push({
            id: item.id,
            date: new Date().toDateString(),
            teams: [
              { name: item.teamName },
              { name: allTeam[index + 1].teamName },
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
                  { name: item.teamName },
                  { name: allTeam[index + 1].teamName },
                ],
              },
            ],
          });
        }
      }
    });

    const nullTeamRoundOne = calcAllTeamRoundOne() - data[0].seeds.length;
    if (nullTeamRoundOne > 0) {
      let countI = 1;
      for (let i = 0; i < nullTeamRoundOne; i++) {
        data[0].seeds.splice(countI,0,{
          id: null,
          date: null,
          teams: [{ name: null }, { name: null }],
        });
        countI += 2;
      }
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

  return knockoutTeam !== null ? <Bracket rounds={rounds} /> : null;
}
