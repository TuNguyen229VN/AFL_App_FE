import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/style.css";
const TeamHome = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTeam = async () => {
    try {
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/teams/top4`
      );
      if (res.status === 200) {
        setTeams(await res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeam();
  }, [loading]);
  const splitTeamArea = (teamArea) => {
    let myArray = teamArea.split(",");
    return myArray[myArray.length - 1];
  };
  return (
    <div className="teamhome">
      <h2 className="title" data-aos={"fade-up"}>
        Đội bóng nổi bật
      </h2>
      <Link to={"/findTeam"} className="view__more" data-aos={"fade-up"}>
        Xem thêm
      </Link>
      <div className="tournament__list" data-aos={"fade-up"}>
        {teams.map((team) => {
          return (
            <Link
              to={`/teamDetail/${team.id}/inforTeamDetail`}
              className="tournaments__list-item"
              key={team.id}
            >
              <div className="tournament__img">
                <img src={team.teamAvatar} alt={team.teamName} />
              </div>
              <div className="tournament__text">
                <h3>{team.teamName}</h3>
                <p>
                  Bóng Đá {team.teamGender === "Male" ? "Nam" : "Nữ"}{" "}
                  {team.teamArea !== ""
                    ? "| " + splitTeamArea(team.teamArea)
                    : ""}
                </p>
                <div className="torunament__another">
                  <div className="join">
                    <img src="./assets/icons/join.png" alt="join" />
                    <div className="join__text">{team.numberPlayerInTeam}</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TeamHome;
