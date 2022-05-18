import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Livestream from "./Livestream";
import MatchDetail from "./MatchDetail";
import styles from "./styles/style.module.css";
function Match() {
  const location = useLocation();
  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);
    console.log(activeTeamDetail)
  const renderByLink = () => {
    if (activeTeamDetail === `/match/1/matchDetail`) {
      return <MatchDetail />;
    }
    if (activeTeamDetail === `/match/1/livestream`) {
      return <Livestream />;
    }
  };
  return (
    <>
      <Header />
      <div className={styles.match}>
        <h2 className={styles.title}>Trận đấu</h2>
        <div className={styles.match__header}>
          <div className={styles.sub__header}>
            <div className={styles.header__text}>
              <div className={styles.header__name}>Giải vô địch TBN</div>
              <p className={styles.header__day}>30/04/2022 12:30</p>
            </div>
            <div className={styles.header__status}>Sắp diễn ra</div>
          </div>
          <div className={styles.match__team}>
            <div className={styles.logo}>
              <img src="/assets/img/homepage/team2.png" alt="img" />
              <h2>Đội A</h2>
            </div>
            <div className={styles.score__A}>4</div>
            <div className={styles.line}>-</div>
            <div className={styles.score__B}>0</div>
            <div className={styles.logo}>
              <img src="/assets/img/homepage/team1.png" alt="img" />
              <h2>Đội B</h2>
            </div>
          </div>
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
            to={`/match/1/matchDetail`}
            className={
              activeTeamDetail === `/match/1/matchDetail` ? styles.active : ""
            }
            onClick={() => setActiveTeamDetail(`/match/1/matchDetail`)}
          >
            Thống kê
          </Link>
          <Link
            to={`/match/1/livestream`}
            className={
              activeTeamDetail === `/match/1/livestream` ? styles.active : ""
            }
            onClick={() => setActiveTeamDetail(`/match/1/livestream`)}
          >
            Livestream
          </Link>
        </div>
        {renderByLink()}
      </div>
      <Footer />
    </>
  );
}

export default Match;
