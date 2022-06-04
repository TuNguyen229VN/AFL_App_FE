import React,{useEffect,useState} from "react";

function MyTeamInPlayer(props) {
  const { allTeam,setactive,active } = props;
  const [viewMoreOption, setViewMoreOption] = useState({
    index: "0",
    check: false,
  });
  useEffect(() => {
    setactive("true");
  })

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div  className="teamdetail__content listPlayer">
      <h1
        style={{
          fontSize: 36,
          fontWeight: 700,
          marginTop: 20,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Đội bóng bạn đã tham gia
      </h1>
      <div className="listPlayer__list">
        {allTeam != null
          ? allTeam.map((item, index) => {
              return (
                <div key={index} className="listPlayer__item">
                  <form onSubmit={onSubmitHandler}>
                    {active === "true" ? (
                      <div>
                        <div
                          className="view__more"
                          onClick={() => {
                            setViewMoreOption({
                              index: index,
                              check: !viewMoreOption.check,
                            });
                          }}
                        >
                          <i className="fa-solid fa-ellipsis"></i>
                        </div>
                        <div
                          className={
                            viewMoreOption.index === index &&
                            viewMoreOption.check
                              ? "option__player active"
                              : "option__player"
                          }
                        >
                          {/* <div
                            className={
                              hideShowDelete ? "overlay active" : "overlay"
                            }
                          ></div> */}
                          <p
                            onClick={() => {
                              //deletePlayerInTeam(item.idPlayerInTeam);
                              //setHideShowDelete(true);
                              //setIdDelete(item.idPlayerInTeam);
                            }}
                          >
                            <i class="fa-solid fa-trash"></i>Xóa cầu thủ
                          </p>
                        </div>
                      </div>
                    ) : null}

                    <div className="avt">
                      <img
                        style={{
                          objectFit: "cover",
                        }}
                        src={item.team.teamAvatar}
                        alt="dev"
                      />
                    </div>
                    <div className="des">
                      <p className="namePlayer">
                        <span>Tên:</span>
                        <span >
                        {item.team.teamName}
                        </span>
                        
                      </p>
                      <p className="genderPlayer">
                        <span>Giới tính:</span>
                        {item.team.teamGender === "Male" ? "Nam" : "Nữ"}
                      </p>
                      <p className="mailPlayer">
                        <span>SĐT:</span>
                        
                          {item.team.teamPhone}
                        
                      </p>
                      <p className="phonePlayer">
                        <span>Địa chỉ:</span>
                        {item.team.teamArea}
                      </p>

                      {/* {active === "Chờ duyệt" && idHost === id ? (
                        <div
                          style={{
                            margin: "20px 0 10px 0",
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div
                            className={
                              hideShowDelete ? "overlay active" : "overlay"
                            }
                          ></div>
                          <button
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "#D7FC6A",
                              border: 1,
                              borderColor: "#D7FC6A",
                              fontWeight: 600,
                            }}
                            onClick={() => {
                              setIdDelete(item.idPlayerInTeam);
                              setHideShowDelete(true);
                              setDeleteSuccessFul(false);
                            }}
                          >
                            Từ chối
                          </button>
                          <button
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "#D7FC6A",
                              border: 1,
                              borderColor: "#D7FC6A",
                              fontWeight: 600,
                            }}
                            onClick={() => {
                              updateStatusFootballPlayer(
                                item.idPlayerInTeam,
                                "true"
                              );
                              setDeleteSuccessFul(false);
                            }}
                          >
                            Đồng ý
                          </button>
                        </div>
                      ) : active === "Chiêu mộ" && idHost === id ? (
                        <div
                          style={{
                            margin: "20px 0 10px 0",
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div
                            className={
                              hideShowDelete ? "overlay active" : "overlay"
                            }
                          ></div>
                          <button
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "#D7FC6A",
                              border: 1,
                              borderColor: "#D7FC6A",
                              fontWeight: 600,
                            }}
                            onClick={() => {
                              setIdDelete(item.idPlayerInTeam);
                              setHideShowDelete(true);
                              setDeleteSuccessFul(false);
                            }}
                          >
                            Hủy chiêu mộ
                          </button>
                        </div>
                      ) : null} */}
                    </div>
                    {/* {idHost !== undefined && idHost === id ? (
                              <div>
                                <div
                                  className={
                                    hideShowDelete
                                      ? "overlay active"
                                      : "overlay"
                                  }
                                ></div>
                              </div>
                            ) : null} */}
                  </form>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default MyTeamInPlayer;
