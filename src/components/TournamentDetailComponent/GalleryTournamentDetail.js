import React from "react";
import "./styles/style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderTournamentDetail from "./HeaderTournamentDetail";
function GalleryTournamentDetail() {
  return (
    <>
      <Header />
      <div className="teamdetail">
        <HeaderTournamentDetail />
        <div className="teamdetail__content gallery__tour">
            <h2 className="title">Hình Ảnh</h2>
            <div className="gallery__list">
              <div className="gallery__item">
                <img src="assets/img/homepage/banner1.jpg" alt="gallery_item"/>
              </div>
              <div className="gallery__item">
                <img src="assets/img/homepage/banner2.jpg" alt="gallery_item"/>
              </div>
              <div className="gallery__item">
                <img src="assets/img/homepage/banner3.jpg" alt="gallery_item"/>
              </div>
              <div className="gallery__item">
                <img src="assets/img/homepage/banner1.jpg" alt="gallery_item"/>
              </div>
              <div className="gallery__item">
                <img src="assets/img/homepage/banner2.jpg" alt="gallery_item"/>
              </div>
              <div className="gallery__item">
                <img src="assets/img/homepage/banner3.jpg" alt="gallery_item"/>
              </div>
              <div className="gallery__item">
                <img src="assets/img/homepage/banner1.jpg" alt="gallery_item"/>
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GalleryTournamentDetail;
