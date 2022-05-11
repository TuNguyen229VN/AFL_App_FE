import React, { useEffect, useState } from "react";
import ListTournament from "./ListTournament";
import FindTournaments from "./FindTournament";
import PagingTournament from "./PagingTournament";
import styles from "./TournamentFind.module.css";
import gsap from "gsap";
import AOS from "aos";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Transitions from "../Transitions/Transitions";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const MyTournamemts = () => {
  AOS.init();
  // const tour = gsap.timeline();
  const [tournaments, setTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [contentSearch, setContentSearch] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const Loading = () => {
    return (
      <>
        <div className={styles.tournamentload}>
          <Skeleton height={300} />
        </div>
      </>
    );
  };
  const getTournament = async (nameFind, currentPage) => {
    try {
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/tournaments?tournament-name=${nameFind}&page-offset=${currentPage}&limit=8`
      );
      if (res.status === 200) {
        setTournaments(await res.data.tournaments);
        // setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCount = async () => {
    try {
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/tournaments/count`
      );
      if (res.status === 200) {
        setCount(await res.data);
        setCheck(!check);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTournament(contentSearch, currentPage);
    getCount();
  }, [check]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    getTournament(contentSearch, currentPage);
  };

  const onSubmitHandler = () => {
    getTournament(contentSearch, currentPage);
  };
  const onChangeHandler = (e) => {
    setContentSearch(e.target.value);
  };
  return (
    <>
      {/* <Transitions timeline={tour} /> */}
      <Header />

      <div className="myTournaments" data-aos="fade-up">
        {/* Search */}
        <div className={styles.myTourImg}>
          <img
            className={styles.img_mytour}
            src="/assets/img/findTournaments/cr7.png"
            alt="homeImg"
          />
        </div>
        <div className={styles.findTournaments}>
          <div className={styles.findInfo}>
            <h1 className={styles.titleFindTour}>tìm giải đấu</h1>
            <p className={styles.desFindTour}>
              Tìm và đăng ký tham gia những giải đấu theo sở thích của mình
            </p>
          </div>
          <form className={styles.formFindTour} onSubmit={onSubmitHandler}>
            <div className={styles.findWrap}>
              <input
                className={styles.inputNameTour}
                placeholder="Tên giải đấu"
                value={contentSearch}
                onChange={onChangeHandler}
              />
              <input
                className={styles.btnFindTour}
                type="button"
                value="Tìm kiếm"
              />
            </div>
            <div className={styles.selectOp}>
              <select className={styles.selectArea}>
                <option>Loại sân</option>
              </select>
              <select className={styles.typeFootball}>
                <option>Hình thức</option>
              </select>
              <select className={styles.sortTour}>
                <option>Sắp Xếp</option>
              </select>
            </div>
          </form>
        </div>

        {/* List */}
        {/* {loading?<Loading/>: <ListTournament tournaments={tournaments} />} */}

        <div className={styles.listTournament}>
          <h1 className={styles.titleListTour}>Các Giải đấu</h1>
          <div className={styles.listTour}>
            {tournaments.map((tour) => {
              return (
                <div key={tour.id}>
                  {/* {loading ? (
                    <Loading />
                  ) : ( */}
                    <div className={styles.tournament}>
                      <div className={styles.tournamentImgAd}>
                        <img
                          className={styles.tournamentImg}
                          src={tour.tournamentAvatar}
                          alt={tour.tournamentName}
                        />
                      </div>

                      <div className={styles.tournamentInfor}>
                        <h1 className={styles.tournamentName}>
                          {tour.tournamentName}
                        </h1>
                        <p className={styles.type}>
                          Loại trực tiếp | Tp. Hồ Chí Minh
                        </p>

                        <div className={styles.tournamentFooter}>
                          <div className={styles.teamPart}>
                            <img
                              className={styles.teamPartImg}
                              src="./assets/icons/join.png"
                            />
                            <p>24</p>
                          </div>
                          <div className="heart__shape"></div>
                        </div>
                      </div>
                    </div>
                  {/* )} */}
                </div>
              );
            })}
          </div>
        </div>

        {/* Paging */}
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
            pageCount={count / 8}
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
      <Footer />
    </>
  );
};

export default MyTournamemts;
