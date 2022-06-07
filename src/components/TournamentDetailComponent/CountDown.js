import React, { useEffect, useState } from "react";
import styles from "./styles/style.module.css";
function CountDown(data) {
  const defaultRemainingTime = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  };
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  const updateRemainingTime = (registerEndDate) => {
    const countDate = new Date(registerEndDate).getTime();
    const now = new Date().getTime();
    const gap = countDate - now;
    let secondsVar = 1000;
    let minutesVar = secondsVar * 60;
    let hoursVar = minutesVar * 60;
    let daysVar = hoursVar * 24;
    //   Calculate the shit
    setRemainingTime({
      seconds:
        Math.floor((gap % minutesVar) / secondsVar) < 10
          ? "0" + Math.floor((gap % minutesVar) / secondsVar)
          : Math.floor((gap % minutesVar) / secondsVar),
      minutes:
        Math.floor((gap % hoursVar) / minutesVar) < 10
          ? "0" + Math.floor((gap % hoursVar) / minutesVar)
          : Math.floor((gap % hoursVar) / minutesVar),
      hours:
        Math.floor((gap % daysVar) / hoursVar) < 10
          ? "0" + Math.floor(gap / daysVar)
          : Math.floor(gap / daysVar),
      days:
        Math.floor(gap / daysVar) < 10
          ? "0" + Math.floor(gap / daysVar)
          : Math.floor(gap / daysVar),
    });
    if (gap < 0) {
      setRemainingTime(defaultRemainingTime);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(data.registerEndDate);
    }, 1000);
    return () => clearTimeout(intervalId);
  }, [data.registerEndDate]);

  return (
    <>
      {remainingTime.days!==0&&remainingTime.hours!==0&&remainingTime.minutes!==0&&remainingTime.seconds!==0 ? (
        <div className={styles.countdown}>
          <h3 className={styles.title}>Thời gian đăng ký còn!</h3>
          <div className={styles.countdown_wrap}>
            <div className={styles.countdown__sub}>
              <div className={styles.time}>{remainingTime.days}</div>
              <div className={styles.text}>Ngày</div>
            </div>
            <div className={styles.countdown__sub}>
              <div className={styles.time}>{remainingTime.hours}</div>
              <div className={styles.text}>Giờ</div>
            </div>
            <div className={styles.countdown__sub}>
              <div className={styles.time}>{remainingTime.minutes}</div>
              <div className={styles.text}>Phút</div>
            </div>
            <div className={styles.countdown__sub}>
              <div className={styles.time}>{remainingTime.seconds}</div>
              <div className={styles.text}>Giây</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CountDown;
