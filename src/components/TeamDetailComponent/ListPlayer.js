import React, {useEffect, useState} from "react";
import "./styles/style.css";
import {getAPI} from "../../api/index"
import AddPlayer from "./AddPlayer";
function ListPlayer(props) {
  const {id,gender} = props;
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    getListPlayerInTeamByIdTeam();
  },[])

  const getListPlayerInTeamByIdTeam = () => {
    const afterURL = `PlayerInTeam?teamId=${id}&pageIndex=1&limit=5`
    const response = getAPI(afterURL);
    response.then(res => {
      console.log(res)
      setLoading(false);
    }).catch(err => {
      console.error(err)
    })
  }
  return (
    <> 
      <div className="teamdetail__content listPlayer">
        <h3 className="listPlayer__title">Danh sách thành viên</h3>
        <div style={{
          display: "flex",
          justifyContent: "right",
          marginTop: 30
        }}>
       
        <AddPlayer gender={gender} />
        </div>
        
        <h2 className="listPlayer__total">Có 30 thành viên</h2>
        <div className="listPlayer__list">
          <div className="listPlayer__item">
            <div className="avt">
            <img src="/assets/img/teamdetail/TNB-48309.jpg" alt="dev" />
            </div>
            <div className="des">
            <p className="namePlayer"><span>Tên:</span>Nguyễn Tú</p>
              <p className="genderPlayer"><span>Giới tính:</span>Nam</p>
              <p className="mailPlayer"><span>Email:</span>tunttse140127@fpt.edu.vn</p>
              <p className="phonePlayer"><span>Sdt:</span>01239312830</p>
              <p className="dobPlayer"><span>Ngày sinh:</span>22-09-2000</p>
            </div>
          </div>
          <div className="listPlayer__item">
            <div className="avt">
            <img src="/assets/img/homepage/pic-1.png" alt="dev" />
            </div>
            <div className="des">
            <p className="namePlayer"><span>Tên:</span>Nguyễn Tú</p>
              <p className="genderPlayer"><span>Giới tính:</span>Nam</p>
              <p className="mailPlayer"><span>Email:</span>tunttse140127@fpt.edu.vn</p>
              <p className="phonePlayer"><span>Sdt:</span>01239312830</p>
              <p className="dobPlayer"><span>Ngày sinh:</span>22-09-2000</p>
            </div>
          </div>
          <div className="listPlayer__item">
            <div className="avt">
            <img src="/assets/img/teamdetail/ronaldo-0642116.jpg" alt="dev" />
            </div>
            <div className="des">
            <p className="namePlayer"><span>Tên:</span>Nguyễn Tú</p>
              <p className="genderPlayer"><span>Giới tính:</span>Nam</p>
              <p className="mailPlayer"><span>Email:</span>tunttse140127@fpt.edu.vn</p>
              <p className="phonePlayer"><span>Sdt:</span>01239312830</p>
              <p className="dobPlayer"><span>Ngày sinh:</span>22-09-2000</p>
            </div>
          </div>
          <div className="listPlayer__item">
            <div className="avt">
            <img src="/assets/img/homepage/pic-2.png" alt="dev" />
            </div>
            <div className="des">
            <p className="namePlayer"><span>Tên:</span>Nguyễn Tú</p>
              <p className="genderPlayer"><span>Giới tính:</span>Nam</p>
              <p className="mailPlayer"><span>Email:</span>tunttse140127@fpt.edu.vn</p>
              <p className="phonePlayer"><span>Sdt:</span>01239312830</p>
              <p className="dobPlayer"><span>Ngày sinh:</span>22-09-2000</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ListPlayer;
