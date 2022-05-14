import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/style.css";

function HeaderTeamDetail(props) {
  const location = useLocation();
  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);
  
  const { myTeam, getLinkClick } = props;
  
  const {
    id,
    teamName,
    teamAvatar,
    teamArea,
    teamPhone,
    teamGender,
    status,
    numberPlayerInTeam,
  } = myTeam;
  useEffect(() => {
    setActiveTeamDetail(location.pathname);
  }, [location.pathname]);
  return (
    <div className="HeaderTeamDetail">
      <div className="info__manager">
        <div className="avt__Team">
          <img src={teamAvatar} alt="team" />
        </div>
        <div className="headertext__team">
          <h2>{teamName}</h2>
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
            <span>{teamPhone}</span>
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
            <span>
              {numberPlayerInTeam > 0
                ? numberPlayerInTeam + " thành viên"
                : "Đội bóng chưa có thành viên"}
            </span>
          </div>
          <div className="man gender__manager">
            <i className="fas fa-transgender"></i>
            <span className="title">Giới tính đội : </span>
            <span>{teamGender}</span>
          </div>
          <div className="man gender__manager">
            <i className="fa-solid fa-calendar-days"></i>
            <span className="title">Ngày tạo đội: </span>
            <span>10/05/2022</span>
          </div>
          <div className="man gender__manager">
            <i className="fa-solid fa-calendar-days"></i>
            <span className="title">Khu vực: </span>
            <span>{teamArea}</span>
          </div>
        </div>
      </div>
      <div className="headerteamdetail__tag">
        {/* to={`/inforTeamDetail/${id}`}
      to={`/listPlayer/${id}`}
      to={`/reportTeamDeatail/${id}`}
      to={`/commentTeamDetail/${id}`} */}
        <p
          style={{
            color:
              activeTeamDetail === "/inforTeamDetail/26" ? "#d7fc6a" : "white",
            cursor: "pointer",
          }}
          className={activeTeamDetail === "/inforTeamDetail/26" ? "active" : ""}
          onClick={() => {
            setActiveTeamDetail("/inforTeamDetail/26");
            getLinkClick("/inforTeamDetail/26");
          }}
        >
          Thông tin đội
        </p>
        
        <p
          style={{
            color: activeTeamDetail === "/listPlayer" ? "#d7fc6a" : "white",
            cursor: "pointer",
          }}
          className={activeTeamDetail === "/listPlayer" ? "active" : ""}
          onClick={() => {
            setActiveTeamDetail("/listPlayer");
            getLinkClick("/listPlayer");
          }}
        >
          Thành viên
        </p>
        <p
          style={{
            color:
              activeTeamDetail === "/reportTeamDeatail" ? "#d7fc6a" : "white",
            cursor: "pointer",
          }}
          className={activeTeamDetail === "/reportTeamDeatail" ? "active" : ""}
          onClick={() => {
            setActiveTeamDetail("/reportTeamDeatail");
            getLinkClick("/reportTeamDeatail");
          }}
        >
          Thống kê
        </p>
        <p
          style={{
            color:
              activeTeamDetail === "/commentTeamDetail" ? "#d7fc6a" : "white",
            cursor: "pointer",
          }}
          className={activeTeamDetail === "/commentTeamDetail" ? "active" : ""}
          onClick={() => {
            setActiveTeamDetail("/commentTeamDetail");
            getLinkClick("/commentTeamDetail");
          }}
        >
          Bình luận
        </p>
      </div>
    </div>
  );
}

export default HeaderTeamDetail;
