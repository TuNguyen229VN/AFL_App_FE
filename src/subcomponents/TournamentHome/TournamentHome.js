import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/style.css";
const TournamentHome = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  // Get Tournament
  const getTournament = async (nameFind, currentPage) => {
    try {
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/tournaments?order-by=DateCreate&order-type=ASC&page-offset=1&limit=4`
      );
      if (res.status === 200) {
        setTournaments(await res.data.tournaments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTournament();
  }, [loading]);

  const getType = (id) => {
    if (1 === id) {
      return "Loại trực tiếp";
    }
    if (2 === id) {
      return "Đá vòng tròn";
    }
    if (3 === id) {
      return "Đá chia bảng";
    } else {
      return "";
    }
  };
  const getFeild = (id) => {
    if (1 === id) {
      return " | Sân 5";
    }
    if (2 === id) {
      return " | Sân 7";
    }
    if (3 === id) {
      return " | Sân 11";
    } else {
      return "";
    }
  };
  const splitTeamArea = (teamArea) => {
    let a = teamArea;
    if (a !== null) {
      let myArray = a.split(",");
      return myArray[myArray.length - 1];
    }
    return teamArea;
  };

  return (
    <div className="tournamenthome">
      <h2
        className="title"
        data-aos={"fade-up"}
        data-aos-anchor-placement="top-bottom"
      >
        Giải đấu mới nhất
      </h2>
      <Link to={"/findTournaments"} className="view__more" data-aos={"fade-up"}>
        Xem thêm
      </Link>
      <div className="tournament__list" data-aos={"fade-up"}>
        {tournaments.map((tour) => {
          return (
            <Link
              key={tour.id}
              to={`/inforTournamentDetail/${tour.id}`}
              className="tournaments__list-item"
            >
              <div className="tournament__img">
                <img src={tour.tournamentAvatar} alt={tour.tournamentName} />
              </div>
              <div className="tournament__text">
                <h3>{tour.tournamentName}</h3>
                <p>
                  {getType(tour.tournamentTypeId)}
                  {tour.footballFieldAddress !== ""
                    ? " | " + splitTeamArea(tour.footballFieldAddress)
                    : ""}
                  {getFeild(tour.footballFieldTypeId)}
                </p>
                <div className="torunament__another">
                  <div className="join">
                    <img src="./assets/icons/join.png" alt="join" />
                    <div className="join__text">{tour.numberTeamInTournament}</div>
                  </div>
                  <div className="heart__shape active"></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TournamentHome;
