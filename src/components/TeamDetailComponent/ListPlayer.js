import React, { useEffect, useState } from "react";
import "./styles/style.css";
import { getAPI } from "../../api/index";
import { toast } from "react-toastify";
import Loading from "../LoadingComponent/Loading";
import {
  deletePlayerInTeamAPI,
  upDatePlayerInTeamAPI,
} from "../../api/PlayerInTeamAPI";
import ReactPaginate from "react-paginate";
import styles from "../FindTeamComponent/TeamFind.module.css";
import LoadingAction from "../LoadingComponent/LoadingAction";
import ModelAcceptDeletePlayer from "./ModelAcceptDeletePlayer";
import { Link } from "react-router-dom";
import { TeamAcceptAPI } from "../../api/System";
function ListPlayer(props) {
  const { id, numberPlayerInTeam, idHost, getInforTeam, postNotifacation } =
    props;
  const [loading, setLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [playerInTeam, setPlayerInTeam] = useState(null);
  const [deleteSuccessful, setDeleteSuccessFul] = useState(false);
  const [namePlayer, setNamePlayer] = useState("");
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hideShowDelete, setHideShowDelete] = useState(false);
  const [active, setactive] = useState("Cầu thủ");
  const [idDelete, setIdDelete] = useState(null);
  const [viewMoreOption, setViewMoreOption] = useState({
    index: "0",
    check: false,
  });
  useEffect(() => {
    getListPlayerInTeamByIdTeam();
  }, [currentPage, namePlayer, active, deleteSuccessful === true]);

  const getListPlayerInTeamByIdTeam = async () => {
    setLoading(true);
    const statusData =
      active === "Cầu thủ"
        ? "true"
        : active === "Chờ duyệt"
        ? "Chờ xét duyệt từ đội bóng"
        : "Chờ xét duyệt từ cầu thủ";
    const afterURL = `PlayerInTeam?teamId=${id}&name=${namePlayer}&status=${statusData}&pageIndex=${currentPage}&limit=8`;
    const response = await getAPI(afterURL);
    setCount(response.data.countList);
    const ids = response.data.playerInTeamsFull;
    const players = ids.map(async (player) => {
      const playerResponse = await getPlayerById(player.footballPlayerId);
      playerResponse.idPlayerInTeam = player.id;
      return playerResponse;
    });

    const playersData = await Promise.all(players);
    setPlayerInTeam(playersData);
    setLoading(false);
  };

  const getPlayerById = async (idPlayer) => {
    const afterURL = `football-players/${idPlayer}`;
    const response = await getAPI(afterURL);
    return response.data;
  };
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const onHandleChange = (e) => {
    const { value } = e.target;
    setNamePlayer(value);
    setCurrentPage(1);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const deletePlayerInTeam = (id) => {
    if (id !== null) {
      setLoadingAdd(true);
      const response = deletePlayerInTeamAPI(id);
      response
        .then((res) => {
          if (res.status === 200) {
            setLoadingAdd(false);
            setHideShowDelete(false);
            setDeleteSuccessFul(true);
            toast.success("Đã từ chối cầu thủ thành công", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          setLoadingAdd(false);
          setHideShowDelete(false);
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
  };

  const updateStatusFootballPlayer = (id, status, idPlayer) => {
    setLoadingAdd(true);
    const response = upDatePlayerInTeamAPI(id, status);
    response
      .then((res) => {
        if (res.status === 200) {
          getInforTeam();
          sendMailTeamAccpet(idPlayer, idHost);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoadingAdd(false);
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
  };

  const postNotificationforTeamManager = async (playerId, teamId) => {
    const data = {
      content:
        "Quản lý đội bóng đã chấp nhận lời đề nghị tham gia đội bóng từ bạn. Xem ngay",
      userId: playerId,
      tournamentId: 0,
      teamId: teamId,
    };
    try {
      const response = await postNotifacation(data);
      if (response.status === 201) {
        setLoadingAdd(false);
        setDeleteSuccessFul(true);
        toast.success("Thêm cầu thủ vào đội bóng thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendMailTeamAccpet = (playerId, teamId) => {
    const respone = TeamAcceptAPI(playerId, teamId);
    respone
      .then((res) => {
        if (res.status === 200) {
          postNotificationforTeamManager(playerId, teamId);
        }
      })
      .catch((err) => {
        setLoadingAdd(false);
        console.error(err);
      });
  };
  return (
    <>
      <div className="teamdetail__content listPlayer">
        <h3 className="listPlayer__title">Danh sách thành viên</h3>

        <div>
          <div className="listPlayer__total">
            {active === "Cầu thủ" ? (
              <h2>Có {numberPlayerInTeam} thành viên</h2>
            ) : (
              <h2></h2>
            )}

            <div
              className="schedule__tour"
              style={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <div className="option__view">
                <p
                  className={active === "Cầu thủ" ? "active" : ""}
                  onClick={() => {
                    setactive("Cầu thủ");
                    setNamePlayer("");
                    setCurrentPage(1);
                  }}
                >
                  Cầu thủ
                </p>

                <p
                  className={active === "Chờ duyệt" ? "active" : ""}
                  onClick={() => {
                    setactive("Chờ duyệt");
                    setNamePlayer("");
                    setCurrentPage(1);
                  }}
                >
                  Chờ duyệt
                </p>
                <p
                  className={active === "Chiêu mộ" ? "active" : ""}
                  onClick={() => {
                    setactive("Chiêu mộ");
                    setNamePlayer("");
                    setCurrentPage(1);
                  }}
                >
                  Chiêu mộ
                </p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="namePlayer"
                style={{
                  fontWeight: 700,
                  marginBottom: 30,
                  fontSize: 16,
                }}
              >
                Tìm kiếm cầu thủ theo tên:{" "}
              </label>
              <input
                style={{
                  marginLeft: 20,
                  padding: "5px 10px",
                  width: 300,
                }}
                placeholder="Tên cầu thủ"
                value={namePlayer}
                id="namePlayer"
                name="namePlayer"
                onChange={onHandleChange}
              />
            </div>

            {loading ? (
              <Loading />
            ) : (
              <div className="listPlayer__list">
                {playerInTeam.length > 0 ? (
                  playerInTeam.map((item, index) => {
                    if (item !== undefined) {
                      return (
                        <div
                          key={index}
                          // style={{
                          //   cursor: "pointer",
                          // }}
                          className="listPlayer__item"
                        >
                          <form onSubmit={onSubmitHandler}>
                            {active === "Cầu thủ" ? (
                              <div>
                                <div
                                  className="view__more"
                                  onClick={() => {
                                    setViewMoreOption({
                                      index: index,
                                      check: !viewMoreOption.check,
                                    });
                                  }}
                                >
                                  <i className="fa-solid fa-ellipsis"></i>
                                </div>
                                <div
                                  className={
                                    viewMoreOption.index === index &&
                                    viewMoreOption.check
                                      ? "option__player active"
                                      : "option__player"
                                  }
                                >
                                  <div
                                    className={
                                      hideShowDelete
                                        ? "overlay active"
                                        : "overlay"
                                    }
                                  ></div>
                                  <p
                                    onClick={() => {
                                      //deletePlayerInTeam(item.idPlayerInTeam);
                                      setHideShowDelete(true);
                                      setIdDelete(item.idPlayerInTeam);
                                      setDeleteSuccessFul(false);
                                    }}
                                  >
                                    <i class="fa-solid fa-trash"></i>Xóa cầu thủ
                                  </p>
                                </div>
                              </div>
                            ) : null}
                            <Link
                              to={`/playerDetail/${item.id}/myTeamInPlayer`}
                            >
                              <div className="avt">
                                <img
                                  style={{
                                    objectFit: "cover",
                                  }}
                                  src={item.playerAvatar}
                                  alt="dev"
                                />
                              </div>
                            </Link>
                            <div className="des">
                              <Link
                                to={`/playerDetail/${item.id}/myTeamInPlayer`}
                              >
                                <p className="namePlayer">
                                  <span>Tên:</span>
                                  {item.playerName}
                                </p>
                                <p className="genderPlayer">
                                  <span>Giới tính:</span>
                                  {item.gender === "Male" ? "Nam" : "Nữ"}
                                </p>
                                <p className="mailPlayer">
                                  <span>Email:</span>
                                  <span className="namePlayerInTeam">
                                    {item.userVM.email}
                                  </span>
                                </p>
                                <p className="phonePlayer">
                                  <span>Sdt:</span>
                                  {item.userVM.phone}
                                </p>
                                <p className="dobPlayer">
                                  <span>Ngày sinh:</span>
                                  {item.userVM.dateOfBirth != null
                                    ? item.userVM.dateOfBirth.split(" ")[0]
                                    : null}
                                  {/* {item.userVM.dateOfBirth != null ? item.userVM.dateOfBirth
                                  .split("-")[2]
                                  .split("T")[0] +
                                  "/" +
                                  item.userVM.dateOfBirth.split("-")[1] +
                                  "/" +
                                  item.userVM.dateOfBirth.split("-")[0] : null} */}
                                </p>
                              </Link>
                              {active === "Chờ duyệt" && idHost === id ? (
                                <div
                                  style={{
                                    margin: "20px 0 10px 0",
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                  }}
                                >
                                  <div
                                    className={
                                      hideShowDelete
                                        ? "overlay active"
                                        : "overlay"
                                    }
                                  ></div>
                                  <button
                                    style={{
                                      padding: "10px 20px",
                                      backgroundColor: "#D7FC6A",
                                      border: 1,
                                      borderColor: "#D7FC6A",
                                      fontWeight: 600,
                                    }}
                                    onClick={() => {
                                      setIdDelete(item.idPlayerInTeam);
                                      setHideShowDelete(true);
                                      setDeleteSuccessFul(false);
                                    }}
                                  >
                                    Từ chối
                                  </button>
                                  <button
                                    style={{
                                      padding: "10px 20px",
                                      backgroundColor: "#D7FC6A",
                                      border: 1,
                                      borderColor: "#D7FC6A",
                                      fontWeight: 600,
                                    }}
                                    onClick={() => {
                                      updateStatusFootballPlayer(
                                        item.idPlayerInTeam,
                                        "true",
                                        item.id
                                      );
                                      setDeleteSuccessFul(false);
                                    }}
                                  >
                                    Đồng ý
                                  </button>
                                </div>
                              ) : active === "Chiêu mộ" && idHost === id ? (
                                <div
                                  style={{
                                    margin: "20px 0 10px 0",
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                  }}
                                >
                                  <div
                                    className={
                                      hideShowDelete
                                        ? "overlay active"
                                        : "overlay"
                                    }
                                  ></div>
                                  <button
                                    style={{
                                      padding: "10px 20px",
                                      backgroundColor: "#D7FC6A",
                                      border: 1,
                                      borderColor: "#D7FC6A",
                                      fontWeight: 600,
                                    }}
                                    onClick={() => {
                                      setIdDelete(item.idPlayerInTeam);
                                      setHideShowDelete(true);
                                      setDeleteSuccessFul(false);
                                    }}
                                  >
                                    Hủy chiêu mộ
                                  </button>
                                </div>
                              ) : null}
                            </div>
                            {/* {idHost !== undefined && idHost === id ? (
                              <div>
                                <div
                                  className={
                                    hideShowDelete
                                      ? "overlay active"
                                      : "overlay"
                                  }
                                ></div>
                              </div>
                            ) : null} */}
                          </form>
                        </div>
                      );
                    }
                  })
                ) : (
                  <p
                    style={{
                      color: "red",
                      fontWeight: 600,
                      fontSize: 24,
                    }}
                  >
                    Không tìm thấy cầu thủ
                  </p>
                )}

                <ModelAcceptDeletePlayer
                  deletePlayerInTeam={deletePlayerInTeam}
                  idDelete={idDelete}
                  setIdDelete={setIdDelete}
                  setHideShowDelete={setHideShowDelete}
                  hideShowDelete={hideShowDelete}
                  active={active}
                />
              </div>
            )}
          </div>
        </div>

        {playerInTeam != null && playerInTeam.length > 0 ? (
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
        ) : null}

        {loadingAdd === true ? <LoadingAction /> : null}
      </div>
    </>
  );
}
export default ListPlayer;
