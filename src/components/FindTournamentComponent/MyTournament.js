import React, { useEffect, useState } from "react";
// import ListTournament from "./ListTournament";
// import FindTournaments from "./FindTournament";
// import PagingTournament from "./PagingTournament";
import styles from "./TournamentFind.module.css";
import gsap from "gsap";
import AOS from "aos";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Transitions from "../Transitions/Transitions";
import { getAPI } from "../../api/index";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Loading from "../LoadingComponent/Loading";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
const MyTournamemts = () => {
  AOS.init();
  const tour = gsap.timeline();
  const [tournaments, setTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [contentSearch, setContentSearch] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tourType, setTourType] = useState("");
  const [footballField, setFootballField] = useState("");
  const [mode, setMode] = useState("");
  const [sort, setSort] = useState("");
  const [gender, setGender] = useState("");
  const [orderBy, setOrderBy] = useState("DateCreate");
  const [orderType, setOrderType] = useState("DESC")
  // Get Tournament
  const getTournament = async (nameFind, currentPage, anotherSearch, value) => {
    try {
      setLoading(true);
      //console.log(anotherSearch);
      let afterDefaultURL = null;
      if (anotherSearch === null) {
        afterDefaultURL = `tournaments?tournament-name=${nameFind}&tournament-mode=&tournament-type=&tournament-gender=&tournament-football-type=&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=8`;
      } else if (anotherSearch === "MODE") {
        afterDefaultURL = `tournaments?tournament-name=${nameFind}&tournament-mode=${value}&tournament-type=${tourType}&tournament-gender=${gender}&tournament-football-type=${footballField}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=8`;
      } else if (anotherSearch === "TOURTYPE") {
        afterDefaultURL = `tournaments?tournament-name=${nameFind}&tournament-mode=${mode}&tournament-type=${value}&tournament-gender=${gender}&tournament-football-type=${footballField}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=8`;
      } else if (anotherSearch === "FIELDTYPE") {
        afterDefaultURL = `tournaments?tournament-name=${nameFind}&tournament-mode=${mode}&tournament-type=${tourType}&tournament-gender=${gender}&tournament-football-type=${value}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=8`;
      } else if (anotherSearch === "GENDER") {
        afterDefaultURL = `tournaments?tournament-name=${nameFind}&tournament-mode=${mode}&tournament-type=${tourType}&tournament-gender=${value}&tournament-football-type=${footballField}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=8`;
      } else if (anotherSearch === "NAME") {
        afterDefaultURL = `tournaments?tournament-name=${nameFind}&tournament-mode=${mode}&tournament-type=${tourType}&tournament-gender=${gender}&tournament-football-type=${footballField}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=8`;
      } else if (anotherSearch === "SORT"){
        const fullOrder = value.split("-");
        afterDefaultURL = `tournaments?tournament-name=${nameFind}&tournament-mode=${mode}&tournament-type=${tourType}&tournament-gender=${gender}&tournament-football-type=${footballField}&order-by=${fullOrder[0]}&order-type=${fullOrder[1]}&page-offset=${currentPage}&limit=8`;
      }
      const res = await getAPI(afterDefaultURL);
      if (res.status === 200) {
        setTournaments(await res.data.tournaments);
        setLoading(false);
        setCount(res.data.countList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get Total Count Tournament
  // const getCount = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://afootballleague.ddns.net/api/v1/tournaments/count`
  //     );
  //     if (res.status === 200) {
  //       console.log(res.data)
  //       setCount(await res.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Get Type Tournament
  // const getFootballField = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://afootballleague.ddns.net/api/v1/football-field-types?page-offset=1&limit=5`
  //     );
  //     if (res.status === 200) {
  //       setFootballField(await res.data.footballFieldTypes);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Get FootballFiled Tournament
  // const getTourType = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://afootballleague.ddns.net/api/v1/tournament-types?page-offset=1&limit=5`
  //     );
  //     if (res.status === 200) {
  //       setTourType(await res.data.tournamentTypes);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Click paging number
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    setCheck(!check);
    getTournament(contentSearch, data.selected + 1, "NAME", null);
  };

  // Search action
  const onSubmitHandler = (e) => {
    e.preventDefault();
    getTournament(contentSearch, currentPage, "NAME", null);
    setCheck(!check);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "searchName":
        setContentSearch(value);
        break;
      case "FIELDTYPE":
        setFootballField(value === "default" ? "" : value);
        getTournament(
          contentSearch,
          currentPage,
          "FIELDTYPE",
          value === "default" ? "" : value
        );
        break;
      case "TOURTYPE":
        setTourType(value === "default" ? "" : value);
        getTournament(
          contentSearch,
          currentPage,
          "TOURTYPE",
          value === "default" ? "" : value
        );
        break;
      case "SORT":
        let ordertype = null;
        let orderby = null;
        console.log(value);
        if(value === 'nameDesc'){
          orderby = "TournamentName";
          ordertype = "ASC";

        }else if ( value === "nameIns"){
          orderby = "TournamentName";
          ordertype = "DESC";
        }else if ( value === "timeDesc"){
          orderby ="DateCreate" ;
          ordertype = "ASC";
        }else if( value === "default"){
          orderby ="DateCreate" ;
          ordertype = "DESC";
        }
        else{
          orderby = "DateCreate";
          ordertype = "DESC";
        }
          setOrderBy(orderby);
          setOrderType(ordertype);
          
          getTournament(
            contentSearch,
            currentPage,
            "SORT",
            value === "default" ? "DateCreate-DESC" : orderby + "-" + ordertype
          );
        setSort(value === "default" ? "" : value);
        break;
      case "MODE":
        setMode(value === "default" ? "" : value);
        getTournament(
          contentSearch,
          currentPage,
          "MODE",
          value === "default" ? "" : value
        );
        break;
      default:
        setGender(value === "default" ? "" : value);
        getTournament(
          contentSearch,
          currentPage,
          "GENDER",
          value === "default" ? "" : value
        );
        break;
    }
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
    } else {
      return "";
    }
  };
  const splitTeamArea = (teamArea) => {
    let a = teamArea;
    if (a !== null) {
      let myArray = a.split(",");
      return myArray[myArray.length - 1];
    }
    return teamArea;
  };
  // Use Effect
  useEffect(() => {
    getTournament(contentSearch, currentPage, "NAME", null);

    // getFootballField();
    // getTourType();
  }, [check, currentPage]);

  return (
    <>
      <ScrollToTop />
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
          <form onSubmit={onSubmitHandler}>
            <div className={styles.findWrap}>
              <input
                className={styles.inputNameTour}
                placeholder="Tên giải đấu"
                value={contentSearch}
                name="searchName"
                onChange={onChangeHandler}
              />
              <input
                className={styles.btnFindTour}
                type="submit"
                value="Tìm kiếm"
              />
            </div>
            <div className={styles.selectOp}>
              <select
                onChange={onChangeHandler}
                name="MODE"
                value={mode}
                className={styles.selectArea}
              >
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="default"
                  selected
                >
                  Chế độ
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="PUBLIC"
                >
                  Giải đấu mở rộng
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="PRIVATE"
                >
                  Giải đấu riêng tư
                </option>
              </select>
              <select
                onChange={onChangeHandler}
                name="GENDER"
                value={gender}
                className={styles.selectArea}
              >
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="default"
                  selected
                >
                  Giới tính
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="Male"
                >
                  Nam
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="Female"
                >
                  Nữ
                </option>
              </select>
              <select
                onChange={onChangeHandler}
                value={footballField}
                name="FIELDTYPE"
                className={styles.selectArea}
              >
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="default"
                  selected
                >
                  Loại sân
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="Field5"
                >
                  Sân 5
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="Field7"
                >
                  Sân 7
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="Field11"
                >
                  Sân 11
                </option>
              </select>
              <select
                onChange={onChangeHandler}
                value={tourType}
                name="TOURTYPE"
                className={styles.typeFootball}
              >
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  selected
                  value="default"
                >
                  Hình thức
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="KnockoutStage"
                >
                  Loại trực tiếp
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="CircleStage"
                >
                  Vòng tròn
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="GroupStage"
                >
                  Chia bảng
                </option>
              </select>
              <select
                onChange={onChangeHandler}
                value={sort}
                name="SORT"
                className={styles.sortTour}
              >
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="default"
                  selected
                >
                  Sắp Xếp
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="nameDesc"
                >
                  A -> Z
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="nameIns"
                >
                  Z -> A
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="timeDesc"
                >
                  Giải cũ nhất
                </option>
                <option
                  style={{
                    backgroundColor: "black",
                  }}
                  value="timeIns"
                >
                  Giải mới nhất
                </option>
              </select>
            </div>
          </form>
        </div>

        {/* List */}
        {/* {loading?<Loading/>: <ListTournament tournaments={tournaments} />} */}

        <div className={styles.listTournament}>
          <h1 className={styles.titleListTour}>Các Giải đấu</h1>
          <div className={styles.listTour}>
            {loading ? (
              <Loading />
            ) : (
              tournaments.length > 0 ? tournaments.map((tour) => {
                if (tour.status === true) {
                  return (
                    <div key={tour.id}>
                      <Link
                        to={`/tournamentDetail/${tour.id}/inforTournamentDetail`}
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
                            {tour.mode + " | " + tour.gender}
                          </p>
                          <p className={styles.type}>
                            {getType(tour.tournamentTypeId)}
                            {tour.footballFieldAddress !== ""
                              ? "| " + splitTeamArea(tour.footballFieldAddress)
                              : ""}
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
                    </div>
                  );
                }
              }) : <div></div>
            )}
            
          </div>
          { tournaments.length <= 0 ?  <h1 className={styles.titleNoContent}>Không tìm thấy giải đấu phù hợp</h1> :
          null}
          
        </div>

        {/* Paging */}
        {
          tournaments.length > 0 ? <nav
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
        </nav> : <nav></nav>
        }

      </div>
      <Footer />
    </>
  );
};

export default MyTournamemts;
