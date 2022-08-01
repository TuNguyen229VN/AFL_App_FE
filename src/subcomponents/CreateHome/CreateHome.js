import React from "react";
import { Link } from "react-router-dom";
import "./styles/style.css";
const CreateHome = () => {
  return (
    <div className="products pd">
      <div className="product">
        <div className="product__text textbox" data-aos="fade-right">
          <h2 className="titlemain">tạo giải đấu</h2>
          <p className="description">
            Bạn có thể tổ chức một giải đấu qua hình thức online với các thể
            thức thi đấu đa dạng khác nhau còn gì tuyệt hơn
          </p>
          <a href="#" className="btnmore">
            xem thêm <img src="/assets/icons/arrow.png" alt="arrowRight" />
          </a>
        </div>
        <div className="product__img" data-aos="fade-left">
          <img src="/assets/img/homepage/product1.jpg" alt="product" />
        </div>
      </div>
      <div className="product">
        <div
          className="product__text textbox --textright "
          data-aos="fade-left"
        >
          <h2 className="titlemain ">tạo đội bóng</h2>
          <p className="description ">
            Bạn có thể tạo một đội bóng hình thức online với các thể thức thi
            đấu đa dạng khác nhau còn gì tuyệt hơn
          </p>
          <Link to={"/createTeam"} className="btnmore ">
            xem thêm <img src="/assets/icons/arrow.png" alt="arrowRight " />
          </Link>
        </div>
        <div className="product__img " data-aos="fade-right">
          <img src="/assets/img/homepage/product2.jpg " alt="product " />
        </div>
      </div>
    </div>
  );
};

export default CreateHome;
