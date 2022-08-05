import React, { useEffect, useState } from "react";

function ReportMatch(props) {
  const { hideShow, setHideShow, inforTeam, reportMatch, postReportMatch } =
    props;
  const [team, setTeam] = useState(inforTeam[0][0].teamInTournament.team.id);
  const [reason, setReason] = useState("Đội bóng không tham gia trận đấu này");
  
  // useEffect(() => {
  //   setDateTeamInMatch();
  // }, []);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "team":
        setTeam(value);
        break;
      default:
        setReason(value);
        break;
    }
  };
  const setDateTeamInMatch = () => {
    const newData = [];
    if (reportMatch === null) {
      for (const item of inforTeam) {
        if (item[0].teamInTournament.team.id === +team) {
          item[0].teamScoreLose = 3;
          item[0].teamScore = 0;
          item[0].result = 0;
        } else {
          item[0].teamScoreLose = 0;
          item[0].teamScore = 3;
          item[0].result = 3;
        }
        newData.push(item[0]);
      }
    } else {
      for (const item of inforTeam) {
        item[0].teamScoreLose = 0;
        item[0].teamScore = 0;
        item[0].result = 0;
        newData.push(item[0]);
      }
    }
    return newData;
  };
  return (
    <div
      id="exampleModal"
      className={hideShow ? "popup__player active" : "popup__player"}
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Báo cáo trận đấu
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
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            class="modal-body"
          >
            <h1
              style={{
                color: "blue",
              }}
            >
              {reportMatch !== null
                ? "Trận đấu này đã bị report"
                : "Chọn đội bóng bị report"}
            </h1>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginRight: 100,
                }}
              >
                <h1>Đội bóng:</h1>
                {reportMatch === null ? (
                  <select
                    style={{
                      marginLeft: 10,
                    }}
                    onChange={onChangeHandler}
                    name="team"
                    value={team}
                  >
                    {inforTeam.map((item) => {
                      return (
                        <option
                          key={item[0].id}
                          value={item[0].teamInTournament.team.id}
                        >
                          {item[0].teamInTournament.team.teamName}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <p
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    {reportMatch.team.teamName}
                  </p>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginRight: 10,
                }}
              >
                <h1>Lí do: </h1>
                {reportMatch === null ? (
                  <select
                    style={{
                      marginLeft: 10,
                    }}
                    onChange={onChangeHandler}
                    name="reason"
                    value={reason}
                  >
                    <option
                      style={{
                        marginTop: 10,
                      }}
                    >
                      Đội bóng không tham gia trận đấu này
                    </option>
                    <option>Đội bóng đến trễ không lí do</option>
                    <option>Lí do khác</option>
                  </select>
                ) : (
                  <p
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    {reportMatch.reason.split("-")[1]}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              style={{
                padding: 10,
              }}
              onClick={() => {
                setHideShow(false);
              }}
            >
              Đóng
            </button>
            <button
              style={{
                padding: 10,
              }}
              type="button"
              class="btn btn-primary"
              onClick={() => {
                
                postReportMatch(
                  setDateTeamInMatch(),
                  reportMatch !== null
                    ? reportMatch.id
                    : inforTeam[0][0].matchId + "-" + reason,
                    team
                );
              }}
            >
              {reportMatch !== null ? "Bỏ báo cáo" : "Báo cáo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportMatch;
