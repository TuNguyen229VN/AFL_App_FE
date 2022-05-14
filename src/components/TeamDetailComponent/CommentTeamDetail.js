import React from "react";
import "./styles/style.css";

function CommentTeamDetail() {
  return (
    <>
     
      <div className="teamdetail">
       
        <div className="teamdetail__content cmtTeam">
          <h3 className="cmtTeam__title">Bình luận</h3>
          <div className="totalcmt">
            <p className="number">2 bình luận</p>
            <div className="sort">
              Sắp xếp theo
              <select>
                <option>Mới nhất</option>
                <option>Cũ nhất</option>
              </select>
            </div>
          </div>
          <form className="cmtInput">
            <textarea className="content" placeholder="Viết bình luận" />
            <button>Đăng</button>
          </form>
          <div className="another__cmt">
            <div className="another__content">
              <img src="/assets/img/homepage/pic-2.png" alt="dev" />
              <div>
                <p className="name">Nguyễn Anh</p>
                <p className="content">Hay quá bạn ei</p>
                <p className="time">3 giờ trước</p>
              </div>
            </div>
            <div className="another__content">
              <img src="/assets/img/homepage/pic-2.png" alt="dev" />
              <div>
                <p className="name">Nguyễn Anh</p>
                <p className="content">Hay quá bạn ei</p>
                <p className="time">3 giờ trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default CommentTeamDetail;
