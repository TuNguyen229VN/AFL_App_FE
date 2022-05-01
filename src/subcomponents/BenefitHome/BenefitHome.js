import React from "react";
import "./styles/style.css";
function BenefitHome() {
  return (
    <div className="benefithome">
      <h2 className="title">Lợi ích</h2>
      <p className="title__desc">Website mang đến rất nhiều lợi ích không thể bàn cãi cho những ai đam mê</p>
      <div className="tournament__list">
        <a href="#" className="tournaments__list-item">
          <div className="tournament__img">
            <img src="./assets/icons/bene1.png" alt="team" className="azzz"/>
          </div>
          <div className="tournament__text">
            <h3>Tiện lợi</h3>
            <p>
              Có nhiều chức năng tiện lợi và nhanh chóng. Chỉ cần vài bước cơ
              bản đã tạo nên giải đấu cho riêng mình
            </p>
            <a href="#" className="torunament__another">
              Xem thêm
            </a>
          </div>
        </a>
        <div className="tournaments__list-item">
          <div className="tournament__img">
            <img src="./assets/icons/bene2.png" alt="bene" />
          </div>
          <div className="tournament__text">
            <h3>Thời gian</h3>
            <p>
              Tiết kiệm rất nhiều thời gian thay vì phải gọi điện, đặt lịch, họp
              mặt, sắp xếp như cách truyền thống
            </p>
            <a href="#" className="torunament__another">
              Xem thêm
            </a>
          </div>
        </div>
        <div className="tournaments__list-item">
          <div className="tournament__img">
            <img src="./assets/icons/bene3.png" alt="bene" />
          </div>
          <div className="tournament__text">
            <h3>Cập nhật</h3>
            <p>
              Tin tức và chức năng luôn được cập nhật liên tục 24/24. Dường như
              không thể bỏ sót một tin nóng hổi nào.
            </p>
            <a href="#" className="torunament__another">
              Xem thêm
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BenefitHome;
