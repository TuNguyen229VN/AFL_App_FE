import React from "react";

export default function ModalDenyMatchDetail(props) {
  const { hideShow, setHideShow,setNewMatchDetail,setStatusUpdate,setHideShowNormal } = props;
  return (
    <div
      className={hideShow ? "popup__player active" : "popup__player"}
      id="exampleModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Xác nhận chi tiết cầu thủ
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
            Bạn có chắc chắn muốn đóng chi tiết này không ?
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
                setHideShowNormal(false);
                setNewMatchDetail([]);
                setStatusUpdate(true);
                setHideShow(false)
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
