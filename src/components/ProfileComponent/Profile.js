import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { postAPI, putAPI } from "../../api";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function Profile() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  console.log(user)
  const [email, setEmail] = useState({ value: user.userVM.email, error: "" });
  const [username, setUsername] = useState({
    value: user.userVM.username,
    error: "",
  });
  const [gender, setGender] = useState({
    value: user.userVM.gender,
    error: "",
  });
  const [dob, setDob] = useState({ value: "2022-05-07T13:57:00", error: "" });
  const [address, setAddress] = useState({
    value: user.userVM.address,
    error: "",
  });
  const [phone, setPhone] = useState({ value: user.userVM.phone, error: "" });
  const [avt, setAvt] = useState({ value: user.userVM.avatar, error: "",img:user.userVM.avatar });
  const [bio, setBio] = useState({ value: user.userVM.bio, error: "" });
  const [identityCard, setIdentityCard] = useState({
    value: user.userVM.identityCard,
    error: "",
  });
  const [phoneBussiness, setPhoneBussiness] = useState({
    value: user.userVM.phoneBusiness,
    error: "",
  });
  const [nameBussiness, setNameBussiness] = useState({
    value: user.userVM.nameBusiness,
    error: "",
  });
  const [tinBussiness, setTinBussiness] = useState({
    value: user.userVM.tinBusiness,
    error: "",
  });

  const validateForm = (name, value) => {
    switch (name) {
      case "avt":
        break;
      case "name":
        if (value.length === 0) {
          return {
            flag: false,
            content: "Không được để trống",
          };
        } else if (/\d+/.test(value)) {
          return {
            flag: false,
            content: "Tên bạn là chữ",
          };
        }
        break;
      case "phone":
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
        break;
      case "address":
        if (value.length === 0) {
          return {
            flag: false,
            content: "Không được để trống",
          };
        }
        break;
      case "dob":
        break;
      case "cmnd":
        break;
      case "nameB":
        break;
      case "phoneB":
        break;
      case "codeB":
        break;
      case "bio":
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
      case "avt":
        const valueImg = URL.createObjectURL(e.target.files[0]);
        setAvt({
          ...avt,
          img: valueImg,
          value: e.target.files[0],
        });
        break;
      case "name":
        let username = null;
        if (flagValid.flag === false) {
          username = {
            value,
            error: flagValid.content,
          };
        } else {
          username = {
            value,
            error: null,
          };
        }
        setUsername({
          ...username,
        });
        break;
      case "phone":
        let phone = null;
        if (flagValid.flag === false) {
          phone = {
            value,
            error: flagValid.content,
          };
        } else {
          phone = {
            value,
            error: null,
          };
        }
        setPhone({
          ...phone,
        });
        break;
      case "gender":
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
      case "address":
        let address = null;
        if (flagValid.flag === false) {
          address = {
            value,
            error: flagValid.content,
          };
        } else {
          address = {
            value,
            error: null,
          };
        }
        setAddress({
          ...address,
        });
        break;
      case "dob":
        let dob = null;
        if (flagValid.flag === false) {
          dob = {
            value,
            error: flagValid.content,
          };
        } else {
          dob = {
            value,
            error: null,
          };
        }
        setDob({
          ...dob,
        });
        break;
      case "cmnd":
        let cmnd = null;
        if (flagValid.flag === false) {
          cmnd = {
            value,
            error: flagValid.content,
          };
        } else {
          cmnd = {
            value,
            error: null,
          };
        }
        setIdentityCard({
          ...cmnd,
        });
        break;
      case "nameB":
        let nameB = null;
        if (flagValid.flag === false) {
          nameB = {
            value,
            error: flagValid.content,
          };
        } else {
          nameB = {
            value,
            error: null,
          };
        }
        setNameBussiness({
          ...nameB,
        });
        break;
      case "codeB":
        let codeB = null;
        if (flagValid.flag === false) {
          codeB = {
            value,
            error: flagValid.content,
          };
        } else {
          codeB = {
            value,
            error: null,
          };
        }
        setTinBussiness({
          ...codeB,
        });
        break;
      case "phoneB":
        let phoneB = null;
        if (flagValid.flag === false) {
          phoneB = {
            value,
            error: flagValid.content,
          };
        } else {
          phoneB = {
            value,
            error: null,
          };
        }
        setPhoneBussiness({
          ...phoneB,
        });
        break;
      case "bio":
        let bio = null;
        if (flagValid.flag === false) {
          bio = {
            value,
            error: flagValid.content,
          };
        } else {
          bio = {
            value,
            error: null,
          };
        }
        setBio({
          ...bio,
        });
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      id: user.userVM.id,
      username: username.value,
      gender: gender.value,
      dateOfBirth: dob.value,
      address: address.value,
      phone: phone.value,
      avatar: avt.value,
      bio: bio.value,
      identityCard: identityCard.value,
      phoneBusiness: phoneBussiness.value,
      nameBusiness: nameBussiness.value,
      tinbusiness: tinBussiness.value,
    };
    try {
      console.log(data)
      const response = await axios.put(
        "https://afootballleague.ddns.net/api/v1/users",
        data,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      if (response.status === 201) {
        toast.success("Cập nhật thành công", {
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
  return (
    <>
      <ScrollToTop />
      <Header />
      <div className={styles.profile}>
        <h2 className={styles.profile__title}>Thông tin cá nhân</h2>
        <form onSubmit={onSubmitHandler} className={styles.profile__wrap}>
          <div className={styles.profile__img}>
            <label htmlFor="avt">
              <img src={avt.img} alt={username.value} />
              <h5>Thay đổi hình đại diện</h5>
            </label>
            <input
              type="file"
              id="avt"
              accept="image/*"
              name="avt"
              onChange={onChangeHandler}
            />
            <div className={styles.email}>{email.value}</div>
            <Link to="" className={styles.changePass}>
              Đổi mật khẩu
            </Link>
          </div>
          <div className={styles.profile__text}>
            <div className={styles.text}>
              <label htmlFor="name">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                value={username.value}
                onChange={onChangeHandler}
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="number"
                id="phone"
                name="phone"
                autoComplete="off"
                value={phone.value}
                onChange={onChangeHandler}
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="gender" autoComplete="off">
                Giới tính
              </label>
              <select id="gender" onChange={onChangeHandler} name="gender">
                <option
                  selected={gender.value === "Male" ? true : false}
                  value="Male"
                >
                  Nam
                </option>
                <option
                  selected={gender.value === "Female" ? true : false}
                  value="Female"
                >
                  Nữ
                </option>
              </select>
            </div>
            <div className={styles.text}>
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                id="address"
                autoComplete="off"
                value={address.value}
                onChange={onChangeHandler}
                name="address"
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="dob" autoComplete="off">
                Ngày sinh
              </label>
              <input
                type="datetime-local"
                id="dob"
                value={dob.value}
                onChange={onChangeHandler}
                min="1990-01-01"
                max={date}
                name="date"
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="cmnd">CMND</label>
              <input
                type="text"
                id="cmnd"
                autoComplete="off"
                value={identityCard.value}
                onChange={onChangeHandler}
                name="cmnd"
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="nameB">Tên doanh nghiệp</label>
              <span>*Thông tin nếu bạn muốn trở thành người tạo giải</span>
              <input
                type="text"
                id="nameB"
                autoComplete="off"
                value={nameBussiness.value}
                onChange={onChangeHandler}
                name="nameB"
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="codeB">Mã doanh nghiệp</label>
              <span>*Thông tin nếu bạn muốn trở thành người tạo giải</span>
              <input
                type="text"
                id="codeB"
                autoComplete="off"
                value={tinBussiness.value}
                onChange={onChangeHandler}
                name="codeB"
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="phoneB">Số điện thoại doanh nghiệp</label>
              <span>*Thông tin nếu bạn muốn trở thành người tạo giải</span>
              <input
                type="number"
                id="phoneB"
                autoComplete="off"
                value={phoneBussiness.value}
                onChange={onChangeHandler}
                name="phoneB"
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="bio">Mô tả </label>
              <textarea
                id="bio"
                value={bio.value}
                onChange={onChangeHandler}
                name="bio"
              />
            </div>
            <input type="submit" value="Lưu" className={styles.btnSave} />
          </div>
        </form>
        <div className={styles.profile__delete}>
          <div className={styles.delete__title}>Xóa tài khoản</div>
          <div className={styles.delete__wrap}>
            <p>
              Hãy nhớ rằng khi xóa tài khoản thì tất cả thông tin về tài khoản,
              giải đấu và đội thi đấu của bạn sẽ bị xóa mà không thể khôi phục
              lại được.
            </p>
            <button>Xóa tài khoản</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
