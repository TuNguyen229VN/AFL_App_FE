import React, { useState } from "react";
import ".//style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import gsap from "gsap";
import AOS from "aos";
import Transitions from "../Transitions/Transitions";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import CompetitionFormat from "./CompetitionFormat";
import Description from "./Description";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTournament = () => {
  const [status, setStatus] = useState(-1);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const descriptionText = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

  const [imgTournament, setImgTournament] = useState({
    value: "",
    img: null,
    error: "",
  });
  const [nameTournament, setNameTournament] = useState({
    value: "",
    error: "",
  });
  const [teamPaticipate, setTeamPaticipate] = useState({
    value: "",
    error: "",
  });
  const [typeFootballField, setTypeFootballField] = useState({
    value: "",
    name: "",
    error: "",
  });
  const [closeRegister, setCloseRegister] = useState({
    value: "",
    error: "",
  });
  const [startTime, setStartTime] = useState({
    value: "",
    error: "",
  });
  const [endTime, setEndTime] = useState({
    value: "",
    error: "",
  });
  const [competitionFormat, setCompetitionFormat] = useState({
    value: "",
    error: "",
  });
  const [minimunPlayerInTournament, setMinimunPlayerInTournament] = useState({
    value: "",
    error: "",
  });
  const [phoneContact, setPhoneContact] = useState({
    value: "",
    error: "",
  });
  const [footballField, setFootballField] = useState({
    value: "",
    error: "",
  });
  AOS.init();
  const tour = gsap.timeline();

  const onSubmitHandler =  async (e) => {
    e.preventDefault();
    try {
      const data = {
        "id": 1,
        "tournamentName": nameTournament.value,
        "mode": status === - 1 ? "PRIVATE" : "PUBLIC",
        "tournamentPhone": phoneContact.value,
        "tournamentGender": "", // note
        "registerEndDate": closeRegister.value,
        "tournamentStartDate": startTime.value,
        "tournamentEndDate": endTime.value,
        "footballFieldAddress": footballField.value,
        "tournamentAvatar": imgTournament.value,
        "description": descriptionText,
        "matchMinutes": 10, // note
        "footballTeamNumber": teamPaticipate.value,
        "footballPlayerMaxNumber": minimunPlayerInTournament.value,
        "status": true, // note
        "userId": 6,
        "tournamentTypeId": competitionFormat.value,
        "footballFieldTypeId": +typeFootballField.value
      };
      console.log(data)
      const response = await axios.post("https://afootballleague.ddns.net/api/v1/tournaments",data, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (response.status === 201) {
        toast.success('Tạo giải đấu thành công', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
       const intitalState = {
        value: "",
        error: "",
       }; }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        console.error(error.response);
      }
  };
  const validateForm = (name, value) => {
    switch (name) {
      case "imgTournament":
        break;
      case "nameTournament":
        break;
      case "teamPaticipate":
        break;
      case "typeFootballField":
        break;
      case "closeRegister":
        break;
      case "startTime":
        break;
      case "endTime":
        break;
      case "competitionFormat":
        break;
      case "minimunPlayerInTournament":
        break;
      case "phoneContact":
        break;
      case "footballField":
        break;
    }
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "imgTournament":
        setImgTournament({
          ...imgTournament,
          value:e.target.files[0],
          img: URL.createObjectURL(e.target.files[0])
        })
        break;
      case "nameTournament":
        setNameTournament({
          ...nameTournament,
          value,
        })
        break;
      case "teamPaticipate":
        setTeamPaticipate({
          ...teamPaticipate,
          value
        })
        break;
      case "typeFootballField":
        setTypeFootballField({
          ...typeFootballField,
          value
        })
        break;
      case "closeRegister":
        setCloseRegister({
          ...closeRegister,
          value
        })
        break;
      case "startTime":
        
        setStartTime({
          ...startTime,
          value
        })
        break;
      case "endTime":
        setEndTime({
          ...endTime,
          value
        })
        break;
      case "competitionFormat":
        let numFormat = -1;
        if(value === "knockout"){
          numFormat = 1;
        }else if ( value === "circle"){
          numFormat = 2;
        } else numFormat = 3
        setCompetitionFormat({
          ...competitionFormat,
          value: numFormat
        })
        break;
      case "minimunPlayerInTournament":
        setMinimunPlayerInTournament({
          ...minimunPlayerInTournament,
          value
        })
        break;
      case "phoneContact":
        setPhoneContact({
          ...phoneContact,
          value
        })
        break;
      case "footballField":
        setFootballField({
          ...footballField,
          value
        })
        break;
    }
  };
  return (
    <>
      <Transitions timeline={tour} />
      <Header />
      <div className="createTournament">
        <div className="createTournament_info">
          <div>
            <div>
              <h1 className="createTournament_title">Tạo giải đấu</h1>
              <hr
                width={100}
                size={10}
                style={{
                  backgroundColor: "black",
                  opacity: 1,
                }}
              />
            </div>
            <div
              style={{
                marginTop: 30,
                display: "flex",
                alignItems: "center",
              }}
            >
              <input type="checkbox" id="switch" class="switch-input"   />
              <label
                for="switch"
                class="switch"
                onClick={() => {
                  if (status === 0) {
                    setStatus(-1);
                  } else {
                    setStatus(0);
                  }
                }}
              />
              <p
                style={{
                  marginLeft: 10,
                }}
              >
                Chế độ {status === 0 ? "công khai" : "riêng tư"}
              </p>
            </div>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="createTournament_row1">
              <div className="createTournament_img">
                <h1 className="createTournament_img_title">Hình giải đấu</h1>
                <div>
                  <input
                    type="file"
                    id="file_imgCreateTournament"
                    accept="image/*"
                    name="imgTournament"
                    onChange={onChangeHandler}
                  />
                  <label
                    htmlFor="file_imgCreateTournament"
                    className="createTournament_img_detail"
                  >
                    <img
                      style={{
                        width: 120,
                        margin: "auto",
                      }}
                      src="assets/img/createteam/camera.png"
                      alt="camera"
                    />

                    <p className="btnUploadImg_createTournament">
                      Tải ảnh lên{" "}
                      <i
                        style={{
                          marginLeft: 10,
                        }}
                        class="fa-solid fa-upload"
                      ></i>
                    </p>
                  </label>

                  {/* <input type="file" /> */}
                </div>
              </div>
              <div className="createTournament_row1_col2">
                <div className="nameTournament">
                  <label
                    htmlFor="createTour"
                    className="createTournament_img_title"
                  >
                    Tên giải đấu
                  </label>

                  <input
                    id="createTour"
                    placeholder="Tên giải đấu"
                    onChange={onChangeHandler}
                    name="nameTournament"
                    value={nameTournament.value}
                    required
                  />
                </div>
                <div className="lengthTeam">
                  <label
                    htmlFor="select_lengthTeam"
                    className="createTournament_img_title"
                  >
                    Số đội tham gia
                  </label>

                  <input
                    className="select_lengthTeam"
                    id="select_lengthTeam"
                    name="teamPaticipate"
                    value={teamPaticipate.value}
                    placeholder="Nhập số đội tham gia"
                    onChange={onChangeHandler}
                    required
                  />
                </div>

                <div className="typeFootballField">
                  <label className="createTournament_img_title">
                    Loại sân thi đấu
                  </label>
                  <select
                    className="select_typeFootballField"
                    onChange={onChangeHandler}
                    value={typeFootballField.value}
                    name="typeFootballField"
                  >
                    <option value="1">Sân thi đấu bóng đá 5</option>
                    <option value="2">Sân thi đấu bóng đá 7</option>
                    <option value="4">Sân thi đấu bóng đá 11</option>
                  </select>
                </div>
              </div>

              <div className="createTournament_row1_col3">
                {status === 0 ? (
                  <div className="timeCloseRegister">
                    <label
                      htmlFor="timeCloseRegister"
                      className="createTournament_img_title"
                    >
                      Ngày đóng đăng ký tham gia
                    </label>
                    <input
                      className="timeCloseRegister_input"
                      id="timeCloseRegister"
                      type="datetime-local"
                      name="closeRegister"
                      value={closeRegister.value}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      height: 70,
                    }}
                  ></div>
                )}

                <div className="timeStart">
                  <label
                    className="createTournament_img_title"
                    htmlFor="startTime"
                  >
                    Ngày bắt đầu
                  </label>
                  <input
                    className="timeStart_input"
                    id="startTime"
                    type="datetime-local"
                    name="startTime"
                    value={startTime.value}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="timeEnd">
                  <label
                    htmlFor="endTime"
                    className="createTournament_img_title"
                  >
                    Ngày kết thúc
                  </label>
                  <input
                    className="timeEnd_input"
                    id="endTime"
                    type="datetime-local"
                    name="endTime"
                    value={endTime.value}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            </div>
            <CompetitionFormat
              competitionFormat={competitionFormat}
              onChangeHandler={onChangeHandler}
            />

            <div className="createTournament_row4">
              <div className="createTournament_row4_col1">
                <div className="mininum_member">
                  <label
                    htmlFor="mininum_member"
                    className="createTournament_img_title"
                  >
                    Số cầu thủ tối thiểu mỗi đội
                  </label>
                  <input
                    id="mininum_member"
                    className="mininum_member_input"
                    type="number"
                    min={5}
                    name="minimunPlayerInTournament"
                    value={minimunPlayerInTournament.value}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="contactPhone">
                  <label
                    htmlFor="phoneContact"
                    className="createTournament_img_title"
                  >
                    Số điện thoại liên lạc
                  </label>
                  <input
                    type="text"
                    id="phoneContact"
                    placeholder="Số điện thoại"
                    name="phoneContact"
                    value={phoneContact.value}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="description_tournament">
                  <label
                    htmlFor="description"
                    className="createTournament_img_title"
                  >
                    Mô tả
                  </label>
                  {/* <textarea
                  placeholder="Mô tả về giải đấu"
                  
                /> */}
                  <div className="descTeam ">
                    <Description
                      editorState={editorState}
                      setEditorState={setEditorState}
                    />
                  </div>
                </div>
              </div>
              <div className="createTournament_row4_col2">
                <div className="fieldSoccer">
                  <label
                    className="createTournament_img_title"
                    htmlFor="fieldSoccer"
                  >
                    Địa điểm
                  </label>
                  <input
                    id="fieldSoccer"
                    className="fieldSoccer_input"
                    placeholder="Nhập địa chỉ"
                    name="footballField"
                    value={footballField.value}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="btn_nextPage">
              <input type="submit" className="btn_Next" value="Tiếp theo" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default CreateTournament;
