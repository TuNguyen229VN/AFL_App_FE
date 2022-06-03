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
import {getAllFootballPlayerAPI} from "../../api/FootballPlayer"
export default function FootballPlayer() {
  AOS.init();
  const tour = gsap.timeline();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    getAllFootballPlayer();
  },[])
  const executeSearchType = () => {

  }
  const getAllFootballPlayer = () => {
    //const response = getAllFootballPlayerAPI();
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
            <h1 className={styles.titleFindTour}>Cầu thủ</h1>
            <p className={styles.desFindTour}>
              Tìm kiếm cầu thủ theo đúng sở thích bản thân
            </p>
          </div>
          {/* <form className={styles.formFindTour} onSubmit={onSubmitHandler}>
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
                  {provice != null
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
                  {proviceSearch != ""
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
          </form> */}
        </div>
        <div className={styles.listTournament}>
        <h1 className={styles.titleListTour}>Các cầu thủ</h1>
        <div className={styles.listTour}>
          {loading ? <LoadingAction /> : null}
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
