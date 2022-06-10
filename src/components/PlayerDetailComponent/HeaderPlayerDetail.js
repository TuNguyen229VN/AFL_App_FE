import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./styles/style.css";
import LoadingAction from "../LoadingComponent/LoadingAction";
import MyTeamInPlayer from "./MyTeamInPlayer";
import MyTournamentInPlayer from "./MyTournamentInPlayer";
import ScheduleInPlayer from "./ScheduleInPlayer";
import RequestInPlayer from "./RequestInPlayer";
import AchivementInPlayer from "./AchivementInPlayer";
import { TeamRegisterAPI, PlayerAcceptAPI } from "../../api/System";
import {
  getAllTeamByPlayerIdAPI,
  upDatePlayerInTeamAPI,
  deletePlayerInTeamAPI,
  checkPlayerInTeamAPI,
  addPlayerInTeamAPI,
} from "../../api/PlayerInTeamAPI";
import { getFootballPlayerById } from "../../api/FootballPlayer";
import { toast } from "react-toastify";
function HeaderPlayerDetail() {
  const { idPlayer } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);
  const [detailPlayer, setDetailPlayer] = useState(null);
  const [allTeam, setAllTeam] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusAdd, setStatusAdd] = useState(false);
  const [active, setActive] = useState("true");
  const [hideShow, setHideShow] = useState(false);
  useEffect(() => {
    getInForPlayerByID();
  }, [idPlayer]);
  const [statusPaticipate, setStatusPaticipate] = useState("Chiêu mộ cầu thủ");
  useEffect(() => {
    getTeamByIdPlayer(active);
  }, [idPlayer, active, statusAdd === true, currentPage]);

  const getTeamByIdPlayer = (status) => {
    //setLoading(true);
    const response = getAllTeamByPlayerIdAPI(idPlayer, status, currentPage);
    response
      .then((res) => {
        //setLoading(false);
        setAllTeam(res.data.playerInTeamsFull);
        setCount(res.data.countList);
      })
      .catch((err) => {
        //setLoading(false);
        console.error(err);
      });
  };
  const deletePlayerInTeam = (id) => {
    if (id !== null) {
      setLoading(true);
      const response = deletePlayerInTeamAPI(id);
      response
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            setHideShow(false);
            setStatusAdd(true);
            toast.success(
              `Đã ${
                active === "true" ? " rời khỏi " : " từ chối "
              } đội bóng thành công`,
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
        })
        .catch((err) => {
          setLoading(false);
          setHideShow(false);
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

  useEffect(() => {
    if (user != undefined && user.userVM.roleId === 3) {
      checkPaticipateTeam();
    }
  }, []);
  const sendMailTeamRequest = (playerId, teamId) => {
    const response = TeamRegisterAPI(+playerId, teamId);
    response
      .then((res) => {
        if (res.status === 200) {
          setStatusPaticipate("Chờ xét duyệt từ cầu thủ");

          toast.success(
            "Yêu cầu chiêu mộ cầu thủ thành công.Chờ phản hồi từ cầu thủ nhé!",
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
          setLoading(false);
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
  };
  const addResquestToTeam = () => {
    setLoading(true);
    const data = {
      status: "Chờ xét duyệt từ cầu thủ",
      teamId: user.userVM.id,
      footballPlayerId: idPlayer,
    };
    const respone = addPlayerInTeamAPI(data);
    respone
      .then((res) => {
        if (res.status === 201) {
          sendMailTeamRequest(idPlayer, user.userVM.id);
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
  };
  const checkPaticipateTeam = () => {
    const respone = checkPlayerInTeamAPI(user.userVM.id, idPlayer);
    respone
      .then((res) => {
        if (res.status === 200) {
          if (res.data.playerInTeamsFull.length > 0) {
            const playerInTeam = res.data.playerInTeamsFull[0];

            if (playerInTeam.status === "true") {
              setStatusPaticipate("Đã tham gia đội bóng");
            } else if (playerInTeam.status === "Chờ xét duyệt từ đội bóng") {
              setStatusPaticipate("Chờ xét duyệt từ đội bóng của bạn");
            } else setStatusPaticipate("Chờ xét duyệt từ cầu thủ");
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const sendMailPlayerAccept = (playerId, teamId) => {
    const response = PlayerAcceptAPI(+playerId, teamId);
    response
      .then((res) => {
        if (res.status === 200) {
          //setStatusAdd(true);
          getTeamByIdPlayer(active);
          setLoading(false);
          toast.success("Chấp nhận đội bóng thành công", {
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
        console.error(err);
        setLoading(false);
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
  const updateStatusFootballPlayer = (id, status, idTeam) => {
    setLoading(true);
    const response = upDatePlayerInTeamAPI(id, status);
    response
      .then((res) => {
        if (res.status === 200) {
          sendMailPlayerAccept(idPlayer, idTeam);
        }
      })
      .then((err) => {
        console.error(err);
        setLoading(false);
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

  const getInForPlayerByID = () => {
    setLoading(true);
    const response = getFootballPlayerById(idPlayer);
    response
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);

          setDetailPlayer(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  // render by link
  const renderByLink = () => {
    if (activeTeamDetail === `/playerDetail/${idPlayer}/myTeamInPlayer`) {
      return (
        <MyTeamInPlayer
          active={active}
          setactive={setActive}
          allTeam={allTeam}
          count={count}
          setCurrentPage={setCurrentPage}
          hideShow={hideShow}
          setHideShow={setHideShow}
          deletePlayerInTeam={deletePlayerInTeam}
          setStatusAdd={setStatusAdd}
          currentPage={currentPage}
          user={user}
        />
      );
    }
    if (activeTeamDetail === `/playerDetail/${idPlayer}/myTournamentInPlayer`) {
      return <MyTournamentInPlayer />;
    }
    if (activeTeamDetail === `/playerDetail/${idPlayer}/scheduleInPlayer`) {
      return <ScheduleInPlayer />;
    }
    if (activeTeamDetail === `/playerDetail/${idPlayer}/requestInPlayer`) {
      return (
        <RequestInPlayer
          deletePlayerInTeam={deletePlayerInTeam}
          updateStatusFootballPlayer={updateStatusFootballPlayer}
          hideShow={hideShow}
          setHideShow={setHideShow}
          setStatusAdd={setStatusAdd}
          user={user}
          allTeam={allTeam}
          active={active}
          setactive={setActive}
          count={count}
          setCurrentPage={setCurrentPage}
        />
      );
    }
    if (activeTeamDetail === `/playerDetail/${idPlayer}/achivementInPlayer`) {
      return <AchivementInPlayer />;
    }
  };

  const changePositionByVNese = (data) => {
    if (data === "goalkeeper") return "Thủ môn";
    else if (data === "defender") return "Hậu vệ";
    else if (data === "midfielder") return "Tiền vệ";
    else return "Tiền đạo";
  };
  return (
    <>
      <Header id={idPlayer} />
      <div className="teamdetail">
        {detailPlayer !== null ? (
          <div>
            <div className="HeaderTeamDetail">
              <div className="info__manager player_detail ">
                <div>
                  <div className="avt__Team">
                    <img src={detailPlayer.playerAvatar} alt="a" />
                  </div>
                  {user !== null &&
                  detailPlayer !== null &&
                  user.userVM.id === detailPlayer.id ? (
                    <Link
                      to={`/updatePlayer/${detailPlayer.id}`}
                      //state={{ address: team.teamArea }}
                      className="editTeamTest"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>Chỉnh sửa thông
                      tin
                    </Link>
                  ) : user !== null &&
                    
                    user.teamInFo !== null ? (
                    <button
                      onClick={() => {
                        if (statusPaticipate === "Chiêu mộ cầu thủ") {
                          addResquestToTeam();
                        }
                      }}
                      className="editTeamTest"
                      style={{
                        cursor:
                          statusPaticipate === "Chiêu mộ cầu thủ"
                            ? "pointer"
                            : "default",
                        hover: {
                          backgroundColor:
                            statusPaticipate === "Chiêu mộ cầu thủ"
                              ? "#16192b"
                              : "#d7fc6a",
                          color:
                            statusPaticipate === "Chiêu mộ cầu thủ"
                              ? "#ffffff"
                              : "black",
                        },
                      }}
                    >
                      {statusPaticipate}
                    </button>
                  ) : null}
                </div>

                <div className="headertext__team">
                  <h2></h2>
                  <div className="man name__manager">
                    <i className="fas fa-light fa-user"></i>
                    <span className="title">Họ và tên: </span>
                    <span>{detailPlayer.playerName}</span>
                  </div>
                  <div className="man phone__manager">
                    <i>
                      <img src="/assets/icons/telephone.png" alt="tp" />
                    </i>
                    <span className="title">Số điện thoại: </span>
                    <span>{detailPlayer.userVM.phone}</span>
                  </div>
                  <div className="man email__manager">
                    <i>
                      <img src="/assets/icons/mail-icon.svg" alt="mail" />
                    </i>
                    <span className="title">Email: </span>
                    <span>{detailPlayer.userVM.email}</span>
                  </div>
                  <div className="man member__manager">
                    <i>
                      <img src="/assets/icons/join.png" alt="join" />
                    </i>
                    <span className="title">Vị trí thi đấu: </span>
                    <span>{changePositionByVNese(detailPlayer.position)}</span>
                  </div>
                  <div className="man gender__manager">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span className="title">Ngày sinh: </span>
                    <span>
                      {detailPlayer.userVM.dateOfBirth !== null
                        ? detailPlayer.userVM.dateOfBirth
                            .split("-")[2]
                            .split("T")[0] +
                          "/" +
                          detailPlayer.userVM.dateOfBirth.split("-")[1] +
                          "/" +
                          detailPlayer.userVM.dateOfBirth.split("-")[0]
                        : null}
                    </span>
                  </div>
                  <div className="man gender__manager location">
                    <i className="fas fa-solid fa-location-dot"></i>
                    <span className="title">Địa chỉ: </span>
                    <span className="text_field">
                      {detailPlayer.userVM.address}
                    </span>
                  </div>
                  <div className="man gender__manager">
                    <i className="fas fa-solid fa-font-awesome"></i>
                    <span className="title">Mô tả bản thân: </span>
                    <span>{detailPlayer.description}</span>
                  </div>
                </div>
              </div>
              <div className="headerteamdetail__tag headertour__tag">
                <Link
                  to={`/playerDetail/${idPlayer}/myTeamInPlayer`}
                  className={
                    activeTeamDetail ===
                    `/playerDetail/${idPlayer}/myTeamInPlayer`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/playerDetail/${idPlayer}/myTeamInPlayer`
                    )
                  }
                >
                  Đội bóng tham gia
                </Link>
                <Link
                  to={`/playerDetail/${idPlayer}/myTournamentInPlayer`}
                  className={
                    activeTeamDetail ===
                    `/playerDetail/${idPlayer}/myTournamentInPlayer`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/playerDetail/${idPlayer}/myTournamentInPlayer`
                    )
                  }
                >
                  Giải đấu tham gia
                </Link>
                <Link
                  to={`/playerDetail/${idPlayer}/requestInPlayer`}
                  className={
                    activeTeamDetail ===
                    `/playerDetail/${idPlayer}/requestInPlayer`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/playerDetail/${idPlayer}/requestInPlayer`
                    )
                  }
                >
                  Yêu cầu tham gia
                </Link>
                <Link
                  to={`/playerDetail/${idPlayer}/scheduleInPlayer`}
                  className={
                    activeTeamDetail ===
                    `/playerDetail/${idPlayer}/scheduleInPlayer`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/playerDetail/${idPlayer}/scheduleInPlayer`
                    )
                  }
                >
                  Lịch thi đấu
                </Link>
                <Link
                  to={`/playerDetail/${idPlayer}/achivementInPlayer`}
                  className={
                    activeTeamDetail ===
                    `/playerDetail/${idPlayer}/achivementInPlayer`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/playerDetail/${idPlayer}/achivementInPlayer`
                    )
                  }
                >
                  Thành tích
                </Link>
              </div>
            </div>
            {renderByLink()}
          </div>
        ) : (
          <p className="createPlayermore">
            {" "}
            Bạn chưa phải là cầu thủ
            <Link to="/createPlayer" className="createnow">
              {`-> `}Trở thành cầu thủ ngay
            </Link>
          </p>
        )}
      </div>
      {loading ? <LoadingAction /> : null}
      <Footer />
    </>
  );
}

export default HeaderPlayerDetail;
