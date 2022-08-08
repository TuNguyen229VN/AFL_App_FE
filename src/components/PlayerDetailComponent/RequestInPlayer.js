import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import styles from "../FindTournamentComponent/TournamentFind.module.css";
import ModelDeleteTeam from "./ModelDeleteTeam";

function RequestInPlayer(props) {
  const {
    active,
    setactive,
    allTeam,
    user,
    setStatusAdd,
    hideShow,
    setHideShow,
    updateStatusFootballPlayer,
    deletePlayerInTeam,
    count,
    setCurrentPage,
  } = props;
  const { idPlayer } = useParams();
  const [idDelete, setIdDelete] = useState(null);

  useEffect(() => {
    if (active === "true") {
      setactive("Chờ xét duyệt từ cầu thủ");
      setCurrentPage(1);
    }
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="teamdetail__content listPlayer schedule__tour">
      <h3
        className="listPlayer__title"
      >
        {active === "Chờ xét duyệt từ cầu thủ"
          ? "Đội bóng chờ duyệt"
          : "Đội bóng muốn tham gia"}
      </h3>
      <div className="listPlayer__total">
      <h2></h2>
      <div className="option__view">
        <p
          className={active === "Chờ xét duyệt từ cầu thủ" ? "active" : ""}
          onClick={() => {
            setactive("Chờ xét duyệt từ cầu thủ");
            if (active !== "Chờ xét duyệt từ cầu thủ") setCurrentPage(1);
          }}
        >
          Chờ duyệt
        </p>
        <p
          className={active === "Chờ xét duyệt từ đội bóng" ? "active" : ""}
          onClick={() => {
            setactive("Chờ xét duyệt từ đội bóng");
            if (active !== "Chờ xét duyệt từ đội bóng") setCurrentPage(1);
          }}
        >
          Tham gia
        </p>
      </div>
      </div>
      <div className="teamdetail__content listPlayer">
        <div className="listPlayer__list">
          {allTeam != null ? (
            allTeam.length > 0 ? (
              allTeam.map((item, index) => {
                return (
                  <div key={index} className="listPlayer__item">
                    <form onSubmit={onSubmitHandler}>
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
                      </Link>
                      <div className="des">
                        <Link to={`/teamDetail/${item.teamId}/inforTeamDetail`}>
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
                        </Link>
                        {active === "Chờ xét duyệt từ cầu thủ" &&
                        user !== null &&
                        user.userVM.id == idPlayer ? (
                          <div
                            style={{
                              margin: "20px 0 10px 0",
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <div
                              className={
                                hideShow ? "overlay active" : "overlay"
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
                                // setIdDelete(item.idPlayerInTeam);
                                // setHideShowDelete(true);
                                // setDeleteSuccessFul(false);
                                setStatusAdd(false);
                                setHideShow(true);
                                setIdDelete(item.id);
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
                                  item.id,
                                  "true",
                                  item.team.id
                                );
                                setStatusAdd(false);
                              }}
                            >
                              Đồng ý
                            </button>
                          </div>
                        ) : active === "Chờ xét duyệt từ đội bóng" &&
                          user !== null &&
                          user.userVM.id == idPlayer ? (
                          <div
                            style={{
                              margin: "20px 0 10px 0",
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <div
                              className={
                                hideShow ? "overlay active" : "overlay"
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
                                // setIdDelete(item.idPlayerInTeam);
                                // setHideShowDelete(true);
                                // setDeleteSuccessFul(false);
                                setIdDelete(item.id);
                                setStatusAdd(false);
                                setHideShow(true);
                              }}
                            >
                              Hủy tham gia
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
              })
            ) : (
              <p
                style={{
                  fontSize: 20,
                }}
              >
                {active === "Chờ xét duyệt từ đội bóng"
                  ? "Bạn không gửi lời mời tới đội bóng nào"
                  : "Không có đội bóng gửi lời mời"}
              </p>
            )
          ) : null}
          <ModelDeleteTeam
            deletePlayerInTeam={deletePlayerInTeam}
            idDelete={idDelete}
            setIdDelete={setIdDelete}
            hideShow={hideShow}
            setHideShow={setHideShow}
            updateStatusFootballPlayer={updateStatusFootballPlayer}
            active={active}
          />
        </div>
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

export default RequestInPlayer;
