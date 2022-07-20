import React, { useEffect, useState } from "react";
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
import { getAPI } from "../../api/index";
const MyTournamemts = () => {
  AOS.init();
  const tour = gsap.timeline();
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [contentSearch, setContentSearch] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const [gender, setGender] = useState("");
  const [orderBy, setOrderBy] = useState("Id");
  const [orderType, setOrderType] = useState("DESC");
  const [provice, setProvice] = useState(null);
  const [districs, setDistrics] = useState(null);
  const [proviceSearch, setProviceSearch] = useState("");
  const [districSearch, setDistricSearch] = useState("");
  useEffect(() => {
    getAllCity();
  }, []);

  const getAllCity = async () => {
    const response = await axios.get(
      "https://provinces.open-api.vn/api/?depth=3"
    );
    if (response.status === 200) {
      setProvice(response.data);
      // console.log(response.data)
    }
  };

  const getTournament = async (nameFind, currentPage, anotherSearch, value) => {
    try {
      let afterURLDefault = null;
      if (anotherSearch === "NAME") {
        afterURLDefault = `teams?team-name=${value}&team-area=${proviceSearch}&team-gender=${gender}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=8`;
      } else if (anotherSearch === "GENDER") {
        afterURLDefault = `teams?team-name=${nameFind}&team-area=${proviceSearch}&team-gender=${value}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=8`;
      } else {
        console.log(value);
        afterURLDefault = `teams?team-name=${nameFind}&team-area=${value}&team-gender=${gender}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=8`;
      }
      setLoading(true);
      const res = await getAPI(afterURLDefault);

      if (res.status === 200) {
        console.log(res.data)
        setTeams(res.data.teams);
        setLoading(false);
        setCount(res.data.countList);
      }
    } catch (error) {
      setLoading(false);
      console.log(loading);
      console.log(error);
    }
  };

  // const getCount = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://afootballleague.ddns.net/api/v1/teams/count`
  //     );
  //     if (res.status === 200) {
  //       setCount(await res.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    getTournament(contentSearch, currentPage, "NAME", contentSearch);
    //getCount();
  }, [check, currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    getTournament(contentSearch, currentPage, "NAME", contentSearch);
    //setCheck(!check);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    getTournament(contentSearch, currentPage, "NAME", contentSearch);
    //setCheck(!check);
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "contentSearch":
        setContentSearch(value);
        break;
      case "provice":
        setProviceSearch(value !== "default" ? value : "");
        const newDistrics = provice.find((item) => item.name === value);
        setDistrics(value !== "default" ? newDistrics.districts : null);
        getTournament(
          contentSearch,
          currentPage,
          "PROVICE",
          value !== "default" ? value : ""
        );
        break;
      case "districts":
        getTournament(
          contentSearch,
          currentPage,
          "PROVICE",
          value !== "default" ? value : ""
        );
        setDistricSearch(value !== "default" ? value : "");
        break;
      default:
        setGender(value !== "default" ? value : "");
        getTournament(
          contentSearch,
          currentPage,
          "GENDER",
          value !== "default" ? value : ""
        );
        break;
    }
  };

  const splitTeamArea = (teamArea) => {
    let myArray = teamArea.split(",");
    return myArray[myArray.length - 1];
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
            <h1 className={styles.titleFindTour}>tìm đội bóng</h1>
            <p className={styles.desFindTour}>
              Tìm và đăng ký tham gia vào đội bóng theo đúng sở thích bản thân
            </p>
          </div>
          <form className={styles.formFindTour} onSubmit={onSubmitHandler}>
            <div className={styles.findWrap}>
              <input
                name="contentSearch"
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
            {loading ? (
              <Loading />
            ) : (
              <div className={styles.selectOp}>
                <select
                  style={{
                    backgroundColor: "black",
                  }}
                  onChange={onChangeHandler}
                  name="provice"
                  value={proviceSearch}
                  className={styles.selectArea}
                >
                  <option value="default">Tỉnh/Thành phố</option>
                  {provice !== null
                    ? provice.map((iteam, index) => {
                        return <option value={iteam.name}>{iteam.name}</option>;
                      })
                    : null}
                </select>
                <select
                  style={{
                    backgroundColor: "black",
                  }}
                  onChange={onChangeHandler}
                  value={districSearch}
                  name="districts"
                  className={styles.typeFootball}
                >
                  <option value="default">Quận/Huyện</option>
                  {proviceSearch !== ""
                    ? districs.map((item, index) => {
                        return (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })
                    : null}
                </select>
                <select
                  style={{
                    backgroundColor: "black",
                  }}
                  onChange={onChangeHandler}
                  value={gender}
                  name="gender"
                  className={styles.sortTour}
                >
                  <option value="default">Giới tính</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                </select>
              </div>
            )}
          </form>
        </div>
        {/* listteam */}
        {/* <ListTeam teams={teams} /> */}
        <div className={styles.listTournament}>
          <h1 className={styles.titleListTour}>Các đội bóng</h1>
          <div className={styles.listTour}>
            {loading ? (
              <Loading />
            ) : teams.length !== 0 ? (
              teams.map((team) => {
                return (
                  <div key={team.id}>
                    <Link
                      to={`/teamDetail/${team.id}/inforTeamDetail`}
                      className={styles.team}
                      key={team.id}
                    >
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
                          Bóng Đá {team.teamGender === "Male" ? "Nam" : "Nữ"}{" "}
                          {team.teamArea !== ""
                            ? "| " + splitTeamArea(team.teamArea)
                            : ""}
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
                  </div>
                );
              })
            ) : (
              <h1
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 30,
                }}
              >
                Không tìm thấy đội bóng
              </h1>
            )}
          </div>
        </div>
        {/* paging */}
        {teams.length !== 0 ? (
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
};

export default MyTournamemts;
