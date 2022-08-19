import React, { useState, useEffect, useRef } from "react";
import { getAPI } from "../../api/index";
import LoadingAction from "../LoadingComponent/LoadingAction";
import { toast } from "react-toastify";
import { addTeamInTournamentAPI } from "../../api/TeamInTournamentAPI";
import { addPlayerInTournamentAPI } from "../../api/PlayerInTournamentAPI";
import { NotiFootballInTournamentAPI } from "../../api/System";
import { getPlayerBusyInTeambyTeamIdAPI } from "../../api/PlayerInTeamAPI";
import { async } from "@firebase/util";
import ModelNotRegisterInTour from "./ModelNotRegisterInTour";
export default function RegisterInTournament(props) {
  const {
    idUser,
    tourDetail,
    setCheckRegistertour,
    hideShow,
    setHideShow,
    postNotificationforTeamManager,
    status,
    setStatus,
    inTour,
    numPlayer,
    teamInTournament,
  } = props;
  const [playerInTeam, setPlayerInTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideShowDeny, setHideShowDeny] = useState(false);
  const [countChoice, setCountChoice] = useState(0);
  const [listClothes, setListClothes] = useState([]);
  const [error, setError] = useState(false);
  const rowRef = useRef();
  useEffect(() => {
    getListPlayerInTeamByIdTeam();
  }, [idUser, status === true]);
  // console.log(tourDetail);
  const getListPlayerInTeamByIdTeam = async () => {
    setLoading(true);
    const afterURL = `PlayerInTeam?teamId=${idUser}&status=true&pageIndex=1&limit=50`;
    const response = await getAPI(afterURL);
    const ids = response.data.playerInTeamsFull;
    const players = ids.map(async (player) => {
      const playerResponse = await getPlayerById(player.footballPlayerId);
      playerResponse.idPlayerInTeam = player.id;
      playerResponse.choice = false;
      playerResponse.clothesNumber = -1;
      return playerResponse;
    });
    const playersData = await Promise.all(players);
    playersData.countList = response.data.countList;
    deletePlayerBusyInAnotherTournament(playersData);
  };
  const deletePlayerBusyInAnotherTournament = async (data) => {
    //console.log(data);
    try {
      const response = await getPlayerBusyInTeambyTeamIdAPI(idUser);
      if (response.status === 200) {
        const playerBusy = response.data.playerInTeamsFull;
        const newData = [];
        for (let index in data) {
          if (index !== "countList") {
            let flag = false;
            for (let indexRes in playerBusy) {
              if (data[index].idPlayerInTeam === playerBusy[indexRes].id) {
                flag = true;
                break;
              }
            }
            if (!flag) {
              newData.push(data[index]);
            }
          }
        }

        setPlayerInTeam(newData);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getPlayerById = async (idPlayer) => {
    const afterURL = `football-players/${idPlayer}`;
    const response = await getAPI(afterURL);
    return response.data;
  };
  //console.log(tourDetail)
  const getNumberInField = () => {
    if (tourDetail.footballFieldTypeId === 1) {
      return 5;
    } else if (tourDetail.footballFieldTypeId === 2) {
      return 7;
    } else return 11;
  };

  // const checkDuplicateClothes = (data) => {
  //   const checkDup = listClothes.findIndex((item) => item === data);
  //   if(checkDup === -1){
  //     setListClothes([
  //       ...listClothes,data
  //     ])
  //   }
  // }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const allPlayer = playerInTeam;
    if (name === "checkChoicePlayer") {
      if (allPlayer[value].choice) {
        allPlayer[value].choice = false;
        setCountChoice(countChoice - 1);
      } else {
        allPlayer[value].choice = true;
        setCountChoice(countChoice + 1);
      }
    } else {
      const getIndex = name.split("t")[2];

      allPlayer[getIndex].clothesNumber = value;
    }
    setPlayerInTeam(allPlayer);
  };

  const addTeamInTournament = () => {
    setLoading(true);
    const getPlayerChoice = getPlayerChoiceRegister();
    const mininumPlayer = getNumberInField();

    if (getPlayerChoice.length < mininumPlayer) {
      setLoading(false);
      toast.error(`Bạn phải đăng ký tối thiểu ${mininumPlayer} cầu thủ`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const flagValidateNumber = validateNumberClothes(getPlayerChoice);
      if (flagValidateNumber === false) {
        setLoading(false);
        toast.error("Số áo cầu thủ không được trùng", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const data = {
          point: 0,
          differentPoint: 0,
          status: "Chờ duyệt",
          tournamentId: tourDetail.id,
          teamId: idUser,
        };
        const response = addTeamInTournamentAPI(data);
        response
          .then((res) => {
            if (res.status === 201) {
              //setLoading(false);
              addPlayerInTournament(res.data.id, getPlayerChoice);
              //console.log(res.data);
            }
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
            toast.error(err.response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    }
  };

  const validateNumberClothes = (data) => {
    const newNumber = [];

    for (const item of data) {
      if (newNumber.length === 0) {
        newNumber.push(item.clothesNumber);
      } else {
        const findIndex = newNumber.findIndex(
          (itemFind) => itemFind === item.clothesNumber
        );
        if (findIndex === -1) newNumber.push(item.clothesNumber);
        else return false;
      }
    }
    return true;
  };

  const sendMailNotiPlayer = (tourId, playerId, teamId) => {
    const response = NotiFootballInTournamentAPI(tourId, playerId, teamId);
    response
      .then((res) => {
        if (res.status === 201) {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getPlayerChoiceRegister = () => {
    const getPlayerChoice = playerInTeam.reduce((accumulator, currentValue) => {
      if (currentValue.choice === true) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);

    return getPlayerChoice;
  };
  const addPlayerInTournament = (id, getPlayerChoice) => {
    getPlayerChoice.map((iteam, index) => {
      const data = {
        teamInTournamentId: id,
        playerInTeamId: iteam.idPlayerInTeam,
        status: "string",
        clothesNumber: +iteam.clothesNumber,
      };
      const response = addPlayerInTournamentAPI(data);
      response
        .then((res) => {
          sendMailNotiPlayer(
            tourDetail.tournamentId,
            iteam.userVM.id,
            tourDetail.tourDetail
          );
        })
        .catch((err) => {
          console.error(err);
        });
    });
    if (!inTour) {
      setCheckRegistertour(true);
    }
    setLoading(false);
    setHideShow(false);
    toast.success("Đăng ký tham gia giải đấu thành công ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    postNotificationforTeamManager(
      idUser,
      tourDetail.id,
      tourDetail.userId,
      "team"
    );
  };
  // const checkChoice = (index) => {
  //   const allPlayer = playerInTeam;
  //   console.log(allPlayer[index].choice)
  //   if(allPlayer[index].choice){
  //     allPlayer[index].choice = false;
  //   }else{
  //     allPlayer[index].choice = true;
  //   }
  //   console.log(allPlayer);
  //   setPlayerInTeam(allPlayer);
  // }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (inTour) {
      setLoading(true);
      const getPlayerChoice = getPlayerChoiceRegister();
      if (
        getPlayerChoice.length >
        tourDetail.footballPlayerMaxNumber - numPlayer
      ) {
        setLoading(false);
        toast.error(`Vượt quá cầu thủ giải cho phép`, {
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

      const flagValidateNumber = validateNumberClothes(getPlayerChoice);
      if (flagValidateNumber === false) {
        toast.error("Số áo cầu thủ không được trùng", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        addPlayerInTournament(teamInTournament, getPlayerChoice);
      }

      setLoading(false);
    } else {
      addTeamInTournament();
    }
  };
  const onRowClick = () => {
    rowRef.current.focus();
    console.log(rowRef.current);
    // rowRef.current.disabled = false;
  };
  return (
    <div
      className={hideShow ? "popup__player active" : "popup__player"}
      id="exampleModal"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h3
              style={{
                fontWeight: 700,
                fontSize: 24,
              }}
              class="modal-title"
              id="exampleModalLabel"
            >
              Đăng ký cầu thủ vào giải đấu
            </h3>
            <div className={hideShowDeny ? "overlay active" : "overlay"}></div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                if (playerInTeam.length < getNumberInField()) {
                  setHideShow(false);
                } else {
                  setHideShowDeny(true);
                }
              }}
            ></button>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div
              style={{
                justifyContent: "flex-start",
              }}
              class="modal-body"
            >
              {playerInTeam != null &&
              !inTour &&
              playerInTeam.length < getNumberInField() ? (
                <div>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                      fontStyle: "italic",
                      marginBottom: 10,
                      paddingRight: 60,
                      lineHeight: 1.5,
                    }}
                  >
                    Lưu ý: Sẽ có vài cầu thủ tham gia đội bóng của bạn nhưng ko
                    có trong danh sách, vì đang thi đấu cho đội bóng khác ở giải
                    đấu khác .
                  </p>
                  <h1
                    style={{
                      fontWeight: 600,
                      fontSize: 20,
                      color: "red",
                    }}
                  >
                    Đội bóng của bạn không đủ thành viên để tham gia giải đấu,
                    tối thiểu đội bóng phải có {getNumberInField()} cầu thủ
                  </h1>
                </div>
              ) : (
                <div>
                  <h1
                    style={{
                      fontWeight: 600,
                      fontSize: 20,
                      marginBottom: 10,
                    }}
                  >
                    Danh sách cầu thủ
                  </h1>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 500,
                        fontSize: 16,
                        fontStyle: "italic",
                        marginBottom: 10,
                        paddingRight: 60,
                        lineHeight: 1.5,
                      }}
                    >
                      Lưu ý:{" "}
                      {!numPlayer
                        ? `Chọn ít nhất ${getNumberInField()} cầu thủ - tối đa{" "}
                      ${tourDetail.footballPlayerMaxNumber} cầu thủ.`
                        : `Chọn tối đa ${
                            tourDetail.footballPlayerMaxNumber - numPlayer
                          } cầu thủ`}
                      <p>
                        Sẽ có vài cầu thủ tham gia đội bóng của bạn nhưng ko có
                        trong danh sách, vì đang thi đấu cho đội bóng khác ở
                        giải đấu khác
                      </p>
                      .
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      {error ? (
                        <p
                          style={{
                            color: "red",
                            fontWeight: 600,
                            fontSize: 18,
                            marginRight: 20,
                          }}
                        >
                          Số áo bị trùng
                        </p>
                      ) : null}

                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: 18,
                          marginRight: 15,
                        }}
                      >
                        Số cầu thủ đã chọn {countChoice}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "73vw",
                      height: 350,
                      overflowY: "scroll",
                    }}
                  >
                    <table
                      className="choicePlayerTable"
                      style={{
                        width: "72vw",
                      }}
                      class="table"
                    >
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th
                            style={{
                              width: "29%",
                            }}
                          >
                            Email
                          </th>
                          <th>Tên</th>
                          <th>Số áo</th>
                          <th>Chọn</th>
                        </tr>
                      </thead>
                      <tbody className="listFootballPlayerChoice">
                        {playerInTeam != null
                          ? playerInTeam.map((item, index) => {
                              return (
                                <tr
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={onRowClick}
                                  key={index}
                                >
                                  <td>{index + 1}</td>
                                  <td>{item.userVM.email}</td>

                                  <td
                                  // style={{
                                  //   textAlign: "center"
                                  // }}
                                  >
                                    {/* {" "}
                                    <div
                                      style={{
                                        width: 70,
                                        height: 70,
                                        overflow: "hidden",
                                        marginBottom: 10
                                      }}
                                    >
                                      <img
                                        style={{
                                          objectFit: "cover",
                                        }}
                                        src={item.playerAvatar}
                                        alt="avatarPlayer"
                                      />
                                    </div>{" "} */}
                                    {item.playerName}
                                  </td>

                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Nhập số áo"
                                      disabled={!item.choice}
                                      name={`clothesNumberInput${index}`}
                                      //value={item.clothesNumber !== -1 ? item.clothesNumber : ""}
                                      onChange={onChangeHandler}
                                      ref={rowRef}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      name="checkChoicePlayer"
                                      // defaultChecked={item.choice}
                                      onChange={onChangeHandler}
                                      value={index}
                                      // ref={rowRef}
                                    />
                                  </td>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            <div class="modal-footer">
              <div
                className={hideShowDeny ? "overlay active" : "overlay"}
              ></div>
              <button
                style={{
                  padding: 10,
                }}
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  if (playerInTeam.length < getNumberInField()) {
                    setHideShow(false);
                  } else {
                    setHideShowDeny(true);
                  }
                }}
              >
                Đóng
              </button>
              {playerInTeam != null &&
              !inTour &&
              playerInTeam.length < getNumberInField() ? null : (
                <input
                  style={{
                    padding: 10,
                  }}
                  type="submit"
                  class="btn btn-primary"
                  value=" Lưu danh sách"
                />
              )}
            </div>
          </form>
        </div>
      </div>
      <ModelNotRegisterInTour
        setHideShow={setHideShow}
        hideShowDeny={hideShowDeny}
        setHideShowDeny={setHideShowDeny}
        setStatus={setStatus}
      />
      {loading ? <LoadingAction /> : null}
    </div>
  );
}
