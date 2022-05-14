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
import { Link } from "react-router-dom";
import Loading from "../LoadingComponent/Loading";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
const MyTournamemts = () => {
  AOS.init();
  const tour = gsap.timeline();
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [contentSearch, setContentSearch] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTournament = async (nameFind, currentPage) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/teams?team-name=${nameFind}&page-offset=${currentPage}&limit=8`
      );
      if (res.status === 200) {
        setTeams(await res.data.teams);
        setLoading(false);
      }
    } catch (error) {
      console.log(loading)
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTournament(contentSearch, currentPage);
    getCount();
  }, [check, currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    getTournament(contentSearch, currentPage);
    setCheck(!check);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    getTournament(contentSearch, currentPage);
    setCheck(!check);
  };
  const onChangeHandler = (e) => {
    setContentSearch(e.target.value);
  };

  const splitTeamArea=(teamArea)=>{
    let myArray=teamArea.split(",");
    return myArray[myArray.length-1];
  }
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
                type="submit"
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
        {/* listteam */}
        {/* <ListTeam teams={teams} /> */}
        <div className={styles.listTournament}>
          <h1 className={styles.titleListTour}>Các đội bóng</h1>
          <div className={styles.listTour}>
            {teams.map((team) => {
              return (
                <div key={team.id}>
                  {loading ? (
                  <Loading />
                  ) : (
                    <Link to={`/teamDetail/${team.id}/inforTeamDetail`} className={styles.team} key={team.id}>
                      <div className={styles.tournamentImgAd}>
                        <img
                          className={styles.teamImg}
                          src={team.teamAvatar}
                          alt="myItem"
                        />
                      </div>

                      <div className={styles.tournamentInfor}>
                        <h1 className={styles.tournamentName}>
                          {team.teamName}
                        </h1>
                        <p className={styles.type}>
                          Bóng Đá {team.teamGender==="Male"?"Nam":"Nữ"}  {team.teamArea!==""?"| "+splitTeamArea(team.teamArea):""}
                        </p>
                        <div className={styles.line} />
                        <div className={styles.tournamentFooter}>
                          <div className={styles.teamPart}>
                            <img
                              className={styles.teamPartImg}
                              src="./assets/icons/join.png"
                              alt="join"
                            />
                            <p>{team.numberPlayerInTeam}</p>
                          </div>
                          <div className={styles.heart__shape}></div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* paging */}
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
        </nav>{" "}
      </div>
      <Footer />
    </div>
  );
};

export default MyTournamemts;
