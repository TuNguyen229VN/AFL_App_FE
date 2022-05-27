import React, { useState } from "react";
import "./styles/style.css";
import LoadingAction from "../LoadingComponent/LoadingAction";

function TeamInTournament(props) {
  const { allTeam, loadingAc, setStatusTeam, acceptTeamInTournament,user,hostTournamentId } = props;
  const [active, setactive] = useState(true);
  const onSubmitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <div className="tournamentdetail">
        <div className="teamdetail__content listPlayer schedule__tour">
          <h3 className="listPlayer__title">Danh sách đội bóng</h3>
          <h2 className="listPlayer__total"> {allTeam != null && allTeam.length > 0 ? "Có " + allTeam.countList + " đội bóng đã tham gia" : "Chưa có đội bóng tham gia"}</h2>
          <div
            style={{
              marginBottom: 20,
            }}
            className="option__view"
          >
            <p
              className={active ? "active" : ""}
              onClick={() => {
                setactive(true);
                setStatusTeam("Tham gia");
              }}
            >
              Tham gia
            </p>
            <p
              className={!active ? "active" : ""}
              onClick={() => {
                setactive(false);
                setStatusTeam("Chờ duyệt");
              }}
            >
              Chờ duyệt
            </p>
          </div>
          {active ? (
            <div className="listPlayer__list">
              {allTeam != null && allTeam.length > 0 ? (
                allTeam.map((item, index) => {
                  return (
                    <div key={index} className="listPlayer__item">
                      <div className="avt">
                        <img src={item.teamAvatar} alt="team" />
                      </div>
                      <div className="des">
                        <p className="namePlayer">
                          <span>Tên đội:</span>
                          {item.teamName}
                        </p>
                        <p className="mailPlayer">
                          <span>Người quản lý:</span>{item.user.username}
                        </p>
                        <p className="genderPlayer">
                          <span>Số cầu thủ:</span>
                          {item.numberPlayerInTeam}
                        </p>
                        <p className="phonePlayer">
                          <span>Khu vực:</span>
                          {item.teamArea}
                        </p>
                        <p
                            className="list_regis"
                            style={{
                              color: "#D7FC6A",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            Danh sách cầu thủ đăng ký
                          </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1
                  style={{
                    color: "red",
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                >
                  Chưa có đội bóng tham gia
                </h1>
              )}
            </div>
          ) : (
            <div className="listPlayer__list">
              {allTeam != null && allTeam.length > 0 ? (
                allTeam.map((item, index) => {
                  return (
                    <form onSubmit={onSubmitHandler}>
                      <div key={index} className="listPlayer__item">
                        <div className="avt">
                          <img src={item.teamAvatar} alt="team" />
                        </div>
                        <div className="des">
                          <p className="namePlayer">
                            <span>Tên đội:</span>
                            {item.teamName}
                          </p>
                          <p className="mailPlayer">
                            <span>Người quản lý:</span>{item.user.username}
                          </p>
                          <p className="genderPlayer">
                            <span>Số cầu thủ:</span>
                            {item.numberPlayerInTeam}
                          </p>
                          <p className="phonePlayer">
                            <span>Khu vực:</span>
                            {item.teamArea}
                          </p>
                          <p
                            className="list_regis"
                            style={{
                              color: "#D7FC6A",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            Danh sách cầu thủ đăng ký
                          </p>
                          {
                            user !== undefined && user.userVM.id === hostTournamentId ?
<div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              marginTop: 20,
                              marginBottom: 20,
                            }}
                          >
                            <input
                              className="btn_deleteTeam"
                              style={{
                                width: 80,
                                padding: 10,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                acceptTeamInTournament(item,false);
                              }}
                              type="submit"
                              value="Từ chối"
                            />
                            <input
                              style={{
                                width: 80,
                                padding: 10,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                acceptTeamInTournament(item,true);
                              }}
                              type="submit"
                              className="btn_acceptTeam"
                              value="Đồng ý"
                            />
                          </div> :
                          null
                          }

                        </div>
                      </div>
                    </form>
                  );
                })
              ) : (
                <h1
                  style={{
                    color: "red",
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                >
                  Chưa có đội bóng đăng ký
                </h1>
              )}
            </div>
          )}
        </div>
        {loadingAc ? <LoadingAction /> : null}
      </div>
    </>
  );
}

export default TeamInTournament;
