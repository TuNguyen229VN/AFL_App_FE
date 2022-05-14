import React from "react";
import "./styles/style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderTournamentDetail from "./HeaderTournamentDetail";
function PredictionTournamentDetail() {
  return (
    <>
    <div className="popup__prediction">
      
    </div>
      <Header />
      <div className="teamdetail">
        <HeaderTournamentDetail />
        <div className="teamdetail__content schedule__tour prediction">
        <div className="wrap__table">
              <table className="schedule__table">
                <tr>
                  <th colSpan={5}>Dự đoán</th>
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
                  <td><button className="btnPrediction">Dự đoán</button></td>
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
                  <td><button className="btnPrediction">Dự đoán</button></td>
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
                  <td><button className="btnPrediction">Dự đoán</button></td>
                </tr>
              </table>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PredictionTournamentDetail;
