import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAPI } from "../../api";
import LoadingAction from "../LoadingComponent/LoadingAction";
import styles from "../FindTeamComponent/TeamFind.module.css";
import DenyTeamInTournament from "../TournamentDetailComponent/DenyTeamInTournament";
import { Link } from "react-router-dom";
import ViewListPlayerRegister from "../TournamentDetailComponent/ViewListPlayerRegister";
import { toast } from "react-toastify";
import { deleteRegisterTeamAPI, updateStatusTeamInTournament, updateTeamInScheduleAPI } from "../../api/TeamInTournamentAPI";
import { deletePlayerInTournamentById, getAllPlayerInTournamentByTeamInTournamentIdAPI } from "../../api/PlayerInTournamentAPI";
import RegisterInTournament from "../TournamentDetailComponent/RegisterInTournament";
function TournamentTeamDetail(props) {
  const { user, team } = props;
  const [checkRegisterTour, setCheckRegistertour] = useState(false);
  const [hideShow, setHideShow] = useState(false);
  const [viewList, setViewList] = useState(null);
  const [tourTeam, setTourTeam] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setactive] = useState(1);
  const [statusTeam, setStatusTeam] = useState("Tham gia");
  const [typeReport, setTypeReport] = useState("report");
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    getTournament();
    setCheck(!check);
  };

  const [teamDelete, setTeamDelete] = useState(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const getAllPlayerInTournamentByIdTeam = (idTeam) => {
    setLoading(true);
    const response = getAllPlayerInTournamentByTeamInTournamentIdAPI(idTeam);
    response
      .then((res) => {
        if (res.status === 200) {
          for (let item of res.data.playerInTournaments) {
            deletePlayerById(item.id);
          }
          setTimeout(() => {
            deleteTeamInTournament(idTeam);
          }, 2000);
        }
      })
      .catch((err) => {
        setLoading(false);
        setHideShow(false);
        console.error(err);
      });
  };

  const deletePlayerById = async (id) => {
    try {
      const response = await deletePlayerInTournamentById(id);
    } catch (err) {
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
    }
  };

  const deleteTeamInTournament = (id) => {
    const response = deleteRegisterTeamAPI(id);
    response
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setHideShow(false);
          setLoading(false);
          setTypeReport("report");
          setCheck(!check)
          toast.success(
            typeReport !== "outtournament"
              ? "Từ chối đội bóng thành công"
              : "Đội bóng đã hủy tham gia giải thành công",
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
        setHideShow(false);
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
  const getTournament = async () => {
    try {
      let afterURLDefault = null;
      afterURLDefault = `team-in-tournaments?team-id=${team.id}&status=${statusTeam}&page-offset=${currentPage}&limit=8`;
      setLoading(true);
      const res = await getAPI(afterURLDefault);

      if (res.status === 200) {
        console.log(res.data.countList);
        setTourTeam(res.data.teamInTournaments);
        setLoading(false);
        setCount(res.data.countList);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTournament();
  }, [currentPage, check, statusTeam]);

  const addTeamInSchedule = (idTeamInTour) => {
    const data = {
      teamInTournamentId: idTeamInTour,
    };
    const response = updateTeamInScheduleAPI(data);
    response
      .then((res) => {
        if (res.status === 200) {
          setHideShow(false);
          setCheck(!check);
          toast.success("Đội bóng đã được thêm vào giải", {
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
      });
  };

  const acceptTeamInTournament = (teamInTournament, status) => {
    if (teamInTournament != null) {
      const data = {
        ...teamInTournament,
        status: status ? "Tham gia" : "Từ chối",
      };
      setLoading(true);
      const response = updateStatusTeamInTournament(data);
      response
        .then((res) => {
          if (res.status === 201) {
            // getTourDetail();
            addTeamInSchedule(teamInTournament.tournamentId);
          }
        })
        .catch((err) => {
          setHideShow(false);
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
  };

  return (
    <div className="tournamentdetail">
      {loading ? <LoadingAction /> : null}
      <div className="teamdetail__content listPlayer schedule__tour">
        <h3 className="listPlayer__title">Danh sách giải tham gia</h3>
        <div className="listPlayer__total">
          <h2>
            {" "}
            {tourTeam != null && tourTeam.length > 0
              ? "Có " + count + " đội bóng đã tham gia"
              : "Chưa có đội bóng tham gia"}
          </h2>
          <div className="option__view">
            <p
              className={active === 1 ? "active" : ""}
              onClick={() => {
                setactive(1);
                setStatusTeam("Tham gia");
              }}
            >
              Tham gia
            </p>
            <p
              className={active === 2 ? "active" : ""}
              onClick={() => {
                setactive(2);
                setStatusTeam("Chờ duyệt");
              }}
            >
              Chờ duyệt
            </p>
          </div>
        </div>
        {active === 1 ? (
          <div className="listPlayer__list">
            {" "}
            {tourTeam != null && tourTeam.length > 0 ? (
              tourTeam.map((item, index) => {
                return (
                  <div key={index} className="listPlayer__item">
                    {/* <Link
                        to={`/teamDetail/${item.teamInTournament.teamId}/inforTeamDetail`}
                      >   */}
                    <div className="avt">
                      {/* <img src={item.teamAvatar} alt="team" /> */}
                    </div>
                    <div className="des">
                      <p className="namePlayer">
                        <span>Tên giải:</span>
                        {/* {item.teamName} */}
                      </p>
                      <p className="mailPlayer">
                        <span>Người quản lý:</span>
                        {/* {item.user.username} */}
                      </p>
                      <p className="genderPlayer">
                        <span>Số cầu thủ:</span>
                        {/* {item.numberPlayerInTeam} */}
                      </p>
                      <p className="phonePlayer">
                        <span>Khu vực:</span>
                        {/* {item.teamArea} */}
                      </p>
                    </div>
                    {/* </Link> */}
                  </div>
                );
              })
            ) : (
              <h1
                style={{
                  color: "red",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                Chưa tham gia giải đấu
              </h1>
            )}
          </div>
        ) : null}
        {active === 2 ? (
          <div className="listPlayer__list">
            {tourTeam != null && tourTeam.length > 0 ? (
              tourTeam.map((item, index) => {
                return (
                  <form onSubmit={onSubmitHandler}>
                    <div key={index} className="listPlayer__item">
                      <Link to={`/teamDetail/1/inforTeamDetail`}>
                        <div className="avt">
                          <img src={item.teamAvatar} alt="team" />
                        </div>
                      </Link>

                      <div className="des">
                        <Link
                          style={{
                            color: "white",
                          }}
                          to={`/teamDetail/1/inforTeamDetail`}
                        >
                          <p className="namePlayer">
                            <span>Tên đội:</span>
                            {/* {item.teamName} */}
                          </p>
                          <p className="mailPlayer">
                            <span>Người quản lý:</span>
                            {/* {item.user.username} */}
                          </p>
                          <p className="genderPlayer">
                            <span>Số cầu thủ:</span>
                            {/* {item.numberPlayerInTeam} */}
                          </p>
                          <p className="phonePlayer">
                            <span>Khu vực:</span>
                            {/* {item.teamArea} */}
                          </p>
                        </Link>

                        <p
                          className="list_regis"
                          style={{
                            color: "#D7FC6A",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setViewList(item);
                          }}
                        >
                          Danh sách cầu thủ đăng ký
                        </p>
                        {user !== undefined && user.userVM.id === team.id ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              marginTop: 20,
                              marginBottom: 20,
                            }}
                          >
                            <input
                              className="btn_deleteTeam"
                              style={{
                                width: 80,
                                padding: 10,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                // acceptTeamInTournament(item, false);
                                setTeamDelete(item);
                                setHideShow(true);
                              }}
                              type="submit"
                              value="Từ chối"
                            />
                            <input
                              style={{
                                width: 80,
                                padding: 10,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                acceptTeamInTournament(item, true);
                              }}
                              type="submit"
                              className="btn_acceptTeam"
                              value="Đồng ý"
                            />
                              <RegisterInTournament
                            tourDetail={item}
                            setCheckRegistertour={setCheckRegistertour}
                            hideShow={hideShow}
                            setHideShow={setHideShow}
                            idUser={
                              user != undefined ? user.userVM.id : undefined
                            }/>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </form>
                );
              })
            ) : (
              <h1
                style={{
                  color: "red",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                Chưa có đội bóng đăng ký
              </h1>
            )}
            <div className={hideShow ? "overlay active" : "overlay"}></div>
            <DenyTeamInTournament
              getAllPlayerInTournamentByIdTeam={
                getAllPlayerInTournamentByIdTeam
              }
              teamDelete={teamDelete}
              setTeamDelete={setTeamDelete}
              setHideShow={setHideShow}
              hideShow={hideShow}
            />
          </div>
        ) : null}
        {tourTeam.length !== 0 ? (
          <nav
            aria-label="Page navigation example"
            className={styles.pagingTournament1}
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
      </div>
      <div className={hideShow ? "overlay active" : "overlay"}></div>
      <ViewListPlayerRegister
        teamInTournament={viewList}
        setViewList={setViewList}
        setHideShow={setHideShow}
        hideShow={hideShow}
      />
    </div>
  );
}

export default TournamentTeamDetail;
