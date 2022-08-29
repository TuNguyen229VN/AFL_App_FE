import axios from "axios";
import { data } from "flickity";
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAPI } from "../../api";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LoadingAction from "../LoadingComponent/LoadingAction";
import Livestream from "./Livestream";
import MatchDetail from "./MatchDetail";
import styles from "./styles/style.module.css";
import { useNavigate } from "react-router-dom";
import { getAllPlayerInTournamentByTeamInTournamentIdAPI } from "../../api/PlayerInTournamentAPI";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getMatchDetailByMatchIdAPI } from "../../api/MatchDetailAPI";
import { saveRecordInMatchDetail } from "../../api/MatchDetailAPI";
import { async } from "@firebase/util";
import ReportMatch from "./ReportMatch";
import {
  getReportByReasonAPI,
  createReport,
  deleteReport,
} from "../../api/Report";
import { updateTeamInMatch } from "../../api/TeamInMatchAPI";
function Match() {
  const [prediction, setPrediction] = useState(true);
  const location = useLocation();
  const [fullScreen, setFullScreen] = useState(false);
  const [checkLivestream, setCheckLivestream] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const title = location.state.title !== null ? location.state.title : null;
  const index = location.state.index !== null ? location.state.index : null;
  const dateValidate = location.state.dateValidate;
  const lastMatch = location.state.lastMatch;
  const [guestId, setGuestId] = useState(localStorage.getItem("guestId"));
  const inputRef = useRef(null);
  const [dataMatch, setDataMatch] = useState(null);
  // location.state.hostTournamentId
  useEffect(() => {
    setDataMatch([title, index, location.state.index, lastMatch]);
    joinRoom();
  }, []);
  useEffect(() => {
    getPredict();
  }, [prediction]);

  console.log("dddd");
  console.log(dataMatch);
  const navigate = useNavigate();
  const { idMatch } = useParams();
  const [allTeamA, setAllTeamA] = useState(null);
  const [allTeamB, setAllTeamB] = useState(null);
  const [playerRegisterA, setPlayerRegisterA] = useState(null);
  const [playerRegisterB, setPlayerRegisterB] = useState(null);
  const [tournamentID, setTournamentID] = useState(0);
  const [footballFeild, setFootballFeild] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenLivestream, setTokenLivestream] = useState("");
  const [check, setCheck] = useState(false);
  const [playerPopup, setPlayerPopup] = useState(false);
  const [playerCardPopup, setPlayerCardPopup] = useState(false);
  const [playerPopupB, setPlayerPopupB] = useState(false);
  const [playerCardPopupB, setPlayerCardPopupB] = useState(false);
  const [card, setCard] = useState("");
  const [popupUpdateMatch, setPopupUpdateMatch] = useState(false);
  // update Player
  const [playerScoreA, setplayerScoreA] = useState([]);
  const [playerScoreB, setPlayerScoreB] = useState([]);
  const [hideShowReport, setHideShowReport] = useState(false);
  const [playerTeamA, setPlayerTeamA] = useState([]);
  const [playerTeamB, setPlayerTeamB] = useState([]);
  //
  const [scoreTeamA, setScoreTeamA] = useState({ value: 0, error: "" });
  const [scoreTeamB, setScoreTeamB] = useState({ value: 0, error: "" });
  const [redTeamA, setRedTeamA] = useState({ value: 0, error: "" });
  const [redTeamB, setRedTeamB] = useState({ value: 0, error: "" });
  const [yellowTeamA, setYellowTeamA] = useState({ value: 0, error: "" });
  const [yellowTeamB, setYellowTeamB] = useState({ value: 0, error: "" });
  const [detailTeamA, setDetailTeamA] = useState(null);
  const [detailTeamB, setDetailTeamB] = useState(null);
  const [predict, setPredict] = useState({});
  const [isTie, setIsTie] = useState(false);
  const [minuteMatch , setMinuteMatch] = useState(0);

  const getPredict = async () => {
    try {
      const response = await axios.get(
        `https://afootballleague.ddns.net/api/v1/ScorePrediction/truePredict?matchId=${idMatch}`
      );
      setPredict(response.data);
    } catch (err) {
      console.error(err);
      setPredict({});
    }
  };
  const getMatch = () => {
    setLoading(true);
    let afterURL = `TeamInMatch/matchId?matchId=${idMatch}`;
    let response = getAPI(afterURL);
    response
      .then((res) => {
        const allMatch = res.data.teamsInMatch;

        // if (allMatch[0].teamScore > 0 || allMatch[1].teamScore > 0) {
        //   getDataMatchDetail(allMatch[0].matchId, allMatch[0], allMatch[1]);
        // }
        const teamB = [];
        const teamA = allMatch.reduce((accumulator, currentValue) => {
          if (currentValue.id % 2 === 1) {
            accumulator.push(currentValue);
          } else {
            teamB.push(currentValue);
          }
          return accumulator;
        }, []);
        if (teamA[0].match.round.includes("tie-break")) {
          setIsTie(true);
          setScoreA(teamA[0].scoreTieBreak);
          setScoreB(teamB[0].scoreTieBreak);
        } else {
          setScoreA(teamA[0].teamScore);
          setScoreB(teamB[0].teamScore);
        }
        setAllTeamA(teamA);
        setAllTeamB(teamB);
        setScoreTeamA({ value: res.data.teamsInMatch[0].teamScore });
        setScoreTeamB({ value: res.data.teamsInMatch[1].teamScore });
        setRedTeamA({ value: res.data.teamsInMatch[0].redCardNumber });
        setRedTeamB({ value: res.data.teamsInMatch[1].redCardNumber });
        setYellowTeamA({ value: res.data.teamsInMatch[0].yellowCardNumber });
        setYellowTeamB({ value: res.data.teamsInMatch[1].yellowCardNumber });
        setTournamentID(res.data.teamsInMatch[0].match.tournamentId);
        setTokenLivestream(res.data.teamsInMatch[0].match.tokenLivestream);
        setUId(res.data.teamsInMatch[0].match.idScreen);
        getTourDetail(res.data.teamsInMatch[0].match.tournamentId);
        getPlayer(res.data.teamsInMatch[0].teamInTournament.id, "teamA");
        getPlayer(res.data.teamsInMatch[1].teamInTournament.id, "teamB");
        getMatchDetail();

        // getAllPlayerByTeamIdA(
        //   res.data.teamsInMatch[0].teamInTournament.team.id,
        //   res.data.teamsInMatch[0].teamInTournament.id
        // );
        // getAllPlayerByTeamIdB(
        //   res.data.teamsInMatch[1].teamInTournament.team.id,
        //   res.data.teamsInMatch[1].teamInTournament.id
        // );
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // useEffect(() => {
  //   getReportByReason();
  // },[]);
  const [reportMatch, setReportMatch] = useState(null);
  const getReportByReason = async () => {
    try {
      const response = await getReportByReasonAPI(`${idMatch}-`);
      if (response.status === 200) {
        const data = response.data.reports;
        if (data.length > 0) {
          setReportMatch(data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const [detail, setDetail] = useState([]);
  const [checkPen, setCheckPen] = useState(false);
  const getMatchDetail = (data, team) => {
    setLoading(true);
    let response = getMatchDetailByMatchIdAPI(idMatch);
    response
      .then((res) => {
        devidePlayer(res.data.matchDetails, data, team);
        // setDetail(res.data.matchDetails);
        for (let i = 0; i < res.data.matchDetails.length; i++) {
          if (res.data.matchDetails[i].actionMatchId == 4) {
            setCheckPen(true);
            break;
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const devidePlayer = (data, player, team) => {
    const playerScoreA = [];
    for (let item of data) {
      if (playerScoreA.length > 0) {
        const index = playerScoreA.findIndex(
          (itemIn) =>
            itemIn.idPlayer === item.footballPlayer.id &&
            itemIn.actionMatchId === item.actionMatchId
        );
        if (index === -1) {
          let playerSide = "teamB";
          const playerIndex = player.findIndex(
            (itemP) =>
              itemP.playerInTeam.footballPlayerId === item.footballPlayer.id
          );
          if (playerIndex >= 0) {
            playerSide = "teamA";
          }

          playerScoreA.push({
            idPlayer: item.footballPlayer.id,
            namePlayer: item.footballPlayer.playerName,
            playerAvatar: item.footballPlayer.playerAvatar,
            actionMatchId: item.actionMatchId,
            minutesScore: [item.actionMinute],
            playerSide: playerSide,
            statusPen: item.statusPen,
          });
        } else {
          if (playerScoreA[index].actionMatchId == 4) {
            let playerSide = "teamB";
            const playerIndex = player.findIndex(
              (itemP) =>
                itemP.playerInTeam.footballPlayerId === item.footballPlayer.id
            );
            if (playerIndex >= 0) {
              playerSide = "teamA";
            }

            playerScoreA.push({
              idPlayer: item.footballPlayer.id,
              namePlayer: item.footballPlayer.playerName,
              playerAvatar: item.footballPlayer.playerAvatar,
              actionMatchId: item.actionMatchId,
              minutesScore: [item.actionMinute],
              playerSide: playerSide,
              statusPen: item.statusPen,
            });
          } else {
            playerScoreA[index].minutesScore.push(item.actionMinute);
          }
        }
      } else {
        let playerSide = "teamB";
        const playerIndex = player.findIndex(
          (itemP) =>
            itemP.playerInTeam.footballPlayerId === item.footballPlayer.id
        );
        if (playerIndex >= 0) {
          playerSide = "teamA";
        }
        playerScoreA.push({
          idPlayer: item.footballPlayer.id,
          namePlayer: item.footballPlayer.playerName,
          playerAvatar: item.footballPlayer.playerAvatar,
          teamId: item.teamId,
          actionMatchId: item.actionMatchId,
          minutesScore: [item.actionMinute],
          playerSide: playerSide,
          statusPen: item.statusPen,
        });
      }
    }
    playerScoreA.sort(function (a, b) {
      return a.actionMatchId - b.actionMatchId;
    });
    setDetail(playerScoreA);
  };

  const getDataMatchDetail = (data, teamA, teamB) => {
    const response = getMatchDetailByMatchIdAPI(data);
    response
      .then((res) => {
        const matchDetail = res.data.matchDetails;
        devidedPlayerScore(matchDetail, teamA, teamB);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const devidedPlayerScore = (data, teamA, teamB) => {
    const newTeamA = teamA;
    const newTeamB = teamB;
    const idteamA = newTeamA.teamInTournament.team.id;
    const idteamB = newTeamB.teamInTournament.team.id;

    const playerScoreA = [];
    for (let item of data) {
      if (item.playerInTournament.playerInTeam.teamId === idteamA) {
        if (playerScoreA.length > 0) {
          const index = playerScoreA.findIndex(
            (itemIn) =>
              itemIn.idPlayerInTournament === item.playerInTournament.id &&
              itemIn.actionMatchId === item.actionMatchId
          );
          if (index === -1) {
            playerScoreA.push({
              idPlayerInTournament: item.playerInTournament.id,
              namePlayer:
                item.playerInTournament.playerInTeam.footballPlayer.playerName,
              actionMatchId: item.actionMatchId,
              minutesScore: [item.actionMinute],
            });
          } else {
            playerScoreA[index].minutesScore.push(item.actionMinute);
          }
        } else {
          playerScoreA.push({
            idPlayerInTournament: item.playerInTournament.id,
            namePlayer:
              item.playerInTournament.playerInTeam.footballPlayer.playerName,
            actionMatchId: item.actionMatchId,
            minutesScore: [item.actionMinute],
          });
        }
      }
    }
    playerScoreA.sort(function (a, b) {
      return a.actionMatchId - b.actionMatchId;
    });
    setDetailTeamA(playerScoreA);

    const playerScoreB = [];
    for (let item of data) {
      if (item.playerInTournament.playerInTeam.teamId === idteamB) {
        if (playerScoreB.length > 0) {
          const index = playerScoreB.findIndex(
            (itemIn) =>
              itemIn.idPlayerInTournament === item.playerInTournament.id &&
              itemIn.actionMatchId === item.actionMatchId
          );
          if (index === -1) {
            playerScoreB.push({
              idPlayerInTournament: item.playerInTournament.id,
              namePlayer:
                item.playerInTournament.playerInTeam.footballPlayer.playerName,
              actionMatchId: item.actionMatchId,
              minutesScore: [item.actionMinute],
            });
          } else {
            playerScoreB[index].minutesScore.push(item.actionMinute);
          }
        } else {
          playerScoreB.push({
            idPlayerInTournament: item.playerInTournament.id,
            namePlayer:
              item.playerInTournament.playerInTeam.footballPlayer.playerName,
            actionMatchId: item.actionMatchId,
            minutesScore: [item.actionMinute],
          });
        }
      }
    }
    playerScoreB.sort(function (a, b) {
      return a.actionMatchId - b.actionMatchId;
    });
    setDetailTeamB(playerScoreB);
  };

  // const getAllPlayerByTeamIdA = (teamId, teamInTournamentId) => {
  //   setLoading(true);
  //   const response = getAllPlayerByTeamIdAPI(teamId);
  //   response
  //     .then((res) => {
  //       console.log(res.data);
  //       getAllPlayerInTournamentByTeamInTournamentIdA(
  //         res.data.playerInTeamsFull,
  //         teamInTournamentId
  //       );
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.error(err);
  //     });
  // };
  // const getAllPlayerByTeamIdB = (teamId, teamInTournamentId) => {
  //   setLoading(true);
  //   const response = getAllPlayerByTeamIdAPI(teamId);
  //   response
  //     .then((res) => {
  //       console.log(res.data);
  //       getAllPlayerInTournamentByTeamInTournamentIdB(
  //         res.data.playerInTeamsFull,
  //         teamInTournamentId
  //       );
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.error(err);
  //     });
  // };
  // const getAllPlayerInTournamentByTeamInTournamentIdA = async (
  //   data,
  //   teamInTournamentId
  // ) => {
  //   const newPlayerRegister = [];
  //   // Sửa API lai jum
  //   const response = await getAllPlayerInTournamentByTeamInTournamentIdAPI(50);

  //   if (response.status === 200) {
  //     for (const item of response.data.playerInTournaments) {
  //       const findNewPlayer = data.find(
  //         (itemData) => itemData.id === item.playerInTeamId
  //       );
  //       findNewPlayer.clothesNumber = item.clothesNumber;
  //       newPlayerRegister.push(findNewPlayer);
  //     }
  //     setPlayerRegisterA(newPlayerRegister);
  //     setLoading(false);
  //   }
  // };
  // const getAllPlayerInTournamentByTeamInTournamentIdB = async (
  //   data,
  //   teamInTournamentId
  // ) => {
  //   const newPlayerRegisterB = [];
  //   // Sửa API lai jum
  //   const response = await getAllPlayerInTournamentByTeamInTournamentIdAPI(49);

  //   if (response.status === 200) {
  //     for (const item of response.data.playerInTournaments) {
  //       const findNewPlayer = data.find(
  //         (itemData) => itemData.id === item.playerInTeamId
  //       );
  //       findNewPlayer.clothesNumber = item.clothesNumber;
  //       newPlayerRegisterB.push(findNewPlayer);
  //     }
  //     setPlayerRegisterB(newPlayerRegisterB);
  //     setLoading(false);
  //   }
  // };
  const getTourDetail = async (id) => {
    let afterDefaultURL = `tournaments/${id}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setFootballFeild(res.data.footballFieldAddress);
        setMinuteMatch(res.data.matchMinutes + 30);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  const updateTeamInMatchReport = async (data) => {
    try {
      const response = await updateTeamInMatch(data);
    } catch (err) {
      console.error(err);
    }
  };
  const postReportMatch = async (teamInMatchData, reason, teamId) => {
    setLoading(true);
    try {
      let response = null;
      if (typeof reason === "string") {
        const data = {
          reason: reason,
          userId: teamId,
          footballPlayerId: 0,
          teamId: teamId,
          tournamentId: 0,
          status: "match",
        };
        response = await createReport(data);
      } else {
        response = await deleteReport(reason);
      }
      if (response.status === 200 || response.status === 201) {
        setHideShowReport(false);
        setReportMatch(response.status === 201 ? response.data : null);
        for (const item of teamInMatchData) {
          //console.log(item);
          await updateTeamInMatchReport(item);
        }
        setLoading(false);
        toast.success(
          response.status === 201
            ? "Báo cáo trận đấu thành công"
            : "Hủy báo cáo trận đấu thành công",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const [players, setPlayers] = useState([]);
  const getPlayer = (id, team) => {
    let response = getAllPlayerInTournamentByTeamInTournamentIdAPI(id);
    response.then((res) => {
      if (team == "teamA") {
        getMatchDetail(res.data.playerInTournaments);
        setPlayerTeamA(res.data);
      } else {
        setPlayerTeamB(res.data);
      }
    });
  };
  useEffect(() => {
    getMatch();
    getReportByReason();
  }, [check]);

  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);
  const renderByLink = () => {
    if (activeTeamDetail === `/match/${idMatch}/matchDetail`) {
      return (
        <MatchDetail
          setPrediction={setPrediction}
          prediction={prediction}
          allTeamA={allTeamA}
          allTeamB={allTeamB}
          footballFeild={footballFeild}
          scoreA={scoreA}
          scoreB={scoreB}
          redA={redA}
          redB={redB}
          yellowA={yellowA}
          yellowB={yellowB}
          hostTournamentId={location.state.hostTournamentId}
          tourDetail={location.state.tourDetail}
          title={dataMatch[0]}
          indexMatch={dataMatch[2]}
          index={dataMatch[1]}
          lastMatch={dataMatch[3]}
        />
      );
    }
    if (activeTeamDetail === `/match/${idMatch}/livestream`) {
      return (
        <Livestream
          setPrediction={setPrediction}
          prediction={prediction}
          allTeamA={allTeamA}
          allTeamB={allTeamB}
          scoreA={scoreA}
          scoreB={scoreB}
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
          setCheckLivestream={setCheckLivestream}
          idMatch={idMatch}
          tokenLivestream={tokenLivestream}
          sendComment={sendComment}
          message={message}
          uId={uId}
          user={user}
          idHostTournament={location.state.tourDetail.userId}
          hostTournamentId={location.state.hostTournamentId}
          tourDetail={location.state.tourDetail}
          title={dataMatch[0]}
          indexMatch={dataMatch[2]}
          index={dataMatch[1]}
          lastMatch={dataMatch[3]}
        />
      );
    }
  };

  const getStatusMatch = (matchStatus) => {
    if (matchStatus === "Chưa bắt đầu") {
      return <p style={{ fontStyle: "italic" }}>{matchStatus}</p>;
    } else if (matchStatus === "Đang diễn ra") {
      return <p style={{ color: "green" }}>{matchStatus}</p>;
    } else {
      return <p style={{ color: "red" }}>{matchStatus}</p>;
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
  const [team, setTeam] = useState();
  const [mDetail, setMDetail] = useState();
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [redA, setRedA] = useState(0);
  const [redB, setRedB] = useState(0);
  const [yellowA, setYellowA] = useState(0);
  const [yellowB, setYellowB] = useState(0);
  const [message, setMessage] = useState([]);
  const [connection, setConnection] = useState();
  const [uId, setUId] = useState([]);
  const [room, setRoom] = useState("");
  const [penA, setPenA] = useState(0);
  const [penB, setPenB] = useState(0);
  const joinRoom = async () => {
    try {
      let Id = "0";
      let username = "guest";
      let avatar = "guest";
      let newGuest = true;
      if (user) {
        Id = user.userVM.id.toString();
        username = user.userVM.username;
        avatar = user.userVM.avatar;
        newGuest = false;
      }
      if (!user && guestId) {
        Id = guestId.toString();
        newGuest = false;
      }
      const room = idMatch;
      const connectionId = "a";
      const connection = new HubConnectionBuilder()

        .withUrl("https://afootballleague.ddns.net/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveComment", (user, comment) => {
        setMessage((message) => [...message, { user, comment }]);
      });
      connection.on("ReceiveScreen", (id) => {
        setUId(id);
        console.log(id);
      });

      connection.on("MatchDetail", (mDt) => {
        setMDetail(mDt);
        // setDetail(detail =>[...detail,mDt]);
      });

      connection.on("TeamInMatch", (tim) => {
        setTeam(tim);
        if (tim && allTeamA != null && tim.id === allTeamA[0].id) {
          setRedA(tim.redCardNumber);
          setYellowA(tim.yellowCardNumber);
          if (isTie) {
            setScoreA(tim.scoreTieBreak);
          } else {
            setScoreA(tim.teamScore);
          }
          setPenA(tim.scorePenalty);
        }
        if (tim && allTeamB && tim.id === allTeamB[0].id) {
          setRedB(tim.redCardNumber);
          setYellowB(tim.yellowCardNumber);
          if (isTie) {
            setScoreB(tim.scoreTieBreak);
          } else {
            setScoreB(tim.teamScore);
          }
          setPenB(tim.scorePenalty);
        }
      });
      connection.on("Guest", (guestId) => {
        localStorage.setItem("guestId", guestId);
      });
      await connection.start();
      await connection.invoke("JoinStream", {
        Id,
        username,
        avatar,
        room,
        connectionId,
        newGuest,
      });
      setConnection(connection);
      console.log(connection);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      team &&
      mDetail &&
      detail &&
      allTeamA != null &&
      team.id === allTeamA[0].id
    ) {
      setRedA(team.redCardNumber);
      setYellowA(team.yellowCardNumber);
      if (isTie) {
        setScoreA(team.scoreTieBreak);
      } else {
        setScoreA(team.teamScore);
      }
      setPenA(team.scorePenalty);
    }
    if (team && mDetail && allTeamB != null && team.id === allTeamB[0].id) {
      setRedB(team.redCardNumber);
      setYellowB(team.yellowCardNumber);
      if (isTie) {
        setScoreB(team.scoreTieBreak);
      } else {
        setScoreB(team.teamScore);
      }
      setPenB(team.scorePenalty);
    }

    if (mDetail && detail && playerTeamA) {
      if (mDetail.actionMatchId == 4) {
        let playerSide = "teamB";
        const playerIndex = playerTeamA.playerInTournaments.findIndex(
          (itemP) =>
            itemP.playerInTeam.footballPlayerId === mDetail.footballPlayer.id
        );
        if (playerIndex >= 0) {
          playerSide = "teamA";
        }
        const data = {
          idPlayer: mDetail.footballPlayer.id,
          namePlayer: mDetail.footballPlayer.playerName,
          playerAvatar: mDetail.footballPlayer.playerAvatar,
          actionMatchId: mDetail.actionMatchId,
          minutesScore: [mDetail.actionMinute],
          playerSide: playerSide,
          statusPen: mDetail.statusPen,
        };
        let sortList = [...detail, data];
        sortList.sort(function (a, b) {
          return a.actionMatchId - b.actionMatchId;
        });

        setDetail(sortList);
      } else {
        const index = detail.findIndex(
          (itemIn) =>
            itemIn.idPlayer === mDetail.footballPlayer.id &&
            itemIn.actionMatchId === mDetail.actionMatchId
        );
        if (index === -1) {
          let playerSide = "teamB";
          const playerIndex = playerTeamA.playerInTournaments.findIndex(
            (itemP) =>
              itemP.playerInTeam.footballPlayerId === mDetail.footballPlayer.id
          );
          if (playerIndex >= 0) {
            playerSide = "teamA";
          }
          const data = {
            idPlayer: mDetail.footballPlayer.id,
            namePlayer: mDetail.footballPlayer.playerName,
            playerAvatar: mDetail.footballPlayer.playerAvatar,
            actionMatchId: mDetail.actionMatchId,
            minutesScore: [mDetail.actionMinute],
            playerSide: playerSide,
          };
          let sortList = [...detail, data];
          sortList.sort(function (a, b) {
            return a.actionMatchId - b.actionMatchId;
          });

          setDetail(sortList);
        } else {
          let minutesScore = [...detail[index].minutesScore];
          minutesScore.push(mDetail.actionMinute);
          setDetail((detail) => [
            ...detail,
            (detail[index].minutesScore = minutesScore),
          ]);
        }
      }
    }
  }, [team]);
  const sendComment = async (c) => {
    try {
      const comment = c;
      await connection.invoke("sendComment", comment);
    } catch (err) {
      console.log(err);
    }
  };
  // const sendScreen = async (id) => {
  //   try {
  //     await connection.invoke("sendUser", id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const [minutes, setMinutes] = useState("");
  const [minuteIndex, setMinuteIndex] = useState();
  const [minutesError, setMinutesError] = useState();

  const createMatchDetail = async (
    playerId,
    playerInTournamentId,
    actionId,
    minutes,
    isPen,
    fail
  ) => {
    if (card == "yellow") {
      if (cardIndex != minuteIndex) {
        return;
      }
      actionId = 2;
    }
    if (card == "red") {
      if (cardIndex != minuteIndex) {
        return;
      }
      actionId = 3;
    }
    if (isPen) {
      actionId = 4;
    }
    if (isTie && isPen == false) {
      actionId = 5;
    }
    if (card == "yellow") {
      if (cardIndex != minuteIndex) {
        return;
      }
      actionId = 2;
    }
    if (card == "red") {
      if (cardIndex != minuteIndex) {
        return;
      }
      actionId = 3;
    }
    let data = {
      actionMatchId: actionId,
      actionMinute: `${minutes}`,
      matchId: idMatch,
      playerInTournamentId: playerInTournamentId,
      footballPlayerId: playerId,
    };
    if (actionId == 4) {
      let check = false;
      if (fail == false) {
        check = true;
      }
      data = {
        actionMatchId: actionId,
        actionMinute: `${minutes}`,
        matchId: idMatch,
        playerInTournamentId: playerInTournamentId,
        footballPlayerId: playerId,
        statusPen: check,
      };
    }

    if (playerInTournamentId == minuteIndex) {
      if (actionId != 4) {
        if (minutes == "" || minutes == undefined || minutes == null) {
          setMinutesError("Vui lòng nhập số phút ...");
          return;
        }
        else if(minutes > minuteMatch){
          setMinutesError("Số phút vượt quá thời gian trận đấu");
          return;
        }
      }
      let response = saveRecordInMatchDetail(data, idMatch);
      response
        .then((res) => {
          updateTeamInMatchh(actionId);
          console.log(res.data);
          if (playerPopup) {
            setPlayerPopup(false);
          } else {
            setPlayerPopupB(false);
          }
          if (playerCardPopup) {
            setPlayerCardPopup(false);
          } else {
            setPlayerCardPopupB(false);
          }
          setMinuteIndex(0);
          if (actionId == 4) {
            setCheckPen(true);
          }
          // setMinutes("");
          setMinutesError("");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const updateTeamInMatchh = async (actionId) => {
    try {
      let tim = {};
      let teamScore = 0;
      let yellowCardNumber = 0;
      let redCardNumber = 0;
      let scorePenalty = 0;
      if (playerPopup || playerCardPopup) {
        tim = allTeamA[0];
        teamScore = isTie ? tim.scoreTieBreak : tim.teamScore;
        if (scoreA > 0) {
          teamScore = scoreA;
        }
        yellowCardNumber = tim.yellowCardNumber;
        if (yellowA > 0) {
          yellowCardNumber = yellowA;
        }

        redCardNumber = tim.redCardNumber;
        if (redA > 0) {
          redCardNumber = redA;
        }
        scorePenalty = tim.scorePenalty;
        if (penA > 0) {
          scorePenalty = penA;
        }
      }
      if (playerPopupB || playerCardPopupB) {
        tim = allTeamB[0];
        teamScore = isTie ? tim.scoreTieBreak : tim.teamScore;
        if (scoreB > 0) {
          teamScore = scoreB;
        }
        yellowCardNumber = tim.yellowCardNumber;
        if (yellowB > 0) {
          yellowCardNumber = yellowB;
        }

        redCardNumber = tim.redCardNumber;
        if (redB > 0) {
          redCardNumber = redB;
        }
        scorePenalty = tim.scorePenalty;
        if (penB > 0) {
          scorePenalty = penB;
        }
      }

      if (actionId == 1 || actionId == 5) {
        teamScore = teamScore + 1;
      }
      if (card == "yellow") {
        yellowCardNumber = yellowCardNumber + 1;
      }
      if (card == "red") {
        redCardNumber = redCardNumber + 1;
      }
      if (actionId == 4) {
        scorePenalty = scorePenalty + 1;
      }
      let data = {
        id: tim.id,
        teamScore: teamScore,
        teamScoreLose: tim.teamScoreLose,
        yellowCardNumber: yellowCardNumber,
        redCardNumber: redCardNumber,
        scorePenalty: scorePenalty,
        teamInTournamentId: tim.teamInTournamentId,
        matchId: tim.matchId,
        result: tim.result,
        nextTeam: tim.nextTeam,
        teamName: tim.teamName,
      };
      if (isTie) {
        data = {
          id: tim.id,
          scoreTieBreak: teamScore,
          yellowCardNumber: yellowCardNumber,
          redCardNumber: redCardNumber,
          scorePenalty: scorePenalty,
          teamInTournamentId: tim.teamInTournamentId,
          matchId: tim.matchId,
          result: tim.result,
          nextTeam: tim.nextTeam,
          teamName: tim.teamName,
        };
      }
      const response = await axios.put(
        `https://afootballleague.ddns.net/api/v1/TeamInMatch?room=${idMatch}`,
        data
      );
      if (isTie == false) {
        await calculateScore();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const calculateScore = async () => {
    try {
      let idTour = allTeamA[0].teamInTournament.tournamentId;
      const response = await axios.put(
        `https://afootballleague.ddns.net/api/v1/team-in-tournaments/update-score?tournamentId=${idTour}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  const PopupPlayer = (props) => {
    const { players, dataMatch } = props;
    const [minutes, setMinutes] = useState();
    const [isPen, setIsPen] = useState(false);
    const [fail, setFail] = useState(false);
    return (
      <div className={styles.popUpPlayerWrap}>
        <div className={styles.playerPopup}>
          <div>
            <h2>Chọn cầu thủ ghi bàn </h2>
            <span
              className={styles.close}
              onClick={() => {
                if (playerPopup) {
                  setPlayerPopup(false);
                } else {
                  setPlayerPopupB(false);
                }
                setMinuteIndex(0);
                setMinutes("");
              }}
            >
              X
            </span>
          </div>

          {players &&
            players.playerInTournaments.map((item) => (
              <div className={styles.playerWrap}>
                <img
                  src={item.playerInTeam.footballPlayer.playerAvatar}
                  alt=""
                />
                <span className={styles.playerName}>
                  {item.playerInTeam.footballPlayer.playerName}
                </span>
                {minuteIndex == item.id && (
                  <>
                    <div className={styles.minutes}>
                      {/* <p>Số phút ghi bàn</p> */}
                      <input
                        type="number"
                        placeholder="Số phút ghi bàn"
                        min={0}
                        onChange={(e) => {
                          setMinutes(e.target.value);
                        }}
                        value={minutes}
                        onFocus={(e) => {
                          setMinutesError("");
                        }}
                      />
                      <p className="error">{minutesError}</p>
                    </div>
                    {dataMatch &&
                      isTie == false &&
                      location.state.tourDetail.tournamentTypeId !== 2 &&
                      dataMatch[0].includes("Bảng") === false &&
                      scoreA === scoreB && (
                        <div>
                          <p className={styles.pText}>Sút luân lưu</p>
                          <input
                            className={styles.pCheck}
                            type="checkbox"
                            checked={isPen}
                            onChange={(e) => {
                              setIsPen(e.target.checked);
                            }}
                          />
                        </div>
                      )}
                    {isTie && scoreA === scoreB && (
                      <div>
                        <p className={styles.pText}>Sút luân lưu</p>
                        <input
                          className={styles.pCheck}
                          type="checkbox"
                          checked={isPen}
                          onChange={(e) => {
                            setIsPen(e.target.checked);
                          }}
                        />
                      </div>
                    )}

                    {isPen && (
                      <div>
                        <p className={styles.pText}>Sút hỏng</p>
                        <input
                          className={styles.pCheck}
                          type="checkbox"
                          checked={fail}
                          onChange={(e) => {
                            setFail(e.target.checked);
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
                <span
                  className={`${styles.choose} ${
                    minuteIndex == item.id ? styles.active : ""
                  }`}
                  onClick={() => {
                    setMinuteIndex(item.id);
                    createMatchDetail(
                      item.playerInTeam.footballPlayerId,
                      item.id,
                      1,
                      minutes,
                      isPen,
                      fail
                    );
                    setMinutes("");
                    setIsPen(false);
                    setFail(false);
                  }}
                >
                  {minuteIndex == item.id ? "Hoàn tất" : "Chọn"}
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  };
  const [cardIndex, setCardIndex] = useState(0);
  const PopupPlayerCard = (players, team) => {
    const [minutes, setMinutes] = useState();
    return (
      <div className={styles.popUpPlayerWrap}>
        <div className={styles.playerPopup}>
          <div>
            <h2>Chọn cầu thủ phạm lỗi </h2>
            <span
              className={styles.close}
              onClick={() => {
                if (playerCardPopup) {
                  setPlayerCardPopup(false);
                } else {
                  setPlayerCardPopupB(false);
                }
                setMinuteIndex(0);
                setMinutes("");
                setCardIndex(0);
                setCard("");
              }}
            >
              X
            </span>
          </div>

          {players &&
            players.players.playerInTournaments.map((item) => (
              <div className={styles.playerWrap}>
                <img
                  src={item.playerInTeam.footballPlayer.playerAvatar}
                  alt=""
                />
                <span className={styles.playerName}>
                  {item.playerInTeam.footballPlayer.playerName}
                </span>
                <div className={styles.card}>
                  <div
                    className={`${styles.yellow} ${
                      cardIndex == item.id &&
                      cardIndex == minuteIndex &&
                      card == "yellow" &&
                      styles.active
                    }`}
                    onClick={() => {
                      setCard("yellow");
                      setCardIndex(item.id);
                    }}
                  ></div>
                  <div
                    className={`${styles.red} ${
                      cardIndex == item.id &&
                      cardIndex == minuteIndex &&
                      card == "red" &&
                      styles.active
                    }`}
                    onClick={() => {
                      setCard("red");
                      setCardIndex(item.id);
                    }}
                  ></div>
                </div>
                {minuteIndex == item.id && (
                  <div className={styles.minutes}>
                    {/* <p>Số phút ghi bàn</p> */}
                    <input
                      type="number"
                      placeholder="Nhập số phút "
                      value={minutes}
                      min={0}
                      onChange={(e) => {
                        setMinutes(e.target.value);
                      }}
                      onFocus={(e) => {
                        setMinutesError("");
                      }}
                    />
                    <p className="error">{minutesError}</p>
                  </div>
                )}
                <span
                  className={`${styles.choose} ${
                    minuteIndex == item.id ? styles.active : ""
                  }`}
                  onClick={() => {
                    setMinuteIndex(item.id);
                    createMatchDetail(
                      item.playerInTeam.footballPlayerId,
                      item.id,
                      1,
                      minutes
                    );
                    setMinutes("");
                  }}
                >
                  {minuteIndex == item.id ? "Hoàn tất" : "Chọn"}
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  };
  useEffect(() => {
    // console.log(scoreA);
  }, [playerPopup]);

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
              {/* {scoreTeamA.value > 0 || scoreTeamB.value > 0 ? (
                <div className={styles.divFlex}>
                  <label id="scoreTeamA">Bàn thắng đội {item.teamName} </label>
                  <select>
                    <option value={""}></option>
                    {playerRegisterA !== null &&
                      playerRegisterA.map((item) => (
                        <option>{item.footballPlayer.playerName}</option>
                      ))}
                  </select>
                  <p className={styles.lineMin}>-</p>
                  <select>
                    <option value={""}></option>
                    {playerRegisterB !== null &&
                      playerRegisterB.map((item) => (
                        <option>{item.footballPlayer.playerName}</option>
                      ))}
                  </select>
                  <label id="scoreTeamB">
                    Bàn thắng đội {allTeamB[index].teamName}
                  </label>
                </div>
              ) : null} */}
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

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
              }}
              className={styles.action}
            >
              {checkLivestream.length === 0 &&
              (detail === null || detail.length === 0) &&
              user !== null &&
              user.userVM.id === location.state.hostTournamentId ? (
                <p
                  className={styles.updateMatch1}
                  onClick={() => {
                    setHideShowReport(true);
                  }}
                >
                  <i
                    class="fa-solid fa-exclamation"
                    style={{ marginRight: "10px" }}
                  ></i>
                  Báo cáo trận đấu
                </p>
              ) : null}

              <div
                className={hideShowReport ? "overlay active" : "overlay"}
              ></div>
              <ReportMatch
                hideShow={hideShowReport}
                setHideShow={setHideShowReport}
                inforTeam={
                  allTeamA !== null ? [{ ...allTeamA }, { ...allTeamB }] : null
                }
                reportMatch={reportMatch !== null ? reportMatch : null}
                postReportMatch={postReportMatch}
              />
              {checkLivestream.length === 0 &&
              user !== null &&
              location.state !== null &&
              user.userVM.id === location.state.hostTournamentId &&
              (reportMatch === null || reportMatch.length === 0) ? (
                <p
                  className={styles.updateMatch}
                  onClick={() =>
                    navigate(`/detailMatch/${idMatch}`, {
                      state: {
                        hostTournamentId: location.state.hostTournamentId,
                        tourDetail: location.state.tourDetail,
                        indexMatch: dataMatch[2],
                        title: dataMatch[0],
                        index: dataMatch[1],
                        lastMatch: dataMatch[3],
                        // title={dataMatch[0]}
                        // indexMatch={dataMatch[2]}
                        // index={dataMatch[1]}
                        // lastMatch={dataMatch[3]}
                      },
                    })
                  }
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
                  {playerPopup && (
                    <PopupPlayer
                      players={playerTeamA}
                      dataMatch={dataMatch}
                      team="teamA"
                    />
                  )}
                  {playerCardPopup && (
                    <PopupPlayerCard players={playerTeamA} team="teamA" />
                  )}
                  {playerPopupB && (
                    <PopupPlayer
                      players={playerTeamB}
                      dataMatch={dataMatch}
                      team="teamB"
                    />
                  )}
                  {playerCardPopupB && (
                    <PopupPlayerCard players={playerTeamB} team="teamB" />
                  )}
                  <div className={styles.logo}>
                    <img
                      src={item.teamInTournament.team.teamAvatar}
                      alt={item.teamName}
                    />
                    <h2>{item.teamName}</h2>
                    {checkLivestream.length > 0 &&
                    user !== null &&
                    location.state !== null &&
                    user.userVM.id === location.state.hostTournamentId ? (
                      <div className={styles.editWrap}>
                        <button
                          className={styles.editScore}
                          onClick={() => {
                            setPlayerPopup(true);
                          }}
                        >
                          Ghi bàn
                        </button>
                        <button
                          className={styles.editCard}
                          onClick={() => {
                            setPlayerCardPopup(true);
                          }}
                        >
                          Thẻ phạt
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.score__wrap}>
                    <div className={styles.score__main}>
                      <div className={styles.score__A}>{scoreA == null? 0: scoreA}</div>
                      <div className={styles.line}>-</div>
                      <div className={styles.score__B}>{scoreB == null? 0: scoreB}</div>
                    </div>
                    {checkPen && (
                      <>
                        <p className={styles.penText}>Tỉ số sút luân lưu</p>
                        <div className={styles.score__pen}>
                          <div className={styles.score__A}>
                            {penA == 0 ? item.scorePenalty : penA}
                          </div>
                          <div className={styles.line}>-</div>
                          <div className={styles.score__B}>
                            {penB == 0 ? allTeamB[index].scorePenalty : penB}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={styles.logo}>
                    <img
                      src={allTeamB[index].teamInTournament.team.teamAvatar}
                      alt={allTeamB[index].teamName}
                    />
                    <h2>{allTeamB[index].teamName}</h2>
                    {checkLivestream.length > 0 &&
                    user !== null &&
                    location.state !== null &&
                    user.userVM.id === location.state.hostTournamentId ? (
                      <div className={styles.editWrap}>
                        <button
                          className={styles.editScore}
                          onClick={() => {
                            setPlayerPopupB(true);
                          }}
                        >
                          Ghi bàn
                        </button>
                        <button
                          className={styles.editCard}
                          onClick={() => {
                            setPlayerCardPopupB(true);
                          }}
                        >
                          Thẻ phạt
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
              {reportMatch !== null ? (
                <h1
                  style={{
                    color: "red",
                    fontSize: 24,
                    marginTop: 40,
                    textAlign: "center",
                  }}
                >
                  {reportMatch.team.teamName +
                    " đã bị xử thua vì " +
                    reportMatch.reason.split("-")[1]}
                </h1>
              ) : (
                <>
                  <div className={styles.player__score}>
                    <div className={styles.player__A}>
                      {detail &&
                        allTeamA &&
                        detail.map((item) => (
                          <>
                            {item.playerSide == "teamA" &&
                              item.actionMatchId != 4 && (
                                <div className={styles.playerAction}>
                                  <div className={styles.player}>
                                    <img
                                      style={{
                                        width: 30,
                                        marginRight: 10,
                                      }}
                                      src={
                                        item.actionMatchId === 1
                                          ? "/assets/icons/soccer-ball-retina.png"
                                          : item.actionMatchId === 5
                                          ? "/assets/icons/soccer-ball-retina.png"
                                          : item.actionMatchId === 2
                                          ? "/assets/icons/yellow-card.png"
                                          : "/assets/icons/red-card.png"
                                      }
                                      alt="ball"
                                    />
                                    <p>{item.namePlayer}</p>
                                  </div>

                                  {item.minutesScore.map(
                                    (itemMin, indexMin) => {
                                      return (
                                        <span key={indexMin}>{itemMin}'</span>
                                      );
                                    }
                                  )}
                                </div>
                              )}
                          </>
                        ))}
                    </div>
                    <div className={styles.logo__ball}>
                      <img
                        src="/assets/icons/soccer-ball-retina.png"
                        alt="ball"
                      />
                    </div>
                    <div className={styles.player__B}>
                      {detail &&
                        allTeamB &&
                        detail.map((item) => (
                          <>
                            {item.playerSide == "teamB" &&
                              item.actionMatchId != 4 && (
                                <div className={styles.playerAction}>
                                  <div className={styles.player}>
                                    <img
                                      style={{
                                        width: 30,
                                        marginRight: 10,
                                      }}
                                      src={
                                        item.actionMatchId === 1
                                          ? "/assets/icons/soccer-ball-retina.png"
                                          : item.actionMatchId === 5
                                          ? "/assets/icons/soccer-ball-retina.png"
                                          : item.actionMatchId === 2
                                          ? "/assets/icons/yellow-card.png"
                                          : "/assets/icons/red-card.png"
                                      }
                                      alt="ball"
                                    />
                                    <p>{item.namePlayer}</p>
                                  </div>

                                  {item.minutesScore.map(
                                    (itemMin, indexMin) => {
                                      return (
                                        <span key={indexMin}>{itemMin}'</span>
                                      );
                                    }
                                  )}
                                </div>
                              )}
                          </>
                        ))}
                    </div>
                  </div>
                  {checkPen && (
                    <div className={styles.penPlayer__score}>
                      <h2 className={styles.titlePen}>Loạt sút luân lưu</h2>
                      <div className={styles.player__score}>
                        <div className={styles.player__A}>
                          {detail &&
                            allTeamA &&
                            detail.map((item) => (
                              <>
                                {item.playerSide == "teamA" &&
                                  item.actionMatchId == 4 && (
                                    <div className={styles.playerAction}>
                                      <div className={styles.player}>
                                        <img
                                          style={{
                                            width: 30,
                                            marginRight: 10,
                                          }}
                                          src={
                                            item.actionMatchId === 4
                                              ? "/assets/icons/soccer-ball-retina.png"
                                              : item.actionMatchId === 2
                                              ? "/assets/icons/yellow-card.png"
                                              : "/assets/icons/red-card.png"
                                          }
                                          alt="ball"
                                        />
                                        <p
                                          className={`${
                                            item.statusPen === false
                                              ? styles.fail
                                              : ""
                                          }`}
                                        >
                                          {item.namePlayer}
                                        </p>
                                      </div>

                                      {/* {item.minutesScore.map((itemMin, indexMin) => {
                                return <span key={indexMin}>{itemMin}</span>;
                              })} */}
                                    </div>
                                  )}
                              </>
                            ))}
                        </div>
                        <div className={styles.logo__ball}>
                          <img
                            src="/assets/icons/soccer-ball-retina.png"
                            alt="ball"
                          />
                        </div>
                        <div className={styles.player__B}>
                          {detail &&
                            allTeamB &&
                            detail.map((item) => (
                              <>
                                {item.playerSide == "teamB" &&
                                  item.actionMatchId == 4 && (
                                    <div className={styles.playerAction}>
                                      <div className={styles.player}>
                                        <img
                                          style={{
                                            width: 30,
                                            marginRight: 10,
                                          }}
                                          src={
                                            item.actionMatchId === 4
                                              ? "/assets/icons/soccer-ball-retina.png"
                                              : item.actionMatchId === 2
                                              ? "/assets/icons/yellow-card.png"
                                              : "/assets/icons/red-card.png"
                                          }
                                          alt="ball"
                                        />
                                        <p
                                          className={`${
                                            item.statusPen === false
                                              ? styles.fail
                                              : ""
                                          }`}
                                        >
                                          {item.namePlayer}
                                        </p>
                                      </div>

                                      {/* {item.minutesScore.map((itemMin, indexMin) => {
                                return <span key={indexMin}>{itemMin}</span>;
                              })} */}
                                    </div>
                                  )}
                              </>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {reportMatch !== null ? null : predict != null && predict.user ? (
              <div className={styles.truePredic}>
                <h3>Người dự đoán đúng nhất</h3>
                <div className={styles.match__team}>
                  <img
                    src="/assets/img/findTournaments/celeb.png"
                    alt=""
                    className={styles.celeb}
                  />
                  <div className={`${styles.logo} ${styles.userPredict}`}>
                    <img
                      src={
                        predict != undefined &&
                        predict.user &&
                        predict.user.avatar
                      }
                      alt={
                        predict != undefined &&
                        predict.user &&
                        predict.user.avatar
                      }
                    />
                    <h2>
                      {predict != undefined &&
                        predict.user &&
                        predict.user.username}
                    </h2>
                  </div>
                  <div className={styles.logo}>
                    <h2>
                      {allTeamA.length > 0 &&
                      predict != undefined &&
                      predict.user &&
                      allTeamA[0].id == predict.teamInMatchAid
                        ? allTeamA[0].teamName
                        : allTeamB[0].teamName}
                    </h2>
                  </div>
                  <div className={styles.score__A}>
                    {allTeamA.length > 0 &&
                    predict != null &&
                    predict.user &&
                    allTeamA[0].id == predict.teamInMatchAid
                      ? predict.teamAscore
                      : predict.teamBscore}
                  </div>
                  <div className={styles.line}>-</div>
                  <div className={styles.score__B}>
                    {allTeamA.length > 0 &&
                    predict != undefined &&
                    predict.user &&
                    allTeamB[0].id == predict.teamInMatchBid
                      ? predict.teamBscore
                      : predict.teamAscore}
                  </div>
                  <div className={styles.logo}>
                    <h2>
                      {allTeamA.length > 0 &&
                      predict != undefined &&
                      predict.user &&
                      allTeamB[0].id == predict.teamInMatchBid
                        ? allTeamB[0].teamName
                        : allTeamA[0].teamName}
                    </h2>
                  </div>
                  <img
                    src="/assets/img/findTournaments/celeb.png"
                    alt=""
                    className={`${styles.celeb} ${styles.reverse}`}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className={styles.match__menu}>
              <Link
                state={{
                  tourDetail: location.state.tourDetail,
                  hostTournamentId: location.state.hostTournamentId,
                }}
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
                state={{
                  tourDetail: location.state.tourDetail,
                  hostTournamentId: location.state.hostTournamentId,
                }}
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
            {activeTeamDetail === `/match/${idMatch}/livestream` &&
            uId !== null &&
            uId != 0 ? (
              <div
                className={
                  !fullScreen
                    ? styles.realScore
                    : `${styles.realScore} ${styles.realScoreFull}`
                }
              >
                <p className={styles.teamLeft}>
                  {allTeamA.length > 0 && allTeamA[0].teamName}
                </p>
                <p className={styles.scoreTeam}>
                  {scoreA== null? 0:scoreA}{" "}
                  -{" "}
                  {scoreB== null? 0:scoreB}
                </p>
                <p className={styles.teamRight}>
                  {allTeamB.length > 0 && allTeamB[0].teamName}
                </p>
              </div>
            ) : null}

            {renderByLink()}
          </>
        ) : (
          <p className={styles.error}>Trận đấu này không tồn tại</p>
        )}
      </div>
      {/* <form action="">
        <input type="text" value={room} onChange={(e) => {

          setRoom(e.target.value);
        }} />
        <button onClick={(e) =>{e.preventDefault(); joinRoom(room);}}>join</button>
      </form> */}

      <Footer />
    </>
  );
}

export default Match;
