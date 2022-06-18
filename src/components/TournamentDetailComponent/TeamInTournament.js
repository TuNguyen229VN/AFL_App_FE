import React, { useEffect, useState } from "react";
import "./styles/style.css";
import styles from "../FindTeamComponent/TeamFind.module.css";
import LoadingAction from "../LoadingComponent/LoadingAction";
import ViewListPlayerRegister from "./ViewListPlayerRegister";
import DenyTeamInTournament from "./DenyTeamInTournament";
import { Link } from "react-router-dom";
import { getAPI } from "../../api";
import ReactPaginate from "react-paginate";
import { addTeamInTournamentAPI } from "../../api/TeamInTournamentAPI";
import { toast } from "react-toastify";

function TeamInTournament(props) {
  const {
    tourDetail,
    allTeam,
    loadingAc,
    setStatusTeam,
    acceptTeamInTournament,
    user,
    hostTournamentId,
    hideShow,
    setHideShow,
    getAllPlayerInTournamentByIdTeam,
  } = props;
  const [active, setactive] = useState(1);
  const [viewList, setViewList] = useState(null);
  const [teamDelete, setTeamDelete] = useState(null);
  const [hideShowView, setHideShowView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [gender, setGender] = useState("");
  const [orderBy, setOrderBy] = useState("Id");
  const [orderType, setOrderType] = useState("DESC");
  const [contentSearch, setContentSearch] = useState("");
  const [check, setCheck] = useState(false);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    getTeam(contentSearch, data.selected + 1, "NAME", contentSearch);
    setCheck(!check);
  };
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const addTeamInTournament = (idTeam) => {
    setLoading(true);
      const data = {
        point: 0,
        differentPoint: 0,
        status: "Chờ duyệt",
        tournamentId: tourDetail.id,
        teamId: idTeam,
      };
      const response = addTeamInTournamentAPI(data);
      response
        .then((res) => {
          if (res.status === 201) {
            toast.success("Chiêu mộ đội bóng thành công", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setLoading(false);
            //console.log(res.data);
          }
        })
        .catch((err) => {
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
  const getTeam = async (nameFind, currentPage, anotherSearch, value) => {
    try {
      let afterURLDefault = null;
      if (anotherSearch === "NAME") {
        afterURLDefault = `teams?team-name=${value}&team-gender=${tourDetail.tournamentGender}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=8`;
      }
      setLoading(true);
      const res = await getAPI(afterURLDefault);

      if (res.status === 200) {
        setTeams(res.data.teams);
        setLoading(false);
        setCount(res.data.countList);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(tourDetail);
    getTeam(contentSearch, currentPage, "NAME", contentSearch);
  }, [check, currentPage]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "contentSearch":
        setContentSearch(value);
        getTeam(contentSearch, currentPage, "NAME", value);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="tournamentdetail">
        <div className="teamdetail__content listPlayer schedule__tour">
          <h3 className="listPlayer__title">Danh sách đội bóng</h3>
          <div className="listPlayer__total">
            <h2>
              {" "}
              {allTeam != null && allTeam.length > 0
                ? "Có " + allTeam.countList + " đội bóng đã tham gia"
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
              {user &&
              user.userVM.id === tourDetail.userId &&
              tourDetail.mode === "PRIVATE" ? (
                <p
                  className={active === 3 ? "active" : ""}
                  onClick={() => {
                    setactive(3);
                    setStatusTeam("Chiêu mộ");
                  }}
                >
                  Chiêu mộ
                </p>
              ) : null}
            </div>
          </div>
          {active === 1 ? (
            <div className="listPlayer__list">
              {allTeam != null && allTeam.length > 0 ? (
                allTeam.map((item, index) => {
                  return (
                    <div key={index} className="listPlayer__item">
                      {/* <Link
                        to={`/teamDetail/${item.teamInTournament.teamId}/inforTeamDetail`}
                      >   */}
                      <div className="avt">
                        <img src={item.teamAvatar} alt="team" />
                      </div>
                      <div className="des">
                        <p className="namePlayer">
                          <span>Tên đội:</span>
                          {item.teamName}
                        </p>
                        <p className="mailPlayer">
                          <span>Người quản lý:</span>
                          {item.user.username}
                        </p>
                        <p className="genderPlayer">
                          <span>Số cầu thủ:</span>
                          {item.numberPlayerInTeam}
                        </p>
                        <p className="phonePlayer">
                          <span>Khu vực:</span>
                          {item.teamArea}
                        </p>
                        <p
                          className="list_regis"
                          style={{
                            color: "#D7FC6A",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setViewList(item.teamInTournament);
                            setHideShowView(true);
                          }}
                        >
                          Danh sách cầu thủ đăng ký
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
                  Chưa có đội bóng tham gia
                </h1>
              )}
            </div>
          ) : null}

          {/* ==========Chờ duyệt================ */}
          {active === 2 ? (
            <div className="listPlayer__list">
              {allTeam != null && allTeam.length > 0 ? (
                allTeam.map((item, index) => {
                  return (
                    <form onSubmit={onSubmitHandler}>
                      <div key={index} className="listPlayer__item">
                        <Link
                          to={`/teamDetail/${item.teamInTournament.teamId}/inforTeamDetail`}
                        >
                          <div className="avt">
                            <img src={item.teamAvatar} alt="team" />
                          </div>
                        </Link>

                        <div className="des">
                          <Link
                            style={{
                              color: "white",
                            }}
                            to={`/teamDetail/${item.teamInTournament.teamId}/inforTeamDetail`}
                          >
                            <p className="namePlayer">
                              <span>Tên đội:</span>
                              {item.teamName}
                            </p>
                            <p className="mailPlayer">
                              <span>Người quản lý:</span>
                              {item.user.username}
                            </p>
                            <p className="genderPlayer">
                              <span>Số cầu thủ:</span>
                              {item.numberPlayerInTeam}
                            </p>
                            <p className="phonePlayer">
                              <span>Khu vực:</span>
                              {item.teamArea}
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
                              setViewList(item.teamInTournament);
                            }}
                          >
                            Danh sách cầu thủ đăng ký
                          </p>
                          {user !== undefined &&
                          user.userVM.id === hostTournamentId ? (
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
                                  //acceptTeamInTournament(item, false);
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

          {/* ==========Chiêu mộ================= */}
          {active === 3 ? (
            <>
              {loading ? <LoadingAction /> : null}
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
                  value={contentSearch}
                  id="namePlayer"
                  name="contentSearch"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="listPlayer__list">
                {teams != null && teams.length > 0 ? (
                  teams.map((item, index) => {
                    if (
                      item.numberPlayerInTeam >=
                      tourDetail.footballPlayerMaxNumber
                    ) {
                      return (
                        <div key={index} className="listPlayer__item">
                          {/* <Link
                        to={`/teamDetail/${item.teamInTournament.teamId}/inforTeamDetail`}
                      >   */}
                          <div className="avt">
                            <img src={item.teamAvatar} alt="team" />
                          </div>
                          <div className="des">
                            <p className="namePlayer">
                              <span>Tên đội:</span>
                              {item.teamName}
                            </p>
                            <p className="genderPlayer">
                              <span>Số cầu thủ:</span>
                              {item.numberPlayerInTeam}
                            </p>
                            <p className="phonePlayer">
                              <span>Khu vực:</span>
                              {item.teamArea}
                            </p>
                            <p className="buttonChieumoGiai" onClick={()=>addTeamInTournament(item.id)}>
                              Chiêu mộ vào giải
                            </p>
                          </div>
                          {/* </Link> */}
                        </div>
                      );
                    }
                  })
                ) : (
                  <h1
                    style={{
                      color: "red",
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    Không có đội bóng để chiêu mộ
                  </h1>
                )}
              </div>
              {teams.length !== 0 ? (
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
            </>
          ) : null}

          <div className={hideShowView ? "overlay active" : "overlay"}></div>
          <ViewListPlayerRegister
            teamInTournament={viewList}
            setViewList={setViewList}
            setHideShow={setHideShowView}
            hideShow={hideShowView}
          />
        </div>
        {loadingAc ? <LoadingAction /> : null}
      </div>
    </>
  );
}

export default TeamInTournament;
