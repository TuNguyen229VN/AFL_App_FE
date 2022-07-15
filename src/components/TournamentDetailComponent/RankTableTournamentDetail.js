import React from "react";
import "./styles/style.css";
function RankTableTournamentDetail(props) {
  const {tourDetail} = props;
  console.log(tourDetail)
  return (
    <>
      <div className="tournamentdetail">
        <div className="teamdetail__content rank__tour">
          <h2 className="title">Bảng xếp hạng</h2>
          <p className="note">
            *Lưu ý: Chỉ áp dụng cho hình thức đá vòng tròn hoặc vòng bảng của
            hình thức chia bảng
          </p>
          <div className="wrap__table">
            <div className="name__table">
              <h5>Bảng A</h5>
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
              <tr>
                <td>1</td>
                <td>FC Bình Thạnh</td>
                <td>2</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td>+3</td>
                <td>1/0</td>
                <td>3</td>
              </tr>
              <tr>
                <td>2</td>
                <td>FC Bình Thạnh</td>
                <td>2</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td>+3</td>
                <td>1/0</td>
                <td>3</td>
              </tr>
              <tr>
                <td>3</td>
                <td>FC Bình Thạnh</td>
                <td>2</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td>+3</td>
                <td>1/0</td>
                <td>3</td>
              </tr>
            </table>
            <div className="name__table">
              <h5>Bảng B</h5>
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
              <tr>
                <td>1</td>
                <td>FC Bình Thạnh</td>
                <td>2</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td>+3</td>
                <td>1/0</td>
                <td>3</td>
              </tr>
              <tr>
                <td>2</td>
                <td>FC Bình Thạnh</td>
                <td>2</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td>+3</td>
                <td>1/0</td>
                <td>3</td>
              </tr>
              <tr>
                <td>3</td>
                <td>FC Bình Thạnh</td>
                <td>2</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td>+3</td>
                <td>1/0</td>
                <td>3</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default RankTableTournamentDetail;
