import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AOS from "aos";
import gsap from "gsap";
import styles from "../FindTeamComponent/TeamFind.module.css";
import Transitions from "../Transitions/Transitions";
import ReactPaginate from "react-paginate";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { Link } from "react-router-dom";
import LoadingAction from "../LoadingComponent/LoadingAction";
import { getAllFootballPlayerAPI } from "../../api/FootballPlayer";
export default function FootballPlayer() {
  AOS.init();
  const tour = gsap.timeline();
  const [loading, setLoading] = useState(false);
  const [nameFootballSearch, setNameFootballSearch] = useState("");
  const [genderSearch, setGenderSearch] = useState("");
  const [positionSearch, setPositionSearch] = useState("");
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [listFootballPlayer, setListFootballPlayer] = useState(null);
  useEffect(() => {
    getAllFootballPlayer();
  }, [nameFootballSearch,genderSearch, positionSearch, currentPage]);
  const getAllFootballPlayer = () => {
    setLoading(true);
    const dataSearch = `football-player-name=${nameFootballSearch}&gender=${genderSearch}&position=${positionSearch}`;
    const response = getAllFootballPlayerAPI(dataSearch, currentPage);
    response
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setCount(res.data.countList);
          setListFootballPlayer(res.data.footballPlayers);
          console.log(res.data.footballPlayers);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };
  const changePosition = (data) => {
    if(data === "goalkeeper") return "Thủ môn";
    else if(data === "defender") return "Hậu vệ";
    else if(data === "midfielder") return "Tiền vệ";
    else return "Tiền đạo";
  }
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "contentSearch":
        setNameFootballSearch(value);
        break;
      case "gender":
        setGenderSearch(value);
        break;
      default:
        setPositionSearch(value);
        break;
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };
  return (
    <div>
      <ScrollToTop />
      <Transitions timeline={tour} />
      <Header />
      <div
        className="myTournaments"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div className={styles.myTourImg}>
          <img
            className={styles.img_mytour}
            src="/assets/img/findTournaments/cr7.png"
            alt="homeImg"
          />
        </div>
        <div className={styles.findTournaments}>
          <div className={styles.findInfo}>
            <h1 className={styles.titleFindTour}>Cầu thủ</h1>
            <p className={styles.desFindTour}>
              Tìm kiếm cầu thủ theo đúng sở thích bản thân
            </p>
          </div>
          <form className={styles.formFindTour} onSubmit={onSubmitHandler}>
            <div className={styles.findWrap}>
              <input
                name="contentSearch"
                className={styles.inputNameTour}
                placeholder="Tên cầu thủ"
                value={nameFootballSearch}
                onChange={onChangeHandler}
              />
              <input
                className={styles.btnFindTour}
                type="submit"
                value="Tìm kiếm"
              />
            </div>

            <div
              style={{
                justifyContent: "unset",
              }}
              className={styles.selectOp}
            >
              <select
                style={{
                  backgroundColor: "black",
                }}
                onChange={onChangeHandler}
                value={genderSearch}
                name="gender"
                className={styles.sortTour}
              >
                <option value="">Giới tính</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </select>
              <select
                style={{
                  backgroundColor: "black",
                }}
                onChange={onChangeHandler}
                value={positionSearch}
                name="position"
                className={styles.sortTour}
              >
                <option value="" selected>
                  Vị trí
                </option>
                <option value="goalkeeper">Thủ môn</option>
                <option value="defender">Hậu vệ</option>
                <option value="midfielder">Tiền vệ</option>
                <option value="striker">Tiền đạo</option>
              </select>
            </div>
          </form>
        </div>
        <div className={styles.listTournament}>
          <h1 className={styles.titleListTour}>Các cầu thủ</h1>
          <div className={styles.listTour}>
            {loading ? (
              <LoadingAction />
            ) : listFootballPlayer != null ? (
              listFootballPlayer.map((item, index) => {
                return (
                  <div key={item.id}>
                    <Link to={`/playerDetail/${item.id}/myTeamInPlayer`} className={styles.team} key={item.id}>
                      <div className={styles.tournamentImgAd}>
                        <img
                          className={styles.teamImg}
                          src={item.playerAvatar}
                          alt="myItem"
                        />
                      </div>
                      <div className={styles.tournamentInfor}>
                      
                        <h1 className={styles.tournamentName}>
                          {item.playerName}
                        </h1>
                        <p className={styles.type}>
                          {item.userVM.email}
                        </p>
                        <p className={styles.type}>
                          {item.userVM.phone}
                        </p>
                        <p className={styles.type}>
                          {item.userVM.gender  === "Male" ? "Nam" : "Nữ"} | {changePosition(item.position)}
                        </p>                        
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : null}
          </div>
        </div>
        {listFootballPlayer != null ? (
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
      <Footer />
    </div>
  );
}
