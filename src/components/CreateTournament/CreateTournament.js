import React, { useState } from "react";
import ".//style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import gsap from "gsap";
import AOS from "aos";
import Transitions from "../Transitions/Transitions";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
// import Map from "../MapComponent/Map";
const CreateTournament = () => {
  const [status, setStatus] = useState(-1);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  AOS.init();
  const tour = gsap.timeline();
  return (
    <>
      <Transitions timeline={tour} />
      <Header/>
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
              <input type="checkbox" id="switch" class="switch-input" />
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

          <div className="createTournament_row1">
            <div className="createTournament_img">
              <h1 className="createTournament_img_title">Hình giải đấu</h1>
              <div>
                <input type="file" name="file" id="file_imgCreateTournament" />
                <label htmlFor="file_imgCreateTournament" className="createTournament_img_detail">
                  <img
                    style={{
                      width: 120,
                      margin: "auto",
                    }}
                    src="assets/img/createteam/camera.png"
                  />
                  
                  <p className="btnUploadImg_createTournament">
                    Tải ảnh lên <i style={{
                      marginLeft: 10
                    }} class="fa-solid fa-upload"></i>
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
                <input id="createTour" placeholder="Tên giải đấu" />
              </div>
              <div className="lengthTeam">
                <label className="createTournament_img_title">
                  Số đội tham gia
                </label>
                <select className="select_lengthTeam">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>

              
              <div className="typeFootballField">
                <label className="createTournament_img_title">
                  Loại sân thi đấu
                </label>
                <select className="select_typeFootballField">
                  <option>5 vs 5</option>
                  <option>7 vs 7</option>
                  <option>11 vs 11</option>
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
                  />
                </div>
              ) : (
                <div style={{
                  height: 70
                }}></div>
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
                />
              </div>

              <div className="timeEnd">
                <label htmlFor="endTime" className="createTournament_img_title">
                  Ngày kết thúc
                </label>
                <input
                  className="timeEnd_input"
                  id="endTime"
                  type="datetime-local"
                />
              </div>
            </div>
          </div>
          <div className="createTournament_row2">
            <h1 className="createTournament_img_title">Hình thức thi đấu</h1>
            <div className="img_type_footballField">
              <div
                style={{
                  width: "25%",
                }}
              >
                <label htmlFor="knockout">
                  <div className="type_knockout">
                    <img
                      src="/assets/img/createtournament/type_footballfield/knockout.jpg"
                      alt="knockout"
                    />
                  </div>
                </label>

                <input
                  type="radio"
                  id="knockout"
                  name="footballField"
                  value="JavaScript"
                ></input>
              </div>
              <div
                style={{
                  width: "25%",
                }}
              >
                <label htmlFor="circle">
                  <div className="type_circle">
                    <img
                      src="/assets/img/createtournament/type_footballfield/circle.jpg"
                      alt="circle"
                    />
                  </div>
                </label>

                <input
                  type="radio"
                  id="circle"
                  name="footballField"
                  value="JavaScript"
                ></input>
              </div>
              <div
                style={{
                  width: "25%",
                }}
              >
                <label htmlFor="table">
                  <div className="type_table">
                    <img
                      src="/assets/img/createtournament/type_footballfield/table.jpg"
                      alt="knockout"
                    />
                  </div>
                </label>

                <input
                  type="radio"
                  id="table"
                  name="footballField"
                  value="JavaScript"
                ></input>
              </div>
            </div>
          </div>
          <div className="createTournament_row3">
            <div className="note_lengthMatch">
              <h1 className="lengthMatch_title">
                Đối với hình thức thi đấu này thì số lượng trận đấu sẽ là: 10
              </h1>
            </div>
          </div>
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
                  value="5"
                />
              </div>
              <div className="contactPhone">
                <label
                  htmlFor="phoneContact"
                  className="createTournament_img_title"
                >
                  Số điện thoại liên lạc
                </label>
                <input type="" id="phoneContact" placeholder="Số điện thoại" />
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
                  <Editor
                    className="description_text"
                    editorState={editorState}
                    editorClassName="editor-class"
                    onEditorStateChange={setEditorState}
                    placeholder="Mô tả về giải đấu"
                    mention={{
                      separator: " ",
                      trigger: "@",
                      suggestions: [
                        { text: "APPLE", value: "apple", url: "apple" },
                        { text: "BANANA", value: "banana", url: "banana" },
                        { text: "CHERRY", value: "cherry", url: "cherry" },
                        { text: "DURIAN", value: "durian", url: "durian" },
                        {
                          text: "EGGFRUIT",
                          value: "eggfruit",
                          url: "eggfruit",
                        },
                        { text: "FIG", value: "fig", url: "fig" },
                        {
                          text: "GRAPEFRUIT",
                          value: "grapefruit",
                          url: "grapefruit",
                        },
                        {
                          text: "HONEYDEW",
                          value: "honeydew",
                          url: "honeydew",
                        },
                      ],
                    }}
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
                />
              </div>
              
              
                {/* <Map /> */}
                
              
            </div>
          </div>
          <div className="btn_nextPage">
            <button className="btn_Next">Tiếp theo</button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CreateTournament;
