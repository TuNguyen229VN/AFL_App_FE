import React, { useEffect, useState } from "react";
import ListTeam from "./ListTeam";
import FindTeam from "./FindTeam";
import PagingTeam from "./PagingTeam";
import styles from "./TeamFind.module.css";
import gsap from "gsap";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AOS from "aos";
import Transitions from "../Transitions/Transitions";
import axios from "axios";
import ReactPaginate from "react-paginate";
const MyTournamemts = () => {
  AOS.init();
  // const tour = gsap.timeline();
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [contentSearch, setContentSearch] = useState("");
  const [check, setCheck] = useState(false);

  const getTournament = async (nameFind, currentPage) => {
    try {
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/teams?team-name=${nameFind}&page-offset=${currentPage}&limit=8`
      );
      if (res.status === 200) {
        setTeams(await res.data.teams);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCount = async () => {
    try {
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/teams/count`
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
    <div>
      {/* <Transitions timeline={tour} /> */}
      <Header />
      <div className="myTournaments" data-aos="fade-up">
        <div className={styles.myTourImg}>
          <img
            className={styles.img_mytour}
            src="/assets/img/findTournaments/cr7.png"
            alt="homeImg"
          />
        </div>
        <div className={styles.findTournaments}>
          <div className={styles.findInfo}>
            <h1 className={styles.titleFindTour}>tìm đội bóng</h1>
            <p className={styles.desFindTour}>
              Tìm và đăng ký tham gia vào đội bóng theo đúng sở thích bản thân
            </p>
          </div>
          <form className={styles.formFindTour} onSubmit={onSubmitHandler}>
            <div className={styles.findWrap}>
              <input
                className={styles.inputNameTour}
                placeholder="Tên đội bóng"
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
                <option>Khu vực</option>
              </select>
              <select className={styles.typeFootball}>
                <option>Trình độ</option>
              </select>
              <select className={styles.sortTour}>
                <option>Giới tính</option>
              </select>
            </div>
          </form>
        </div>
        <ListTeam teams={teams} />
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
        </nav>{" "}
      </div>
      <Footer />
    </div>
  );
};

export default MyTournamemts;
