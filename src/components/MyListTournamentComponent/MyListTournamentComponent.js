import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAPI } from "../../api";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import Loading from "../LoadingComponent/Loading";
import ReactPaginate from "react-paginate";
function MyListTournamentComponent() {
  // get Locoal Storage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tournament, setTournament] = useState([]);
  const getTournament = (currentPage) => {
    setLoading(true);
    const afterURL = `tournaments?userId=${user.userVM.id}&order-by=DateCreate&order-type=DESC&page-offset=${currentPage}&limit=5`;
    const response = getAPI(afterURL);
    response
      .then((res) => {
        setTournament(res.data.tournaments);
        setCount(res.data.countList);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    setCheck(!check);
    getTournament(data.selected + 1);
  };

  useEffect(() => {
    getTournament(currentPage);
  }, [check, currentPage]);

  // Get Type
  const getType = (id) => {
    if (1 === id) {
      return "Loại trực tiếp";
    }
    if (2 === id) {
      return "Đá vòng tròn";
    }
    if (3 === id) {
      return "Đá chia bảng";
    } else {
      return "";
    }
  };

  // Get Feild
  const getFeild = (id) => {
    if (1 === id) {
      return "| Sân 5";
    }
    if (2 === id) {
      return "| Sân 7";
    }
    if (3 === id) {
      return "| Sân 11";
    } else {
      return "";
    }
  };

  // format Date
  const formatDate = (date) => {
    const day = new Date(date);
    return (
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear()
    );
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className={styles.my__tournament}>
        <h2 className={styles.title}>Danh sách giải đấu của bạn</h2>
        <div className={styles.list__tournament}>
          {loading ? (
            <Loading />
          ) : (
            <div>
              {tournament.length > 0
                ? tournament.map((tour) => (
                    <Link
                      to={`/tournamentDetail/${tour.id}/inforTournamentDetail`}
                      className={styles.item__tournament}
                    >
                      <div className={styles.details}>Xem chi tiết</div>
                      <div className={styles.tournament__img}>
                        <img
                          src={tour.tournamentAvatar}
                          alt={tour.tournamentName}
                        />
                      </div>
                      <div className={styles.tournamnet__text}>
                        <h2>{tour.tournamentName}</h2>
                        <div className={styles.man}>
                          <i class="fa-solid fa-bullhorn"></i>
                          <span className={styles.sub__title}>Chế độ: </span>
                          <span className={styles.text_field}>
                            {tour.mode === "PRIVATE" ? "Riêng tư" : "Công khai"}
                          </span>
                        </div>
                        <div className={styles.man}>
                          <i>
                            <img src="./assets/icons/join.png" alt="join" />
                          </i>
                          <span className={styles.sub__title}>
                            Đội tham gia:{" "}
                          </span>
                          <span className={styles.text_field}>
                            {" "}
                            {tour.numberTeamInTournament} /{" "}
                            {tour.footballTeamNumber} đội
                          </span>
                        </div>
                        <div className={styles.man}>
                          <i className="fas fa-solid fa-font-awesome"></i>
                          <span className={styles.sub__title}>Hình thức: </span>
                          <span className={styles.text_field}>
                            {" "}
                            {getType(tour.tournamentTypeId)}{" "}
                            {getFeild(tour.footballFieldTypeId)}
                          </span>
                        </div>
                        <div className={styles.man}>
                          <i className="fas fa-solid fa-location-dot"></i>
                          <span className={styles.sub__title}>Địa điểm: </span>
                          <span className={styles.text_field}>
                            {tour.footballFieldAddress}
                          </span>
                        </div>
                        <div className={styles.man}>
                          <i className="fa-solid fa-calendar-days"></i>
                          <span className={styles.sub__title}>
                            Thời gian diễn ra:{" "}
                          </span>
                          <span className={styles.text_field}>
                            {formatDate(tour.tournamentStartDate)} -{" "}
                            {formatDate(tour.tournamentEndDate)}{" "}
                          </span>
                        </div>
                      </div>
                      <div className={styles.status}>
                        {tour.status === true ? "Đang diễn ra" : "Đã kết thúc"}
                      </div>
                    </Link>
                  ))
                : null}
              <div className={styles.pagingTournament}>
                <ReactPaginate
                  previousLabel={"Trang trước"}
                  nextLabel={"Trang sau"}
                  containerClassName="pagination"
                  activeClassName={styles.active}
                  pageClassName={styles.pageItem}
                  nextClassName={styles.pageItem}
                  previousClassName={styles.pageItem}
                  breakLabel={"..."}
                  pageCount={Math.ceil(count / 5)}
                  marginPagesDisplayed={3}
                  onPageChange={handlePageClick}
                  pageLinkClassName={styles.pagelink}
                  previousLinkClassName={styles.pagelink}
                  nextLinkClassName={styles.pagelink}
                  breakClassName={styles.pageItem}
                  breakLinkClassName={styles.pagelink}
                  pageRangeDisplayed={2}
                />
              </div>
            </div>
          )}
          {tournament.length <= 0 ? (
            <h1 className={styles.titleNoContent}>
              Bạn chưa tổ chức giải đấu nào
              <Link to="/createTournament" className={styles.createnow}>
                {`-> `}Tạo giải đấu ngay
              </Link>
            </h1>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyListTournamentComponent;
