import React from "react";

function ModalDenyTeamOutTournament(props) {
  const { hideShow, setHideShow,getPlayerInTourByTourID } = props;
    
  return (
    <div
      id="exampleModal"
      className={hideShow ? "popup__player active" : "popup__player"}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Hủy lời mời
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
            <h3>Bạn có chắc chắn muốn hủy lời mời tham gia giải đấu không ?</h3>
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
                padding: "10px 15px",
              }}
            >
              Đóng
            </button>
            <button
              type="button"
              class="btn btn-primary"
              style={{
                padding: "10px 15px",
              }}
              onClick={() => {
                getPlayerInTourByTourID();
              }}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDenyTeamOutTournament;
