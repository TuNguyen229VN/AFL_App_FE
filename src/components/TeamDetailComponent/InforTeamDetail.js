import React, { useState, useEffect } from "react";
import HeaderTeamDetail from "./HeaderTeamDetail";
import "./styles/style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { getAPI } from "../../api/index";
import Loading from "../LoadingComponent/Loading";
import CommentTeamDetail from "./CommentTeamDetail";
import ListPlayer from "./ListPlayer";
import ReportTeamDetail from "./ReportTeamDetail";

const UnsafeComponent = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

function InforTeamDetail() {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState(null);
  const [linkTeam , setLinkTeam] = useState(null);
  useEffect(() => {
    getInforTeam();
  }, []);
  const renderByLink = () => {
      if (linkTeam === "/listPlayer") {
        console.log(linkTeam)
        return <ListPlayer />;
      } else if (linkTeam === "/reportTeamDeatail") {
        return <ReportTeamDetail />;
      } else if (linkTeam === "/commentTeamDetail") {
        return <CommentTeamDetail />;
      } else {
        return (
          <div className="teamdetail__content infor">
            <h3 className="infor__title">Giới thiệu đội bóng</h3>
            <p className="infor__content">
              <UnsafeComponent html={team.description} />
            </p>
          </div>
        );
      }
    }

  const getLinkClick = (data) => {
      setLinkTeam(data);
  };
  const getInforTeam = () => {
    const afterDefaultURL = "teams/26";
    const response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setTeam(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Header />
      <div className="teamdetail">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <HeaderTeamDetail getLinkClick={getLinkClick} myTeam={team} />
            {linkTeam == null ? <div className="teamdetail__content infor">
          <h3 className="infor__title">Giới thiệu đội bóng</h3>
          <p className="infor__content">
            <UnsafeComponent html={team.description} />
          </p>
        </div> : renderByLink()}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default InforTeamDetail;
