import React, { useEffect, useState } from "react";
import "./styles/style.css";
import { getTeamPaticaipateInTourByTourIDAPI } from "../../api/TeamInTournamentAPI";
import { getTeamByIdAPI } from "../../api/TeamAPI";
import LoadingAction from "../LoadingComponent/LoadingAction";
function RankTableTournamentDetail(props) {
  const { tourDetail } = props;
  const [ranking, setRaking] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getTeamInTournament();
  }, []);
  const getInfoTeam = async (id) => {
    try {
      const response = await getTeamByIdAPI(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getTeamInTournament = async () => {
    setLoading(true);
    try {
      const response = await getTeamPaticaipateInTourByTourIDAPI(tourDetail.id);
      if (response.status === 200) {
        const teamPaticipate = response.data.teamInTournaments;
        if (teamPaticipate.length > 0) {
          for (let i = 0; i < teamPaticipate.length; i++) {
            const team = await getInfoTeam(teamPaticipate[i].teamId);
            teamPaticipate[i].team = team;
          }
        }
        createRanking(teamPaticipate);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createRanking = (data) => {
    const ranking = [];
    const numberTeamPaticipate = tourDetail.footballTeamNumber;
    if (tourDetail.tournamentTypeId === 2) {
      for (let i = 0; i < numberTeamPaticipate; i++) {
        if (data[i] !== undefined) {
          ranking.push(data[i]);
        } else {
          ranking.push(null);
        }
      }
      const findIndexNull = ranking.findIndex((obj) => obj === null);
      if (findIndexNull === -1) {
        ranking.sort((teamA, teamB) => {
          return (
            teamB.point - teamA.point ||
            teamB.differentPoint - teamA.differentPoint ||
            teamB.winScoreNumber - teamA.winScoreNumber
          );
        });
      }
    } else {
      const tableInTournament = tourDetail.groupNumber;
      const teamInTable = Math.floor(numberTeamPaticipate / tableInTournament);
      const tableName = [
        {
          title: "Bảng A",
          numberTeam: teamInTable,
        },
        {
          title: "Bảng B",
          numberTeam: teamInTable,
        },
        {
          title: "Bảng C",
          numberTeam: teamInTable,
        },
        {
          title: "Bảng D",
          numberTeam: teamInTable,
        },
      ];

      const residualNumber =
        numberTeamPaticipate - teamInTable * tableInTournament;

      if (residualNumber > 0) {
        for (let i = 0; i < residualNumber; i++) {
          tableName[i].numberTeam++;
        }
      }

      for (
        let i = 0;
        i < Math.ceil(numberTeamPaticipate / tableInTournament);
        i++
      ) {
        const allTeam = [];
        for (const item of data) {
          if (item.groupName === tableName[i].title) {
            allTeam.push(item);
          }
        }
        allTeam.sort((teamA, teamB) => {
          return (
            teamB.point - teamA.point ||
            teamB.differentPoint - teamA.differentPoint ||
            teamB.winScoreNumber - teamA.winScoreNumber
          );
        });
        for (let j = 0; j < tableName[i].numberTeam; j++) {
          if (allTeam[j] === undefined) {
            allTeam.push(null);
          }
        }

        ranking.push({
          title: tableName[i].title,
          team: allTeam,
        });
      }
      console.log(ranking);
    }
    setLoading(false);
    setRaking(ranking);
  };

  return (
    <>
      <div className="tournamentdetail">
        <div className="teamdetail__content rank__tour">
          <h2 className="title">Bảng xếp hạng</h2>
          <p className="note">
            *Lưu ý: Chỉ áp dụng cho hình thức đá vòng tròn hoặc vòng bảng của
            hình thức chia bảng
          </p>
          {loading ? (
            <LoadingAction />
          ) : ranking !== null ? (
            tourDetail.tournamentTypeId == 2 ? (
              <div className="wrap__table">
                <div className="name__table">
                  <h5>Bảng xếp hạng</h5>
                </div>
                <div className="name__table-cross"></div>
                <table className="table__team">
                  <tr>
                    <th>Hạng</th>
                    <th>Tên đội</th>
                    <th>Số trận</th>
                    <th>Thắng</th>
                    <th>Hòa</th>
                    <th>Bại</th>
                    <th>Hiệu số</th>
                    <th>Thẻ vàng/Thẻ đỏ</th>
                    <th>Điểm</th>
                  </tr>
                  {ranking.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {item !== null
                            ? item.team.teamName
                            : `Đội ${index + 1}`}
                        </td>
                        <td>{item !== null ? item.numberOfMatch : 0}</td>
                        <td>{item !== null ? item.numberOfWin : 0}</td>
                        <td>{item !== null ? item.numberOfDraw : 0}</td>
                        <td>{item !== null ? item.numberOfLose : 0}</td>
                        <td>{item !== null ? item.differentPoint : 0}</td>
                        <td>
                          {item !== null
                            ? `${item.totalYellowCard}/${item.totalRedCard}`
                            : 0}
                        </td>
                        <td>{item !== null ? item.point : 0}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            ) : (
              ranking.map((itemIn, indexIn) => {
                return (
                  <div
                    style={{
                      marginBottom: 20,
                    }}
                    className="wrap__table"
                  >
                    <div className="name__table">
                      <h5>{itemIn.title}</h5>
                    </div>
                    <div className="name__table-cross"></div>
                    <table className="table__team">
                      <tr>
                        <th>Hạng</th>
                        <th>Tên đội</th>
                        <th>Số trận</th>
                        <th>Thắng</th>
                        <th>Hòa</th>
                        <th>Bại</th>
                        <th>Hiệu số</th>
                        <th>Thẻ vàng/Thẻ đỏ</th>
                        <th>Điểm</th>
                      </tr>
                      {itemIn.team.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {item !== null
                                ? item.team.teamName
                                : "Chưa tham gia"}
                            </td>
                            <td>{item !== null ? item.numberOfMatch : 0}</td>
                            <td>{item !== null ? item.numberOfWin : 0}</td>
                            <td>{item !== null ? item.numberOfDraw : 0}</td>
                            <td>{item !== null ? item.numberOfLose : 0}</td>
                            <td>{item !== null ? item.differentPoint : 0}</td>
                            <td>
                              {item !== null
                                ? `${item.totalYellowCard}/${item.totalRedCard}`
                                : 0}
                            </td>
                            <td>{item !== null ? item.point : 0}</td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                );
              })
            )
          ) : null}
        </div>
      </div>
    </>
  );
}

export default RankTableTournamentDetail;
