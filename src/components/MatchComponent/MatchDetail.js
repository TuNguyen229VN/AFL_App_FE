import React from 'react'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import  styles from "./styles/style.module.css"
function MatchDetail() {
  return (
      <>
    <ScrollToTop/>
    <div className={styles.match__detail}>
        <table className={styles.match__statics}>
            <tr>
                <th>
                <img src="/assets/img/homepage/team2.png" alt="img" />
                </th>
                <th className={styles.btk}>Bảng thống kê</th>
                <th>
                <img src="/assets/img/homepage/team1.png" alt="img" />
                </th>
            </tr>
            <tr>
                <th>11</th>
                <th>Số lần sút</th>
                <th>20</th>
            </tr>
            <tr>
                <th>5</th>
                <th>Số lần trúng đích</th>
                <th>6</th>
            </tr>
            <tr>
                <th>59%</th>
                <th>Kiểm soát bóng</th>
                <th>41%</th>
            </tr>
            <tr>
                <th>511</th>
                <th>Lượt chuyền bóng</th>
                <th>611</th>
            </tr>
            <tr>
                <th>5</th>
                <th>Thẻ vàng</th>
                <th>6</th>
            </tr>
            <tr>
                <th>5</th>
                <th>Thẻ đỏ</th>
                <th>6</th>
            </tr>
        </table>
        <div className={styles.address}>Địa điểm: Sân vân động QK7</div>
    </div>
    </>
  )
}

export default MatchDetail