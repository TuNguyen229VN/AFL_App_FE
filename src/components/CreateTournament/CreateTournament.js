import React, { useState, useEffect } from "react";
import styles from "./styles/style.module.css"
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    value: 1,
    error: "",
  });
  const [closeRegister, setCloseRegister] = useState({
    value: "2022-05-07T13:57:00",
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
    value: 1,
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
  const [gender, setGender] = useState({
    value: "Male",
    error: "",
  });
  const [timeDuration, setTimeDuration] = useState({
    value: "15",
    error: "",
  });
  const [resetProvice , setResetProvice] = useState(-1)
  const [provice, setProvice] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [wards, setWards] = useState(null);
  const [addressField, setAddressField] = useState(null);
  AOS.init();
  const tour = gsap.timeline();
  useEffect(() => {
    setResetProvice(-1);
    getAllCity();
  }, [resetProvice]);
  const getAllCity = async () => {
    const response = await axios.get(
      "https://provinces.open-api.vn/api/?depth=3"
    );
    if (response.status === 200) {
      setProvice(response.data);
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        id: 1,
        tournamentName: nameTournament.value,
        mode: status === -1 ? "PRIVATE" : "PUBLIC",
        tournamentPhone: phoneContact.value,
        tournamentGender: gender.value,
        registerEndDate: closeRegister.value,
        tournamentStartDate: startTime.value,
        tournamentEndDate: endTime.value,
        footballFieldAddress: footballField.value  + ", " + addressField,
        tournamentAvatar: imgTournament.value,
        description: descriptionText,
        matchMinutes: +timeDuration.value,
        footballTeamNumber: teamPaticipate.value,
        footballPlayerMaxNumber: minimunPlayerInTournament.value,
        status: true,
        userId: 6,
        tournamentTypeId: competitionFormat.value,
        footballFieldTypeId: +typeFootballField.value,
      };

      const response = await axios.post(
        "https://afootballleague.ddns.net/api/v1/tournaments",
        data,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      if (response.status === 201) {
        toast.success("Tạo giải đấu thành công", {
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
        setImgTournament(intitalState);
        setNameTournament(intitalState);
        setTeamPaticipate(intitalState);
        setTypeFootballField({
          value: 1,
          error: "",
        });

        setCloseRegister({
          value: "2022-05-07T13:57:00",
          error: "",
        });
        setStartTime(intitalState);
        setEndTime(intitalState);
        setCompetitionFormat({
          value: 1,
          error: "",
        });
        setMinimunPlayerInTournament(intitalState);
        setPhoneContact(intitalState);
        setFootballField(intitalState);
        setGender({
          value: "Male",
          error: "",
        });
        setTimeDuration({
          value: 15,
          error: "",
        });
        setEditorState(EditorState.createEmpty());
        setProvice(null);
        setDistricts(null);
        setWards(null);
        setResetProvice(0);
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
          value: e.target.files[0],
          img: URL.createObjectURL(e.target.files[0]),
        });
        break;
      case "nameTournament":
        setNameTournament({
          ...nameTournament,
          value,
        });
        break;
      case "teamPaticipate":
        setTeamPaticipate({
          ...teamPaticipate,
          value,
        });
        break;
      case "typeFootballField":
        setTypeFootballField({
          ...typeFootballField,
          value,
        });
        break;
      case "closeRegister":
        setCloseRegister({
          ...closeRegister,
          value,
        });
        break;
      case "startTime":
        setStartTime({
          ...startTime,
          value,
        });
        break;
      case "endTime":
        setEndTime({
          ...endTime,
          value,
        });
        break;
      case "competitionFormat":
        let numFormat = -1;
        if (value === "knockout") {
          numFormat = 1;
        } else if (value === "circle") {
          numFormat = 2;
        } else numFormat = 3;
        setCompetitionFormat({
          ...competitionFormat,
          value: numFormat,
        });
        break;
      case "minimunPlayerInTournament":
        setMinimunPlayerInTournament({
          ...minimunPlayerInTournament,
          value,
        });
        break;
      case "phoneContact":
        setPhoneContact({
          ...phoneContact,
          value,
        });
        break;
      case "footballField":
        setFootballField({
          ...footballField,
          value,
        });
        break;
      case "gender":
        setGender({
          ...gender,
          value,
        });
        break;
      case "timeDuration":
        console.log(value)
        setTimeDuration({
          ...timeDuration,
          value,
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
          setAddressField(", " + value + oldAddress);
        }
        break;
    }
  };
  return (
    <>
      <Transitions timeline={tour} />
      <Header />
      <div className={styles.createTournament}>
        <div className={styles.createTournament_info}>
          <div>
            <div>
              <h1 className={styles.createTournament_title}>Tạo giải đấu</h1>
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
              <input type="checkbox" id="switch" className={styles.switch__input} />
              <label
                for="switch"
                className={styles.switch}
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
            <div className={styles.createTournament_row1}>
              <div className={styles.createTournament_img}>
                <h1 className={styles.createTournament_img_title}>Hình giải đấu</h1>
                <div>
                  <input
                    type="file"
                    id="file_imgCreateTournament"
                    accept="image/*"
                    name="imgTournament"
                    onChange={onChangeHandler}
                    className={styles.file_imgCreateTournament}
                  />
                  <label
                    htmlFor="file_imgCreateTournament"
                    className={styles.createTournament_img_detail}
                  >
                    <img
                      style={{
                        width: 120,
                        margin: "auto",
                      }}
                      src={
                        imgTournament.value == ""
                          ? "assets/img/createteam/camera.png"
                          : imgTournament.img
                      }
                      alt="camera"
                    />

                    <p className={styles.btnUploadImg_createTournament}>
                      Tải ảnh lên{" "}
                      <i
                        style={{
                          marginLeft: 10,
                        }}
                        className="fa-solid fa-upload"
                      ></i>
                    </p>
                  </label>

                  {/* <input type="file" /> */}
                </div>
              </div>
              <div className={styles.createTournament_row1_col2}>
                <div className={styles.nameTournament}>
                  <label
                    htmlFor="createTour"
                    className={styles.createTournament_img_title}
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
                <div className={styles.lengthTeam}>
                  <label
                    htmlFor="select_lengthTeam"
                    className={styles.createTournament_img_title}
                  >
                    Số đội tham gia
                  </label>

                  <input
                    className={styles.select_lengthTeam}
                    id="select_lengthTeam"
                    name="teamPaticipate"
                    value={teamPaticipate.value}
                    placeholder="Nhập số đội tham gia"
                    onChange={onChangeHandler}
                    required
                  />
                </div>

                <div className={styles.typeFootballField}>
                  <label className={styles.createTournament_img_title}>
                    Loại sân thi đấu
                  </label>
                  <select
                    className={styles.select_typeFootballField}
                    onChange={onChangeHandler}
                    value={typeFootballField.value}
                    name="typeFootballField"
                  >
                    <option value="1">Sân thi đấu bóng đá 5</option>
                    <option value="2">Sân thi đấu bóng đá 7</option>
                    <option value="4">Sân thi đấu bóng đá 11</option>
                  </select>
                </div>
                <div>
                  <label
                    className={styles.createTournament_img_title}
                    htmlFor="genderteam"
                  >
                    Giới tính đội
                  </label>
                  <select
                    name="gender"
                    value={gender.value}
                    onChange={onChangeHandler}
                    id="genderteam"
                    className={styles.timeCloseRegister_input}
                    required
                  >
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                  </select>
                </div>
              </div>

              <div className={styles.createTournament_row1_col3}>
                <div className={styles.timeStart}>
                  <label
                    className={styles.createTournament_img_title}
                    htmlFor="startTime"
                  >
                    Ngày bắt đầu
                  </label>
                  <input
                    className={styles.timeStart_input}
                    id="startTime"
                    type="datetime-local"
                    name="startTime"
                    value={startTime.value}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className={styles.timeEnd}>
                  <label
                    htmlFor="endTime"
                    className={styles.createTournament_img_title}
                  >
                    Ngày kết thúc
                  </label>
                  <input
                    className={styles.timeEnd_input}
                    id="endTime"
                    type="datetime-local"
                    name="endTime"
                    value={endTime.value}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className={styles.timeDuration}>
                  <label
                    className={styles.createTournament_img_title}
                    htmlFor="timeDuration"
                  >
                    Thời gian thi đấu mỗi trận
                  </label>
                  <select
                    className={styles.select_typeFootballField}
                    id="timeDuration"
                    onChange={onChangeHandler}
                    value={timeDuration.value}
                    name="timeDuration"
                  >
                    <option value="15">15p</option>
                    <option value="30">30p</option>
                    <option value="45">45p</option>
                  </select>
                </div>
                {status === 0 ? (
                  <div className={styles.timeCloseRegister}>
                    <label
                      htmlFor="timeCloseRegister"
                      className={styles.createTournament_img_title}
                    >
                      Ngày đóng đăng ký tham gia
                    </label>
                    <input
                      className={styles.timeCloseRegister_input}
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
              </div>
            </div>
            <CompetitionFormat
              competitionFormat={competitionFormat}
              onChangeHandler={onChangeHandler}
            />

            <div className={styles.createTournament_row4}>
              <div className={styles.createTournament_row4_col1}>
                <div className={styles.mininum_member}>
                  <label
                    htmlFor="mininum_member"
                    className={styles.createTournament_img_title}
                  >
                    Số cầu thủ tối thiểu mỗi đội
                  </label>
                  <input
                    id="mininum_member"
                    className={styles.mininum_member_input}
                    type="number"
                    min={5}
                    name="minimunPlayerInTournament"
                    value={minimunPlayerInTournament.value}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className={styles.contactPhone}>
                  <label
                    htmlFor="phoneContact"
                    className={styles.createTournament_img_title}
                  >
                    Số điện thoại liên lạc
                  </label>
                  <input
                    type="text"
                    id="phoneContact"
                    className={styles.phoneContact}
                    placeholder="Số điện thoại"
                    name="phoneContact"
                    value={phoneContact.value}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className={styles.description_tournament}>
                  <label
                    htmlFor="description"
                    className={styles.createTournament_img_title}
                  >
                    Mô tả
                  </label>
                  {/* <textarea
                  placeholder="Mô tả về giải đấu"
                  
                /> */}
                  <div className={styles.descTeam}>
                    <Description
                      editorState={editorState}
                      setEditorState={setEditorState}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.createTournament_row4_col2}>
                <div className={styles.fieldSoccer}>
                  {provice != null ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 65,
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
                        onChange={onChangeHandler}
                      >
                        <option selected disabled>
                          Chọn thành phố
                        </option>
                        {provice.map((item, index) => {
                          return (
                            <option value={item.name} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : null}

                  {districts != null ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 65,
                      }}
                    >
                      <label
                        className={styles.createTournament_img_title}
                        htmlFor="districts"
                      >
                        Quận/Huyện
                      </label>
                      <select
                        style={{
                          padding: "10px 5px",
                        }}
                        name="districts"
                        onChange={onChangeHandler}
                      >
                        <option selected disabled>
                          Chọn quận
                        </option>
                        {districts.map((item, index) => {
                          return (
                            <option value={item.name} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : null}

                  {wards != null ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 65,
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
                        className={styles.wards}
                        onChange={onChangeHandler}
                      >
                        <option selected disabled>
                          Chọn phường
                        </option>
                        {wards.map((item, index) => {
                          return (
                            <option value={item.name} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : null}
                  <div>
                    <label
                      className={styles.createTournament_img_title}
                      htmlFor="fieldSoccer"
                    >
                      Địa điểm
                    </label>
                    <input
                      id="fieldSoccer"
                      className={styles.fieldSoccer_input}
                      placeholder="Nhập địa chỉ"
                      name="footballField"
                      value={footballField.value}
                      onChange={onChangeHandler}

                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.btn_nextPage}>
              <input type="submit" className={styles.btn_Next} value="Tiếp theo" />
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
