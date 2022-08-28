import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/style.module.css";
import { Link } from "react-router-dom";
import LoadingAction from "../LoadingComponent/LoadingAction";
import { getTeamPaticaipateInTourByTourIDAPI } from "../../api/TeamInTournamentAPI";
function AchievementTournamnetDetail(props) {
  const { tour, team, player, idTour, idTeam, idPlayer } = props;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [teamInTour, setTeamInTour] = useState([]);
  const [topGoal, setTopGoal] = useState([]);
  useEffect(() => {
    getTeamInTour();
    getResult();
  }, []);

  const getTeamInTour = () => {
    const response = getTeamPaticaipateInTourByTourIDAPI(idTour);
    response
      .then((res) => {
        setTeamInTour(res.data.teamInTournaments);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getResult = async () => {
    try {
      setLoading(true);
      let query = "";
      if (idTour > 0 || idTour != undefined || idTour != null) {
        query = "tournamentId=";
      }
      if (idTeam > 0 || idTeam != undefined || idTeam != null) {
        query = "teamId=";
      }
      if (idPlayer > 0 || idPlayer != undefined || idPlayer != null) {
        query = "footballPlayerId=";
      }
      const response = await axios.get(
        `https://afootballleague.ddns.net/api/v1/tournament-results?${query}${idTour}&page-offset=1&limit=5`
      );

      let listScore = [];
      for (let i = 0; i < response.data.tournamentResults.length; i++) {
        if (response.data.tournamentResults[i].prize == "Top Goal") {
          listScore.push(response.data.tournamentResults[i]);
        }
      }
      setTopGoal(listScore);
      setResult(response.data.tournamentResults);
      console.log(response.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div className={styles.achievementTournamnet}>
      <p className={styles.titleAchieve}>Thành tích giải đấu</p>
      <div className={`${styles.wrapcontent} ${styles.wrapcontentflex}`}>
        {result.length <= 0 ? (
          <div className={styles.content_item}>
            <span style={{ textAlign: "center", fontSize: "18px" }}>
              Chưa có thông tin cụ thể
            </span>
          </div>
        ) : null}
        {result.length > 0 && result[0].prize == "Champion" ? (
          <div className={styles.content_item}>
            <img
              src="/assets/icons/one.png"
              alt="one"
              className={styles.achiveImg}
            />
            <p>Vô địch:</p>
            <img
              src={result[0].team.teamAvatar}
              alt="tour"
              className={styles.avt}
            />
            {/* <a href="#">{result[0].team.teamName}</a> */}
            <Link to={`/teamDetail/${result[0].team.id}/inforTeamDetail`}>
              {result[0].team.teamName}
            </Link>
          </div>
        ) : (
          ""
        )}
        {result.length > 0 && result[1].prize == "second" ? (
          <div className={styles.content_item}>
            <img
              src="/assets/icons/second.png"
              alt="one"
              className={styles.achiveImg}
            />
            <p>Á quân:</p>
            <img
              src={result[1].team.teamAvatar}
              alt="tour"
              className={styles.avt}
            />
            {/* <a href="#">{result[1].team.teamName}</a> */}
            <Link to={`/teamDetail/${result[1].team.id}/inforTeamDetail`}>
              {result[1].team.teamName}
            </Link>
          </div>
        ) : (
          ""
        )}
        {result.length > 0 && result[2].prize == "third" ? (
          <div className={styles.content_item}>
            <img
              src="/assets/icons/three.png"
              alt="one"
              className={styles.achiveImg}
            />
            <p>Hạng ba:</p>
            <img
              src={result[2].team.teamAvatar}
              alt="tour"
              className={styles.avt}
            />
            {/* <a href="#">{result[2].team.teamName}</a> */}
            <Link to={`/teamDetail/${result[2].team.id}/inforTeamDetail`}>
              {result[2].team.teamName}
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <p className={styles.titleAchieve}>Vua phá lưới</p>
      <div className={styles.wrapcontent}>
        <table className={styles.tableAchieve}>
          <tr>
            <th>#</th>
            <th>Cầu thủ</th>
            <th>Số áo</th>
            <th>Đội thi đấu</th>
            <th>Số bàn ghi được</th>
          </tr>
          {topGoal.length <= 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                Chưa có thông tin cụ thể
              </td>
            </tr>
          ) : null}
          {topGoal.length > 0 &&
            topGoal.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  {/* <a href="#">{item.footballPlayer.playerName}</a> */}
                  <Link
                    to={`/playerDetail/${item.footballPlayer.id}/myTournamentInPlayer`}
                  >
                    {item.footballPlayer.playerName}
                  </Link>
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
                  <a href="#">{item.team.teamName}</a>
                </td>
                <td>{item.totalWinScrore}</td>
              </tr>
            ))}
        </table>
      </div>
      <p className={`${styles.titleAchieve} ${styles.titleAchieve1}`}>
        Thống kê từng đội
      </p>
      <div className={styles.wrapcontent}>
        <table className={styles.tableAchieve}>
          <tr>
            <th>#</th>
            <th>Tên đội</th>
            <th>T-H-B</th>
            <th>Số bàn thắng</th>
            <th>Số bàn thua</th>
            <th>Thẻ vàng</th>
            <th>Thẻ đỏ</th>
          </tr>
          {teamInTour.length <= 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                Chưa có thông tin cụ thể
              </td>
            </tr>
          ) : null}
          {teamInTour.length > 0 &&
            teamInTour.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <Link
                    className={styles.tableTeamName}
                    to={`/teamDetail/${item.team.id}/inforTeamDetail`}
                  >
                    <img
                      src={item.team.teamAvatar}
                      alt="tour"
                      className={styles.avt}
                    />
                    <p>{item.team.teamName}</p>
                  </Link>
                  {/* <a href="#" className={styles.tableTeamName}>
                <img
                  src={item.team.teamAvatar}
                  alt="tour"
                  className={styles.avt}
                />
                <p>{item.team.teamName}</p>
              </a> */}
                </td>
                <td>
                  <p>
                    {item.numberOfWin}-{item.numberOfDraw}-{item.numberOfLose}
                  </p>
                </td>
                <td>{item.winScoreNumber}</td>
                <td>{item.loseScoreNumber}</td>
                <td>{item.totalYellowCard}</td>
                <td>{item.totalRedCard}</td>
              </tr>
            ))}
        </table>
      </div>
      {loading ? <LoadingAction /> : null}
    </div>
  );
}

export default AchievementTournamnetDetail;
