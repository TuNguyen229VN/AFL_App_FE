import axios from "axios";
import { data } from "flickity";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingAction from "../LoadingComponent/LoadingAction";
import styles from "./styles/style.module.css";
function SendCancelTournament(props) {
  const [popupReport, setPopupReport] = useState(false);
  const [loadingAc, setLoadingAc] = useState(false);
  const [contentReport, setContentReport] = useState({ value: "", error: "" });
  const [contentCheckbox, setContentCheckbox] = useState({
    value: "",
    error: "",
  });
  const sendReport = async (e) => {
    setLoadingAc(true);
    e.preventDefault();
    if (
      (contentReport.value === null && contentCheckbox.value === null) ||
      (contentReport.value === "" && contentCheckbox.value === "") ||
      (contentReport.value === "" && contentCheckbox.value === "Lý do khác")
    ) {
      toast.error("Không được để trống", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoadingAc(false);
      return;
    }
    const data = {
      reason:
        contentReport.value !== ""
          ? contentReport.value
          : contentCheckbox.value,
      userId: props.data.userId,
      tournamentId: props.data.tournamentId,
      status: "Host chưa duyệt",
    };
    console.log(data)
    try {
      const response = await axios.post(
        "https://afootballleague.ddns.net/api/v1/reports",
        data
      );
      if (response.status === 201) {
        setPopupReport(false);
        setContentReport({ value: "", error: "" });
        setLoadingAc(false);
        toast.success("Gửi yêu cầu thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      setLoadingAc(false);
      toast.error(error.response.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };
  const validateForm = (name, value) => {
    switch (name) {
      case "contentU":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        }
        break;
      default:
        break;
    }

    return { flag: true, content: null };
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const flagValid = validateForm(name, value);
    switch (name) {
      case "radio-group":
        let contentRadio = null;
        if (flagValid.flag === false) {
          contentRadio = {
            value,
            error: flagValid.content,
          };
        } else {
          contentRadio = {
            value,
            error: null,
          };
        }
        setContentCheckbox({
          ...contentRadio,
        });
        setContentReport({ value: "", error: "" });
        break;
      case "contentU":
        let contentU = null;
        if (flagValid.flag === false) {
          contentU = {
            value,
            error: flagValid.content,
          };
        } else {
          contentU = {
            value,
            error: null,
          };
        }
        setContentReport({
          ...contentU,
        });
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {loadingAc ? <LoadingAction /> : null}
      <div
        className={popupReport ? `overlay active` : "active"}
        onClick={() => {
          setPopupReport(false);
        }}
      ></div>
      <div
        className="btn_UpdateTournament"
        style={{
          padding: "20px 42px",
          marginLeft: 75,
          fontWeight: 600,
          fontFamily: "Mulish-Bold",
          borderRadius: 5,
          backgroundColor: "#D7FC6A",
          border: 1,
          borderColor: "#D7FC6A",
          transition: "0.5s",
          position: "absolute",
          top: 450,
          cursor: "pointer",
        }}
        onClick={() => {
          setPopupReport(true);
        }}
      >
        <i class="fa-solid fa-ban"></i> Yêu cầu hủy giải đấu
      </div>
      <form
        className={popupReport ? "popup__news active" : "popup__news"}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={sendReport}
      >
        <div
          className="close"
          onClick={() => {
            setPopupReport(false);
          }}
        >
          X
        </div>
        <h4>Yêu cầu hủy giải đấu</h4>
        <div className={styles.checkbox}>
          <p>
            <input
              type="radio"
              id="test1"
              name="radio-group"
              value={"Số lượng đội bóng tham gia không đủ"}
              onChange={onChangeHandler}
            />
            <label htmlFor="test1">Số lượng đội bóng tham gia không đủ</label>
          </p>
          <p>
            <input
              type="radio"
              id="test2"
              name="radio-group"
              value={"Kinh phí tài trợ không đáp ứng đủ cho giải đấu"}
              onChange={onChangeHandler}
            />
            <label htmlFor="test2">Kinh phí tài trợ không đáp ứng đủ cho giải đấu</label>
          </p>
          <p>
            <input
              type="radio"
              id="test3"
              name="radio-group"
              value={"Ảnh hưởng dịch bệnh covid"}
              onChange={onChangeHandler}
            />
            <label htmlFor="test3">Ảnh hưởng dịch bệnh covid</label>
          </p>
          <p>
            <input
              type="radio"
              id="test4"
              name="radio-group"
              value={"Sân bãi không có để đáp ứng giải đấu"}
              onChange={onChangeHandler}
            />
            <label htmlFor="test4">Sân bãi không có để đáp ứng giải đấu</label>
          </p>
          <p>
            <input
              type="radio"
              id="test5"
              name="radio-group"
              value={"Lý do khác"}
              onChange={onChangeHandler}
            />
            <label htmlFor="test5">Lý do khác:</label>
          </p>
          <p className="error errRp">{contentReport.error}</p>
          <div>
            {contentCheckbox.value === "Lý do khác" ? (
              <textarea
                placeholder={"Lý do hủy giải đấu này"}
                className="content"
                name="contentU"
                autoComplete="off"
                value={contentReport.value}
                onChange={onChangeHandler}
              />
            ) : null}
            <button>Xin hủy giải</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SendCancelTournament;
