import React from "react";
import "./styles/style.css";
import { ImageGroup, Image } from "react-fullscreen-image";
function GalleryTournamentDetail() {
  const images = [
    "/assets/img/homepage/banner1.jpg",
    "/assets/img/homepage/banner2.jpg",
    "/assets/img/homepage/banner3.jpg",
    "/assets/img/homepage/banner1.jpg",
    "/assets/img/homepage/banner2.jpg",
    "/assets/img/homepage/banner3.jpg",
    "/assets/img/homepage/banner2.jpg",
  ];
  return (
    <>
        <div className="teamdetail__content gallery__tour">
          <h2 className="title">Hình Ảnh</h2>
          <ImageGroup>
            <ul className="images">
              {images.map((i) => (
                <li key={i}>
                  <Image src={i} alt="mountains" />
                </li>
              ))}
            </ul>
          </ImageGroup>
        </div>
    </>
  );
}

export default GalleryTournamentDetail;
