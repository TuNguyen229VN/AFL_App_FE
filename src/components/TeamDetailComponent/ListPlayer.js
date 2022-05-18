import React, { useEffect, useState } from "react";
import "./styles/style.css";
import { getAPI } from "../../api/index";
import AddPlayer from "./AddPlayer";
import Loading from "../LoadingComponent/Loading";
function ListPlayer(props) {
  const { id, gender } = props;
  const [loading, setLoading] = useState(true);
  const [playerInTeam, setPlayerInTeam] = useState(null);
  useEffect(() => {
    getListPlayerInTeamByIdTeam();
  }, []);

  const getListPlayerInTeamByIdTeam = async () => {
    const afterURL = `PlayerInTeam?teamId=${id}&pageIndex=1&limit=5`;
    const response = await getAPI(afterURL);

    const ids = response.data.playerInTeams;
    const players = ids.map(async (player) => {
      const playerResponse = await getPlayerById(player.footballPlayerId);
      return playerResponse;
    });
    const playersData = await Promise.all(players);
    setPlayerInTeam(playersData);
    setLoading(false);
  };

  const getPlayerById = async (idPlayer) => {
    const afterURL = `football-players/${idPlayer}`;
    const response = await getAPI(afterURL);
    return response.data;
  };
  return (
    <>
      <div className="teamdetail__content listPlayer">
        <h3 className="listPlayer__title">Danh sách thành viên</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginTop: 30,
          }}
        >
          <AddPlayer id={id} gender={gender} />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h2 className="listPlayer__total">
              Có {playerInTeam.length} thành viên
            </h2>
            <div>
              <div className="listPlayer__list">
                {playerInTeam.map((item, index) => {
                  return (
                    <div key={index} className="listPlayer__item">
                      <div className="avt">
                        <img src={item.playerAvatar} alt="dev" />
                      </div>
                      <div className="des">
                        <p className="namePlayer">
                          <span>Tên:</span>
                          {item.playername}
                        </p>
                        <p className="genderPlayer">
                          <span>Giới tính:</span>
                          {item.gender === "Male" ? "Name" : "Nữ"}
                        </p>
                        <p className="mailPlayer">
                          <span>Email:</span>
                          {item.email}
                        </p>
                        <p className="phonePlayer">
                          <span>Sdt:</span>
                          {item.phone}
                        </p>
                        <p className="dobPlayer">
                          <span>Ngày sinh:</span>
                          {item.dateOfBirth}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default ListPlayer;
