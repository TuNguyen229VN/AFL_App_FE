import React, { useEffect, useState } from "react";
import "./styles/style.css";
function ButtonTop() {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [visible]);
  return (
    <div className="ButtonTop">
      <button onClick={scrollToTop} className={`button_scroll ${visible}`}>
        <img src="/assets/icons/btnTop.png" alt="arrow" />
      </button>
    </div>
  );
}

export default ButtonTop;
