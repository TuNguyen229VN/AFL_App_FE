import React, { useState } from "react";
import { postAPI } from "../../api/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const AddPlayer = (props) => {
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
  const [deleteModel,setDeleteModel] = useState(null);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    // imgPlayer emailPlayer namePlayer DOBPlayer phonePlayer
    //console.log({name,value})
    switch (name) {
      case "imgPlayer":
        setImgPlayer({
          ...imgPlayer,
          value: e.target.files[0],
          img: URL.createObjectURL(e.target.files[0]),
        });
        break;
      case "emailPlayer":
        setEmailPlayer({
          ...emailPlayer,
          value,
        });

        break;
      case "namePlayer":
        setNamePlayer({
          ...namePlayer,
          value,
        });

        break;
      case "DOBPlayer":
        setDOBPlayer({
          ...DOBPlayer,
          value,
        });

        break;
      default:
        setPhonePlayer({
          ...phonePlayer,
          value,
        });

        break;
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const afterDefaultURL = `football-players`;
    const data = {
      email: emailPlayer.value,
      playername: namePlayer.value,
      gender: props.gender,
      dateOfBirth: DOBPlayer.value,
      playerAvatar: imgPlayer.value,
      "phone": phonePlayer.value,
      status: true,
    };
    const response = postAPI(afterDefaultURL, data, true);
    response
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data.id);
          savePlayerInTeam(res.data.id);
        }
      })
      .catch((err) => console.error(err));
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
          
          setDeleteModel("modal");
          navigate(`/teamDetail/${props.id}/inforTeamDetail`);
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
  const resetStateForm = () => {
   const initialState = {
     value: "",
     error: null,
   }
   setImgPlayer(initialState);
   setEmailPlayer(initialState);
   setNamePlayer(initialState);
   setDOBPlayer(initialState);
   setPhonePlayer(initialState)
  };
  //const gender = props.gender;
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{
          padding: 10,
        }}
      >
        Thêm thành viên
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
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
              ></button>
            </div>
            <form onSubmit={onSubmitHandler}>
              <div class="modal-body">
                <div className="add_img">
                <label htmlFor="email">Hình ảnh cầu thủ</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onChangeHandler}
                    required
                    name="imgPlayer"
                  />
                </div>
                <div className="add_infor">
                  <div className="detail_info">
                    <label htmlFor="email">Email cầu thủ</label>
                    <input
                      id="email"
                      type="text"
                      placeholder="Nhập email cầu thủ"
                      autoComplete="true"
                      name="emailPlayer"
                      value={emailPlayer.value}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="detail_info">
                    <label htmlFor="name">Tên cầu thủ</label>
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
                    <label htmlFor="DOB">Ngày sinh cầu thủ</label>
                    <input
                      id="DOB"
                      name="DOBPlayer"
                      value={DOBPlayer.value}
                      type="datetime-local"
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div className="detail_info">
                    <label htmlFor="phoneContact">Số điện thoại cầu thủ</label>
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
                <button
                  style={{
                    padding: 10,
                  }}
                  type="submit"
                  class="btn btn-primary"
                  data-backdrop="static`"
                >
                  Thêm cầu thủ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlayer;
