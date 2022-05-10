import React, { useState } from "react";
import "./styles/style.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

function CreateTeam() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const text = draftToHtml(convertToRaw(editorState.getCurrentContent()))
  return (
    <div className="create__team">
      <h2 className="title">Tạo đội bóng</h2>
      <p className="avt">Hình đội bóng</p>
      <div className="main__team">
        <div class="input-field">
          <input type="file" name="file" id="file" />
          <img
            src="assets/img/createteam/camera.png"
            alt="camera"
            className="cmr"
          />
          <label for="file" class="input-label">
            Tải ảnh lên
            <i className=" icon-upload">
              <img
                src="assets/img/createteam/download.svg"
                alt="dw"
                className="dw"
              />
            </i>
          </label>
        </div>
        <div className="createteamwrap">
          <div class="text-field">
            <label for="nameteam">Tên đội bóng</label>
            <input
              autocomplete="off"
              type="text"
              id="nameteam"
              placeholder="Tên đội bóng *"
            />
          </div>
          <div class="text-field">
            <label for="phoneteam">Số điện thoại liên lạc</label>
            <input
              autocomplete="off"
              type="text"
              id="phoneteam"
              placeholder="Số điện thoại *"
            />
          </div>
          <div class="text-field">
            <label for="genderteam">Giới tính đội</label>
            <select id="genderteam">
              <option>Nam</option>
              <option>Nữ</option>
              <option>Khác</option>
            </select>
          </div>
        </div>
        <div className="createteamwrap">
          {/* <div class="text-field">
            <label for="ageteam">Độ tuổi</label>
            <select id="ageteam">
              <option>10-18</option>
              <option>19-30</option>
              <option>31-50</option>
            </select>
          </div> */}
          <div class="text-field">
            <label for="namemanager">Tên người tạo đội</label>
            <input
              autocomplete="off"
              type="text"
              id="namemanager"
              placeholder="Tên người tạo *"
              value="Nguyễn Thanh Thanh Tú"
            />
          </div>
          <div class="text-field">
            <label for="emailmanager">Email</label>
            <input
              autocomplete="off"
              type="text"
              id="emailmanager"
              placeholder="Địa chỉ email *"
              value="tunttse140127@fpt.edu.vn"
            />
          </div>
        </div>
      </div>
      {/* <p className="avt">Hình áo đấu</p>
      <div className="clothes__team">
        <div class="input-field">
          <input type="file" name="file" id="file" />
          <img
            src="assets/img/createteam/camera.png"
            alt="camera"
            className="cmr"
          />
          <label for="file" class="input-label">
            Tải ảnh lên
            <i className=" icon-upload">
              <img
                src="assets/img/createteam/download.svg"
                alt="dw"
                className="dw"
              />
            </i>
          </label>
        </div>
        <div class="input-field">
          <input type="file" name="file" id="file" />
          <img
            src="assets/img/createteam/camera.png"
            alt="camera"
            className="cmr"
          />
          <label for="file" class="input-label">
            Tải ảnh lên
            <i className=" icon-upload">
              <img
                src="assets/img/createteam/download.svg"
                alt="dw"
                className="dw"
              />
            </i>
          </label>
        </div>
        <div class="input-field">
          <input type="file" name="file" id="file" />
          <img
            src="assets/img/createteam/camera.png"
            alt="camera"
            className="cmr"
          />
          <label for="file" class="input-label">
            Tải ảnh lên
            <i className=" icon-upload">
              <img
                src="assets/img/createteam/download.svg"
                alt="dw"
                className="dw"
              />
            </i>
          </label>
        </div>
      </div> */}
      <p className="avt line3">Thông tin đội bóng</p>
      <div className="descTeam ">
      <Editor
        editorState={editorState}
        editorClassName="editor-class"
        onEditorStateChange={setEditorState}
        placeholder="Mô tả về đội bóng"
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: [
            { text: "APPLE", value: "apple", url: "apple" },
            { text: "BANANA", value: "banana", url: "banana" },
            { text: "CHERRY", value: "cherry", url: "cherry" },
            { text: "DURIAN", value: "durian", url: "durian" },
            { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
            { text: "FIG", value: "fig", url: "fig" },
            { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
            { text: "HONEYDEW", value: 'honeydew', url: "honeydew" },
          ],
        }}
      />
      </div>
      <div className="createTeam_btn">Tạo đội</div>
    </div>
  );
}

export default CreateTeam;
