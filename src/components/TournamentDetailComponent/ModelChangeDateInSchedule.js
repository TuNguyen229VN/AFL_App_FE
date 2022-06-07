import React, { useState, useEffect } from "react";

export default function ModalChangeDateInSchedule(props) {
  const { hideShow, setHideShow, matchCurrent, setMatchCurrent } = props;

  return (
    <div
      id="exampleModal"
      className={hideShow ? "popup__player active" : "popup__player"}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Thay đổi ngày giờ trận đấu
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setHideShow(false);
                setMatchCurrent(null);
              }}
            ></button>
          </div>
          {matchCurrent != null ? (
            matchCurrent.matchDate != null ? (
              <div class="modal-body">
                Ngày giờ hiện tại: {matchCurrent.matchDate}{" "}
              </div>
            ) : (
              <div
                style={{
                  fontWeight: 700,
                  color: "red",
                }}
                class="modal-body"
              >
                Hiện tại trận đấu chưa có ngày giờ diễn ra hãy cập nhật nó{" "}
                {matchCurrent.id}{" "}
              </div>
            )
          ) : null}

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                setHideShow(false);
                setMatchCurrent(null);
              }}
              style={{
                padding: 10,
              }}
            >
              Hủy
            </button>
            <button
              style={{
                padding: 10,
              }}
              type="button"
              class="btn btn-primary"
            >
              Thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
