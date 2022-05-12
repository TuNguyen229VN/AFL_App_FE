import React, { useEffect, useState } from "react";
import "./styles/style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderTournamentDetail from "./HeaderTournamentDetail";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
function InforTournamentDetail() {
  const { idTour } = useParams();
  const location = useLocation();
  const [tourDetail, setTourDetail] = useState("");
  // Get Tour Detail
  const getTourDetail = async () => {
    try {
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/tournaments/${idTour}`
      );
      if (res.status === 200) {
        setTourDetail(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTourDetail();
  }, [location.pathname]);
  const UnsafeComponent = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };
  return (
    <>
      <Header />
      <div className="teamdetail">
        <HeaderTournamentDetail />
        <div className="teamdetail__content infor">
          <h3 className="infor__title">Thông tin giải đấu</h3>
          <p className="infor__content">
            <UnsafeComponent html={tourDetail.description} />
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InforTournamentDetail;
