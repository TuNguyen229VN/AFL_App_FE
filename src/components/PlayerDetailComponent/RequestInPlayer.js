import React, {useState,useEffect} from "react";

function RequestInPlayer(props) {
  const {active,setactive} = props;
  useEffect(() => {
    setactive("Chờ xét duyệt từ cầu thủ")
  },[])
  return (
    <div>
      <div
      className="schedule__tour"
      style={{
        display: "flex",
        marginTop: 20
        //ustifyContent: "right",
      }}
    >
      <div className="option__view">
        

        <p
          className={active === "Chờ xét duyệt từ cầu thủ" ? "active" : ""}
          onClick={() => {
            setactive("Chờ xét duyệt từ cầu thủ");
            
          }}
        >
          Chờ duyệt
        </p>
        <p
          className={active === "Chờ xét duyệt từ đội bóng" ? "active" : ""}
          onClick={() => {
            setactive("Chờ xét duyệt từ đội bóng");
          }}
        >
          Tham gia
        </p>
      </div>
      
    </div>
    <h1 style={{
      fontSize: 36,
      fontWeight:700,
      marginTop:20,
      marginBottom: 20,
      textAlign: "center"
    }}>Các đội bóng</h1>

    </div>
  );
}

export default RequestInPlayer;
