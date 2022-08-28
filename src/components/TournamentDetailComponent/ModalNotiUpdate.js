import React from "react";

export default function ModalNotiUpdate(props) {
  const { hideShow, setHideShow, typeNoti,accpetChangCompetitionFormat,setLoading } = props;
  setLoading(false);
  return (
    <div
      id="exampleModal"
      className={hideShow ? "popup__player active" : "popup__player"}
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 style={{
                fontWeight:700,
                fontSize:28
            }} class="modal-title" id="exampleModalLabel">
              Thông báo
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
                color: "red",
                lineHeight:1.6,
                fontSize:20
            }}>
              {typeNoti === "hasTeam"
                ? "Bởi vì giải đấu đã có đội bóng vì thế bạn không thể thay đổi số cầu thủ tối đa mỗi đội, loại sân thi đấu, thời gian thi đấu và địa chỉ. "
                : "Bởi vì thay đổi liên quan tới cầu hình giải đấu nên bạn có đồng ý nếu chúng tôi xóa bỏ lịch thi đấu và bảng xếp hạng hiện tại,để tạo mới cho giống với cấu hình bạn đã chọn không?"}
            </p>
          </div>
          <div class="modal-footer">
            {typeNoti !== "hasTeam" ? (
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
                Trở về
              </button>
            ) : null}

            <button
              type="button"
              style={{
                padding: "10px 15px",
              }}
              class="btn btn-primary"
              onClick={() => {
                
               if(typeNoti !== "hasTeam"){
                setLoading(true);
                accpetChangCompetitionFormat();
               }else{
                setHideShow(false);
               }
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
