import React, { useEffect, useState } from "react";
import ModalDenyMatchDetail from "./ModalDenyMatchDetail";
import { updateNextTeamInRoundAPI } from "../../api/TeamInMatchAPI";
import PenaltyMatch from "./penalty/PenaltyMatch";
import { deleteMatchDetailByTypeAPI } from "../../api/MatchDetailAPI";
import { toast } from "react-toastify";
export default function DetailInMatch(props) {
  const {
    hideShow,
    setHideShow,
    typeDetail,
    nameTeamA,
    nameTeamB,
    numTeamA,
    numTeamB,
    playerA,
    playerB,
    matchDetail,
    idMatch,
    updateScoreInMatch,
    statusUpdate,
    setStatusUpdate,
    tourDetail,
    indexMatch,
    title,
    lastMatch,
    createTieBreak,
    setMatchDetail,
  } = props;

  const [detail, setDetail] = useState([]);
  const [detailPenalty, setDetailPenalty] = useState([]);
  const [statusCall, setStatusCall] = useState(false);
  const [newMatchDetail, setNewMatchDetail] = useState(null);
  const [hideShowDeny, setHideShowDeny] = useState(null);
  const [scoreAPenalty, setScoreAPenalty] = useState(0);
  const [scoreBPenalty, setScoreBPenalty] = useState(0);
  const [statusCreate, setStatusCreate] = useState(true);
  let matchMinutes = null;

  useEffect(() => {
    matchMinutes = tourDetail !== null ? tourDetail.matchMinutes : null;
    const matchDetail = checkMatchDetail();
    if (typeDetail === "score" && matchDetail !== null) {
      const score = [];
      for (let i = 0; i < matchDetail.length; i++) {
        if (matchDetail[i].matchScore === 1) {
          score.push(matchDetail[i]);
        }
      }
    } else if (typeDetail === "yellow" && matchDetail !== null) {
      const yellow = [];
      for (let i = 0; i < matchDetail.length; i++) {
        if (matchDetail[i].yellowCardNumber === 1) {
          yellow.push(matchDetail[i]);
        }
      }
    } else if (typeDetail === "red" && matchDetail !== null) {
      const red = [];
      for (let i = 0; i < matchDetail.length; i++) {
        if (matchDetail[i].redCardNumber === 1) {
          red.push(matchDetail[i]);
        }
      }
    }

    coverMatchDetail();
  }, [typeDetail, statusUpdate === false, matchDetail]);
  useEffect(() => {
    const matchDetail = checkMatchDetail();
    if (matchDetail !== null) {
      const detailA = [];
      for (const item of matchDetail) {
        if (
          item.actionMatchId === 4 &&
          item.teamId === nameTeamA.teamInTournament.team.id
        )
          detailA.push(item);
      }
      const detailB = [];
      for (const item of matchDetail) {
        if (
          item.actionMatchId === 4 &&
          item.teamId === nameTeamB.teamInTournament.team.id
        )
          detailB.push(item);
      }

      if (
        (scoreAPenalty === 0 && scoreBPenalty === 0) ||
        ((scoreAPenalty !== 0 || scoreAPenalty !== 0) &&
          scoreAPenalty + scoreBPenalty === detailA.length + detailB.length)
      ) {
        setScoreAPenalty(detailA.length);
        setScoreBPenalty(detailB.length);
        getDataPenaltyDetail([...detailA, ...detailB]);
      }
    }
  }, [scoreAPenalty === 0, scoreBPenalty === 0, matchDetail]);
  const checkMatchDetail = () => {
    return nameTeamA !== null && nameTeamB !== null
      ? nameTeamA.scoreTieBreak === null && nameTeamB.scoreTieBreak === null
        ? (typeDetail === "score" &&
            nameTeamA.teamScore + "-" + nameTeamB.teamScore ===
              numTeamA + "-" + numTeamB) ||
          (typeDetail === "yellow" &&
            nameTeamA.yellowCardNumber + "-" + nameTeamB.yellowCardNumber ===
              numTeamA + "-" + numTeamB) ||
          (typeDetail === "red" &&
            nameTeamA.redCardNumber + "-" + nameTeamB.redCardNumber ===
              numTeamA + "-" + numTeamB)
          ? matchDetail
          : null
        : (typeDetail === "score" &&
            nameTeamA.scoreTieBreak + "-" + nameTeamB.scoreTieBreak ===
              numTeamA + "-" + numTeamB) ||
          (typeDetail === "yellow" &&
            nameTeamA.yellowCardNumber + "-" + nameTeamB.yellowCardNumber ===
              numTeamA + "-" + numTeamB) ||
          (typeDetail === "red" &&
            nameTeamA.redCardNumber + "-" + nameTeamB.redCardNumber ===
              numTeamA + "-" + numTeamB)
        ? matchDetail
        : null
      : null;
  };
  const coverMatchDetail = () => {
    const matchDetail = checkMatchDetail();
    if (matchDetail !== null) {
      const newMatchDetail = [];
      if (typeDetail === "score") {
        matchDetail.map((item, index) => {
          if (item.actionMatchId === 1) {
            newMatchDetail.push(item);
          }
        });
      } else if (typeDetail === "yellow") {
        matchDetail.map((item, index) => {
          if (item.actionMatchId === 2) {
            newMatchDetail.push(item);
          }
        });
      } else {
        matchDetail.map((item, index) => {
          if (item.actionMatchId === 3) {
            newMatchDetail.push(item);
          }
        });
      }
      getDataDetail(newMatchDetail);
      setNewMatchDetail(newMatchDetail);
    } else {
      setDetail([]);
    }
  };

  const renderSelectByNumber = (data, playerId) => {
    if (data != undefined) {
      let array = [];
      for (let i = -1; i < data.length; i++) {
        if (i === -1) {
          if (playerId == null)
            array.push(<option selected>Chọn cầu thủ</option>);
          else array.push(<option>Chọn cầu thủ</option>);
        } else {
          if (playerId !== null) {
            array.push(
              <option
                value={JSON.stringify(data[i])}
                selected={
                  playerId === data[i].playerInTournamentId
                    ? JSON.stringify(data[i])
                    : null
                }
              >
                {data[i].playerName}
              </option>
            );
          } else {
            array.push(
              <option value={JSON.stringify(data[i])}>
                {data[i].playerName}
              </option>
            );
          }
        }
      }
      return array;
    }
  };
  const getDataDetail = (data) => {
    const player = [];
    const newPlayerA = [];
    if (data !== null) {
      const idTeamA = nameTeamA.teamInTournament.team.id;
      for (let index in data) {
        if (data[index].teamId === idTeamA) {
          newPlayerA.push({
            id: index,
            actionMatchId: data[index].actionMatchId,
            actionMinute: data[index].actionMinute,
            matchId: data[index].matchId,
            playerInTournamentId: data[index].playerInTournamentId,
            footballPlayerId: data[index].footballPlayerId,
          });
        }
      }
      newPlayerA.sort(function (a, b) {
        return a.actionMinute - b.actionMinute;
      });
      player.push(...newPlayerA);
      const newPlayerB = [];
      const idTeamB = nameTeamB.teamInTournament.team.id;
      for (let index in data) {
        if (data[index].teamId === idTeamB)
          newPlayerB.push({
            id: index,
            actionMatchId: data[index].actionMatchId,
            actionMinute: data[index].actionMinute,
            matchId: data[index].matchId,
            playerInTournamentId: data[index].playerInTournamentId,
            footballPlayerId: data[index].footballPlayerId,
          });
      }

      newPlayerB.sort(function (a, b) {
        return a.actionMinute - b.actionMinute;
      });
      player.push(...newPlayerB);
      setDetail(player);
    }
  };
  const getDataPenaltyDetail = (data) => {
    const player = [];
    const newPlayerA = [];
    if (data !== null) {
      const idTeamA = nameTeamA.teamInTournament.team.id;
      for (let index in data) {
        if (data[index].teamId === idTeamA) {
          newPlayerA.push({
            id: index,
            actionMatchId: data[index].actionMatchId,
            actionMinute: data[index].actionMinute,
            matchId: data[index].matchId,
            playerInTournamentId: data[index].playerInTournamentId,
            footballPlayerId: data[index].footballPlayerId,
            statusPen: data[index].statusPen,
          });
        }
      }
      newPlayerA.sort(function (a, b) {
        return a.actionMinute - b.actionMinute;
      });
      player.push(...newPlayerA);
      const newPlayerB = [];
      const idTeamB = nameTeamB.teamInTournament.team.id;
      for (let index in data) {
        if (data[index].teamId === idTeamB)
          newPlayerB.push({
            id: index,
            actionMatchId: data[index].actionMatchId,
            actionMinute: data[index].actionMinute,
            matchId: data[index].matchId,
            playerInTournamentId: data[index].playerInTournamentId,
            footballPlayerId: data[index].footballPlayerId,
            statusPen: data[index].statusPen,
          });
      }

      newPlayerB.sort(function (a, b) {
        return a.actionMinute - b.actionMinute;
      });
      player.push(...newPlayerB);

      setDetailPenalty(player);
      // setDetail(player);
    }
  };
  const renderSelectByMinutes = (data) => {
    let array = [];

    for (let i = 0; i <= tourDetail.matchMinutes * 2; i++) {
      if (i === 0) {
        if (data == null) array.push(<option selected>TG</option>);
        else array.push(<option>TG</option>);
      } else {
        if (data !== null) {
          array.push(
            <option value={[i]} selected={+data === i ? [i] : null}>
              {i}
            </option>
          );
        } else {
          array.push(<option value={i}>{i}</option>);
        }
      }
    }
    return array;
  };

  const onChangePenalty = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "A":
        {
          setScoreAPenalty(+value);
          setDetailPenalty([]);
        }

        break;
      default:
        {
          if (
            ((+value === 0 || scoreAPenalty === 0) &&
              Math.abs(+value - scoreAPenalty) > 3) ||
            (+value < 6 &&
              scoreAPenalty < 6 &&
              Math.abs(+value - scoreAPenalty) > 2) ||
            ((+value > 5 || scoreAPenalty > 5) &&
              Math.abs(+value - scoreAPenalty) > 1)
          ) {
            toast.error("Tỉ số sai với loạt penalty", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setScoreBPenalty(0);
            setScoreAPenalty(0);
          } else {
            setScoreBPenalty(+value);
          }
          setDetailPenalty([]);
        }

        break;
    }
  };

  const renderInputByNumber = (number, data, type) => {
    let array = [];
    for (let i = 0; i < number; i++) {
      let calc = i + +numTeamA;
      array.push(
        <div
          style={{
            display: "flex",
          }}
        >
          <div>
            <p>Tên cầu thủ</p>
            <select
              name={type === "B" ? i + +numTeamA + "-object" : i + "-object"}
              onChange={onChangeHandler}
              style={{
                marginRight: 20,
                padding: "10px 20px",
                marginBottom: 20,
                width: 200,
              }}
            >
              {renderSelectByNumber(
                data,
                detail !== null && detail.length === +numTeamA + +numTeamB
                  ? type === "B"
                    ? detail[calc].playerInTournamentId
                    : detail[i].playerInTournamentId
                  : null
                // ,
                // player.length > 0 ? player[i].idPlayer : null
              )}
            </select>
          </div>
          <div>
            <p>Thời gian</p>
            <select
              onChange={onChangeHandler}
              name={type === "B" ? i + +numTeamA + "-minutes" : `${i}-minutes`}
              style={{
                marginBottom: 20,
                padding: "10px 5px",
              }}
            >
              {renderSelectByMinutes(
                detail !== null && detail.length === +numTeamA + +numTeamB
                  ? type === "B"
                    ? detail[calc].actionMinute
                    : detail[i].actionMinute
                  : null
              )}
            </select>
          </div>
          {/* <input
            value={
              detail !== null && detail.length === +numTeamA + +numTeamB
                ? type === "B"
                  ? detail[calc].actionMinute
                  : detail[i].actionMinute
                : null
            }
            className="btnInput"
            style={{
              margin: "10px 0",
            }}
          /> */}
        </div>
      );
    }
    return array;
  };

  const renderInputByNumberPenalty = (number, data, type) => {
    let array = [];

    for (let i = 0; i < number; i++) {
      let calc = i + +scoreAPenalty;
      const findId = +scoreAPenalty;
      array.push(
        <div
          style={{
            display: "flex",
          }}
        >
          <select
            name={type === "B" ? i + findId : i}
            onChange={onChangeHandlerPenalty}
            style={{
              marginRight: 20,
              padding: "10px 20px",
              marginBottom: 20,
              width: 200,
            }}
          >
            {renderSelectByNumber(
              data,
              detailPenalty !== null &&
                detailPenalty.length === +scoreAPenalty + +scoreBPenalty
                ? type === "B"
                  ? detailPenalty[calc].playerInTournamentId
                  : detailPenalty[i].playerInTournamentId
                : null
            )}
          </select>
        </div>
      );
    }
    return array;
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const id = name.split("-")[0];
    const type = name.split("-")[1];
    const valueObj = JSON.parse(value);

    if (
      (typeDetail === "score" && matchDetail !== null) ||
      (typeDetail !== "score" &&
        detail !== null &&
        detail.length > 0 &&
        type === "object")
    ) {
      const dataDetail = typeDetail === "score" ? matchDetail : detail;

      const findPlayerYelloCard = dataDetail.filter(
        (item) => item.actionMatchId === 2
      );
      const findPlayerRedCard = dataDetail.filter(
        (item) => item.actionMatchId === 3
      );
      console.log(findPlayerYelloCard);
      if (findPlayerYelloCard.length > 0 || findPlayerRedCard.length > 0) {
        const getPlayerHasTwoYellowCard = [];
        for (const playerYellowCard of findPlayerYelloCard) {
          if (getPlayerHasTwoYellowCard.length > 0) {
            const itemYellowCardIndex = getPlayerHasTwoYellowCard.findIndex(
              (item) =>
                item.playerInTournamentId ===
                playerYellowCard.playerInTournamentId
            );
            if (itemYellowCardIndex === -1) {
              getPlayerHasTwoYellowCard.push({
                ...playerYellowCard,
                statusCard: false,
              });
            } else {
              getPlayerHasTwoYellowCard[itemYellowCardIndex].statusCard = true;
            }
          } else {
            getPlayerHasTwoYellowCard.push({
              ...playerYellowCard,
              statusCard: false,
            });
          }
        }
        for (const itemYellowCard of getPlayerHasTwoYellowCard) {
          if (
            valueObj.playerInTournamentId ===
              itemYellowCard.playerInTournamentId &&
            itemYellowCard.statusCard === true
          ) {
            setStatusCreate(false);
            if (typeDetail === "score")
              toast.error(
                "Cầu thủ đã bị 2 thẻ vàng hoặc thẻ đỏ không thể ghi bàn",
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
            else
              toast.error("Cầu thủ đã bị 2 thẻ vàng trước đó", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

            return;
          }
        }
        for (const itemRedCard of findPlayerRedCard) {
          if (
            valueObj.playerInTournamentId === itemRedCard.playerInTournamentId
          ) {
            setStatusCreate(false);
            if (typeDetail === "score")
              toast.error(
                "Cầu thủ đã bị 2 thẻ vàng hoặc thẻ đỏ không thể ghi bàn",
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
            else
              toast.error("Cầu thủ đã bị thẻ đỏ trước đó", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            return;
          }
        }
      }
    }
    setStatusCreate(true);
    if (detail !== null && detail.length > 0) {
      const newDetail = detail;
      const findIndex = newDetail.findIndex((item, index) => item.id === id);
      if (findIndex === -1) {
        newDetail.push({
          id: id,
          actionMatchId:
            typeDetail === "score" ? 1 : typeDetail === "yellow" ? 2 : 3,
          actionMinute: type === "object" ? null : valueObj + "",
          matchId: +idMatch,
          playerInTournamentId:
            type === "object" ? valueObj.playerInTournamentId : null,
          footballPlayerId: valueObj.id,
        });
      } else {
        if (type === "object") {
          newDetail[findIndex].playerInTournamentId =
            valueObj.playerInTournamentId;
          newDetail[findIndex].footballPlayerId = valueObj.id;
        } else newDetail[findIndex].actionMinute = valueObj + "";
      }

      setDetail(newDetail);
    } else {
      setDetail([
        {
          id: id,
          actionMatchId:
            typeDetail === "score" ? 1 : typeDetail === "yellow" ? 2 : 3,
          actionMinute: type === "object" ? null : valueObj + "",
          matchId: +idMatch,
          playerInTournamentId:
            type === "object" ? valueObj.playerInTournamentId : null,
          footballPlayerId: valueObj.id,
        },
      ]);
    }
  };
  const onChangeHandlerPenalty = (e) => {
    const { name, value } = e.target;
    const id = name;
    const valueObj = JSON.parse(value);
    if (detailPenalty !== null && detailPenalty.length > 0) {
      const newDetail = detailPenalty;
      const findIndex = newDetail.findIndex((item, index) => item.id == id);
      if (findIndex === -1) {
        newDetail.push({
          id: id,
          actionMatchId: 4,
          actionMinute: null,
          matchId: +idMatch,
          playerInTournamentId: valueObj.playerInTournamentId,
          footballPlayerId: valueObj.id,
          statusPen: true,
        });
      } else {
        newDetail[findIndex].playerInTournamentId =
          valueObj.playerInTournamentId;
        newDetail[findIndex].footballPlayerId = valueObj.id;
      }
      setDetailPenalty(newDetail);
    } else {
      setDetailPenalty([
        {
          id: id,
          actionMatchId: 4,
          actionMinute: null,
          matchId: +idMatch,
          playerInTournamentId: valueObj.playerInTournamentId,
          footballPlayerId: valueObj.id,
          statusPen: true,
        },
      ]);
    }
  };
  const updateNextTeamInNextRound = () => {
    try {
      const data = {
        tournamentId: tourDetail.id,
        matchId:
          tourDetail.tournamentTypeId === 1
            ? +idMatch
            : indexMatch < tourDetail.groupNumber ||
              (tourDetail.tournamentTypeId === 3 && title.includes("tie-break"))
            ? 0
            : +idMatch,
        groupName:
          tourDetail.tournamentTypeId === 3 && title.includes("Bảng")
            ? title.split(" ")[1]
            : null,
      };

      const response = updateNextTeamInRoundAPI(data);
    } catch (err) {
      console.error(err);
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    for (let item of detail) {
      delete item.id;
    }
    let teamWinPenalty = null;
    if (+scoreAPenalty !== 0 || +scoreBPenalty !== 0) {
      teamWinPenalty =
        scoreAPenalty > scoreBPenalty
          ? scoreAPenalty +
            "-" +
            nameTeamA.teamInTournament.team.id +
            "-" +
            scoreBPenalty
          : scoreBPenalty +
            "-" +
            nameTeamB.teamInTournament.team.id +
            "-" +
            scoreAPenalty;
      for (let item of detailPenalty) {
        delete item.id;
      }
    }

    if (scoreAPenalty !== 0 || scoreBPenalty !== 0) {
      await deleteMatchDetailPenalty();
    }

    await updateScoreInMatch(
      [...detail, ...detailPenalty],
      typeDetail === "score" ? 1 : typeDetail === "yellow" ? 2 : 3,
      teamWinPenalty,
      title
    );
    setMatchDetail(null);
    setDetail([]);
    if (
      tourDetail.tournamentTypeId !== 2 &&
      (tourDetail.tournamentTypeId === 1 ||
        (tourDetail.tournamentTypeId === 3 &&
          (!title.includes("Bảng") || lastMatch === true)))
    ) {
      if (
        lastMatch &&
        title.includes("Bảng") &&
        title.includes("tie-break") === false
      ) {
        const flagTieBreak = await createTieBreak();
        if (flagTieBreak === false) updateNextTeamInNextRound();
      } else {
        updateNextTeamInNextRound();
      }
    }

    setNewMatchDetail(null);
  };

  const deleteMatchDetailPenalty = async () => {
    try {
      const response = await deleteMatchDetailByTypeAPI(idMatch, "penalty");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div
        id="exampleModal"
        className={
          hideShow
            ? hideShowDeny
              ? "popup__player zindex"
              : "popup__player active"
            : "popup__player"
        }
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <form onSubmit={onSubmitHandler}>
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Chi tiết{" "}
                  {typeDetail === "score"
                    ? "bàn thắng"
                    : typeDetail === "yellow"
                    ? "thẻ vàng"
                    : "thẻ đỏ"}
                </h5>
                <div
                  className={hideShowDeny ? "overlay active" : "overlay"}
                ></div>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setHideShowDeny(true);
                    setScoreAPenalty(0);
                    setScoreBPenalty(0);
                  }}
                ></button>
              </div>
              <div
                class="modal-body ic"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  lineHeight: 2,
                }}
              >
                <div>
                  <p
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {nameTeamA !== null && nameTeamB !== null
                      ? nameTeamA.teamName + " - " + nameTeamB.teamName
                      : null}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 30,
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {detail !== null
                      ? renderInputByNumber(numTeamA, playerA, "A")
                      : null}
                  </div>
                  <div>
                    {detail !== null
                      ? renderInputByNumber(numTeamB, playerB, "B")
                      : null}
                  </div>
                </div>
                {(tourDetail.tournamentTypeId === 2 && title !== null) ||
                (tourDetail.tournamentTypeId !== 2 &&
                  (title.includes("Bảng") === false ||
                    title.includes("tie-break") === true) &&
                  +numTeamA === +numTeamB &&
                  typeDetail === "score") ? (
                  <div>
                    <h1
                      style={{
                        fontWeight: 600,
                        textAlign: "center",
                        marginBottom: 20,
                      }}
                    >
                      Tỉ số bàn thắng luân lưu
                    </h1>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "110%",
                        marginBottom: 20,
                      }}
                    >
                      <input
                        className="-agile"
                        value={scoreAPenalty}
                        name="A"
                        onChange={onChangePenalty}
                      />
                      <p>-</p>
                      <input
                        className="-agile"
                        value={scoreBPenalty}
                        name="B"
                        onChange={onChangePenalty}
                      />
                    </div>

                    {scoreAPenalty !== 0 || scoreBPenalty !== 0 ? (
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            textAlign: "center",
                            marginBottom: 20,
                          }}
                        >
                          Chi tiết bàn thắng luân lưu
                        </h1>
                        <PenaltyMatch
                          scoreA={scoreAPenalty}
                          scoreB={scoreBPenalty}
                          playerA={playerA}
                          playerB={playerB}
                          renderInputByNumberPenalty={
                            renderInputByNumberPenalty
                          }
                          detailPenalty={
                            detailPenalty.length > 0 ? detailPenalty : null
                          }
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    // setHideShow(false);
                    // setNewMatchDetail([]);
                    // setStatusUpdate(true);
                    setHideShowDeny(true);
                    setScoreAPenalty(0);
                    setScoreBPenalty(0);
                  }}
                  style={{
                    padding: "10px 15px",
                  }}
                >
                  Đóng
                </button>
                {statusCreate ? (
                  <button
                    style={{
                      padding: "10px 15px",
                    }}
                    type="submit"
                    class="btn btn-primary"
                  >
                    Xác nhận
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>

      <ModalDenyMatchDetail
        setMatchDetail={setMatchDetail}
        hideShow={hideShowDeny}
        setHideShow={setHideShowDeny}
        setNewMatchDetail={setNewMatchDetail}
        setStatusUpdate={setStatusUpdate}
        setHideShowNormal={setHideShow}
        setDetail={setDetail}
      />
    </div>
  );
}
