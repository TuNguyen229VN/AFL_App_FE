import React from "react";
export default function ModalDeleteTeamOutTournament(props) {
  const {
    hideShow,
    setHideShow,
    idTeamDelete,
    setIdTeamDelete,
    tourDetail,
    deleteTeamInTour,
  } = props;
  return (
    <div
      id="exampleModal"
      className={hideShow ? "popup__player active" : "popup__player"}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              style={{
                fontWeight: 600,
              }}
              class="modal-title"
              id="exampleModalLabel"
            >
              Xóa đội bóng ra khỏi giải đấu
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
            {new Date().getTime() <=
            new Date(tourDetail.tournamentStartDate).getTime() ? (
              "Bạn có chắc chắn muốn xóa đội bóng này ra khỏi giải ?"
            ) : (
              <p
                style={{
                  lineHeight: 1.6,
                  fontWeight: 500,
                  color: "red",
                }}
              >
                {" "}
                Hiện tại giải đang diễn ra bạn không thể xóa đội bóng khỏi giải.
                Nếu có vấn đề liên quan tới đội bóng xin vui lòng báo cáo đội
                bóng và chờ người xét duyệt
              </p>
            )}
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
                padding: "10px",
              }}
            >
              Đóng
            </button>
            {new Date().getTime() <=
            new Date(tourDetail.tournamentStartDate).getTime() ? (
              <button
                style={{
                  padding: "10px",
                }}
                onClick={() => {
                  deleteTeamInTour(idTeamDelete.split("-")[0],idTeamDelete.split("-")[1]);
                  setHideShow(false);
                }}
                type="button"
                class="btn btn-primary"
              >
                Xác nhận
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
