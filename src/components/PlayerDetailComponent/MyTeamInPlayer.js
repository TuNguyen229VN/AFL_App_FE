import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "../FindTournamentComponent/TournamentFind.module.css";
import styles2 from "./styles/style.module.css";
import ModelDeleteTeam from "./ModelDeleteTeam";
import { Link } from "react-router-dom";
function MyTeamInPlayer(props) {
  const {
    allTeam,
    setactive,
    active,
    count,
    setCurrentPage,
    setHideShow,
    deletePlayerInTeam,
    hideShow,
    setStatusAdd,
    currentPage,
    user
  } = props;
  const [idDelete, setIdDelete] = useState(null);
  const [viewMoreOption, setViewMoreOption] = useState({
    index: "0",
    check: false,
  });
  useEffect(() => {
    setactive("true");
  });
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="teamdetail__content listPlayer">
       <h2 className={styles2.title}>
        Đội bóng bạn đã tham gia
      </h2>
      <div className="listPlayer__list">
        {allTeam != null ? (
          allTeam.length > 0 ? (
            allTeam.map((item, index) => {
              return (
                <div key={index} className="listPlayer__item">
                  <form onSubmit={onSubmitHandler}>
                    {user !== null && active === "true" ? (
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
                          {/* <div
                            className={
                              hideShowDelete ? "overlay active" : "overlay"
                            }
                          ></div> */}
                          <div
                            className={hideShow ? "overlay active" : "overlay"}
                          ></div>
                          <p
                            onClick={() => {
                              //deletePlayerInTeam(item.idPlayerInTeam);
                              //setHideShowDelete(true);
                              //setIdDelete(item.idPlayerInTeam);
                              setIdDelete(item.id);
                              setStatusAdd(false);
                              setHideShow(true);
                            }}
                          >
                            <i class="fa-solid fa-trash"></i>Hủy tham gia
                          </p>
                        </div>
                      </div>
                    ) : null}
                    <Link to={`/teamDetail/${item.teamId}/inforTeamDetail`}>
                      <div className="avt">
                        <img
                          style={{
                            objectFit: "cover",
                          }}
                          src={item.team.teamAvatar}
                          alt="dev"
                        />
                      </div>
                      <div className="des">
                        <p className="namePlayer">
                          <span>Tên:</span>
                          <span>{item.team.teamName}</span>
                        </p>
                        <p className="genderPlayer">
                          <span>Giới tính:</span>
                          {item.team.teamGender === "Male" ? "Nam" : "Nữ"}
                        </p>
                        <p className="mailPlayer">
                          <span>SĐT:</span>

                          {item.team.teamPhone}
                        </p>
                        <p className="phonePlayer">
                          <span>Địa chỉ:</span>
                          {item.team.teamArea}
                        </p>

                        {/* {active === "Chờ duyệt" && idHost === id ? (
                        <div
                          style={{
                            margin: "20px 0 10px 0",
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div
                            className={
                              hideShowDelete ? "overlay active" : "overlay"
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
                                "true"
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
                              hideShowDelete ? "overlay active" : "overlay"
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
                      ) : null} */}
                      </div>
                    </Link>
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
                  <ModelDeleteTeam
                    deletePlayerInTeam={deletePlayerInTeam}
                    idDelete={idDelete}
                    setIdDelete={setIdDelete}
                    hideShow={hideShow}
                    setHideShow={setHideShow}
                    active={active}
                  />
                </div>
              );
            })
          ) : (
            <p
              style={{
                fontSize: 21,
              }}
            >
              Bạn chưa tham gia đội bóng
            </p>
          )
        ) : null}
      </div>
      {allTeam != null && allTeam.length > 0 ? (
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
    </div>
  );
}

export default MyTeamInPlayer;
