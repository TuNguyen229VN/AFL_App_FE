import React from "react";
import styles from "./styles/style.module.css"
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoft}>
          <a href="# ">
            <img src="/assets/img/homepage/logo.png " alt="logo " />
          </a>
        </div>
        <div className={styles.footer_title}>Amateur Football League</div>
        <div className={styles.footer_slogan}>Dám ước mơ, dám thực hiện</div>
        <div className={styles.socialfoot}>
          <a href="#">
            <img src="/assets/icons/facebook.png" alt="fb" />
          </a>
          <a href="#">
            {" "}
            <img src="/assets/icons/twitter.png" alt="tw" />
          </a>
          <a href="#">
            {" "}
            <img src="/assets/icons/instargram.png" alt="ins" />
          </a>
        </div>
        <div className={styles.copy}>
          © 2022 AFL, Khoa Tu Anh Tam develops, Vinh design, TaiNT supervisor,
          ChamiePham marketing, FPTU Ho Chi Minh urner Broadcasting System, Inc.
          Mọi quyền được bảo lưu. BleacherReport.com là một phần của Bleacher
          Report - Mạng Thể thao Turner, một phần của Mạng Thể thao và Giải trí
          Turner. Bản quyền một số ảnh © 2022 Getty Images. Bất kỳ việc sử dụng
          hoặc phân phối thương mại nào mà không có sự đồng ý bằng văn bản rõ
          ràng của Getty Images đều bị nghiêm cấm.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
