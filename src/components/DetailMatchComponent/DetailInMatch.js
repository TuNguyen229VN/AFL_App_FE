import React, { useEffect, useState } from "react";

export default function DetailInMatch(props) {
  const {
    hideShow,
    setHideShow,
    typeDetail,
    nameTeamA,
    nameTeamB,
    numTeamA,
    numTeamB,
    playerA,
    playerB,
    matchDetail,
    idMatch,
    updateScoreInMatch
  } = props;
  const [detail, setDetail] = useState([]);
  const [newMatchDetail,setNewMatchDetail] = useState(null);
  useEffect(() => {
    if (typeDetail === "score" && matchDetail !== null) {
      const score = [];
      for (let i = 0; i < matchDetail.length; i++) {
        if (matchDetail[i].matchScore === 1) {
          score.push(matchDetail[i]);
        }
      }
    } else if (typeDetail === "yellow" && matchDetail !== null) {
      const yellow = [];
      for (let i = 0; i < matchDetail.length; i++) {
        if (matchDetail[i].yellowCardNumber === 1) {
          yellow.push(matchDetail[i]);
        }
      }
    } else if (typeDetail === "red" && matchDetail !== null) {
      const red = [];
      for (let i = 0; i < matchDetail.length; i++) {
        if (matchDetail[i].redCardNumber === 1) {
          red.push(matchDetail[i]);
        }
      }
    }
    coverMatchDetail();
  }, [typeDetail]);

  const coverMatchDetail = () => {
    if(matchDetail !== null){
      const newMatchDetail = [];
      if(typeDetail === "score"){
        matchDetail.map((item,index) => {
          if(item.actionMatchId === 1){
            newMatchDetail.push(item);
          }
        })
      }else if(typeDetail === "yellow"){
        matchDetail.map((item,index) => {
          if(item.actionMatchId === 2){
            newMatchDetail.push(item);
          }
        })
      }else{
        matchDetail.map((item,index) => {
          if(item.actionMatchId === 3){
            newMatchDetail.push(item);
          }
        })
      }
      setNewMatchDetail(newMatchDetail);
    }
  }

  const renderSelectByNumber = (data) => {
    console.log(newMatchDetail)
    if (data != undefined) {
      let array = [];
      for (let i = -1; i < data.length; i++) {
        if (i === -1) {
          array.push(<option selected>Chọn cầu thủ</option>);
        } else {
          array.push(
            <option value={JSON.stringify(data[i])}>
              {data[i].playerName}
            </option>
          );
        }
      }
      return array;
    }
  };

  const renderInputByNumber = (number, data, type) => {
    let array = [];
    for (let i = 0; i < number; i++) {
      array.push(
        <div>
          <select
            name={type === "B" ? i + +numTeamA + "-object" : i + "-object"}
            onChange={onChangeHandler}
            style={{
              marginRight: 20,
              padding: "10px 20px",
            }}
          >
            {renderSelectByNumber(data)}
          </select>
          <input
            onChange={onChangeHandler}
            name={type === "B" ? i + +numTeamA + "-minutes" : `${i}-minutes`}
            className="btnInput"
            style={{
              margin: "10px 0",
            }}
          />
        </div>
      );
    }
    return array;
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const id = name.split("-")[0];
    const type = name.split("-")[1];
    const valueObj = JSON.parse(value);

    if (detail.length > 0) {
      const newDetail = detail;
      const findIndex = newDetail.findIndex((item, index) => item.id === id);

      if (findIndex === -1) {
        newDetail.push({
          id: id,
          actionMatchId:
            typeDetail === "score" ? 1 : typeDetail === "yellow" ? 2 : 3,
          actionMinute: type === "object" ? null : valueObj+"",
          matchId: idMatch,
          playerInTournamentId:
            type === "object" ? valueObj.playerInTournamentId : null,
        });
      } else {
        if (type === "object")
          newDetail[findIndex].playerInTournamentId =
            valueObj.playerInTournamentId;
        else newDetail[findIndex].actionMinute = valueObj+"";
      }
      setDetail(newDetail);
    } else {
      setDetail([{
        id: id,
        actionMatchId:
          typeDetail === "score" ? 1 : typeDetail === "yellow" ? 2 : 3,
        actionMinute: type === "object" ? null : valueObj+"",
        matchId: idMatch,
        playerInTournamentId:
          type === "object" ? valueObj.playerInTournamentId : null,
      }]);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    for(let item of detail){
      delete item.id;
    }
    updateScoreInMatch(detail,typeDetail === "score" ? 1 : typeDetail === "yellow" ? 2 : 3);
    
  };
  return (
    <div>
      <div
        id="exampleModal"
        className={hideShow ? "popup__player active" : "popup__player"}
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <form onSubmit={onSubmitHandler}>
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Chi tiết{" "}
                  {typeDetail === "score"
                    ? "bàn thắng"
                    : typeDetail === "yellow"
                    ? "thẻ vàng"
                    : "thẻ đỏ"}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setHideShow(false);
                  }}
                ></button>
              </div>
              <div
                class="modal-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  lineHeight: 2,
                }}
              >
                <div>
                  <p
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {nameTeamA + "-" + nameTeamB}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 30,
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {renderInputByNumber(numTeamA, playerA, "A")}
                  </div>
                  <div>{renderInputByNumber(numTeamB, playerB, "B")}</div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setHideShow(false);
                  }}
                  style={{
                    padding: "10px 15px",
                  }}
                >
                  Đóng
                </button>
                <button
                  style={{
                    padding: "10px 15px",
                  }}
                  type="submit"
                  class="btn btn-primary"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
