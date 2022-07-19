import React, { useState, useEffect } from "react";
import "./style/style.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useParams, useLocation } from "react-router-dom";
import LoadingAction from "../LoadingComponent/LoadingAction";
import {
  getTeamInMatchByMatchIdAPI,
  updateTeamInMatch,
} from "../../api/TeamInMatchAPI";
import DetailInMatch from "./DetailInMatch";
import { getAllPlayerInTournamentByTeamInTournamentIdAPI } from "../../api/PlayerInTournamentAPI";
import { getPlayerInTeamByIdAPI } from "../../api/PlayerInTeamAPI";
import {
  getMatchDetailByMatchIdAPI,
  saveRecordInMatchDetail,
  deleteMatchDetailByTypeAPI,
} from "../../api/MatchDetailAPI";
import { updateScoreInTournamentByTourIdAPI } from "../../api/TeamInTournamentAPI";
import { toast } from "react-toastify";
import { async } from "@firebase/util";

export default function DetailMatch(props) {
  const { idMatch } = useParams();

  const location = useLocation();
  const tourDetail = location.state.tourDetail;
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scoreA, setScoreA] = useState(null);
  const [scoreB, setScoreB] = useState(null);
  const [yellowA, setYellowA] = useState(null);
  const [yellowB, setYellowB] = useState(null);
  const [redA, setRedA] = useState(null);
  const [redB, setRedB] = useState(null);
  const [hideShow, setHideShow] = useState(false);
  const [typeDetail, setTypeDetail] = useState(null);
  const [matchDetail, setMatchDetail] = useState(null);
  // const [stateScore, setStateScore] = useState(false);
  // const [stateYellow, setStateYellow] = useState(false);
  // const [stateRed, setStateRed] = useState(false);
  const [playerA, setPlayerA] = useState(null);
  const [playerB, setPlayerB] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState(false);

  useEffect(() => {
    getTeamInMatchByMatchID();
  }, [statusUpdate === true]);
  useEffect(() => {
    if (teamA !== null && teamB !== null) {
      setAllInfor();
    }
  }, [teamA !== null && teamB !== null]);
  const getMatchDetailInFor = async () => {
    try {
      const response = await getMatchDetailByMatchIdAPI(idMatch);
      if (response.status === 200) {
        setLoading(false);
        console.log(response.data.matchDetails)
        setMatchDetail(response.data.matchDetails);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  const updateScoreInMatch = async (data, type) => {
    const newTeamA = teamA;
    const newTeamB = teamB;
    if (type === 1) {
      newTeamA.teamScore = +scoreA;
      newTeamA.teamScoreLose = +scoreB;
      newTeamA.result =
        +scoreA > +scoreB ? "3" : +scoreA === +scoreB ? "1" : "0";
      newTeamB.teamScore = +scoreB;
      newTeamB.teamScoreLose = +scoreA;
      newTeamB.result =
        +scoreB > +scoreA ? "3" : +scoreA === +scoreB ? "1" : "0";
    } else if (type === 2) {
      newTeamA.yellowCardNumber = +yellowA;
      newTeamB.yellowCardNumber = +yellowB;
    } else {
      newTeamA.redCardNumber = +redA;
      newTeamB.redCardNumber = +redB;
    }

    setLoading(true);
    
    for (let i = 0; i < 2; i++) {
      updateInAPI(i === 0 ? newTeamA : newTeamB);
    }
    console.log(type)
    await deleteMatchDetailByType(
      idMatch,
      type === 1 ? "score" : type === 2 ? "yellow" : "red",
      data
    );  
      updateScoreTeamInTour();
  };
  // const updateRedCardTeamInTour = async () => {
  //   const data = {
  //     "id": tourDetail.id,
  //     "totalYellowCard": 0,
  //     "totalRedCard": 0
  //   }
  //   try{
  //     const response = await updateYellowRedCardInTournamentByTourIdAPI(data);
  //   }catch(err){
  //     console.error(err);
  //   }
  // }
  const updateScoreTeamInTour = async () => {
    try {
      const response = updateScoreInTournamentByTourIdAPI(tourDetail.id);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteMatchDetailByType = async (matchId, type, data) => {
    try {
      const response = await deleteMatchDetailByTypeAPI(matchId, type);
      if (response.status === 200) {
        for (let item of data) {
          await updateMatchDetail(item);
        }
        toast.success("Cập nhật thành công chi tiết trận đấu", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setHideShow(false);
        setStatusUpdate(true);
        setTypeDetail(null);
        setLoading(false);
      }
    } catch (err) {
      if (err.response.status === 404) {
        for (let item of data) {
          console.log(item);
          await updateMatchDetail(item);
        }
        setLoading(false);
        toast.success("Cập nhật thành công chi tiết trận đấu", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setStatusUpdate(true);
        setTypeDetail(null);
      } else {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setHideShow(false);
      console.error(err);
    }
  };
  const updateMatchDetail = async (data) => {
    try {
      const response = await saveRecordInMatchDetail(data);
    } catch (err) {
      console.error(err);
    }
  };
  const updateInAPI = (data) => {
    const response = updateTeamInMatch(data);
    response
      .then((res) => {
        return true;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getTeamInMatchByMatchID = () => {
    setLoading(true);
    const response = getTeamInMatchByMatchIdAPI(idMatch);
    response
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          getMatchDetailInFor();
          const twoTeamUpdate = res.data.teamsInMatch;
          setTeamA(twoTeamUpdate[0]);
          getPlayerInTournamentByTeamInTourid(
            twoTeamUpdate[0].teamInTournament.id,
            "A"
          );
          setTeamB(twoTeamUpdate[1]);
          getPlayerInTournamentByTeamInTourid(
            twoTeamUpdate[1].teamInTournament.id,
            "B"
          );
          
          
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };
  const setAllInfor = () => {
    setScoreA(teamA.teamScore);
    setScoreB(teamB.teamScore);
    setYellowA(teamA.yellowCardNumber);
    setYellowB(teamB.yellowCardNumber);
    setRedA(teamA.redCardNumber);
    setRedB(teamB.redCardNumber);
  };
  const getPlayerInTournamentByTeamInTourid = async (id, type) => {
    try {
      const response = await getAllPlayerInTournamentByTeamInTournamentIdAPI(
        id
      );
      if (response.status === 200) {
        const playerInTounament = response.data.playerInTournaments;

        const listPlayer = playerInTounament.map(async (item, index) => {
          const player = await getPlayerInTeamById(item.playerInTeamId);
          const playerDetail = player.footballPlayer;
          playerDetail.playerInTournamentId = item.id;
          return player.footballPlayer;
        });
        const playersData = await Promise.all(listPlayer);

        if (type === "A") {
          setPlayerA(playersData);
        } else {
          setPlayerB(playersData);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getPlayerInTeamById = async (id) => {
    try {
      const response = await getPlayerInTeamByIdAPI(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
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
  // const cancleResult = (type) => {
  //   if (type === "score") {
  //     setScoreA(null);
  //     setScoreB(null);
  //     //setStateScore(false);
  //   } else if (type === "yellow") {
  //     setYellowA(null);
  //     setYellowB(null);
  //     //setStateYellow(false);
  //   } else {
  //     setRedA(null);
  //     setRedB(null);
  //     //setStateRed(false);
  //   }
  // };
  // const acceptResult = (type) => {
  //   if (type === "score" ) {
  //     setStateScore(true);
  //   } else if (type === "yellow" ) {
  //     setStateYellow(true);
  //   } else if (type === "red" ) {
  //     setStateRed(true);
  //   }
  // };
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
              value={scoreA === null ? "" : scoreA}
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
            {scoreA !== null &&
            scoreB !== null &&
            ((scoreA + "").length > 0 || (scoreB + "").length > 0) ? (
              <div
                style={{
                  marginLeft: 30,
                }}
                className="btnAccept"
              >
                {/* <button
                  className="cancleCreate"
                  onClick={() => {
                    cancleResult("score");
                  }}
                >
                  Hủy
                </button> */}
              </div>
            ) : null}
          </div>
          {(scoreA + "").length > 0 && (scoreB + "").length > 0 ? (
            <p
              className="deitalScoreFootball"
              onClick={() => {
                setHideShow(true);
                setTypeDetail("score");
                setStatusUpdate(false);
              }}
            >
              Chi tiết bàn thắng
            </p>
          ) : null}
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
              value={yellowA === null ? "" : yellowA}
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
              value={yellowB === null ? "" : yellowB}
              onChange={onChangeHandler}
              className="btnInput"
            />
            <label htmlFor="yellowB" className="fight">
              {teamB !== null ? teamB.teamName : null}
            </label>
            {yellowA !== null &&
            yellowB !== null &&
            (yellowA + "").length > 0 &&
            (yellowB + "").length > 0 ? (
              <div
                style={{
                  marginLeft: 30,
                }}
                className="btnAccept"
              >
                {/* <button
                  className="cancleCreate"
                  onClick={() => {
                    cancleResult("yellow");
                  }}
                >
                  Hủy
                </button> */}
              </div>
            ) : null}
          </div>
          {(yellowA + "").length > 0 && (yellowB + "").length > 0 ? (
            <p
              className="deitalScoreFootball"
              onClick={() => {
                setHideShow(true);
                setTypeDetail("yellow");
                setStatusUpdate(false);
              }}
            >
              Chi tiết thẻ vàng
            </p>
          ) : null}
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
              value={redB === null ? "" : redB}
              onChange={onChangeHandler}
            />
            <label htmlFor="redB" className="fight">
              {teamB !== null ? teamB.teamName : null}
            </label>
            {redA !== null &&
            redB !== null &&
            (redA + "").length > 0 &&
            (redB + "").length > 0 ? (
              <div
                style={{
                  marginLeft: 30,
                }}
                className="btnAccept"
              >
                {/* <button
                  className="cancleCreate"
                  onClick={() => {
                    cancleResult("red");
                  }}
                >
                  Hủy
                </button> */}
              </div>
            ) : null}
          </div>
          {(redA + "").length > 0 && (redB + "").length > 0 ? (
            <p
              className="deitalScoreFootball"
              onClick={() => {
                setHideShow(true);
                setTypeDetail("red");
                setStatusUpdate(false);
              }}
            >
              Chi tiết thẻ đỏ
            </p>
          ) : null}
        </div>
      </div>
      <div className={hideShow ? "overlay active" : "overlay"}></div>
      <DetailInMatch
        nameTeamA={teamA !== null ? teamA : null}
        nameTeamB={teamB !== null ? teamB : null}
        hideShow={hideShow}
        updateScoreInMatch={updateScoreInMatch}
        matchDetail={
          matchDetail !== null ? matchDetail : null
        }
        setHideShow={setHideShow}
        setStatusUpdate={setStatusUpdate}
        statusUpdate={statusUpdate}
        typeDetail={typeDetail}
        numTeamA={
          typeDetail === "score"
            ? scoreA
            : typeDetail === "yellow"
            ? yellowA
            : redA
        }
        numTeamB={
          typeDetail === "score"
            ? scoreB
            : typeDetail === "yellow"
            ? yellowB
            : redB
        }
        playerA={playerA !== null ? playerA : null}
        playerB={playerB !== null ? playerB : null}
        idMatch={idMatch}
        tourDetail={tourDetail !== null ? tourDetail : null}
      />
      {loading ? <LoadingAction /> : null}
      <Footer />
    </div>
  );
}
