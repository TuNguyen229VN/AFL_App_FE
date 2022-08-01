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
    const myArr = date.split(" ");
      const day = myArr[0].split("/");
      const dateFormat = day[1]+"/"+day[0]+"/"+day[2];
       return dateFormat;
  }
  const formatTime = (date) => {
    const myArr = date.split(" ");
       return `${myArr[1]} ${myArr[2]}` ;
  }
  return (
    <>
      <div className="teamdetail__content schedule__tour prediction">
        <div className="wrap__table">
          <table className="schedule__table">
            <tr>
              <th colSpan={5}>Các trận đấu hôm nay</th>
            </tr>
            {match&&match.matchs.length>0&&match.matchs.map(match =>(<tr>
              <td>{formatDate(match.matchDate)} {formatTime(match.matchDate)}</td>
              <td>
               
                <img
                  src={match.teamInMatches[0].teamInTournament.team.teamAvatar}
                  alt="gallery_item"
                />
                 <p>{match.teamInMatches[0].teamName}</p>
              </td>
              <td>
                <span className="score">{match.teamInMatches[0].teamScore}</span>
                <span className="score"> - </span>
                <span className="score">{match.teamInMatches[1].teamScore}</span>
              </td>
              <td>
                <img
                  src={match.teamInMatches[1].teamInTournament.team.teamAvatar}
                  alt="gallery_item"
                />
               <p>{match.teamInMatches[1].teamName}{" "}</p>
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