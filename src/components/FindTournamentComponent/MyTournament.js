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
import { Link } from "react-router-dom";
const MyTournamemts = () => {
  AOS.init();
  const tour = gsap.timeline();
  const [tournaments, setTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [contentSearch, setContentSearch] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tourType, setTourType] = useState([]);
  const [footballField, setFootballField] = useState([]);
  const Loading = () => {
    return (
      <>
        <div className={styles.tournamentload}>
          <Skeleton height={300} />
        </div>
      </>
    );
  };

  // Get Tournament
  const getTournament = async (nameFind, currentPage) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/tournaments?tournament-name=${nameFind}&page-offset=${currentPage}&limit=8`
      );
      if (res.status === 200) {
        setTournaments(await res.data.tournaments);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get Total Count Tournament
  const getCount = async () => {
    try {
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/tournaments/count`
      );
      if (res.status === 200) {
        setCount(await res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get Type Tournament
  const getFootballField = async () => {
    try {
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/football-field-types?page-offset=1&limit=5`
      );
      if (res.status === 200) {
        setFootballField(await res.data.footballFieldTypes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get FootballFiled Tournament
  const getTourType = async () => {
    try {
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/tournament-types?page-offset=1&limit=5`
      );
      if (res.status === 200) {
        setTourType(await res.data.tournamentTypes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Click paging number
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    setCheck(!check);
    getTournament(contentSearch, currentPage);
  };

  // Search action
  const onSubmitHandler = (e) => {
    e.preventDefault();
    getTournament(contentSearch, currentPage);
    setCheck(!check);
  };

  const onChangeHandler = (e) => {
    setContentSearch(e.target.value);
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
  const getFeild = (id) => {
    if (1 === id) {
      return " | Sân 5";
    }
    if (2 === id) {
      return " | Sân 7";
    }
    if (3 === id) {
      return " | Sân 11";
    }
    else{
      return "";
    }
  };
  const splitTeamArea=(teamArea)=>{
    let a=teamArea;
    if(a!==null){
      let myArray=a.split(",");
      return myArray[myArray.length-1];
    }
    return teamArea
  }
  // Use Effect
  useEffect(() => {
    getTournament(contentSearch, currentPage);
    getCount();
    // getFootballField();
    // getTourType();
  }, [check, currentPage]);

  return (
    <>
      <Transitions timeline={tour} />
      <Header />

      <div
        className="myTournaments"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
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
                type="submit"
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
                  {loading ? (
                    <Loading />
                  ) : (
                    <Link
                      to={`/inforTournamentDetail/${tour.id}`}
                      className={styles.tournament}
                    >
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
                          {getType(tour.tournamentTypeId)}{tour.footballFieldAddress!==""?"| "+splitTeamArea(tour.footballFieldAddress):""}
                          {getFeild(tour.footballFieldTypeId)}
                        </p>

                        <div className={styles.tournamentFooter}>
                          <div className={styles.teamPart}>
                            <img
                              className={styles.teamPartImg}
                              src="./assets/icons/join.png"
                            />
                            <p>{tour.numberTeamInTournament}</p>
                          </div>
                          <div className="heart__shape"></div>
                        </div>
                      </div>
                    </Link>
                  )}
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
      </div>
      <Footer />
    </>
  );
};

export default MyTournamemts;
