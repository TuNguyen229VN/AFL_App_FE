import React from "react";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function MatchDetail(data) {
  return (
    <>
      <ScrollToTop />
      <div className={styles.match__detail}>
        {data.allTeamA != null && data.allTeamB != null
          ? data.allTeamA.map((item, index) => (
              <table className={styles.match__statics}>
                <tr>
                  <th>
                    <img src={item.teamInTournament.team.teamAvatar} alt={item.teamName} />
                  </th>
                  <th className={styles.btk}>Bảng thống kê</th>
                  <th>
                    <img src={data.allTeamB[index].teamInTournament.team.teamAvatar} alt={data.allTeamB[index].teamName} />
                  </th>
                </tr>
                <tr>
                  <th>{item.teamScore}</th>
                  <th>Bàn thắng</th>
                  <th>{data.allTeamB[index].teamScore}</th>
                </tr>
                <tr>
                  <th>{data.allTeamB[index].teamScore}</th>
                  <th>Bàn thua</th>
                  <th>{item.teamScore}</th>
                </tr>
                <tr>
                  <th>{item.yellowCardNumber}</th>
                  <th>Thẻ vàng</th>
                  <th>{data.allTeamB[index].yellowCardNumber}</th>
                </tr>
                <tr>
                  <th>{item.redCardNumber}</th>
                  <th>Thẻ đỏ</th>
                  <th>{data.allTeamB[index].redCardNumber}</th>
                </tr>
              </table>
            ))
          : null}
        <div className={styles.address}>Địa điểm: {data.footballFeild}</div>
      </div>
    </>
  );
}

export default MatchDetail;
