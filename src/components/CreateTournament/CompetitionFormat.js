import React from "react";


const CompetitionFormat = (props) => {
    const {onChangeHandler , competitionFormat} = props;
    console.log(competitionFormat.value)
    return(<div className="createTournament_row2">
        <h1 className="createTournament_img_title">Hình thức thi đấu</h1>
            <div className="img_type_footballField">
              <div
                style={{
                  width: "25%",
                }}
              >
                <label htmlFor="knockout">
                  <div className="type_knockout">
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
                  <div className="type_circle">
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
                  <div className="type_table">
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
            <div className="createTournament_row3">
            <div className="note_lengthMatch">
              <h1 className="lengthMatch_title">
                Đối với hình thức thi đấu này thì số lượng trận đấu sẽ là: 10
              </h1>
            </div>
          </div>
    </div>)
}

export default CompetitionFormat;