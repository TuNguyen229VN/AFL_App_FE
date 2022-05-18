import React from "react";
import styles from "./styles/style.module.css";
function Livestream() {
  return (
    <div className={styles.livestream}>
      <div className={styles.video}>
        <iframe
          width="853"
          height="480"
          src="https://www.youtube.com/embed/oXNj9XxcLaU"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className={styles.comment}>
        <div className={styles.commnet__content}>
          <div className={styles.one__comment}>
            <img src="/assets/img/homepage/pic-2.png" alt="a" />
            <div>
              <p className={styles.name}>Nguyen Van Teo</p>
              <p>
                @Hoàng Quang Đạt gặp mấy team kia dự bị đa số top tank hk ah.
                Đưa Itmins pick carry ngon lắm
              </p>
            </div>
          </div>
          <div className={styles.one__comment}>
            <img src="/assets/img/homepage/pic-1.png" alt="a" />
            <div>
              <p className={styles.name}>Nguyen Van Teo</p>
              <p>
                @Hoàng Quang Đạt gặp mấy team kia dự bị đa số top tank hk ah.
                Đưa Itmins pick carry ngon lắm
              </p>
            </div>
          </div>
        </div>
        <form className={styles.comment__input}>
          <input type="text" placeholder="Nhập bình luận" />
          <button>Gửi</button>
        </form>
      </div>
    </div>
  );
}

export default Livestream;
