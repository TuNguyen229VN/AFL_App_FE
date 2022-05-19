import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getAPI } from "../../api";
function UpdateTeam() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [manager, setManager] = useState("");
  const textDescription = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );
  let navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [imgClub, setImgClub] = useState({
    value: "",
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
    value: "Male",
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
  const [btnActive, setBtnActive] = useState(false);
  const [resetProvice, setResetProvice] = useState(-1);
  const [provice, setProvice] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [wards, setWards] = useState(null);
  const [addressField, setAddressField] = useState(null);
  useEffect(() => {
    setResetProvice(-1);
    getAllCity();
  }, [resetProvice]);

  useEffect(() => {
    getUser();
    getInforTeam();
  }, []);
  const getUser = () => {
    let afterDefaultURL = `users/${user.userVM.id}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setManager(res.data);
      })
      .catch((err) => console.error(err));
  };

  const [area, setArea] = useState("");
  const getInforTeam = () => {
    let afterDefaultURL = `teams/${user.userVM.id}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setNameClub({ value: res.data.teamName });
        setImgClub({ value: res.data.teamAvatar, img: res.data.teamAvatar });
        setPhoneContact({ value: res.data.teamPhone });
        setGender({ value: res.data.teamGender });
        setArea(res.data.teamArea);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllCity = async () => {
    const response = await axios.get(
      "https://provinces.open-api.vn/api/?depth=3"
    );
    if (response.status === 200) {
      setProvice(response.data);
    }
  };
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
      default:
        break;
    }

    return { flag: true, content: null };
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        id: user.userVM.id,
        teamName: nameClub.value,
        teamPhone: phoneContact.value,
        teamAvatar: imgClub.value,
        description: textDescription,
        teamGender: gender.value,
        teamArea: addressField,
      };

      const response = await axios.put(
        "https://afootballleague.ddns.net/api/v1/teams",
        data,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      if (response.status === 201) {
        toast.success("Cập nhật đội bóng thành công", {
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
        };
        setImgClub(intitalState);
        setNameClub(intitalState);
        setPhoneContact(intitalState);
        setGender({
          value: "Male",
          error: "",
        });
        setEditorState(EditorState.createEmpty());
        setProvice(null);
        setDistricts(null);
        setWards(null);
        setResetProvice(0);
        setBtnActive(false);
        // navigate(`/teamDetail/${response.data.id}/inforTeamDetail`);
        navigate(-1)
      }
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

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const flagValid = validateForm(name, value);
    if (flagValid.flag) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
    switch (name) {
      case "imgClub":
        const valueImg = URL.createObjectURL(e.target.files[0]);
        setImgClub({
          ...imgClub,
          img: valueImg,
          value: e.target.files[0],
        });
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
        console.log(value);
        let gender = null;
        if (flagValid.flag === false) {
          gender = {
            value,
            error: flagValid.content,
          };
        } else {
          gender = {
            value,
            error: null,
          };
        }

        setGender({
          ...gender,
        });
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
      case "provice":
        let dataProvice = provice;
        const proviceFind = dataProvice.find((item) => item.name === value);
        setDistricts(proviceFind.districts);
        setWards(null);
        setAddressField(", " + value);
        break;
      case "districts":
        let dataDis = districts;

        const disFind = dataDis.find((item) => item.name === value);

        setWards(disFind.wards);
        const oldAddress = addressField;
        setAddressField(", " + value + oldAddress);
        break;
      case "wards":
        {
          const oldAddress = addressField;
          setAddressField(value + oldAddress);
        }
        break;
      default:
        break;
    }
  };
  const splitArea = (check) => {
    let result = area.split(",");
    if (check === "provice") {
      return result[2];
    }
    if (check === "districts") {
      return result[1];
    }
    if (check === "wards") {
      return result[0];
    }
  };

  return (
    <>
      <ScrollToTop />
      <Header />

      <form onSubmit={onSubmitHandler}>
        <div
          className={styles.create__team}
          style={{
            marginBottom: 40,
          }}
        >
          <h2 className={styles.title}>Cập nhật đội bóng</h2>
          <p className={styles.avt}>Hình đội bóng</p>
          <div className={styles.main__team}>
            <div className={styles.input__field}>
              <input
                accept="image/*"
                type="file"
                name="imgClub"
                id="file"
                onChange={onChangeHandler}
              />
              <img
                src={
                  imgClub.value === ""
                    ? "/assets/img/createteam/camera.png"
                    : imgClub.img
                }
                alt="camera"
                className={imgClub.value === "" ? styles.cmr : styles.cmrb}
              />
              <label for="file" className={styles.input__label}>
                Tải ảnh lên
                <i className={styles.icon__upload}>
                  <img
                    src="/assets/img/createteam/download.svg"
                    alt="dw"
                    className={styles.dw}
                  />
                </i>
              </label>
            </div>
            <div className={styles.createteamwrap}>
              <div className={styles.text__field}>
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
                  required
                />
              </div>
              <div className={styles.text__field}>
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
              <div className={styles.text__field}>
                <label for="genderteam">Giới tính đội</label>
                <select
                  name="gender"
                  value={gender.value}
                  onChange={onChangeHandler}
                  id="genderteam"
                  required
                  disabled
                >
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                </select>
              </div>
            </div>
            <div className={styles.createteamwrap}>
              <div className={styles.text__field}>
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
                  value={manager.username}
                  disabled
                />
              </div>
              <div className={styles.text__field}>
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
                  value={manager.email}
                  required
                  disabled
                />
              </div>
            </div>
          </div>
          <p className={`${styles.avt} ${styles.line3}`}>Khu vực đội bóng</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 65,
                width: "30%",
              }}
            >
              <label
                className={styles.createTournament_img_title}
                htmlFor="provice"
              >
                Thành phố/Tỉnh{" "}
              </label>
              <select
                style={{
                  padding: "10px 5px",
                }}
                name="provice"
                required
                onChange={onChangeHandler}
              >
                <option disabled>Chọn thành phố</option>
                {provice != null
                  ? provice.map((item, index) => {
                      return (
                        <option
                          value={item.name}
                          key={index}
                          selected={
                            item.name === splitArea("provice")
                              ? true
                              : false
                          }
                        >
                          {item.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 65,
                width: "30%",
              }}
            >
              <label
                className={styles.createTournament_img_title}
                htmlFor="districts"
              >
                Quận/Huyện
              </label>
              <select
                required
                style={{
                  padding: "10px 5px",
                }}
                name="districts"
                onChange={onChangeHandler}
              >
                <option selected disabled>
                  Chọn quận
                </option>
                {districts != null
                  ? districts.map((item, index) => {
                      return (
                        <option value={item.name} key={index}>
                          {item.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 65,
                width: "30%",
              }}
            >
              <label
                className={styles.createTournament_img_title}
                htmlFor="wards"
              >
                Phường/Xã
              </label>
              <select
                style={{
                  padding: "10px 5px",
                }}
                name="wards"
                onChange={onChangeHandler}
                required
              >
                <option selected disabled>
                  Chọn phường
                </option>
                {wards != null
                  ? wards.map((item, index) => {
                      return (
                        <option value={item.name} key={index}>
                          {item.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
          </div>
          <p className={`${styles.avt} ${styles.line3}`}>Thông tin đội bóng</p>
          <div className={styles.descTeam}>
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
          {btnActive ? (
            <input
              style={{
                float: "right",
                // backgroundColor: buttonFlag === true ? "#d7fc6a" : "#D9D9D9",
                // cursor: buttonFlag === true ? "pointer" : "default",
              }}
              type="submit"
              className={styles.createTeam_btn}
              value="Cập nhật đội"
              // disabled = {buttonFlag === true ? false : false}
            />
          ) : null}
        </div>
      </form>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default UpdateTeam;
