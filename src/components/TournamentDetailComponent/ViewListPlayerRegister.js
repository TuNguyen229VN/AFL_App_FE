import React, { useState, useEffect } from "react";
import { getAllPlayerByTeamIdAPI } from "../../api/PlayerInTeamAPI";
import { getAllPlayerInTournamentByTeamInTournamentIdAPI,deletePlayerInTournamentById } from "../../api/PlayerInTournamentAPI";
import LoadingAction from "../LoadingComponent/LoadingAction";
import RegisterInTournament from "./RegisterInTournament";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
export default function ViewListPlayerRegister(props) {
  const { teamInTournament, setViewList, hideShow, setHideShow ,
    tourDetail,postNotificationforTeamManager,setCheckRegistertour} = props;
  const [playerRegister, setPlayerRegister] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [hideShowAdd,setHideShowAdd] = useState(false);
  const [teamInTourId,setTeamInTourId] = useState();
  useEffect(() => {
    if (teamInTournament != null) {
      getAllPlayerByTeamId();
    }
  }, [teamInTournament]);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const { idTour } = useParams();
  const [deletePop,setDeletePop]= useState(false);
  const [playerId, setPlayerId] = useState();
  const getAllPlayerByTeamId = () => {
    setLoading(true);
    const response = getAllPlayerByTeamIdAPI(teamInTournament.teamId);
    response
      .then((res) => {
        getAllPlayerInTournamentByTeamInTournamentId(
          res.data.playerInTeamsFull
        );
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };
  const getAllPlayerInTournamentByTeamInTournamentId = async (data) => {
    const newPlayerRegister = [];
    const response = await getAllPlayerInTournamentByTeamInTournamentIdAPI(
      teamInTournament.id
    );
   
    if (response.status === 200) {
      for (const item of response.data.playerInTournaments) {
        console.log(item)
        const findNewPlayer = data.find(
          (itemData) => itemData.id === item.playerInTeamId          
        );
        // console.log(item)
        findNewPlayer.playerInTourId = item.id;
        findNewPlayer.clothesNumber = item.clothesNumber;
        newPlayerRegister.push(findNewPlayer);
      }
      setPlayerRegister(newPlayerRegister);
      setLoading(false);
    }
  };

  const deletePlayerInTour =async (id, tourId, teamInTournamentId) => {
    try{
      setLoading(true);
    const response = await deletePlayerInTournamentById(id, tourId, teamInTournamentId);
    toast.success("Xóa cầu thủ khỏi giải thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setDeletePop(false);
    setLoading(false);
  }
    catch(err){
      setLoading(false);
      toast.error(`${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDeletePop(false);
    }
  }

  const DeletePop = () => {
      return(
        <div className="deletePopup" style={{zIndex:100}}>
                    <h2>Bạn muốn xóa cầu thủ này ra khỏi giải ?</h2>
                    <div className="buttonConfirm">
                      <button
                        className="cancel"
                        onClick={(e) => {
                          setDeletePop(false);
                          e.preventDefault();
                        }}
                      >
                        Hủy
                      </button>
                      <button
                        className="confirm"
                        onClick={(e) => {
                          deletePlayerInTour(playerId,idTour,teamInTournament.id) 
                          e.preventDefault();
                        }}
                      >
                        Chấp nhận
                      </button>
                    </div>
                  </div>
      )
  }
  return (
    
    <>
    {deletePop&&<DeletePop />}
    {hideShowAdd&&<RegisterInTournament
                            tourDetail={tourDetail}
                            postNotificationforTeamManager={
                              postNotificationforTeamManager
                            }
                            setCheckRegistertour={setCheckRegistertour}
                            hideShow={hideShowAdd}
                            setHideShow={setHideShowAdd}
                            inTour={true}
                            numPlayer ={playerRegister.length}
                            teamInTournament = {teamInTourId}
                            idUser={
                              user != undefined ? user.userVM.id : undefined
                            }
                          />}
    <div
      id="exampleModal"
      className={hideShow ? "popup__player active" : "popup__player"}
      style={{zIndex: deletePop&&5}}
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Danh sách cầu thủ đăng ký
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setViewList(null);

                setHideShow(false);
              }}
            ></button>
          </div>
          <div class="modal-body">
            <div
              style={{
                width: "73vw",
                height: 350,
                overflowY:
                  playerRegister != null && playerRegister.length > 4
                    ? "scroll"
                    : "hidden",
              }}
            >
              <table
                className="choicePlayerTable"
                style={{
                  width: "72vw",
                }}
                class="table"
              >
                <thead>
                  <tr>
                    <th>STT</th>
                    <th
                      style={{
                        width: "29%",
                      }}
                    >
                      Email
                    </th>
                    <th>Hình Ảnh</th>
                    <th>Tên</th>
                    <th>Số áo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="listFootballPlayerChoice">
                  {playerRegister != null
                    ? playerRegister.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            <td>{index + 1}</td>
                            <td>{item.footballPlayer.idNavigation.email}</td>
                            <td>
                              <img
                                style={{
                                  width: 50,
                                  height: 50,
                                  marginLeft: 10,
                                }}
                                src={item.footballPlayer.playerAvatar}
                              />
                            </td>
                            <td>{item.footballPlayer.playerName}</td>
                            <td>{item.clothesNumber}</td>
                            {user&& user.userVM.id == item.teamId&&<td><button className="btn-delete" onClick={(e) =>{e.preventDefault();
                            setPlayerId(item.playerInTourId); setDeletePop(true)}}>Xóa</button></td>}
                          </tr>
                        );
                      })
                    : null}
            
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
          {user&& teamInTournament&&tourDetail && user.userVM.id == teamInTournament.teamId&&
          playerRegister&& playerRegister.length < tourDetail.footballPlayerMaxNumber &&<button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              style={{
                padding: 10,
              }}
              onClick={() => {
                setViewList(null);
                setHideShow(false);
                setHideShowAdd(true);
                setTeamInTourId(teamInTournament.id);
              }}
            >
              Thêm cầu thủ
            </button>}
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              style={{
                padding: 10,
              }}
              onClick={() => {
                setViewList(null);
                setHideShow(false);
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
      {loading ? <LoadingAction /> : null}
    </div>
    </>
  );
}
