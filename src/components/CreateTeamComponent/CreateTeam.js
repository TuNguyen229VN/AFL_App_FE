import React, { useState } from "react";
import "./styles/style.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const CreateTeam = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const textDescription = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

  const [imgClub, setImgClub] = useState({
    value: null,
    img: null,
    error: "",
  });
  const [nameClub, setNameClub] = useState({
    value: "",
    error: "",
  });
  const [phoneContact, setPhoneContact] = useState({
    value: "",
    error: "",
  });
  const [gender, setGender] = useState({
    value: "",
    error: "",
  });
  const [nameManager, setNameManager] = useState({
    value: "",
    error: "",
  });
  const [email, setEmail] = useState({
    value: "",
    error: "",
  });
  const [description, setDescription] = useState({
    value: "",
    error: "",
  });


  const validateForm = (name, value) => {
    switch (name) {
      case "imgClub":
        break;
      case "nameClub":
        if (value.length === 0) {
          return {
            flag: false,
            content: "Không được để trống",
          };
        } else if (/\d+/.test(value)) {
          return {
            flag: false,
            content: "Tên đội bóng là chữ",
          };
        }
        break;
      case "phoneContact":
        if (value.length === 0) {
          return {
            flag: false,
            content: "Không được để trống",
          };
        } else if (!/^[0-9]+$/.test(value)) {
          return {
            flag: false,
            content: "Số điện thoại không được là chữ hay kí tự khác",
          };
        } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
          return {
            flag: false,
            content: "Sai định dạng số điện thoại",
          };
        }

        break;
      case "gender":
        console.log("gender");
        break;
      case "nameManager":
        if (value.length === 0) {
          return {
            flag: false,
            content: "Không được để trống",
          };
        } else if (/\d+/.test(value)) {
          return {
            flag: false,
            content: "Tên người tạo đội là chữ",
          };
        }
        break;
      case "email":
        if (value.length === 0) {
          return {
            flag: false,
            content: "Không được để trống",
          };
        } else if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ) {
          return {
            flag: false,
            content: "Sai định dạng email",
          };
        }
        break;
    }

    return { flag: true, content: null };
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // axios.get(`https://afootballleague.ddns.net/api/v1/teams?order-by=Id&page-offset=1&limit=5`)
    // .then(res => {
    //   console.log(res.data)
    // }).catch(error => console.log(error))
    // const data = {
    //   id: 5,
    //   teamName: nameClub.value,
    //   teamAvatar: imgClub.value,
    //   description: textDescription,
    //   status: true,
    // };
    // console.log(data);
    try {
      const data = {
        "id": 10,
        "teamName": nameClub.value,
        "teamAvatar": imgClub.value,
        "description": textDescription,
    };
      console.log(data)
      const response = await axios.post("https://afootballleague.ddns.net/api/v1/teams",data, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (response.status === 201) {
       NotificationManager.success("Tạo đội bóng thành công", "Chúc mừng");
       console.log(response)
      }
    } catch (error) {
            NotificationManager.error(
          "Tạo đội bóng thất bại",
          "Không thể tạo đội bóng"
        );
      console.error(error);
    }
    // axios({
    //   method: "post",
    //   url: "https://afootballleague.ddns.net/api/v1/teams",
    //   data: {
    //     id: 6,
    //     teamName: nameClub.value,
    //     teamAvatar: imgClub.value,
    //     description: textDescription,
    //     status: true,
    //   },
    // })
    //   .then((res) => {
    //     NotificationManager.success("Tạo đội bóng thành công", "Chúc mừng");
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     NotificationManager.error(
    //       "Tạo đội bóng thất bại",
    //       "Không thể tạo đội bóng"
    //     );
    //     console.log(error);
    //   });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const flagValid = validateForm(name, value);

    switch (name) {
      case "imgClub":
        const valueImg = URL.createObjectURL(e.target.files[0]);
        // uploadImg(e.target.files[0]);
        setImgClub({
          ...imgClub,
          img: valueImg,
          value: e.target.files[0]
        })
        break;
      case "nameClub":
        let nameClub = null;
        if (flagValid.flag === false) {
          nameClub = {
            value,
            error: flagValid.content,
          };
        } else {
          nameClub = {
            value,
            error: null,
          };
        }
        setNameClub({
          ...nameClub,
        });
        break;
      case "phoneContact":
        let phoneContact = null;
        if (flagValid.flag === false) {
          phoneContact = {
            value,
            error: flagValid.content,
          };
        } else {
          phoneContact = {
            value,
            error: null,
          };
        }
        setPhoneContact({
          ...phoneContact,
        });
        break;
      case "gender":
        if (flagValid.flag === false) {
        } else {
        }
        console.log("gender");
        break;
      case "nameManager":
        let nameManager = null;
        if (flagValid.flag === false) {
          nameManager = {
            value,
            error: flagValid.content,
          };
        } else {
          nameManager = {
            value,
            error: null,
          };
        }
        setNameManager({
          ...nameManager,
        });
        break;
      case "email":
        let email = null;
        if (flagValid.flag === false) {
          email = {
            value,
            error: flagValid.content,
          };
        } else {
          email = {
            value,
            error: null,
          };
        }
        setEmail({
          ...email,
        });
        break;
    }
  };
  //countError();

  return (
    <>
      <Header />

      <form onSubmit={onSubmitHandler}>
        <div
          className="create__team"
          style={{
            marginBottom: 40,
          }}
        >
          <h2 className="title">Tạo đội bóng</h2>
          <p className="avt">Hình đội bóng</p>
          <div className="main__team">
            <div class="input-field">
              <input
                accept="image/*"
                type="file"
                name="imgClub"
                id="file"
                onChange={onChangeHandler}
                required
                minLength="5"
              />
              <img
                src={
                  imgClub.value == null
                    ? "assets/img/createteam/camera.png"
                    : imgClub.img
                }
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <label for="nameteam">Tên đội bóng</label>

                  {nameClub.error != null ? (
                    <p
                      style={{
                        color: "red",
                        fontWeight: 900,
                        fontSize: 18,
                      }}
                    >
                      {nameClub.error}
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>

                <input
                  autoComplete="off"
                  type="text"
                  name="nameClub"
                  id="nameteam"
                  placeholder="Tên đội bóng *"
                  value={nameClub.value}
                  onChange={onChangeHandler}
                  
                />
              </div>
              <div class="text-field">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <label for="phoneteam">Số điện thoại liên lạc</label>
                  {phoneContact.error != null ? (
                    <p
                      style={{
                        color: "red",
                        fontWeight: 900,
                        fontSize: 18,
                      }}
                    >
                      {phoneContact.error}
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>

                <input
                  autoComplete="off"
                  name="phoneContact"
                  type="text"
                  value={phoneContact.value}
                  id="phoneteam"
                  placeholder="Số điện thoại *"
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div class="text-field">
                <label for="genderteam">Giới tính đội</label>
                <select
                  name="gender"
                  value={gender.value}
                  onChange={onChangeHandler}
                  id="genderteam"
                  required
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <label for="namemanager">Tên người tạo đội</label>
                  {nameManager.error != null ? (
                    <p
                      style={{
                        color: "red",
                        fontWeight: 900,
                        fontSize: 18,
                      }}
                    >
                      {nameManager.error}
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
                <input
                  onChange={onChangeHandler}
                  autoComplete="off"
                  type="text"
                  name="nameManager"
                  id="namemanager"
                  placeholder="Tên người tạo *"
                  value="Trương Anh Khoa"
                  disabled
                />
              </div>
              <div class="text-field">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <label for="emailmanager">Email</label>
                  {email.error != null ? (
                    <p
                      style={{
                        color: "red",
                        fontWeight: 900,
                        fontSize: 18,
                      }}
                    >
                      {email.error}
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>

                <input
                  onChange={onChangeHandler}
                  autoComplete="off"
                  type="text"
                  name="email"
                  id="emailmanager"
                  placeholder="Địa chỉ email *"
                  value="truonganhkhoa1405@gmail.com"
                  required
                  disabled
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
              required
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
                  {
                    text: "GRAPEFRUIT",
                    value: "grapefruit",
                    url: "grapefruit",
                  },
                  { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
                ],
              }}
            />
          </div>
          <input
            style={{
              float: "right",
              // backgroundColor: buttonFlag === true ? "#d7fc6a" : "#D9D9D9",
              // cursor: buttonFlag === true ? "pointer" : "default",
            }}
            type="submit"
            className="createTeam_btn"
            value="Tạo đội"
            // disabled = {buttonFlag === true ? false : false}
          />
        </div>
      </form>
      <NotificationContainer />
      <Footer />
    </>
  );
};

export default CreateTeam;
