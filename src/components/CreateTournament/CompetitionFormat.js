import React from "react";
import styles from "./styles/style.module.css";

const CompetitionFormat = (props) => {
  const { onChangeHandler, competitionFormat, teamPaticipate, groupNumber } =
    props;
  return (
    <div className={styles.createTournament_row2}>
      <h1 className={styles.createTournament_img_title}>Hình thức thi đấu</h1>
      <div className={styles.img_type_footballField}>
        <div
          style={{
            width: "25%",
          }}
        >
          <label htmlFor="circle">
            <div
              className={styles.type_circle}
              style={{
                backgroundColor:
                  competitionFormat.value === "CircleStage"
                    ? "#15E34C"
                    : "white",
              }}
            >
              <img
                src={
                  competitionFormat.value === "CircleStage"
                    ? "/assets/img/createtournament/type_footballfield/circle_check.jpg"
                    : "/assets/img/createtournament/type_footballfield/circle.jpg"
                }
                alt="circle"
              />
            </div>
          </label>

          <input
            type="radio"
            id="circle"
            name="competitionFormat"
            value="CircleStage"
            onChange={onChangeHandler}
            checked={competitionFormat.value === "CircleStage" ? true : false}
          ></input>
        </div>
        <div
          style={{
            width: "25%",
          }}
        >
          <label htmlFor="knockout">
            <div
              className={styles.type_knockout}
              style={{
                backgroundColor:
                  competitionFormat.value === "KnockoutStage"
                    ? "#15E34C"
                    : "white",
              }}
            >
              <img
                src={
                  competitionFormat.value === "KnockoutStage"
                    ? "/assets/img/createtournament/type_footballfield/knockout_check.jpg"
                    : "/assets/img/createtournament/type_footballfield/knockout.jpg"
                }
                alt="knockout"
              />
            </div>
          </label>

          <input
            type="radio"
            id="knockout"
            name="competitionFormat"
            value="KnockoutStage"
            onChange={onChangeHandler}
            checked={competitionFormat.value === "KnockoutStage" ? true : false}
          ></input>
        </div>

        <div
          style={{
            width: "25%",
          }}
        >
          <label htmlFor="table">
            <div
              className={styles.type_table}
              style={{
                backgroundColor:
                  competitionFormat.value === "GroupStage"
                    ? "#15E34C"
                    : "white",
              }}
            >
              <img
                src={
                  competitionFormat.value === "GroupStage"
                    ? "/assets/img/createtournament/type_footballfield/table_check.jpg"
                    : "/assets/img/createtournament/type_footballfield/table.jpg"
                }
                alt="knockout"
              />
            </div>
          </label>

          <input
            type="radio"
            id="table"
            name="competitionFormat"
            value="GroupStage"
            onChange={onChangeHandler}
            checked={competitionFormat.value === "GroupStage" ? true : false}
          ></input>
        </div>
      </div>
      <div>
        <div className={styles.lengthTeam}>
          <p
            style={{
              margin: "20px 0",
              fontWeight: 600,
              fontStyle: "italic",
              fontSize: 18,
            }}
          >
            Lưu ý{" "}
            {competitionFormat.value === "CircleStage"
              ? " đối với hình thức vòng tròn tối thiểu phải có 3 đội và tối đa là 8 đội"
              : competitionFormat.value === "GroupStage"
              ? " đối với hình thức chia bảng thì tối thiểu phải có 6 đội và tối đa 16 đội"
              : " đối với hình thức loại trực tiếp thì tối thiểu phải có 3 đội và tối đa 16 đội"}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <label
              htmlFor="select_lengthTeam"
              className={styles.createTournament_img_title}
            >
              Số đội tham gia
            </label>
            {teamPaticipate.error != null ? (
              <p
                style={{
                  color: "red",
                  fontWeight: 900,
                  fontSize: 18,
                }}
              >
                {teamPaticipate.error}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <input
            style={{
              marginLeft: 0,
              padding: "10px 20px",
              marginTop: 0,
              width: 488.44,
            }}
            className={styles.select_lengthTeam}
            id="select_lengthTeam"
            name="teamPaticipate"
            value={teamPaticipate.value}
            placeholder="Nhập số đội tham gia"
            onChange={onChangeHandler}
            
          />
        </div>
      </div>
      {competitionFormat.value === "GroupStage" ? (
        <div>
          {teamPaticipate.value >= 6 && teamPaticipate.value < 12 ? (
            <p
              style={{
                margin: "20px 0",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: 18,
                lineHeight: 1.5,
              }}
            >
              Lưu ý đối với {teamPaticipate.value} đội tham gia, thì hệ thống
              chúng tôi sẽ chia làm 2 bảng A-B,{" "}
              {teamPaticipate.value % 2 === 0
                ? `mỗi bảng có ${teamPaticipate.value / 2} đội `
                : `bảng A có ${Math.ceil(
                    teamPaticipate.value / 2
                  )} đội và bảng B có ${Math.floor(
                    teamPaticipate.value / 2
                  )} đội `}
              và sẽ mặc định lấy 2 đội mạnh nhất mỗi bảng vào vòng loại trực
              tiếp{" "}
            </p>
          ) : teamPaticipate.value >= 12 && teamPaticipate.value <= 16 ? (
            <p
              style={{
                margin: "20px 0",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: 18,
                lineHeight: 1.5,
              }}
            >
              Lưu ý đối với {teamPaticipate.value} đội tham gia, thì hệ thống
              chúng tôi cho bạn chọn 2 loại đó là chia bảng làm 2 hoặc là 4
            </p>
          ) : null}

          {teamPaticipate.value >= 12 ? (
            <div className={styles.lengthTeam}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <label
                  htmlFor="select_lengthTeam"
                  className={styles.createTournament_img_title}
                >
                  Số bảng đấu
                </label>
                {teamPaticipate.error != null ? (
                  <p
                    style={{
                      color: "red",
                      fontWeight: 900,
                      fontSize: 18,
                    }}
                  >
                    {teamPaticipate.error}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              <select
                name="groupNumber"
                onChange={onChangeHandler}
                value={groupNumber.value}
                style={{
                  marginLeft: 0,
                  padding: "10px 20px",
                  marginTop: 0,
                  width: 488.44,
                  marginBottom: 20,
                }}
              >
                <option value="2" selected>2</option>
                <option value="4">4</option>
              </select>
              {/* <input
            style={{
              marginLeft: 0,
              padding: "10px 20px",
              marginTop: 0,
              width: 488.44,
            }}
            className={styles.select_lengthTeam}
            id="select_lengthTeam"
            name="teamPaticipate"
            value={teamPaticipate.value}
            placeholder="Số bảng"
            onChange={onChangeHandler}
            required
          /> */}
            </div>
          ) : null}

          {teamPaticipate.value >= 12 && teamPaticipate.value <= 16 ? (
            <p
              style={{
                margin: "20px 0",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: 18,
                lineHeight: 1.5,
              }}
            >
              Đối với số bảng đấu bằng {groupNumber.value}, thì hệ thống chúng
              tôi sẽ chia làm{" "}
              {groupNumber.value == 2 ? "2 bảng A-B" : "4 bảng A-B-C-D"},{" "}
              {groupNumber.value == 2
                ? teamPaticipate.value % 2 === 0
                  ? ` mỗi bảng sẽ có ${teamPaticipate.value / 2} đội `
                  : `bảng A sẽ có ${Math.ceil(
                      teamPaticipate.value / 2
                    )} đội, bảng B có ${Math.floor(
                      teamPaticipate.value / 2
                    )} đội `
                : groupNumber.value == 4
                ? teamPaticipate.value == 14
                  ? ` bảng A-B có 4 đội và C-D sẽ có 3 đội `
                  : teamPaticipate.value == 15
                  ? ` bảng A-B-C có 4 đội và D sẽ có 3 đội `
                  : teamPaticipate.value % 4 === 0
                  ? ` mỗi bảng sẽ có ${teamPaticipate.value / 4} đội `
                  : ` bảng A có ${Math.ceil(
                      teamPaticipate.value / 4
                    )} đội và mỗi bảng sẽ có ${Math.floor(
                      teamPaticipate.value / 4
                    )} đội `
                : null}
              và sẽ mặc định lấy 2 đội mạnh nhất mỗi bảng vào vòng loại trực
              tiếp{" "}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className={styles.createTournament_row3}>
        <div className={styles.note_lengthMatch}>
          {/* <h1 className={styles.lengthMatch_title}>
            Đối với hình thức thi đấu này thì số lượng trận đấu sẽ là: 10
          </h1> */}
        </div>
      </div>
    </div>
  );
};

export default CompetitionFormat;
