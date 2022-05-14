import React from "react";
import "./styles/style.css";


function ListPlayer() {
  return (
    <>
    
    <div className="teamdetail">

      <div className="teamdetail__content listPlayer">
        <h3 className="listPlayer__title">Danh sách thành viên</h3>
        <div style={{
          display: "flex",
          justifyContent: "right"
        }}>
        <button className="createTeam_btn">Thêm thành viên</button>
        </div>
        
        <h2 className="listPlayer__total">Có 30 thành viên</h2>
        <div className="listPlayer__list">
          <div className="listPlayer__item">
            <div className="avt">
            <img src="/assets/img/teamdetail/TNB-48309.jpg" alt="dev" />
            </div>
            <div className="des">
            <p className="namePlayer"><span>Tên:</span>Nguyễn Tú</p>
              <p className="genderPlayer"><span>Giới tính:</span>Nam</p>
              <p className="mailPlayer"><span>Email:</span>tunttse140127@fpt.edu.vn</p>
              <p className="phonePlayer"><span>Sdt:</span>01239312830</p>
              <p className="dobPlayer"><span>Ngày sinh:</span>22-09-2000</p>
            </div>
          </div>
          <div className="listPlayer__item">
            <div className="avt">
            <img src="/assets/img/homepage/pic-1.png" alt="dev" />
            </div>
            <div className="des">
            <p className="namePlayer"><span>Tên:</span>Nguyễn Tú</p>
              <p className="genderPlayer"><span>Giới tính:</span>Nam</p>
              <p className="mailPlayer"><span>Email:</span>tunttse140127@fpt.edu.vn</p>
              <p className="phonePlayer"><span>Sdt:</span>01239312830</p>
              <p className="dobPlayer"><span>Ngày sinh:</span>22-09-2000</p>
            </div>
          </div>
          <div className="listPlayer__item">
            <div className="avt">
            <img src="/assets/img/teamdetail/ronaldo-0642116.jpg" alt="dev" />
            </div>
            <div className="des">
            <p className="namePlayer"><span>Tên:</span>Nguyễn Tú</p>
              <p className="genderPlayer"><span>Giới tính:</span>Nam</p>
              <p className="mailPlayer"><span>Email:</span>tunttse140127@fpt.edu.vn</p>
              <p className="phonePlayer"><span>Sdt:</span>01239312830</p>
              <p className="dobPlayer"><span>Ngày sinh:</span>22-09-2000</p>
            </div>
          </div>
          <div className="listPlayer__item">
            <div className="avt">
            <img src="/assets/img/homepage/pic-2.png" alt="dev" />
            </div>
            <div className="des">
            <p className="namePlayer"><span>Tên:</span>Nguyễn Tú</p>
              <p className="genderPlayer"><span>Giới tính:</span>Nam</p>
              <p className="mailPlayer"><span>Email:</span>tunttse140127@fpt.edu.vn</p>
              <p className="phonePlayer"><span>Sdt:</span>01239312830</p>
              <p className="dobPlayer"><span>Ngày sinh:</span>22-09-2000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   
    </>
  );
}
export default ListPlayer;
