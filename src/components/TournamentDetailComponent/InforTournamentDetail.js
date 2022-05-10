import React from "react";
import "./styles/style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderTournamentDetail from "./HeaderTournamentDetail";

function InforTournamentDetail() {
  return (
    <>
      <Header />
      <div className="teamdetail">
        <HeaderTournamentDetail />
        <div className="teamdetail__content infor">
          <h3 className="infor__title">Thông tin giải đấu</h3>
          <p className="infor__content">
            Giải đấu là cuộc thi có ít nhất ba đối thủ tham gia, tất cả đều tham
            gia vào một môn thể thao hoặc trò chơi. Cụ thể hơn, thuật ngữ này có
            thể được sử dụng theo một trong hai nghĩa trùng nhau: Một hoặc nhiều
            cuộc thi được tổ chức tại một địa điểm duy nhất và tập trung vào một
            khoảng thời gian tương đối ngắn. 
            <br/>
            BVT Cup là giải bóng đá nam truyền
            thống của Đoàn TN bệnh viện đa Nam giới có đủ điều kiện sức khỏe
            tham gia giải đấu, có tư cách đạo đức tốt
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InforTournamentDetail;
