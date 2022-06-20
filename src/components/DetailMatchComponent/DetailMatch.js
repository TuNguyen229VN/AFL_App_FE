import React, { useState, useEffect } from "react";
import "./style/style.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useParams, useLocation } from "react-router-dom";
import LoadingAction from "../LoadingComponent/LoadingAction";
import { getTeamInMatchByMatchIdAPI } from "../../api/TeamInMatchAPI";
export default function DetailMatch(props) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const tourDetail = location.state.tourDetail;
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const { idMatch } = useParams();
  const [scoreA, setScoreA] = useState(null);
  const [scoreB, setScoreB] = useState(null);
  const [yellowA, setYellowA] = useState(null);
  const [yellowB, setYellowB] = useState(null);
  const [redA, setRedA] = useState(null);
  const [redB, setRedB] = useState(null);
  useEffect(() => {
    getTeamInMatchByMatchID();
  }, []);
  const getTeamInMatchByMatchID = () => {
    const response = getTeamInMatchByMatchIdAPI(idMatch);
    response
      .then((res) => {
        if (res.status === 200) {
          const twoTeamUpdate = res.data.teamsInMatch;
          console.log(twoTeamUpdate);
          setTeamA(twoTeamUpdate[0]);
          setTeamB(twoTeamUpdate[1]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "scoreA":
        setScoreA(value);
        break;
      case "scoreB":
        setScoreB(value);
        break;
      case "yellowA":
        setYellowA(value);
        break;
      case "yellowB":
        setYellowB(value);
        break;
      case "redA":
        setRedA(value);
        break;
      default:
        setRedB(value);
        break;
    }
  };
  const cancleResult = (type) => {
    if (type === "score") {
      setScoreA(null);
      setScoreB(null);
    } else if (type === "yellow") {
      setYellowA(null);
      setYellowB(null);
    } else {
      setRedA(null);
      setRedB(null);
    }
  };
  return (
    <div>
      <Header />
      <div className="detailMatch">
        <h1 className="titleDetail">
          Chi tiết trận đấu của{" "}
          {tourDetail !== null ? tourDetail.tournamentName : null}
        </h1>
        <p className="fight">{teamA !== null ? teamA.match.fight : null}</p>
        <p className="fight">
          {teamA !== null && teamB !== null
            ? teamA.teamName + " - " + teamB.teamName
            : null}
        </p>
        <div>
          <p className="fight">Tỉ số chung cuộc</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label
              style={{
                marginRight: 20,
              }}
              htmlFor="scoreA"
              className="fight"
            >
              {teamA !== null ? teamA.teamName : null}
            </label>
            <input
              name="scoreA"
              value={scoreA == null ? "" : scoreA}
              id="scoreA"
              className="btnInput"
              onChange={onChangeHandler}
            />
            -
            <input
              style={{
                marginLeft: 20,
              }}
              id="scoreB"
              name="scoreB"
              value={scoreB === null ? "" : scoreB}
              className="btnInput"
              onChange={onChangeHandler}
            />
            <label htmlFor="scoreB" className="fight">
              {teamB !== null ? teamB.teamName : null}
            </label>
            {((scoreA !== null) && (scoreB !== null)) && (scoreA.length > 0 && scoreB.length > 0)   ? (
              <div
                style={{
                  marginLeft: 30,
                }}
                className="btnAccept"
              >
                <button
                  className="cancleCreate"
                  onClick={() => {
                    cancleResult("score");
                  }}
                >
                  Hủy
                </button>
                <button className="createTeam_btn">Xác nhận</button>
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <p className="fight">Tổng số thẻ vàng</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label
              style={{
                marginRight: 20,
              }}
              htmlFor="yellowA"
              className="fight"
            >
              {teamA !== null ? teamA.teamName : null}
            </label>
            <input
              id="yellowA"
              name="yellowA"
              value={yellowA  === null ? "" : yellowA}
              onChange={onChangeHandler}
              className="btnInput"
            />
            -
            <input
              style={{
                marginLeft: 20,
              }}
              id="yellowB"
              name="yellowB"
              value={yellowB  === null ? "" : yellowB}
              onChange={onChangeHandler}
              className="btnInput"
            />
            <label htmlFor="yellowB" className="fight">
              {teamB !== null ? teamB.teamName : null}
            </label>
            {yellowA !== null && yellowB !== null && (yellowA.length > 0 && yellowB.length > 0) ? (
              <div
                style={{
                  marginLeft: 30,
                }}
                className="btnAccept"
              >
                <button className="cancleCreate" onClick={() => {
                    cancleResult("yellow");
                  }}>Hủy</button>
                <button className="createTeam_btn">Xác nhận</button>
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <p className="fight">Tổng số thẻ đỏ</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label
              style={{
                marginRight: 20,
              }}
              htmlFor="redA"
              className="fight"
            >
              {teamA !== null ? teamA.teamName : null}
            </label>
            <input
              id="redA"
              className="btnInput"
              name="redA"
              value={redA === null ? "" : redA}
              onChange={onChangeHandler}
            />
            -
            <input
              style={{
                marginLeft: 20,
              }}
              id="redB"
              className="btnInput"
              name="redB"
              value={redB === null ? "" :redB}
              onChange={onChangeHandler}
            />
            <label htmlFor="redB" className="fight">
              {teamB !== null ? teamB.teamName : null}
            </label>
            {redA !== null && redB !== null && (redA.length > 0 && redB.length > 0) ? (
              <div
                style={{
                  marginLeft: 30,
                }}
                className="btnAccept"
              >
                <button className="cancleCreate" onClick={() => {
                    cancleResult("red");
                  }}>Hủy</button>
                <button className="createTeam_btn">Xác nhận</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {loading ? <LoadingAction /> : null}
      <Footer />
    </div>
  );
}
