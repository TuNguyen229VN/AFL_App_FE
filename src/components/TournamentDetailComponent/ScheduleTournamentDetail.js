import React, { useState } from "react";
import "./styles/style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderTournamentDetail from "./HeaderTournamentDetail";
function ScheduleTournamentDetail() {
  const [active, setactive] = useState(true);
  return (
    <>
      <Header />
      <div className="teamdetail ">
        <HeaderTournamentDetail />
        <div className="teamdetail__content schedule__tour">
          <div className="wrap__title">
            <h2 className="title">Lịch thi đấu</h2>
            <div className="option__view">
              <p
                className={active ? "active" : ""}
                onClick={() => {
                  setactive(true);
                }}
              >
                Danh sách
              </p>
              <p
                className={!active ? "active" : ""}
                onClick={() => {
                  setactive(false);
                }}
              >
                Biểu đồ
              </p>
            </div>
          </div>
          {active ? (
            <div className="wrap__table">
              <table className="schedule__table">
                <tr>
                  <th colSpan={4}>Bảng đấu vòng tròn</th>
                </tr>
                <tr>
                  <td>20-11-2021 12h30</td>
                  <td>
                    Đội A
                    <img
                      src="/assets/img/homepage/banner1.jpg"
                      alt="gallery_item"
                    />
                  </td>
                  <td>
                    <span className="score">1</span>
                    <span className="score"> - </span>
                    <span className="score">0</span>
                  </td>
                  <td>
                    <img
                      src="/assets/img/homepage/banner1.jpg"
                      alt="gallery_item"
                    />
                    Đội B{" "}
                  </td>
                </tr>
                <tr>
                  <td>20-11-2021 11h30</td>
                  <td>
                    Đội A
                    <img
                      src="/assets/img/homepage/banner1.jpg"
                      alt="gallery_item"
                    />
                  </td>
                  <td>
                    <span className="score">0</span>
                    <span className="score"> - </span>
                    <span className="score">0</span>
                  </td>
                  <td>
                    <img
                      src="/assets/img/homepage/banner1.jpg"
                      alt="gallery_item"
                    />
                    Đội B{" "}
                  </td>
                </tr>
              </table>
              <table className="schedule__table">
                <tr>
                  <th colSpan={4}>Bảng A</th>
                </tr>
                <tr>
                  <td>20-11-2021 12:12</td>
                  <td>
                    Đội A
                    <img
                      src="/assets/img/homepage/banner1.jpg"
                      alt="gallery_item"
                    />
                  </td>
                  <td>
                    <span className="score">1</span>
                    <span className="score"> - </span>
                    <span className="score">0</span>
                  </td>
                  <td>
                    <img
                      src="/assets/img/homepage/banner1.jpg"
                      alt="gallery_item"
                    />
                    Đội B{" "}
                  </td>
                </tr>
                <tr>
                  <td>20-11-2021 11:22</td>
                  <td>
                    Đội A
                    <img
                      src="/assets/img/homepage/banner1.jpg"
                      alt="gallery_item"
                    />
                  </td>
                  <td>
                    <span className="score">0</span>
                    <span className="score"> - </span>
                    <span className="score">0</span>
                  </td>
                  <td>
                    <img
                      src="/assets/img/homepage/banner1.jpg"
                      alt="gallery_item"
                    />
                    Đội B{" "}
                  </td>
                </tr>
              </table>
            </div>
          ) : (
            <div className="round">
              <div className="round__container">
                <div className="match__container">
                  <div className="match__item">
                    <table>
                      <tr>
                        <td rowSpan={2} className="num">1</td>
                        <td className="row1">
                          Đội Z
                          <img
                            src="/assets/img/homepage/banner1.jpg"
                            alt="gallery_item"
                          />
                        </td>
                        <td className="row2">1</td>
                      </tr>
                      <tr>
                        <td className="row1">
                          Đội A
                          <img
                            src="/assets/img/homepage/banner1.jpg"
                            alt="gallery_item"
                          />
                        </td>
                        <td className="row2">0</td>
                      </tr>
                    </table>
                  </div>
                  <div className="match__item">
                    <table>
                      <tr>
                        <td rowSpan={2} className="num">2</td>
                        <td className="row1">
                          Đội Z
                          <img
                            src="/assets/img/homepage/banner1.jpg"
                            alt="gallery_item"
                          />
                        </td>
                        <td className="row2">-</td>
                      </tr>
                      <tr>
                        <td className="row1">
                          Đội A
                          <img
                            src="/assets/img/homepage/banner1.jpg"
                            alt="gallery_item"
                          />
                        </td>
                        <td className="row2">-</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="match__container">
                  <div className="match__item">
                    <table>
                      <tr>
                        <td rowSpan={2} className="num">1</td>
                        <td className="row1">
                          Đội Z
                          <img
                            src="/assets/img/homepage/banner1.jpg"
                            alt="gallery_item"
                          />
                        </td>
                        <td className="row2">1</td>
                      </tr>
                      <tr>
                        <td className="row1">
                          Đội A
                          <img
                            src="/assets/img/homepage/banner1.jpg"
                            alt="gallery_item"
                          />
                        </td>
                        <td className="row2">0</td>
                      </tr>
                    </table>
                  </div>
                  <div className="match__item">
                    <table>
                      <tr>
                        <td rowSpan={2} className="num">2</td>
                        <td className="row1">
                          Đội Z
                          <img
                            src="/assets/img/homepage/banner1.jpg"
                            alt="gallery_item"
                          />
                        </td>
                        <td className="row2">-</td>
                      </tr>
                      <tr>
                        <td className="row1">
                          Đội A
                          <img
                            src="/assets/img/homepage/banner1.jpg"
                            alt="gallery_item"
                          />
                        </td>
                        <td className="row2">-</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ScheduleTournamentDetail;
