import React, { useEffect, useState } from "react";

export default function DenyTeamInTournament(props) {
  const {
    hideShowDelete,
    setHideShowDelete,
    teamDelete,
    setTeamDelete,
    getAllPlayerInTournamentByIdTeam
  } = props;
   console.log(teamDelete)
  return (
    <div
      id="exampleModal"
      className={hideShowDelete ? "popup__player active" : "popup__player"}
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
                setHideShowDelete(false);
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
                setHideShowDelete(false);
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
