import React from "react";

export default function ModelNotRegisterInTour(props) {
  const { setHideShow, hideShowDeny, setHideShowDeny,setStatus } = props;
  return (
    <div
      id="exampleModal"
      className={hideShowDeny ? "popup__player active" : "popup__player"}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Xác nhận hủy lưu danh sách
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setHideShowDeny(false);
              }}
            ></button>
          </div>
          <div class="modal-body">
            Bạn có chắc chắn muốn thoát khi chưa lưu danh sách cầu thủ không?
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
                setHideShowDeny(false);
              }}
            >
              Đóng
            </button>
            <button
              type="button"
              class="btn btn-primary"
              style={{
                padding: 10,
              }}
              onClick={() => {
                setHideShow(false);
                setHideShowDeny(false);
                setStatus(true);
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
