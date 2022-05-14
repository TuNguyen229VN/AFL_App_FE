import React, { useState } from "react";

const AddPlayer = (props) => {
  const { imgPlayer, setImgPlayer } = useState({
    value: "",
    error: null,
  });
  const { emailPlayer, setEmailPlayer } = useState({
    value: "",
    error: null,
  });
  const { namePlayer, setNamePlayer } = useState({
    value: "",
    error: null,
  });
  const { DOBPlayer, setDOBPlayer } = useState({
    value: "",
    error: null,
  });
  const { phonePlayer, setPhonePlayer } = useState({
    value: "",
    error: null,
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    // imgPlayer emailPlayer namePlayer DOBPlayer phonePlayer
    //console.log({name,value})
    switch (name) {
      case "imgPlayer":
        console.log({ name, value });
        break;
      case "emailPlayer":
        console.log({ name, value });
        break;
      case "namePlayer":
        console.log({ name, value });
        break;
      case "DOBPlayer":
        console.log({ name, value });
        break;
      default:
        console.log({ name, value });
        break;
    }
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
            <div class="modal-body">
              <div className="add_img">
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
                    name="emailPlayer"
                    placeholder="Nhập email cầu thủ"
                    autoComplete="true"
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="detail_info">
                  <label htmlFor="name">Tên cầu thủ</label>
                  <input
                    id="name"
                    name="namePlayer"
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
              >
                Hủy tạo
              </button>
              <button
                style={{
                  padding: 10,
                }}
                type="button"
                class="btn btn-primary"
              >
                Thêm cầu thủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlayer;
