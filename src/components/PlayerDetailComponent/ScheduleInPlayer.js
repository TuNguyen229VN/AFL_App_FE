import React, { useState, useEffect } from 'react'
import { Link,useParams  } from "react-router-dom";
import Loading from "../LoadingComponent/Loading";
import { getAPI } from "../../api";
function ScheduleInPlayer() {
  const [loading, setLoading] = useState(false);
  const { idPlayer } = useParams();
  const [match, setMatch] = useState(); 
  useEffect(()=>{
    getAllMatch();
  },[]);

  const getAllMatch = () => {
    setLoading(true);
    const afterURL = `matchs/TournamentID?footballPlayerID=${idPlayer}`;
    const response = getAPI(afterURL);
    response
      .then((res) => {
        setMatch(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDate = (date) => {
    const myArr = date.split("T");
      const day = myArr[0].split("-").reverse();
       return day.join("/");
  }
  const formatTime = (date) => {
    const myArr = date.split("T");
      const day = myArr[1].split(".");
      const time = day[0].split(":");
       return time[0]+"h"+time[1];
  }
  return (
    <>
      <div className="teamdetail__content schedule__tour prediction">
        <div className="wrap__table">
          <table className="schedule__table">
            <tr>
              <th colSpan={5}>Các trận đấu hôm nay</th>
            </tr>
            {match&&match.matchs.map(match =>(<tr>
              <td>{formatDate(match.matchDate)} {formatTime(match.matchDate)}</td>
              <td>
                {match.teamInMatches[0].teamName}
                <img
                  src={match.teamInMatches[0].team.teamAvatar}
                  alt="gallery_item"
                />
              </td>
              <td>
                <span className="score">{match.teamInMatches[0].teamScore}</span>
                <span className="score"> - </span>
                <span className="score">{match.teamInMatches[1].teamScore}</span>
              </td>
              <td>
                <img
                  src={match.teamInMatches[1].team.teamAvatar}
                  alt="gallery_item"
                />
               {match.teamInMatches[1].teamName}{" "}
              </td>
              <td>
              {" "}
              <Link  to={`/tournamentDetail/${match.tournamentId}/inforTournamentDetail`} style={{width:"130px"}}>Đến giải đấu</Link>
            </td>
            </tr>))}
          </table>
        </div>
      </div>
    </>
  );
}

export default ScheduleInPlayer