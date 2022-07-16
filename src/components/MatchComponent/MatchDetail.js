import React from "react";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function MatchDetail(data) {
  return (
    <>
      <ScrollToTop />
      <div className={styles.match__detail}>
        {
        data.allTeamA != null && data.allTeamB != null?
           data.allTeamA.map((item, index) => (
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
                  <th>{data.scoreA ==0?item.teamScore:data.scoreA}</th>
                  <th>Bàn thắng</th>
                  <th>{data.scoreB ==0?data.allTeamB[index].teamScore:data.scoreB}</th>
                </tr>
                <tr>
                  <th>{data.scoreB ==0?data.allTeamB[index].teamScore:data.scoreB}</th>
                  <th>Bàn thua</th>
                  <th>{data.scoreA ==0?item.teamScore:data.scoreA}</th>
                </tr>
                <tr>
                  <th>{data.yellowA==0?item.yellowCardNumber:data.yellowA}</th>
                  <th>Thẻ vàng</th>
                  <th>{data.yellowB==0?data.allTeamB[index].yellowCardNumber:data.yellowB}</th>
                </tr>
                <tr>
                  <th>{data.redA==0?item.redCardNumber:data.redA}</th>
                  <th>Thẻ đỏ</th>
                  <th>{data.redB==0?data.allTeamB[index].redCardNumber:data.redB}</th>
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
