import React,{ useEffect, useState } from "react";
import styles from "./styles/style.module.css";
import { Link } from "react-router-dom";
import LoadingAction from "../LoadingComponent/LoadingAction";
import axios from "axios";
import { useParams } from "react-router-dom";
function AchivementInPlayer() {

  const { idPlayer } = useParams();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statistic, setStatistic] = useState({});
  const [champion, setChampion] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [third, setThird] = useState(0);

  useEffect(() => {
    getResult();
  },[])

  const getResult =async () =>{
    try{
      setLoading(true);
      let one = 0;
      let two = 0;
      let three = 0;
      const response =  await axios.get(`https://afootballleague.ddns.net/api/v1/tournament-results?footballPlayerId=${idPlayer}&page-offset=1&limit=5`)
      for(let i = 0; i < response.data.tournamentResults.length;i++){
        if(response.data.tournamentResults[i].prize == "Champion"){
            one+=1
        }
        if(response.data.tournamentResults[i].prize == "second"){
          two+=1
      }
      if(response.data.tournamentResults[i].prize == "third"){
        three+=1
    }
      }
      console.log(response.data.tournamentResults)
      setChampion(one);
      setSeconds(two);
      setThird(three);
      setResult(response.data.tournamentResults);
      setLoading(false);
    }
    catch(err){
      setLoading(false);
    }
  }


  return (
    <div className={styles.achievementTournamnet}>
      <p className={styles.titleAchieve}>Thành tích Cá nhân</p>
      <div className={`${styles.wrapcontent} ${styles.wrapcontentflex}`}>
        <div className={styles.content_item}>
          <img
            src="/assets/icons/one.png"
            alt="one"
            className={styles.achiveImg}
          />
          <p>Vô địch:</p>
          <p>{champion}</p>
        </div>
        <div className={styles.content_item}>
          <img
            src="/assets/icons/second.png"
            alt="one"
            className={styles.achiveImg}
          />
          <p>Á quân:</p>
          <p>{seconds}</p>
        </div>
        <div className={styles.content_item}>
          <img
            src="/assets/icons/three.png"
            alt="one"
            className={styles.achiveImg}
          />
          <p>Hạng ba:</p>
          <p>{third}</p>
        </div>
      </div>
      <p className={`${styles.titleAchieve}`}>Chi tiết từng giải đấu</p>
      <div className={styles.wrapcontent}>
        <table className={styles.tableAchieve}>
          <tr>
            <th>#</th>
            <th>
              Tên giải
            </th>
            <th>Thành tích</th>
          </tr>
          { result.length>0&&result.map((item, index) =>(
          <>
          {item.prize!= "Top Goal"&&
          <tr>
            <td>{index + 1}</td>
            <td>
              {/* <a href="#" className={styles.tableTeamName}>
                <img
                  src="/assets/img/homepage/tourn2.png"
                  alt="tour"
                  className={styles.avt}
                />
                <p>Peter Tèo</p>
              </a> */}
              <Link className={styles.tableTeamName}
                        to={`/tournamentDetail/${item.tournamentId}/achievementTournamentDetail`}
                      >
                       <img
                  src={item.tournament.tournamentAvatar}
                  alt="tour"
                  className={styles.avt}
                />
               <p>{item.tournament.tournamentName}</p>
                      </Link>
            </td>
            <td>
              <p>{item.prize == "Champion"?"Vô địch":""}{item.prize == "second"?"Hạng nhì":""}{item.prize == "thỉd"?"Hạng ba":""}</p>
            </td>
          </tr>}
          </>
          ))}
        </table>
      </div>
      <p className={`${styles.titleAchieve} ${styles.titleAchieve1}`}>
        Vua phá lưới
      </p>
      <div className={styles.wrapcontent}>
        <table className={styles.tableAchieve}>
          <tr>
            <th>#</th>
            <th>Giải tham gia</th>
            <th>Cầu thủ</th>
            <th>Số áo</th>
            <th>Đội thi đấu</th>
            <th>Số bàn ghi được</th>
          </tr>
          { result.length>0&&result.map((item, index) =>(
          <>
            {item.prize== "Top Goal"&&<tr>
            <td>{index+1}</td>
            <td>
              {/* <a href="#" className={styles.tableTeamName}>
                <img
                  src="/assets/img/homepage/tourn2.png"
                  alt="tour"
                  className={styles.avt}
                />
                <p>Vui hè</p>
              </a> */}
              <Link className={styles.tableTeamName}
                        to={`/tournamentDetail/${item.tournamentId}/achievementTournamentDetail`}
                      >
                       <img
                  src={item.tournament.tournamentAvatar}
                  alt="tour"
                  className={styles.avt}
                />
               <p>{item.tournament.tournamentName}</p>
                      </Link>
            </td>
            <td>
              <a href="#">{item.footballPlayer.playerName}</a>
            </td>
            <td className={styles.tablePlayerName}>
              <img
                src={item.footballPlayer.playerAvatar}
                alt="tour"
                className={styles.avt}
              />
              <p>{item.clothesNumber}</p>
            </td>
            <td>
              {/* <a href="#">FC Hà Nội</a> */}
              <Link
                        to={`/teamDetail/${item.team.id}/inforTeamDetail`}
                      >
                      {item.team.teamName}
                      </Link>
            </td>
            <td>{item.totalWinScrore}</td>
          </tr>}
          </>
          ))}
        </table>
      </div>
      {loading ? <LoadingAction /> : null}
    </div>
  );
}

export default AchivementInPlayer;
