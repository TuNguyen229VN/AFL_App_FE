import React from "react";
import styles from "./styles/style.module.css";

const CompetitionFormat = (props) => {
  const { onChangeHandler, competitionFormat, teamPaticipate } = props;
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
            <div className={styles.type_circle} 
            style={{
              backgroundColor: competitionFormat.value === "CircleStage" ? "#15E34C" : "white",
              
            }}>
              <img
                src={competitionFormat.value === "CircleStage" ? "/assets/img/createtournament/type_footballfield/circle_check.jpg" :"/assets/img/createtournament/type_footballfield/circle.jpg"}
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
            <div className={styles.type_knockout} style={{
              backgroundColor: competitionFormat.value === "KnockoutStage" ? "#15E34C" : "white"
            }}>
              <img
                src={competitionFormat.value === "KnockoutStage" ?"/assets/img/createtournament/type_footballfield/knockout_check.jpg" :"/assets/img/createtournament/type_footballfield/knockout.jpg"}
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
            <div className={styles.type_table}  style={{
              backgroundColor: competitionFormat.value === "GroupStage" ? "#15E34C" : "white"
            }}>
              <img
                src={competitionFormat.value === "GroupStage" ? "/assets/img/createtournament/type_footballfield/table_check.jpg" :"/assets/img/createtournament/type_footballfield/table.jpg"}
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
        <p style={{
          margin: "20px 0",
          fontWeight: 600,
          fontStyle: "italic",
          fontSize: 18
        }}>Lưu ý {competitionFormat.value === "CircleStage" ?  " đối với hình thức vòng tròn tối thiểu phải có 3 đội và tối đa là 8 đội" : competitionFormat.value === "GroupStage" ? " đối với hình thức chia bảng thì tối thiểu phải có 6 đội và tối đa 16 đội" : " đối với hình thức loại trực tiếp thì tối thiểu phải có 3 đội và tối đa 16 đội"}</p>
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
            width: 488.44
          }}
            className={styles.select_lengthTeam}
            id="select_lengthTeam"
            name="teamPaticipate"
            value={teamPaticipate.value}
            placeholder="Nhập số đội tham gia"
            onChange={onChangeHandler}
            required
          />
        </div>
      </div>
      <div className={styles.createTournament_row3}>
        <div className={styles.note_lengthMatch}>
          <h1 className={styles.lengthMatch_title}>
            Đối với hình thức thi đấu này thì số lượng trận đấu sẽ là: 10
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CompetitionFormat;
