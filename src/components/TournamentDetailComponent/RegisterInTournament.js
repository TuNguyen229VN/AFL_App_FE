import React, { useState, useEffect, useRef } from "react";
import { getAPI } from "../../api/index";
import LoadingAction from "../LoadingComponent/LoadingAction";
import { toast } from "react-toastify";
import { addTeamInTournamentAPI } from "../../api/TeamInTournamentAPI";
import { addPlayerInTournamentAPI } from "../../api/PlayerInTournamentAPI";
export default function RegisterInTournament(props) {
  const { idUser, tourDetail } = props;
  const [playerInTeam, setPlayerInTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countChoice, setCountChoice] = useState(0);
  const [listClothes, setListClothes] = useState([]);
  const [error, setError] = useState(false);
  const rowRef = useRef();

  useEffect(() => {
    getListPlayerInTeamByIdTeam();
  }, [idUser]);

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

    setPlayerInTeam(playersData);
    setLoading(false);
  };

  const getPlayerById = async (idPlayer) => {
    const afterURL = `football-players/${idPlayer}`;
    const response = await getAPI(afterURL);
    return response.data;
  };
  const getNumberInField = () => {
    if (tourDetail.footballPlayerMaxNumber === 1) {
      return 5;
    } else if (tourDetail.footballPlayerMaxNumber === 7) {
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
          addPlayerInTournament(res.data.id);
          //console.log(res.data);
        }

        // toast.success("Tạo đội bóng thành công", {
        //   position: "top-right",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const addPlayerInTournament = (id) => {
    const getPlayerChoice = playerInTeam.reduce((accumulator, currentValue) => {
      if (currentValue.choice === true) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);
    console.log(getPlayerChoice);
    getPlayerChoice.map((iteam, index) => {
      const data = {
        teamInTournamentId: id,
        playerInTeamId: iteam.idPlayerInTeam,
      };
      const response = addPlayerInTournamentAPI(data);
      response
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    });
    setLoading(false);
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
    addTeamInTournament();
  };
  const onRowClick = () => {
     rowRef.current.focus();
    console.log(rowRef.current)
    // rowRef.current.disabled = false;
  };
  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
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
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
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
              playerInTeam.countList < getNumberInField() ? (
                <h1
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    color: "red",
                  }}
                >
                  Đội bóng của bạn không đủ thành viên để tham gia giải đấu, tối
                  thiểu đội bóng phải có {getNumberInField()} cầu thủ
                </h1>
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
                        fontWeight: 600,
                        fontSize: 18,
                        marginBottom: 10,
                      }}
                    >
                      Lưu ý: Chọn ít nhất {getNumberInField()} cầu thủ - tối đa{" "}
                      {tourDetail.footballPlayerMaxNumber} cầu thủ
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
                                  <td>{item.email}</td>

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
                                    {item.playername}
                                  </td>

                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Nhập số áo"
                                      disabled={!item.choice}
                                      name={`clothesNumberInput${index}`}
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
              <button
                style={{
                  padding: 10,
                }}
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              {playerInTeam != null &&
              playerInTeam.countList < getNumberInField() ? null : (
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
      {loading ? <LoadingAction /> : null}
    </div>
  );
}
