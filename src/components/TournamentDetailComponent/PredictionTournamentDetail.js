import React, { useState, useEffect } from "react";
import "./styles/style.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PredictionTournamentDetail(props) {
  const { tourDetail } = props;
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [match, setMatch] = useState();
  const { idTour } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getAllMatch();
  }, []);

  const [inputValues, setInputValues] = useState({
    teamA: 0,
    teamB: 0,
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const [matchPredict, setMatchPredict] = useState();

  const getAllPredictions = async () => {
    try {
      if (user == null) {
        navigate("../Login");
      }
      const response = await axios.get(
        `https://afootballleague.ddns.net/api/v1/ScorePrediction?tournamentId=${idTour}&userId=${user.userVM.id}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getAllMatch = async () => {
    try {
      const response = await axios.get(
        `https://afootballleague.ddns.net/api/v1/matchs/TournamentID?tournamentId=${idTour}&fullInfo=true`
      );
      console.log(response.data);

      const predict = await getAllPredictions();
      const d = new Date();
      // let day = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
      // let time  = `${d.getHours()}h${d.getMinutes()}`;
      console.log(predict);
      for (let i = 0; i < response.data.matchs.length; i++) {
        // let dayMatch  = formatDate(response.data.matchs[i].matchDate);
        //     let timeMatch = formatTime(response.data.matchs[i].matchDate);
        if (Date.parse(response.data.matchs[i].matchDate) < d) {
          response.data.matchs[i].predictStatus = false;
        } else {
          response.data.matchs[i].predictStatus = true;
        }
        for (let j = 0; j < predict.scores.length; j++) {
          if (predict.scores[j].matchId == response.data.matchs[i].id) {
            response.data.matchs[i].predict = predict.scores[j];
            break;
          }
        }
      }
      setMatch(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // const formatDate = (date) => {
  //   const myArr = date.split("T");
  //     const day = myArr[0].split("-").reverse();
  //      return day.join("/");
  // }
  const formatTime = (date) => {
    const myArr = date.split("T");
    const day = myArr[1].split(".");
    const time = day[0].split(":");
    return time[0] + "h" + time[1];
  };

  // format Date
  const formatDate = (date) => {
    const day = new Date(date);
    return (
      String(day.getHours()).padStart(2, "0") +
      ":" +
      String(day.getMinutes()).padStart(2, "0") +
      " " +
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear()
    );
  };
  const postPredict = async () => {
    try {
      if (matchPredict.predict) {
        const dataUpdate = {
          id: matchPredict.predict.id,
          teamAscore: inputValues.teamA,
          teamBscore: inputValues.teamB,
          status: "",
          teamInMatchAid: matchPredict.teamInMatches[0].id,
          teamInMatchBid: matchPredict.teamInMatches[1].id,
          userId: user.userVM.id,
          matchId: matchPredict.id,
        };
        const response = await axios.put(
          `https://afootballleague.ddns.net/api/v1/ScorePrediction`,
          dataUpdate,
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        const dataCreate = {
          teamAscore: inputValues.teamA,
          teamBscore: inputValues.teamB,
          status: "",
          teamInMatchAid: matchPredict.teamInMatches[0].id,
          teamInMatchBid: matchPredict.teamInMatches[1].id,
          userId: user.userVM.id,
          matchId: matchPredict.id,
        };
        const response = await axios.post(
          `https://afootballleague.ddns.net/api/v1/ScorePrediction`,
          dataCreate,
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success("Dự đoán thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      getAllMatch();
      setActivePopup(false);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.messgae, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setActivePopup(false);
    }
  };

  const [activePopup, setActivePopup] = useState(false);
  return (
    <>
      <div
        className={activePopup ? "overlay active" : "overlay"}
        onClick={() => setActivePopup(false)}
      />
      <div
        className={
          activePopup ? "popup__prediction active" : "popup__prediction"
        }
      >
        <h2>Dự đoán trận đấu {matchPredict && matchPredict.matchDate} </h2>
        <p
          className="close"
          onClick={() => {
            setActivePopup(false);
          }}
        >
          X
        </p>
        <div className="popup__prediction__wrap">
          <h3 className="teamA__prediction">
            {matchPredict && matchPredict.teamInMatches[0].teamName}
          </h3>
          <input
            type="number"
            name="teamA"
            onChange={handleOnChange}
            value={inputValues.teamA}
          />
          <div className="line"></div>
          <input
            type="number"
            name="teamB"
            onChange={handleOnChange}
            value={inputValues.teamB}
          />
          <h3 className="teamA__prediction">
            {matchPredict && matchPredict.teamInMatches[1].teamName}
          </h3>
        </div>
        <button
          onClick={(e) => {
            postPredict();
            e.preventDefault();
          }}
        >
          Xác nhận
        </button>
      </div>

      <div className="teamdetail__content schedule__tour prediction">
        <div className="wrap__table">
          <table className="schedule__table">
            <tr>
              <th colSpan={5}>Dự đoán</th>
            </tr>
            {!match ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  Chưa có thông tin cụ thể
                </td>
              </tr>
            ) : null}
            {match &&
              match.matchs.map(
                (match) =>
                  match.teamInMatches.length == 2 && (
                    <tr>
                      <td>{formatDate(match.matchDate)}</td>
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            match.teamInMatches[0].teamInTournament.team
                              .teamAvatar
                          }
                          alt="gallery_item"
                        />
                        <p>{match.teamInMatches[0].teamName}</p>
                      </td>
                      <td>
                        <span className="score">
                          {match.predict && match.predict.teamAscore}
                        </span>
                        <span className="score"> - </span>
                        <span className="score">
                          {match.predict && match.predict.teamBscore}
                        </span>
                      </td>
                      <td
                        className="khongin"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            match.teamInMatches[1].teamInTournament.team
                              .teamAvatar
                          }
                          alt="gallery_item"
                        />
                        <p>{match.teamInMatches[1].teamName} </p>
                      </td>
                      <td>
                        {tourDetail.status === true &&
                        tourDetail.statusTnm !== "Kết thúc"
                          ? match.predictStatus && (
                              <button
                                className="btnPrediction"
                                onClick={() => {
                                  setActivePopup(true);
                                  setMatchPredict(match);
                                  setInputValues({
                                    ...inputValues,
                                    teamA: match.predict.teamAscore,
                                    teamB: match.predict.teamBscore,
                                  });
                                }}
                              >
                                {match.predict == false ||
                                match.predict == undefined
                                  ? "Dự đoán"
                                  : "Thay đổi"}
                              </button>
                            )
                          : null}
                      </td>
                    </tr>
                  )
              )}
          </table>
        </div>
      </div>
    </>
  );
}

export default PredictionTournamentDetail;
