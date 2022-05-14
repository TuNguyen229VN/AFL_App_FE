import React from "react";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import "./styles/style.css";

function InforTournamentDetail(data) {
  const UnsafeComponent = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };
  return (
    <>
      <ScrollToTop />
      <div className="teamdetail__content infor">
        <h3 className="infor__title">Thông tin giải đấu</h3>
        <p className="infor__content">
          <UnsafeComponent html={data.tourDetail.description} />
        </p>
      </div>
    </>
  );
}

export default InforTournamentDetail;
