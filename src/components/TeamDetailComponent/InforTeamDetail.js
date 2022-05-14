import React from "react";
import "./styles/style.css";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const UnsafeComponent = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

function InforTeamDetail(teamDetail) {
  return (
    <>
      <ScrollToTop />
        <div>
            <div className="teamdetail__content infor">
              <h3 className="infor__title">Giới thiệu đội bóng</h3>
              <div className="infor__content">
                <UnsafeComponent html={teamDetail.teamDetail.description} />
              </div>
            </div>
        </div>
    </>
  );
}

export default InforTeamDetail;
