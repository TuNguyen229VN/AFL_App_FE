import React,{ useEffect, useState } from "react";
import "./styles/style.css";
import styles from "./styles/style.module.css";
import { Link } from "react-router-dom";
import LoadingAction from "../LoadingComponent/LoadingAction";
import axios from "axios";
import { useParams } from "react-router-dom";
function ReportTeamDetail() {

  const { idTeam } = useParams();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statistic, setStatistic] = useState({});
  const [champion, setChampion] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [third, setThird] = useState(0);
  useEffect(() => {
    getStatistic();
    getResult();
  },[])

  const getResult =async () =>{
    try{
      setLoading(true);
      let one = 0;
      let two = 0;
      let three = 0;
      const response =  await axios.get(`https://afootballleague.ddns.net/api/v1/tournament-results?teamId=${idTeam}&page-offset=1&limit=5`)
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

  const getStatistic = async () =>{
    try{
      const response = await axios.get(`https://afootballleague.ddns.net/api/v1/TeamInMatch/Result?teamId=${idTeam}`);
      setStatistic(response.data);
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <>     
      <div className="teamdetail__content reportTeam">
        <div className="archivement">
          <h2 className="archivement__title">Giải thưởng</h2>
          <div className="archivement__list">
            <div className="archivement__item">
              <p className="archivement__name">Giải nhất</p>
              <img src="/assets/img/teamdetail/gold-cup.png" alt="1"></img>
              <p className="archivement__number">{champion}</p>
            </div>
            <div className="archivement__item">
              <p className="archivement__name">Giải nhì</p>
              <img src="/assets/img/teamdetail/silver-cup.png" alt="2"></img>
              <p className="archivement__number">{seconds}</p>
            </div>
            <div className="archivement__item">
              <p className="archivement__name">Giải ba</p>
              <img src="/assets/img/teamdetail/bronze-cup.png" alt="3"></img>
              <p className="archivement__number">{third}</p>
            </div>
          </div>
        </div>
        <div className="match">
          <h2 className="match__title">Trận đấu</h2>
          <div className="match__list">
            <div className="match__item">
              <p className="match__name">Tổng số trận</p>
              <img src="/assets/img/teamdetail/match.png" alt="1"></img>
              <p className="match__number">{statistic&&statistic.totalMatch}</p>
            </div>
            <div className="match__item">
              <p className="match__name">Số trận thắng</p>
              <img src="/assets/img/teamdetail/winning.png" alt="1"></img>
              <p className="match__number">{statistic&&statistic.totalWin}</p>
            </div>
            <div className="match__item">
              <p className="match__name">Số trận hòa</p>
              <img src="/assets/img/teamdetail/win.png" alt="1"></img>
              <p className="match__number">{statistic&&statistic.totalLose}</p>
            </div>
            <div className="match__item">
              <p className="match__name">Số trận thua</p>
              <img src="/assets/img/teamdetail/exhausted-man.png" alt="1"></img>
              <p className="match__number">{statistic&&statistic.totalDraw}</p>
            </div>
          </div>
        </div>
        <p className={`${styles.titleAchieve} ${styles.titleAchieve1}`}>
        Thống kê chi tiết từng giải
      </p>
      <div className={styles.wrapcontent}>
        <table className={styles.tableAchieve}>
          <tr>
            <th>#</th>
            <th>
              Tên giải <i class="fa-solid fa-sort"></i>
            </th>
            <th>
              Thành tích
            </th>
            <th>
              T-H-B <i class="fa-solid fa-sort"></i>
            </th>
            <th>
              Số bàn thắng <i class="fa-solid fa-sort"></i>
            </th>
            <th>
              Số bàn thua <i class="fa-solid fa-sort"></i>
            </th>
            <th>
              Thẻ vàng <i class="fa-solid fa-sort"></i>
            </th>
            <th>
              Thẻ đỏ <i class="fa-solid fa-sort"></i>
            </th>
          </tr>
         { result.length>0&&result.map((item, index) =>(
          <tr>
            <td>{index + 1}</td>
            <td>
                
                <Link className={styles.avt}
                        to={`/tournamentDetail/${item.tournament.id}/achievementTournamentDetail`}
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
            <td>
              <p>{item.totalWinMatch}-{item.totalDrawMatch}-{item.totalLoseMatch}</p>
            </td>
            <td>{item.totalWinScrore}</td>
            <td>0</td>
            <td>{item.totalYellowCard}</td>
            <td>{item.totalRedCard}</td>
          </tr>))
}
        </table>
      </div>
      {loading ? <LoadingAction /> : null}
      </div>
    </>
  );
}

export default ReportTeamDetail;
