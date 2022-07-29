import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../LoadingComponent/Loading";
import styles from "./styles/style.module.css";
import { getAPI } from "../../api";
function MyTournamentInPlayer() {
  const [loading, setLoading] = useState(false);
  const [tournament, setTournament] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [numPage, setNumPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { idPlayer } = useParams();
  const getTournament = () => {
    setLoading(true);
    let numOfContent = limit;
    const afterURL = `tournaments/FootballPlayerID?footballPlayerID=${idPlayer}&sort=DESC&pageIndex=1&limit=${numOfContent}`;
    const response = getAPI(afterURL);
    response
      .then((res) => {
        setNumPage(Math.ceil(res.data.tournaments.length / 10));
        setTournament(res.data.tournaments);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTournament();
  }, []);
  useEffect(() => {
    getTournament();
  }, [limit]);

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
  return (
    <div className={styles.my__tournament}>
      <h2 className={styles.title}>Danh sách giải đấu của bạn</h2>
      <div className={styles.list__tournament}>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {tournament.length > 0 ? (
              tournament.map((tour) => (
                <Link
                  to={`/tournamentDetail/${tour.id}/inforTournamentDetail`}
                  className={styles.item__tournament}
                >
                  <div className={styles.tournament__img}>
                    <img
                      src={tour.tournamentAvatar}
                      alt={tour.tournamentName}
                    />
                  </div>
                  <div className={styles.details}>Xem chi tiết</div>
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
                        <img src="/assets/icons/join.png" alt="join" />
                      </i>
                      <span className={styles.sub__title}>Đội tham gia: </span>
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
                      <span
                        className={`${styles.text_field} ${styles.address}`}
                      >
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
                    <div
                      className={
                        tour.statusTnm === "Đang diễn ra"
                          ? styles.status
                          : tour.statusTnm === "Kết thúc"
                          ? `${styles.status} ${styles.red}`
                          : `${styles.status} ${styles.grey}`
                      }
                    >
                      {/* {tour.status === true ? "Đang diễn ra" : "Đã kết thúc"} */}
                      {tour.statusTnm}
                      {tour.statusTnm === "Đang diễn ra" ? (
                        <div className={styles.col_3}>
                          <div
                            className={styles.snippet}
                            data-title=".dot-shuttle"
                          >
                            <div className={styles.stage}>
                              <div className={styles.dot_shuttle}></div>
                            </div>
                          </div>
                        </div>
                      ) : tour.statusTnm === "Kết thúc" ? (
                        <div className={styles.col_2}>
                          <div
                            className={styles.snippet2}
                            data-title=".dot-shuttle"
                          >
                            <div className={styles.stage2}>
                              <div className={styles.dot_shuttle2}></div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h1 className={styles.titleNoContent}>
                Bạn chưa tham gia giải đấu nào
              </h1>
            )}
            {pageIndex < numPage ? (
              <button
                className="btnLoadMore"
                onClick={(e) => {
                  setPageIndex((pageIndex) => pageIndex + 1);
                  setLimit((limit) => limit + 10);
                  e.preventDefault();
                }}
              >
                Xem Thêm
              </button>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTournamentInPlayer;
