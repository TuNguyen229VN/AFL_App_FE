import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/style.css";
function HeaderTeamDetail() {
  const location = useLocation();
  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);
  useEffect(() => {
    setActiveTeamDetail(location.pathname);
  }, [location.pathname]);
  return (
    <div className="HeaderTeamDetail">
      <div className="info__manager">
        <div className="avt__Team">
          <img src="./assets/img/homepage/team1.png" alt="team" />
        </div>
        <div className="headertext__team">
          <h2>KhoaTuAnhTam F.C</h2>
          <div className="man name__manager">
            <i class="fas fa-light fa-user"></i>
            <span className="title">Người quản lý: </span>
            <span>Nguyễn Thanh Phủi</span>
          </div>
          <div className="man phone__manager">
            <i>
              <img src="/assets/icons/telephone.png" alt="tp" />
            </i>
            <span className="title">Số điện thoại: </span>
            <span>0909901282</span>
          </div>
          <div className="man email__manager">
            <i>
              <img src="/assets/icons/mail-icon.svg" alt="mail" />
            </i>
            <span className="title">Email: </span>
            <span>phuideptrai123@gmail.com</span>
          </div>
          <div className="man member__manager">
            <i>
              <img src="/assets/icons/join.png" alt="join" />
            </i>
            <span className="title">Thành viên: </span>
            <span>33 Người</span>
          </div>
          <div className="man gender__manager">
            <i className="fas fa-transgender"></i>
            <span className="title">Giới tính đội : </span>
            <span>Nam</span>
          </div>
          <div className="man gender__manager">
            <i className="fa-solid fa-calendar-days"></i>
            <span className="title">Ngày tạo đội: </span>
            <span>10/05/2022</span>
          </div>
        </div>
      </div>
      <div className="headerteamdetail__tag">
        <Link
          to="/inforTeamDetail"
          className={activeTeamDetail === "/inforTeamDetail" ? "active" : ""}
          onClick={() => setActiveTeamDetail("/inforTeamDetail")}
        >
          Thông tin đội
        </Link>
        <Link
          to="/listPlayer"
          className={activeTeamDetail === "/listPlayer" ? "active" : ""}
          onClick={() => setActiveTeamDetail("/listPlayer")}
        >
          Thành viên
        </Link>
        <Link
          to="/reportTeamDeatail"
          className={activeTeamDetail === "/reportTeamDeatail" ? "active" : ""}
          onClick={() => setActiveTeamDetail("/reportTeamDeatail")}
        >
          Thống kê
        </Link>
        <Link
          to="/commentTeamDetail"
          className={activeTeamDetail === "/commentTeamDetail" ? "active" : ""}
          onClick={() => setActiveTeamDetail("/commentTeamDetail")}
        >
          Bình luận
        </Link>
      </div>
    </div>
  );
}

export default HeaderTeamDetail;
