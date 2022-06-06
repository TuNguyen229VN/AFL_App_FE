import React, { useState, useEffect } from "react";

export default function ModelDeleteTeam(props) {
    const {hideShow,setHideShow,deletePlayerInTeam,idDelete,setIdDelete,active} = props;
  return (
    <div
      id="exampleModal"
      className={hideShow?"popup__player active":"popup__player"}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setHideShow(false);
                setIdDelete(null);
            }}
            ></button>
          </div>
          <div class="modal-body">Bạn có chắc chắn  {active === "Chờ xét duyệt từ cầu thủ" ? " không muốn " : " hủy "}  tham gia đội bóng này?</div>
          <div class="modal-footer">
            <button
            style={{
              padding:10
            }}
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                setHideShow(false)
                setIdDelete(null);
            }}
            >
              Hủy
            </button>
            <button style={{
              padding:10
            }}  type="button" class="btn btn-primary" 
            onClick={() => {
              deletePlayerInTeam(idDelete);
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
