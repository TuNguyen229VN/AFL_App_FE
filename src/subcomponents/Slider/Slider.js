import React, { useState } from "react";
import "./styles/style.css";
import Flickity from "react-flickity-component";
import { Link } from "react-router-dom";

var dots=0;
const flickityOptions = {
  contain: true,
  prevNextButtons: false,
  autoPlay: 8000,
  pauseAutoPlayOnHover: true,
  imagesLoaded: true,
  percentPosition: false,
  wrapAround: true,
  on: {
    change: function (index) {
      let number = document.querySelector(".slider__bottom-paging .number");
      let indexPage = index + 1;
      let a = indexPage.toString();
      number.innerHTML = a.padStart(2, 0);
    },
  },
};

const Slider = () => {
 const [flkty, setFlkty] = useState(null)
  const myCustomNext = () => {
    flkty.next();
  };
  const myCustomPrev = () => {
    flkty.previous();
  };

  return (
    <div className="slider">
      <Flickity
        flickityRef={(c) => (setFlkty(c))}
        className="slider__item-wrap"
        options={flickityOptions}
      >
        <div className="slider__item">
          <div className="slider__item-text">
            <h2 className="title">Amateur football league</h2>
            <p className="desc">
              AFL giúp người dùng tạo ra các giải đấu có thể thức tương tự với
              các giải đấu nổi tiếng thế giới như Premier League, Champions
              League, World Cup.
            </p>
            <a href="#" className="btn --button-main">
              <p>Xem chi tiết về hệ thống</p>
              <i>
                <img src="/assets/icons/longArrow.svg" alt="arrow2" />
              </i>
            </a>
          </div>
          <div className="slider__item-gallery">
            <div className="slider_item-img">
              <img src="/assets/img/homepage/a1.jpg" alt="img" />
            </div>
            <div className="slider_item-img">
              <img src="/assets/img/homepage/a2.jpg" alt="img" />
            </div>
            <div className="slider_item-img">
              <img src="/assets/img/homepage/a3.jpg" alt="img" />
            </div>
          </div>
          <img
            src="/assets/img/homepage/banner1.jpg"
            alt="banner"
            className="slider__item-img"
          />
        </div>
        <div className="slider__item ">
          <div className="slider__item-text">
            <h2 className="title">Amateur football league</h2>
            <p className="desc">
              AFL giúp người dùng tạo ra các giải đấu có thể thức tương tự với
              các giải đấu nổi tiếng thế giới như Premier League, Champions
              League, World Cup ...
            </p>
            <Link to={"/createTournament"} className="btn --button-main">
              <p>Tạo giải đấu cho riêng mình</p>
              <i>
                <img src="/assets/icons/longArrow.svg" alt="arrow2" />
              </i>
            </Link>
          </div>
          <div className="slider__item-gallery">
            <div className="slider_item-img">
              <img src="/assets/img/homepage/a1.jpg" alt="img" />
            </div>
            <div className="slider_item-img">
              <img src="/assets/img/homepage/a2.jpg" alt="img" />
            </div>
            <div className="slider_item-img">
              <img src="/assets/img/homepage/a3.jpg" alt="img" />
            </div>
          </div>
          <img
            src="/assets/img/homepage/banner2.jpg"
            alt="banner"
            className="slider__item-img"
          />
        </div>
        <div className="slider__item ">
          <div className="slider__item-text">
            <h2 className="title">Amateur football league</h2>
            <p className="desc">
              AFL giúp người dùng tạo ra các giải đấu có thể thức tương tự với
              các giải đấu nổi tiếng thế giới như Premier League, Champions
              League, World Cup ...
            </p>
            <Link to={"/createTeam"} className="btn --button-main">
              <p>Tạo đội bóng cho riêng mình</p>
              <i>
                <img src="/assets/icons/longArrow.svg" alt="arrow2" />
              </i>
            </Link>
          </div>
          <div className="slider__item-gallery">
            <div className="slider_item-img">
              <img src="/assets/img/homepage/a1.jpg" alt="img" />
            </div>
            <div className="slider_item-img">
              <img src="/assets/img/homepage/a2.jpg" alt="img" />
            </div>
            <div className="slider_item-img">
              <img src="/assets/img/homepage/a3.jpg" alt="img" />
            </div>
          </div>
          <img
            src="/assets/img/homepage/banner3.jpg"
            alt="banner"
            className="slider__item-img"
          />
        </div>
      </Flickity>
      <div className="slider__bottom">
        <div className="container-fluid">
          <div className="slider__bottom-paging">
            <div className="number">01</div>
            <div className="dotted ">
            </div>
          </div>
          <div className="slider__bottom-mouse">
            <div className="mouse">
              <img src="/assets/icons/mouse61.png" alt="mouse" />
            </div>
            <div className="arrow">
              <img src="/assets/icons/arrowDown.png" alt="arrowDown" />
            </div>
          </div>
          <div className="slider__bottom-control">
            <div className="btnctr --prev" onClick={myCustomPrev}>
              <i>
                <img src="/assets/icons/arrow.png" alt="arrow" />
              </i>
            </div>
            <div className="btnctr --next" onClick={myCustomNext}>
              <i>
                <img src="/assets/icons/arrow.png" alt="arrow" />
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
