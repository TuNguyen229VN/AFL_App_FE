import React from "react";
import HeaderTeamDetail from "./HeaderTeamDetail";
import "./styles/style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
function InforTeamDetail() {
  return (
    <>
    <Header/>
    <div className="teamdetail">
      <HeaderTeamDetail />
      <div className="teamdetail__content infor">
        <h3 className="infor__title">Giới thiệu đội bóng</h3>
        <p className="infor__content">
          Câu lạc bộ bóng đá Barcelona, thường được biết đến với tên gọi tắt
          Barcelona, hay đơn giản là Barça là một câu lạc bộ bóng đá giàu thành
          tích có trụ sở tại Barcelona, Catalunya, Tây Ban Nha.
          <br />
          Trong nước, Barcelona đã giành được kỷ lục 75 danh hiệu: 26 La Liga,
          31 Copa del Rey, 13 Supercopa de España, 3 Copa Eva Duarte, và 2 Copa
          de la Liga, đồng thời là người giữ kỷ lục cho bốn giải đấu sau. Trong
          bóng đá cấp câu lạc bộ quốc tế, câu lạc bộ đã giành được 20 danh hiệu
          châu Âu và trên toàn thế giới: 5 chức vô địch UEFA Champions League, 4
          UEFA Cup Winners 'Cup, 5 UEFA Super Cup, 3 Inter-Cities Fairs Cup và 3
          FIFA Cúp thế giới các câu lạc bộ.[3] Barcelona đã được xếp hạng nhất
          trong Bảng xếp hạng các câu lạc bộ thống kê và lịch sử bóng đá quốc tế
          cho các năm 1997, 2009, 2011, 2012 và 2015 [4][5] và hiện đang chiếm
          vị trí thứ ba trên bảng xếp hạng câu lạc bộ của UEFA.[6] Câu lạc bộ
          này có quan hệ cạnh tranh lâu đời với Real Madrid, và các trận đấu
          giữa hai đội được gọi là El Clásico.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default InforTeamDetail;
