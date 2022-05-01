import React from "react";
import "./styles/style.css";
import Flickity from "react-flickity-component";

const flickityOptions = {
  contain: false,
  cellAlign: "left",
  fade: true,
  selectedAttraction: 0.01,
  friction: 0.15,
  prevNextButtons: false,
};
function AboutHome() {
  let flakty = null;
  const myCustomNext = () => {
    flakty.next();
  };
  const myCustomPrev = () => {
    flakty.previous();
  };
  return (
    <div className="about" data-aos="flip-left">
    <h3 className="title">Cảm nhận về AFL</h3>
      <div className="about-control">
        <div className="btnctr --prev" onClick={myCustomPrev}>
          <i>
            <img src="assets/icons/arrow.png" alt="arrow" />
          </i>
        </div>
        <div className="btnctr --next" onClick={myCustomNext}>
          <i>
            <img src="assets/icons/arrow.png" alt="arrow" />
          </i>
        </div>
      </div>
      <Flickity
        options={flickityOptions}
        flickityRef={(c) => (flakty = c)}
        className="about__list"
      >
        <div className="about__list-item">
          <div className="about__img">
            <img src="/assets/img/homepage/pic-1.png" alt="dev" />
          </div>
          <div className="about__text">
            <img
              src="/assets/img/homepage/cmon.png"
              alt="as"
              className="common"
            />
            <p className="about__text-desc">
              Trong suốt hơn năm thập kỷ qua, AFL không quên sứ mệnh tạo ra các
              phương tiện cá nhân tiện lợi và hữu ích trong cuộc sống, từ đó
              giành được trái tim của người tiêu dùng trên toàn thế giới, trong
              đó có Việt Nam.
            </p>
            <p className="about__text-name">Nguyễn Thanh Thanh Tú</p>
            <p className="role">Nhà phát triển</p>
          </div>
        </div>
        <div className="about__list-item">
          <div className="about__img">
            <img src="/assets/img/homepage/pic-2.png" alt="dev" />
          </div>
          <div className="about__text">
            <img
              src="/assets/img/homepage/cmon.png"
              alt="as"
              className="common"
            />
            <p className="about__text-desc">
              Bóng đá giúp chúng ta xây dựng tính tập thể cao, ý chí chiến đấu
              ngoan cường, luôn khắc phục mọi khó khăn dù trong nghịch cảnh để
              chiến thắng hoàn cảnh bất lợi, nêu cao tinh thần trách nhiệm cá
              nhân trước một tập thể. Giúp cho 1 đội đoàn kết sẽ có tính tương
              trợ lẫn nhau trong thi đấu cũng như ngoài cuộc sống.
            </p>
            <p className="about__text-name">Nguyễn Tuấn Anh</p>
            <p className="role">Nhà phát triển</p>
          </div>
        </div>
        <div className="about__list-item">
          <div className="about__img">
            <img src="/assets/img/homepage/pic-3.png" alt="dev" />
          </div>
          <div className="about__text">
            <img
              src="/assets/img/homepage/cmon.png"
              alt="as"
              className="common"
            />
            <p className="about__text-desc">
              Trong suốt hơn năm thập kỷ qua, AFL không quên sứ mệnh tạo ra các
              phương tiện cá nhân tiện lợi và hữu ích trong cuộc sống, từ đó
              giành được trái tim của người tiêu dùng trên toàn thế giới, trong
              đó có Việt Nam.
            </p>
            <p className="about__text-name">Trương Anh Khoa</p>
            <p className="role">Nhà phát triển</p>
          </div>
        </div>
        <div className="about__list-item">
          <div className="about__img">
            <img src="/assets/img/homepage/pic-4.png" alt="dev" />
          </div>
          <div className="about__text">
            <img
              src="/assets/img/homepage/cmon.png"
              alt="as"
              className="common"
            />
            <p className="about__text-desc">
              Trong suốt hơn năm thập kỷ qua, AFL không quên sứ mệnh tạo ra các
              phương tiện cá nhân tiện lợi và hữu ích trong cuộc sống, từ đó
              giành được trái tim của người tiêu dùng trên toàn thế giới, trong
              đó có Việt Nam.
            </p>
            <p className="about__text-name">Nguyễn Văn Tâm</p>
            <p className="role">Nhà phát triển</p>
          </div>
        </div>
      </Flickity>
    </div>
  );
}

export default AboutHome;
