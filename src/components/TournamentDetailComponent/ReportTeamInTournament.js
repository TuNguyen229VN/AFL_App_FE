import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { getReportByReasonAndTeamAPI } from "../../api/Report";
function ReportTeamInTournament(props) {
  const {
    hideShow,
    setHideShow,
    idTeamDelete,
    tourDetail,
    sendReportTeamOutTournament,
    setIdTeamDelete,
    setLoading,
    tourDetailId,
  } = props;
  const [report, setReport] = useState(false);

  useEffect(() => {
    if (idTeamDelete !== null) getReport();
  }, [idTeamDelete !== null]);

  const getReport = async () => {
    setLoading(true);
    try {
      const response = await getReportByReasonAndTeamAPI(
        tourDetailId,
        "Đội bóng đã không tham gia giải đấu",
        tourDetail.userId,
        idTeamDelete.split("-")[1]
      );
      if (response.status === 200) {
        if (response.data.reports.length > 0) {
          setReport(true);
        }
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const onSubmitHandler = (e) => {
    const data = {
      reason: "Đội bóng đã không tham gia giải đấu",
      userId: tourDetail.userId,
      footballPlayerId: 0,
      teamId: +idTeamDelete.split("-")[1],
      tournamentId: tourDetail.id,
      status: "Báo cáo đội bóng hủy giải",
    };

    sendReportTeamOutTournament(data);
  };

  return (
    <div
      id="exampleModal"
      className={hideShow ? "popup__player active" : "popup__player"}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Báo cáo đội bóng
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setHideShow(false);
                setReport(false);
                setIdTeamDelete(null);
              }}
            ></button>
          </div>
          <div class="modal-body">
            {report === false
              ? "Bạn có chắc chắn muốn báo cáo đội bóng này"
              : "Bạn đã báo cáo đội bóng này. Chờ xét duyệt"}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                setHideShow(false);
                setReport(false);
                setIdTeamDelete(null);
              }}
              style={{
                padding: "10px",
              }}
            >
              Đóng
            </button>
            {report === false ? (
              <button
                style={{
                  padding: "10px",
                }}
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  onSubmitHandler();
                }}
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

export default ReportTeamInTournament;
