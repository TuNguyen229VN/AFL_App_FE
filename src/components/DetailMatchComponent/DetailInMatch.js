import React, { useEffect, useState } from "react";

export default function DetailInMatch(props) {
    const {hideShow,setHideShow,typeDetail,nameTeamA,nameTeamB,numTeamA,numTeamB,playerA,playerB} = props;
    const renderSelectByNumber = () => {
      
    }
    const renderInputByNumber = (number) => {
      let array = [];
      for(let i = 0 ; i < number ; i++){
        array.push(<div>
          <input className="btnInput" style={{
          margin: "10px 0"
        }}  />
        </div>)
      }
      return array;
    }
  return (
    <div>
      <div
        id="exampleModal"
        className={hideShow ? "popup__player active" : "popup__player"}
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Chi tiết {typeDetail === "score" ? "bàn thắng" : typeDetail === "yellow" ? "thẻ vàng" : "thẻ đỏ"}
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
            <div class="modal-body" style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              lineHeight: 2
            }}>
              <div>
              <p style={{
                fontWeight:600,
              }}>{nameTeamA + "-" + nameTeamB}</p>
              </div>
              <div style={{
                display: "flex",
                marginTop:30,
                width: "100%",
                justifyContent: "space-around"
              }}>
                <div style={{
                display: "flex",
                flexDirection: "column"
              }}>
                  {renderInputByNumber(numTeamA)}
                </div>
                <div>
                {renderInputByNumber(numTeamB)}
                </div>
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
                  padding:"10px 15px"
                }}
              >
                Đóng
              </button>
              <button style={{
                  padding:"10px 15px"
                }} type="button" class="btn btn-primary">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
