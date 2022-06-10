import React, { useState, useEffect } from "react";
import { getAllPlayerByTeamIdAPI } from "../../api/PlayerInTeamAPI";
import { getAllPlayerInTournamentByTeamInTournamentIdAPI } from "../../api/PlayerInTournamentAPI";
import LoadingAction from "../LoadingComponent/LoadingAction";
export default function ViewListPlayerRegister(props) {
  const { teamInTournament, setViewList, hideShow, setHideShow } = props;
  const [playerRegister, setPlayerRegister] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (teamInTournament != null) {
      getAllPlayerByTeamId();
    }
  }, [teamInTournament]);

  console.log(teamInTournament)

  const getAllPlayerByTeamId = () => {
    setLoading(true);
    const response = getAllPlayerByTeamIdAPI(teamInTournament.teamId);
    response
      .then((res) => {
        console.log(res.data)
        getAllPlayerInTournamentByTeamInTournamentId(
          res.data.playerInTeamsFull
        );
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };
  const getAllPlayerInTournamentByTeamInTournamentId = async (data) => {
    const newPlayerRegister = [];
    const response = await getAllPlayerInTournamentByTeamInTournamentIdAPI(
      teamInTournament.id
    );
   
    if (response.status === 200) {
      for (const item of response.data.playerInTournaments) {
        const findNewPlayer = data.find(
          (itemData) => itemData.id === item.playerInTeamId
        );
        console.log(findNewPlayer);
        findNewPlayer.clothesNumber = item.clothesNumber;
        newPlayerRegister.push(findNewPlayer);
      }
      console.log(newPlayerRegister)
      setPlayerRegister(newPlayerRegister);
      setLoading(false);
    }
  };
  return (
    <div
      id="exampleModal"
      className={hideShow ? "popup__player active" : "popup__player"}
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Danh sách cầu thủ đăng ký
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setViewList(null);

                setHideShow(false);
              }}
            ></button>
          </div>
          <div class="modal-body">
            <div
              style={{
                width: "73vw",
                height: 350,
                overflowY:
                  playerRegister != null && playerRegister.length > 4
                    ? "scroll"
                    : "hidden",
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
                    <th>Hình Ảnh</th>
                    <th>Tên</th>
                    <th>Số áo</th>
                  </tr>
                </thead>
                <tbody className="listFootballPlayerChoice">
                  {playerRegister != null
                    ? playerRegister.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            <td>{index + 1}</td>
                            <td>{item.footballPlayer.email}</td>
                            <td>
                              <img
                                style={{
                                  width: 50,
                                  height: 50,
                                  marginLeft: 10,
                                }}
                                src={item.footballPlayer.playerAvatar}
                              />
                            </td>
                            <td>{item.footballPlayer.playerName}</td>
                            <td>{item.clothesNumber}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              style={{
                padding: 10,
              }}
              onClick={() => {
                setViewList(null);
                setHideShow(false);
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
      {loading ? <LoadingAction /> : null}
    </div>
  );
}
