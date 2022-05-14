import React from "react";
import "./styles/style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderTournamentDetail from "./HeaderTournamentDetail";
import { ImageGroup, Image } from "react-fullscreen-image";
function GalleryTournamentDetail() {
  const images = [
    "/assets/img/homepage/banner1.jpg",
    "/assets/img/homepage/banner2.jpg",
    "/assets/img/homepage/banner3.jpg",
    "/assets/img/homepage/banner1.jpg",
    "/assets/img/homepage/banner2.jpg",
    "/assets/img/homepage/banner3.jpg",
    // "/assets/img/homepage/banner2.jpg",
  ];
  return (
    <>
      <Header />
      <div className="teamdetail">
        <HeaderTournamentDetail />
        <div className="teamdetail__content gallery__tour">
          <h2 className="title">Hình Ảnh</h2>
          <ImageGroup>
        <ul className="images">
          {images.map(i => (
            <li key={i}>
              <Image src={i} alt="mountains" />
            </li>
          ))}
        </ul>
      </ImageGroup>
          {/* <div className="gallery__list">
              <div className="gallery__item">
                <img src="/assets/img/homepage/banner1.jpg" alt="gallery_item"/>
              </div>
              <div className="gallery__item">
                <img src="/assets/img/homepage/banner2.jpg" alt="gallery_item"/>
              </div>
              <div className="gallery__item">
                <img src="/assets/img/homepage/banner3.jpg" alt="gallery_item"/>
              </div>
              <div className="gallery__item">
                <img src="/assets/img/homepage/banner1.jpg" alt="gallery_item"/>
              </div>
              <div className="gallery__item">
                <img src="/assets/img/homepage/banner2.jpg" alt="gallery_item"/>
              </div>
              <div className="gallery__item">
                <img src="/assets/img/homepage/banner3.jpg" alt="gallery_item"/>
              </div>
              <div className="gallery__item">
                <img src="/assets/img/homepage/banner1.jpg" alt="gallery_item"/>
              </div>
            </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GalleryTournamentDetail;
