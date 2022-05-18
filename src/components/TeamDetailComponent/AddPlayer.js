import React, { useState } from "react";
import { postAPI } from "../../api/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const AddPlayer = (props) => {
  const [hideShow, setHideShow] = useState(false)
  let navigate = useNavigate();
  const [imgPlayer, setImgPlayer] = useState({
    value: "",
    img: null,
    error: null,
  });
  const [emailPlayer, setEmailPlayer] = useState({
    value: "",
    error: null,
  });
  const [namePlayer, setNamePlayer] = useState({
    value: "",
    error: null,
  });
  const [DOBPlayer, setDOBPlayer] = useState({
    value: "",
    error: null,
  });
  const [phonePlayer, setPhonePlayer] = useState({
    value: "",
    error: null,
  });
  const [btnActive,setBtnActive] = useState(false)
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const validate =validateForm(name,value);
    if(validate.flag){
      setBtnActive(true);
    }else{
      setBtnActive(false);
    }
    switch (name) {
      case "imgPlayer":
        setImgPlayer({
          value: e.target.files[0],
          img: URL.createObjectURL(e.target.files[0]),
          error: validate.content
        });
        break;
      case "emailPlayer":
        setEmailPlayer({
          ...emailPlayer,
          value,
          error: validate.content
        });

        break;
      case "namePlayer":
        setNamePlayer({
          ...namePlayer,
          value,
          error: validate.content
        });

        break;
      case "DOBPlayer":
        
        setDOBPlayer({
          ...DOBPlayer,
          value,
          error: validate.content
        });
        break;
      default:
        setPhonePlayer({
          ...phonePlayer,
          value,
          error: validate.content
        });

        break;
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const afterDefaultURL = `football-players`;
    const birthday = DOBPlayer.value.split("/");
    const data = {
      email: emailPlayer.value,
      playername: namePlayer.value,
      gender: props.gender,
      dateOfBirth: birthday[1] + "/" + birthday[0] + "/" + birthday[2],
      playerAvatar: imgPlayer.value,
      phone: phonePlayer.value,
      status: true,
    };
    const response = postAPI(afterDefaultURL, data, true);
    response
      .then((res) => {
        if (res.status === 201) {
          savePlayerInTeam(res.data.id);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(err)
      });
  };
  const savePlayerInTeam = (idPlayer) => {
    const afterDefaultURL = `PlayerInTeam`;
    const data = {
      teamId: props.id,
      footballPlayerId: idPlayer,
    };
    const response = postAPI(afterDefaultURL, data, false);
    response
      .then((res) => {
        if (res.status === 201) {
          //resetStateForm();
          toast.success("Thêm cầu thủ vào đội bóng thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setHideShow(false)
          // navigate(`/teamDetail/${props.id}/inforTeamDetail`);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Thêm cầu thủ vào đội bóng thất bại", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const validateForm = (name,value) => {
    
    switch (name) {
      case "imgPlayer":
        break;
      case "emailPlayer":
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
      case "namePlayer":
        if (value.length === 0) {
          return {
            flag: false,
            content: "Không được để trống",
          };
        } else if (/\d+/.test(value)) {
          return {
            flag: false,
            content: "Tên cầu thủ là chữ",
          };
        }
        break;
      case "DOBPlayer":
       
        if (value.length === 0) {
          
          return {
            flag: false,
            content: "Không được để trống",
          };
        } else if (!/(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/.test(value)) {
          return {
            flag: false,
            content: "Sai định dạng ngày sinh",
          };
        }
        break;
      default:
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
    }

    return { flag: true, content: null };
  }
  const resetStateForm = () => {
    const initialState = {
      value: "",
      error: null,
    };
    setImgPlayer(initialState);
    setEmailPlayer(initialState);
    setNamePlayer(initialState);
    setDOBPlayer(initialState);
    setPhonePlayer(initialState);
    setBtnActive(false);
    setHideShow(false)
  };
  //const gender = props.gender;
  return (
    <div>
     <div className={hideShow?"overlay active":"overlay"} ></div>
      <button
        type="button"
        class="btn btn-primary"
        style={{
          padding: 10,
        }}
        onClick={()=>{setHideShow(true)}}
      >
        Thêm thành viên
      </button>

      <div
        className={hideShow?"popup__player active":"popup__player"}
        id="exampleModal"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Tạo mới cầu thủ
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  resetStateForm()
                }}
              ></button>
            </div>
            <form onSubmit={onSubmitHandler}>
              <div style={{
                height: 540
              }} class="modal-body">
                <div className="add_img">
                  <label htmlFor="email">Hình ảnh cầu thủ</label>
                  <input
                      type="file"
                      accept="image/*"
                      id="imgPlayer"
                      onChange={onChangeHandler}
                      
                      name="imgPlayer"
                      style={{
                        display: "none",
                      }}
                    />
                 
                    <label htmlFor="imgPlayer" className="add_img_detail">
                      <div style={{
                        width: "50%",
                        height: "50%",
                        overflow: "hidden",
                        marginLeft: "110px",
                        marginTop: "30px",
                        marginBottom: "30px"
                      }}>
                      {imgPlayer.img != null ? <img  style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                      }} src={imgPlayer.img} /> : null}
                      </div>
                      
                    <p className="add_img_detail_btn">
                      Tải ảnh lên{" "}
                      <i
                        style={{
                          marginLeft: 10,
                        }}
                        className="fa-solid fa-upload"
                      ></i>
                    </p>
                    </label>
                    
                  
                </div>
                <div className="add_infor">
                  <div className="detail_info">
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline"
                    }}>
                    <label htmlFor="email">Email cầu thủ</label>
                    {emailPlayer.error != null ? <p style={{
                      fontWeight: 700,
                      fontSize: 20,
                      color: "red"
                    }}>{emailPlayer.error}</p> : <p></p>}
                    </div>
                    
                    <input
                      id="email"
                      type="text"
                      placeholder="Nhập email cầu thủ"
                      autoComplete="true"
                      name="emailPlayer"
                      value={emailPlayer.value}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div className="detail_info">
                  <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline"
                    }}>
                    <label htmlFor="name">Tên cầu thủ</label>
                    {namePlayer.error != null ? <p style={{
                      fontWeight: 700,
                      fontSize: 20,
                      color: "red"
                    }}>{namePlayer.error}</p> : <p></p>}
                    </div>
                    
                    <input
                      id="name"
                      name="namePlayer"
                      value={namePlayer.value}
                      type="text"
                      placeholder="Nhập tên cầu thủ"
                      autoComplete="true"
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div className="detail_info">
                    <label htmlFor="gender">Giới tính cầu thủ</label>
                    <input
                      id="gender"
                      type="text"
                      value={props.gender === "Male" ? "Nam" : "Nữ"}
                      disabled
                    />
                  </div>
                  <div className="detail_info">
                  <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline"
                    }}>
                    <label htmlFor="DOB">Ngày sinh cầu thủ (VD: 14/05/2000)</label>
                    {DOBPlayer.error != null ? <p style={{
                      fontWeight: 700,
                      fontSize: 20,
                      color: "red"
                    }}>{DOBPlayer.error}</p> : <p></p>}
                    </div>
                  
                    
                    <input
                      id="DOB"
                      name="DOBPlayer"
                      value={DOBPlayer.value}
                      type="text"
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div className="detail_info">
                  <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline"
                    }}>
                    <label htmlFor="phoneContact">Số điện thoại cầu thủ</label>
                    {phonePlayer.error != null ? <p style={{
                      fontWeight: 700,
                      fontSize: 20,
                      color: "red"
                    }}>{phonePlayer.error}</p> : <p></p>}
                    </div>
                    
                    <input
                      id="phoneContact"
                      type="text"
                      name="phonePlayer"
                      value={phonePlayer.value}
                      autoComplete="true"
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  style={{
                    padding: 10,
                  }}
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={resetStateForm}
                >
                  Hủy tạo
                </button>
                {btnActive ? <button
                  style={{
                    padding: 10,
                  }}
                  type="submit"
                  class="btn btn-primary"
                  data-backdrop="false"
                >
                  Thêm cầu thủ
                </button> : null }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlayer;
