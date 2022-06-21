import React, { useEffect, useState } from "react";

export default function DetailInMatch(props) {
    const {hideShow,setHideShow,typeDetail,nameTeamA,nameTeamB,numTeamA,numTeamB} = props;
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
            <div class="modal-body">
              <p style={{
                fontWeight:600,
              }}>{nameTeamA + "-" + nameTeamB}</p>
              
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
