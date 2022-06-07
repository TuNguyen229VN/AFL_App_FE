import axios from "axios";
import { data } from "flickity";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAPI } from "../../api";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LoadingAction from "../LoadingComponent/LoadingAction";
import Livestream from "./Livestream";
import MatchDetail from "./MatchDetail";
import styles from "./styles/style.module.css";
function Match() {
  const location = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  // location.state.hostTournamentId
  const { idMatch } = useParams();
  const [allTeamA, setAllTeamA] = useState(null);
  const [allTeamB, setAllTeamB] = useState(null);
  const [tournamentID, setTournamentID] = useState(0);
  const [footballFeild, setFootballFeild] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenLivestream, setTokenLivestream] = useState("");
  const [check, setCheck] = useState(false);

  const [popupUpdateMatch, setPopupUpdateMatch] = useState(false);

  const [scoreTeamA, setScoreTeamA] = useState({ value: 0, error: "" });
  const [scoreTeamB, setScoreTeamB] = useState({ value: 0, error: "" });
  const [redTeamA, setRedTeamA] = useState({ value: 0, error: "" });
  const [redTeamB, setRedTeamB] = useState({ value: 0, error: "" });
  const [yellowTeamA, setYellowTeamA] = useState({ value: 0, error: "" });
  const [yellowTeamB, setYellowTeamB] = useState({ value: 0, error: "" });
  const getMatch = () => {
    setLoading(true);
    let afterURL = `TeamInMatch/matchId?matchId=${idMatch}`;
    let response = getAPI(afterURL);
    response
      .then((res) => {
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
        setScoreTeamA({ value: res.data.teamsInMatch[0].teamScore });
        setScoreTeamB({ value: res.data.teamsInMatch[1].teamScore });
        setRedTeamA({ value: res.data.teamsInMatch[1].redCardNumber });
        setRedTeamB({ value: res.data.teamsInMatch[1].redCardNumber });
        setYellowTeamA({ value: res.data.teamsInMatch[1].yellowCardNumber });
        setYellowTeamB({ value: res.data.teamsInMatch[1].yellowCardNumber });
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
  }, [check]);

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
      return <Livestream idMatch={idMatch} tokenLivestream={tokenLivestream} />;
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

  const formatDateTime = (date) => {
    const day = new Date(date);
    return (
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear() +
      " " +
      String(day.getHours()).padStart(2, "0") +
      ":" +
      String(day.getMinutes()).padStart(2, "0")
    );
  };

  const updateTeamA = async (
    id,
    teamId,
    teamName,
    matchId,
    idB,
    teamBId,
    teamNameB
  ) => {
    setLoading(true);
    if (
      scoreTeamA.value === null ||
      scoreTeamA.value === "" ||
      redTeamA.value === null ||
      redTeamA.value === "" ||
      yellowTeamA.value === "" ||
      yellowTeamA.value === ""
    ) {
      toast.error("Không được để trống", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    } else if (
      scoreTeamA.value < 0 ||
      redTeamA.value < 0 ||
      yellowTeamA.value < 0
    ) {
      toast.error("Số lớn hơn hoặc bằng 0", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }
    const data = {
      id: id,
      teamScore: scoreTeamA.value,
      yellowCardNumber: yellowTeamA.value,
      redCardNumber: redTeamA.value,
      teamId: teamId,
      matchId: matchId,
      result: "",
      nextTeam: "",
      teamName: teamName,
    };
    console.log(id);
    try {
      const response = await axios.put(
        "https://afootballleague.ddns.net/api/v1/TeamInMatch",
        data
      );
      if (response.status === 200) {
        await updateTeamB(idB, teamBId, teamNameB, matchId);
      }
    } catch (error) {
      setLoading(false);
      setCheck(!check);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };
  const updateTeamB = async (id, teamId, teamName, matchId) => {
    setLoading(true);
    if (
      scoreTeamB.value === null ||
      scoreTeamB.value === "" ||
      redTeamB.value === null ||
      redTeamB.value === "" ||
      yellowTeamB.value === "" ||
      yellowTeamB.value === ""
    ) {
      toast.error("Không được để trống", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    } else if (
      scoreTeamB.value < 0 ||
      redTeamB.value < 0 ||
      yellowTeamB.value < 0
    ) {
      toast.error("Số lớn hơn hoặc bằng 0", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }
    const data = {
      id: id,
      teamScore: scoreTeamB.value,
      yellowCardNumber: yellowTeamB.value,
      redCardNumber: redTeamB.value,
      teamId: teamId,
      matchId: matchId,
      teamName: teamName,
    };
    try {
      const response = await axios.put(
        "https://afootballleague.ddns.net/api/v1/TeamInMatch",
        data
      );
      if (response.status === 200) {
        setPopupUpdateMatch(false);
        setLoading(false);
        setCheck(!check);
        toast.success("Cập nhật thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };

  const updateMatch = async (
    e,
    matchId,
    teamAId,
    teamBId,
    idA,
    idB,
    teamNameA,
    teamNameB
  ) => {
    e.preventDefault();
    await updateTeamA(
      idA,
      teamAId,
      teamNameA,
      matchId,
      idB,
      teamBId,
      teamNameB
    );
  };

  const validateForm = (name, value) => {
    switch (name) {
      case "scoreTeamA":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        } else if (value < 0) {
          return {
            flag: false,
            content: "*Số lớn hơn bằng 0",
          };
        }
        break;
      case "scoreTeamB":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        } else if (value < 0) {
          return {
            flag: false,
            content: "*Số lớn hơn bằng 0",
          };
        }
        break;
      case "redTeamA":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        } else if (value < 0) {
          return {
            flag: false,
            content: "*Số lớn hơn bằng 0",
          };
        }
        break;
      case "readTeamB":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        } else if (value < 0) {
          return {
            flag: false,
            content: "*Số lớn hơn bằng 0",
          };
        }
        break;
      case "yellowTeamA":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        } else if (value < 0) {
          return {
            flag: false,
            content: "*Số lớn hơn bằng 0",
          };
        }
        break;
      case "yellowTeamB":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        } else if (value < 0) {
          return {
            flag: false,
            content: "*Số lớn hơn bằng 0",
          };
        }
        break;
      default:
        break;
    }

    return { flag: true, content: null };
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const flagValid = validateForm(name, value);
    switch (name) {
      case "scoreTeamA":
        let scoreTeamA = null;
        if (flagValid.flag === false) {
          scoreTeamA = {
            value,
            error: flagValid.content,
          };
        } else {
          scoreTeamA = {
            value,
            error: null,
          };
        }
        setScoreTeamA({
          ...scoreTeamA,
        });
        break;
      case "scoreTeamB":
        let scoreTeamB = null;
        if (flagValid.flag === false) {
          scoreTeamB = {
            value,
            error: flagValid.content,
          };
        } else {
          scoreTeamB = {
            value,
            error: null,
          };
        }
        setScoreTeamB({
          ...scoreTeamB,
        });
        break;
      case "redTeamA":
        let redTeamA = null;
        if (flagValid.flag === false) {
          redTeamA = {
            value,
            error: flagValid.content,
          };
        } else {
          redTeamA = {
            value,
            error: null,
          };
        }
        setRedTeamA({
          ...redTeamA,
        });
        break;
      case "redTeamB":
        let redTeamB = null;
        if (flagValid.flag === false) {
          redTeamB = {
            value,
            error: flagValid.content,
          };
        } else {
          redTeamB = {
            value,
            error: null,
          };
        }
        setRedTeamB({
          ...redTeamB,
        });
        break;
      case "yellowTeamA":
        let yellowTeamA = null;
        if (flagValid.flag === false) {
          yellowTeamA = {
            value,
            error: flagValid.content,
          };
        } else {
          yellowTeamA = {
            value,
            error: null,
          };
        }
        setYellowTeamA({
          ...yellowTeamA,
        });
        break;
      case "yellowTeamB":
        let yellowTeamB = null;
        if (flagValid.flag === false) {
          yellowTeamB = {
            value,
            error: flagValid.content,
          };
        } else {
          yellowTeamB = {
            value,
            error: null,
          };
        }
        setYellowTeamB({
          ...yellowTeamB,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header />
      {loading ? <LoadingAction /> : null}
      <div
        className={popupUpdateMatch ? `overlay active` : "active"}
        onClick={() => {
          setPopupUpdateMatch(false);
        }}
      ></div>
      {allTeamA != null &&
        allTeamB != null &&
        allTeamA.map((item, index) => (
          <form
            className={
              popupUpdateMatch
                ? `${styles.popup__news} ${styles.active}`
                : styles.popup__news
            }
            onSubmit={(event) => {
              updateMatch(
                event,
                idMatch,
                item.teamId,
                allTeamB[index].teamId,
                item.id,
                allTeamB[index].id,
                item.teamName,
                allTeamB[index].teamName
              );
            }}
          >
            <div
              className={styles.close}
              onClick={() => setPopupUpdateMatch(false)}
            >
              X
            </div>
            <h4>Cập nhật tỉ số</h4>
            <div className={styles.wrapForm}>
              <div className={styles.divFlex}>
                <label id="scoreTeamA">Bàn thắng đội {item.teamName} </label>
                <input
                  type="number"
                  id="scoreTeamA"
                  value={scoreTeamA.value}
                  onChange={onChangeHandler}
                  name="scoreTeamA"
                />
                <p className={styles.lineMin}>-</p>
                <input
                  type="number"
                  id="scoreTeamB"
                  value={scoreTeamB.value}
                  onChange={onChangeHandler}
                  name="scoreTeamB"
                />
                <label id="scoreTeamB">
                  Bàn thắng đội {allTeamB[index].teamName}
                </label>
              </div>
              <div className={styles.divFlex}>
                <label id="redTeamA">Thẻ đỏ đội {item.teamName} </label>
                <input
                  type="number"
                  id="redTeamA"
                  value={redTeamA.value}
                  onChange={onChangeHandler}
                  name="redTeamA"
                />
                <p className={styles.lineMin}>-</p>
                <input
                  type="number"
                  id="redTeamB"
                  value={redTeamB.value}
                  onChange={onChangeHandler}
                  name="redTeamB"
                />
                <label id="redTeamB">
                  Thẻ đỏ đội {allTeamB[index].teamName}
                </label>
              </div>
              <div className={styles.divFlex}>
                <label id="yellowTeamA">Thẻ vàng đội {item.teamName} </label>
                <input
                  type="number"
                  id="yellowTeamA"
                  value={yellowTeamA.value}
                  onChange={onChangeHandler}
                  name="yellowTeamA"
                />
                <p className={styles.lineMin}>-</p>
                <input
                  type="number"
                  id="yellowTeamB"
                  value={yellowTeamB.value}
                  onChange={onChangeHandler}
                  name="yellowTeamB"
                />
                <label id="yellowTeamB">
                  Thẻ vàng đội {allTeamB[index].teamName}
                </label>
              </div>
            </div>
            <button>Cập nhật</button>
          </form>
        ))}
      <div className={styles.match}>
        <Link to={`/findTournaments`} replace className={styles.linkBack}>
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
            <div className={styles.action}>
              {user !== null &&
              location.state !== null &&
              user.userVM.id === location.state.hostTournamentId ? (
                <p
                  className={styles.updateMatch}
                  onClick={() => setPopupUpdateMatch(true)}
                >
                  Cập nhật tỉ số
                </p>
              ) : null}
            </div>
            <div className={styles.match__header}>
              {allTeamA.map((item, index) => (
                <div className={styles.sub__header}>
                  <div className={styles.header__text}>
                    <div className={styles.header__name}>
                      {item.match.fight}
                    </div>
                    <p className={styles.header__day}>
                      {formatDateTime(item.match.matchDate)}
                    </p>
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
                onClick={() =>
                  setActiveTeamDetail(`/match/${idMatch}/matchDetail`)
                }
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
                onClick={() =>
                  setActiveTeamDetail(`/match/${idMatch}/livestream`)
                }
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
