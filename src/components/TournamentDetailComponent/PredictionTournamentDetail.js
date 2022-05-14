import React, { useState } from "react";
import "./styles/style.css";
function PredictionTournamentDetail() {
  const [activePopup, setActivePopup] = useState(false);
  return (
    <>
      <div className={activePopup ? "overlay active" : "overlay"}  onClick={()=>setActivePopup(false)}/>
      <div
        className={
          activePopup ? "popup__prediction active" : "popup__prediction"
        }
      >
        <h2>Dự đoán trận đấu 20-11-2021 </h2>
        <p
          className="close"
          onClick={() => {
            setActivePopup(false);
          }}
        >
          X
        </p>
        <div className="popup__prediction__wrap">
          <h3 className="teamA__prediction">Đội A</h3>
          <input type="number" />
          <div className="line"></div>
          <input type="number" />
          <h3 className="teamA__prediction">Đội B</h3>
        </div>
        <button
          onClick={() => {
            setActivePopup(false);
          }}
        >
          Xác nhận
        </button>
      </div>

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
              <td>
                <button
                  className="btnPrediction"
                  onClick={() => setActivePopup(true)}
                >
                  Dự đoán
                </button>
              </td>
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
              <td>
                <button
                  className="btnPrediction"
                  onClick={() => setActivePopup(true)}
                >
                  Dự đoán
                </button>
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
              <td>
                <button
                  className="btnPrediction"
                  onClick={() => setActivePopup(true)}
                >
                  Dự đoán
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default PredictionTournamentDetail;
