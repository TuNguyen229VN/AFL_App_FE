import React from "react";
import styles from "./styles/style.module.css";

const CompetitionFormat = (props) => {
  const { onChangeHandler, competitionFormat } = props;
  return (
    <div className={styles.createTournament_row2}>
      <h1 className={styles.createTournament_img_title}>Hình thức thi đấu</h1>
      <div className={styles.img_type_footballField}>
        <div
          style={{
            width: "25%",
          }}
        >
          <label htmlFor="knockout">
            <div className={styles.type_knockout}>
              <img
                src="/assets/img/createtournament/type_footballfield/knockout.jpg"
                alt="knockout"
              />
            </div>
          </label>

          <input
            type="radio"
            id="knockout"
            name="competitionFormat"
            value="knockout"
            onChange={onChangeHandler}
            checked={competitionFormat.value === 1 ? true : false}
          ></input>
        </div>
        <div
          style={{
            width: "25%",
          }}
        >
          <label htmlFor="circle">
            <div className={styles.type_circle}>
              <img
                src="/assets/img/createtournament/type_footballfield/circle.jpg"
                alt="circle"
              />
            </div>
          </label>

          <input
            type="radio"
            id="circle"
            name="competitionFormat"
            value="circle"
            onChange={onChangeHandler}
          ></input>
        </div>
        <div
          style={{
            width: "25%",
          }}
        >
          <label htmlFor="table">
            <div className={styles.type_table}>
              <img
                src="/assets/img/createtournament/type_footballfield/table.jpg"
                alt="knockout"
              />
            </div>
          </label>

          <input
            type="radio"
            id="table"
            name="competitionFormat"
            value="table"
            onChange={onChangeHandler}
          ></input>
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
