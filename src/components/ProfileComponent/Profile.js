import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAPI, postAPI, putAPI } from "../../api";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import firebase from "firebase/compat/app";
import useAuthListener from "../../hooks/user_auth";
import "firebase/compat/auth";
function Profile() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [checkGoogle, setCheckGoogle] = useState([]);
  const [myAccount, setMyAccount] = useState([]);
  const { userGG } = useAuthListener();
  const getMyAccount = () => {
    const afterURL = `users/${user.userVM.id}`;
    const response = getAPI(afterURL);
    response
      .then((res) => {
        setEmail({ value: res.data.email });
        setUsername({ value: res.data.username });
        setGender({ value: res.data.gender });
        setDob({
          value: new Date(res.data.dateOfBirth).toISOString().split("T")[0],
        });
        setAvt({ value: res.data.avatar, img: res.data.avatar });
        setAddress({ value: res.data.address });
        setPhone({ value: res.data.phone });
        setBio({ value: res.data.bio });
        setIdentityCard({ value: res.data.identityCard });
        setNameBussiness({ value: res.data.nameBusiness });
        setPhoneBussiness({ value: res.data.phoneBusiness });
        setTinBussiness({ value: res.data.tinbusiness });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMyAccount();
  }, []);

  const [email, setEmail] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({
    value: myAccount.username,
    error: "",
  });
  const [gender, setGender] = useState({
    value: "",
    error: "",
  });
  const [dob, setDob] = useState({ value: "", error: "" });
  const [address, setAddress] = useState({
    value: "",
    error: "",
  });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [avt, setAvt] = useState({
    value: "",
    error: "",
    img: "",
  });
  const [bio, setBio] = useState({ value: "", error: "" });
  const [identityCard, setIdentityCard] = useState({
    value: "",
    error: "",
  });
  const [phoneBussiness, setPhoneBussiness] = useState({
    value: "",
    error: "",
  });
  const [tinbussiness, setTinBussiness] = useState({
    value: "",
    error: "",
  });
  const [nameBussiness, setNameBussiness] = useState({
    value: "",
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
            content: "*Không được để trống",
          };
        } else if (/\d+/.test(value)) {
          return {
            flag: false,
            content: "*Tên bạn là chữ",
          };
        }
        break;
      case "phone":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        } else if (!/^[0-9]+$/.test(value)) {
          return {
            flag: false,
            content: "*Số điện thoại không được là chữ hay kí tự khác",
          };
        } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
          return {
            flag: false,
            content: "*Sai định dạng số điện thoại",
          };
        }

        break;
      case "gender":
        break;
      case "address":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
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
        if (!/^[0-9]+$/.test(value)) {
          return {
            flag: false,
            content: "*Số điện thoại không được là chữ hay kí tự khác",
          };
        } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
          return {
            flag: false,
            content: "*Sai định dạng số điện thoại",
          };
        }
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
    let splitdate = dob.value.split("-");
    let day = parseInt(splitdate[2]) + 1;
    if (username.value.trim() === "" || phone.value.trim() === "") {
      toast.error("Vui lòng kiểm tra lại thông tin", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const data = {
      id: user.userVM.id,
      username: username.value,
      gender: gender.value,
      dateOfBirth: splitdate[0] + "-" + splitdate[1] + "-" + day,
      address: address.value,
      phone: phone.value,
      avatar: avt.value,
      bio: bio.value,
      identityCard: identityCard.value,
      phoneBusiness: phoneBussiness.value,
      nameBusiness: nameBussiness.value,
      tinbusiness: tinbussiness.value,
    };
    try {
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
        window.location.reload();
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
            {userGG ? null : (
              <Link to="/changePassword" className={styles.changePass}>
                Đổi mật khẩu
              </Link>
            )}
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
              {username.error != null ? (
                <p className={styles.error}>{username.error}</p>
              ) : null}
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
              {phone.error != null ? (
                <p className={styles.error}>{phone.error}</p>
              ) : null}
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
                type="date"
                id="dob"
                value={dob.value}
                onChange={onChangeHandler}
                min="1990-01-01"
                placeholder="dd-mm-yyyy"
                max={date}
                name="dob"
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

              <input
                type="text"
                id="codeB"
                autoComplete="off"
                value={tinbussiness.value}
                onChange={onChangeHandler}
                name="codeB"
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="phoneB">Số điện thoại doanh nghiệp</label>
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
        <h2 className={styles.profile__title2}>Nâng cấp tài khoản</h2>
        <span className={styles.note}>
          *Thông tin nếu bạn muốn trở thành người tạo giải
        </span>
        <form
          onSubmit={onSubmitHandler}
          className={`${styles.profile__wrap} ${styles.update}`}
        >
          <div className={styles.profile__text}>
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
              <label htmlFor="codeB">Mã doanh nghiệp</label>{" "}
              <input
                type="text"
                id="codeB"
                autoComplete="off"
                value={tinbussiness.value}
                onChange={onChangeHandler}
                name="codeB"
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="phoneB">Số điện thoại doanh nghiệp</label>
              <input
                type="number"
                id="phoneB"
                autoComplete="off"
                value={phoneBussiness.value}
                onChange={onChangeHandler}
                name="phoneB"
              />
            </div>
            <input type="submit" value="Nâng cấp" className={styles.btnSave} />
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
