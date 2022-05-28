import { data } from "flickity";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getAPI } from "../../api";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LoadingAction from "../LoadingComponent/LoadingAction";
import Livestream from "./Livestream";
import MatchDetail from "./MatchDetail";
import styles from "./styles/style.module.css";
function Match() {
  const location = useLocation();
  const { idMatch } = useParams();
  const [allTeamA, setAllTeamA] = useState(null);
  const [allTeamB, setAllTeamB] = useState(null);
  const [tournamentID, setTournamentID] = useState(0);
  const [footballFeild, setFootballFeild] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenLivestream, setTokenLivestream] = useState("");
  const getMatch = () => {
    setLoading(true);
    let afterURL = `TeamInMatch/matchId?matchId=${idMatch}`;
    let response = getAPI(afterURL);
    response
      .then((res) => {
        console.log(res.data)
        const allMatch = res.data.teamsInMatch;
        const teamB = [];
        const teamA = allMatch.reduce((accumulator, currentValue) => {
          if (currentValue.id % 2 === 1) {
            accumulator.push(currentValue);
          } else {
            teamB.push(currentValue);
          }
          return accumulator;
        }, []);
        setAllTeamA(teamA);
        setAllTeamB(teamB);
        setTournamentID(res.data.teamsInMatch[0].match.tournamentId);
        setTokenLivestream(res.data.teamsInMatch[0].match.tokenLivestream);
        getTourDetail(res.data.teamsInMatch[0].match.tournamentId);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };


  const getTourDetail = async (id) => {
    let afterDefaultURL = `tournaments/${id}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setFootballFeild(res.data.footballFieldAddress);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getMatch();
  }, []);

  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);
  const renderByLink = () => {
    if (activeTeamDetail === `/match/${idMatch}/matchDetail`) {
      return (
        <MatchDetail
          allTeamA={allTeamA}
          allTeamB={allTeamB}
          footballFeild={footballFeild}
        />
      );
    }
    if (activeTeamDetail === `/match/${idMatch}/livestream`) {
      return <Livestream idMatch={idMatch} tokenLivestream={tokenLivestream}/>;
    }
  };

  const getStatusMatch = (matchStatus) => {
    if (matchStatus === "Not start") {
      return <p style={{ fontStyle: "italic" }}>Chưa diễn ra</p>;
    } else if (matchStatus === "Start") {
      return <p style={{ color: "green" }}>Đã diễn ra</p>;
    } else {
      return <p style={{ color: "red" }}>Đã kết thúc</p>;
    }
  };
  return (
    <>
      <Header />
      {loading ? <LoadingAction /> : null}
      <div className={styles.match}>
        <Link to={`findTournaments`} className={styles.linkBack}>
          Các giải đấu
        </Link>
        <span className={styles.sw}>{`>>`}</span>
        <Link
          to={`/tournamentDetail/${tournamentID}/scheduleTournamentDetail`}
          className={styles.linkBack}
        >
          Lịch thi đấu
        </Link>
        <span className={styles.sw}>{`>>`}</span>
        <Link to={`/match/${idMatch}/matchDetail`} className={styles.linkBack}>
          Trận đấu
        </Link>
        {allTeamA != null && allTeamB != null ? (
          <>
            <h2 className={styles.title}>Trận đấu</h2>
            <div className={styles.match__header}>
              {allTeamA.map((item, index) => (
                <div className={styles.sub__header}>
                  <div className={styles.header__text}>
                    <div className={styles.header__name}>
                      {item.match.fight}
                    </div>
                    <p className={styles.header__day}>30/04/2022 12:30</p>
                  </div>
                  <div className={styles.header__status}>
                    {getStatusMatch(item.match.status)}
                  </div>
                </div>
              ))}
              {allTeamA.map((item, index) => (
                <div className={styles.match__team}>
                  <div className={styles.logo}>
                    <img src={item.team.teamAvatar} alt={item.teamName} />
                    <h2>{item.teamName}</h2>
                  </div>
                  <div className={styles.score__A}>{item.teamScore}</div>
                  <div className={styles.line}>-</div>
                  <div className={styles.score__B}>
                    {allTeamB[index].teamScore}
                  </div>
                  <div className={styles.logo}>
                    <img
                      src={allTeamB[index].team.teamAvatar}
                      alt={allTeamB[index].teamName}
                    />
                    <h2>{allTeamB[index].teamName}</h2>
                  </div>
                </div>
              ))}
              <div className={styles.player__score}>
                <div className={styles.player__A}>
                  <p>
                    Peter Pan
                    <span>33'</span>
                    <span>65'</span>
                  </p>
                  <p>
                    Tommy Tèo
                    <span>33'</span>
                  </p>
                  <p>
                    Thay giao ba
                    <span>33'</span>
                  </p>
                </div>
                <div className={styles.logo__ball}>
                  <img src="/assets/icons/soccer-ball-retina.png" alt="ball" />
                </div>
                <div className={styles.player__B}>
                  <p>
                    Chipu
                    <span>33'</span>
                    <span>65'</span>
                  </p>
                  <p>
                    Tommy Tèo
                    <span>33'</span>
                  </p>
                  <p>
                    Thay giao ba
                    <span>33'</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.match__menu}>
              <Link
                to={`/match/${idMatch}/matchDetail`}
                className={
                  activeTeamDetail === `/match/${idMatch}/matchDetail`
                    ? styles.active
                    : ""
                }
                onClick={() => setActiveTeamDetail(`/match/${idMatch}/matchDetail`)}
              >
                Thống kê
              </Link>
              <Link
                to={`/match/${idMatch}/livestream`}
                className={
                  activeTeamDetail === `/match/${idMatch}/livestream`
                    ? styles.active
                    : ""
                }
                onClick={() => setActiveTeamDetail(`/match/${idMatch}/livestream`)}
              >
                Livestream
              </Link>
            </div>
            {renderByLink()}
          </>
        ) : (
          <p className={styles.error}>Trận đấu này không tồn tại</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Match;
