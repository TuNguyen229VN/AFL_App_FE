import React, { useState, useEffect } from "react";
import { getAPI } from "../../api/index";
import LoadingAction from "../LoadingComponent/LoadingAction";
import styles from "../FindTournamentComponent/TournamentFind.module.css";
import ReactPaginate from "react-paginate";
export default function RegisterInTournament(props) {
  const { idUser, tourDetail } = props;
  console.log(tourDetail);
  const [playerInTeam, setPlayerInTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  useEffect(() => {
    getListPlayerInTeamByIdTeam();
  }, [idUser]);

  const getListPlayerInTeamByIdTeam = async () => {
    setLoading(true);
    const afterURL = `PlayerInTeam?teamId=${idUser}&status=true&pageIndex=${currentPage}&limit=10`;
    const response = await getAPI(afterURL);
    setCount(response.data.countList);
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
    console.log(playersData);
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

  const handlePageClick = (e) => {

  }
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
                    marginBottom: 20,
                  }}
                >
                  Danh sách cầu thủ
                </h1>
                <div
                  style={{
                    width: "73vw",
                    height: 350,
                    overflowY: "scroll"
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
                      <th >STT</th>
                        <th  style={{
                          width: "29%"
                        }}>Email</th>
                        <th >Tên</th>
                        <th >Số áo</th>
                        <th >Chọn</th>
                      </tr>
                    </thead>
                    <tbody className="listFootballPlayerChoice">
                      {playerInTeam != null
                        ? playerInTeam.map((item, index) => {
                            return (
                              <tr key={index}>
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
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="checkChoicePlayer"
                                  />
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
                <nav
          aria-label="Page navigation example"
          className={styles.pagingTournament}
        >
          <ReactPaginate
            previousLabel={"Trang trước"}
            nextLabel={"Trang sau"}
            containerClassName="pagination"
            activeClassName={styles.active}
            pageClassName={styles.pageItem}
            nextClassName={styles.pageItem}
            previousClassName={styles.pageItem}
            breakLabel={"..."}
            pageCount={Math.ceil(count / 8)}
            marginPagesDisplayed={3}
            onPageChange={handlePageClick}
            pageLinkClassName={styles.pagelink}
            previousLinkClassName={styles.pagelink}
            nextLinkClassName={styles.pagelink}
            breakClassName={styles.pageItem}
            breakLinkClassName={styles.pagelink}
            pageRangeDisplayed={2}
          />
        </nav>       

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
              <button
                style={{
                  padding: 10,
                }}
                type="button"
                class="btn btn-primary"
              >
                Lưu danh sách
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
