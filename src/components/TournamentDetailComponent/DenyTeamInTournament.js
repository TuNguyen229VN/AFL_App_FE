import React, { useEffect, useState } from "react";

export default function DenyTeamInTournament(props) {
  const {
    hideShow,
    setHideShow,
    teamDelete,
    setTeamDelete,
    getAllPlayerInTournamentByIdTeam
  } = props;
  console.log(teamDelete)
  return (
    <div
      id="exampleModal"
      className={hideShow ? "popup__player active" : "popup__player"}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Xác nhận xóa đội bóng
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setHideShow(false);
                setTeamDelete(null);
              }}
            ></button>
          </div>
          <div class="modal-body">
            Bạn có chắc chắn không muốn đội bóng này tham gia giải?
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
                setTeamDelete(null);
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
                //acceptTeamInTournament(teamDelete, false);
                getAllPlayerInTournamentByIdTeam(teamDelete.teamInTournament.id);
              }}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
