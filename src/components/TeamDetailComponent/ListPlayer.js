import React, {useEffect, useState} from "react";
import "./styles/style.css";
import {getAPI} from "../../api/index"
import AddPlayer from "./AddPlayer";
import Loading from "../LoadingComponent/Loading"
function ListPlayer(props) {
  const {id,gender} = props;
  const [loading,setLoading] = useState(true);
  const [playerInTeam,setPlayerInTeam] = useState(null)
  useEffect(() => {
    getListPlayerInTeamByIdTeam();
  },[])

  const getListPlayerInTeamByIdTeam =  () => {
    const afterURL = `PlayerInTeam?teamId=${id}&pageIndex=1&limit=5`
    const response = getAPI(afterURL);
    response.then(res => {
      
      setLoading(false);
    }).catch(err => {
      console.error(err)
    })
  }

  // const getPlayerById =  async (idPlayer) => {
  //   const afterURL = `football-players/${idPlayer}`;
  //   const response =  await getAPI(afterURL);
  //   return response.data;
  // }
  return (
    <> 
      <div className="teamdetail__content listPlayer">
        <h3 className="listPlayer__title">Danh sách thành viên</h3>
        <div style={{
          display: "flex",
          justifyContent: "right",
          marginTop: 30
        }}>
       
        <AddPlayer id={id} gender={gender} />
        </div>
        {loading ? <Loading /> : 
        
        <div>
        <h2 className="listPlayer__total">Có thành viên</h2>
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
        </div>
        </div>}
        
        
      </div>
    </>
  );
}
export default ListPlayer;
