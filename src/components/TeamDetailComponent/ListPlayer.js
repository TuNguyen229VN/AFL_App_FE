import React, { useEffect, useState } from "react";
import "./styles/style.css";
import { getAPI, postAPI } from "../../api/index";
import { toast } from "react-toastify";
import AddPlayer from "./AddPlayer";
import Loading from "../LoadingComponent/Loading";
import {addFootballPlayer} from "../../api/FootballPlayer";
import {addPlayerInTeamAPI} from "../../api/PlayerInTeamAPI";
import ReactPaginate from "react-paginate";
import styles from "../FindTeamComponent/TeamFind.module.css";
function ListPlayer(props) {
  const { id, gender } = props;
  const [loading, setLoading] = useState(true);
  const [playerInTeam, setPlayerInTeam] = useState(null);
  const [addPlayerComplete,setAddPlayerComplete] = useState(false);
  const [namePlayer,setNamePlayer] = useState("");
  const [count,setCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  useEffect(() => {
    getListPlayerInTeamByIdTeam();
  }, [addPlayerComplete,currentPage,namePlayer]);

  const getListPlayerInTeamByIdTeam = async () => {
    setLoading(true);
    
    const afterURL = `PlayerInTeam?teamId=${id}&name=${namePlayer}&pageIndex=${currentPage}&limit=8`;
    const response = await getAPI(afterURL);
    console.log(response)
    setCount(response.data.countList);
    const ids = namePlayer === "" ? response.data.playerInTeams : response.data.playerInTeamsFull;
    const players = ids.map(async (player) => {
      const playerResponse = await getPlayerById(player.footballPlayerId);
      return playerResponse;
    });
    const playersData = await Promise.all(players);
    setPlayerInTeam(playersData);
    setLoading(false);
  };    

  const getPlayerById = async (idPlayer) => {
    const afterURL = `football-players/${idPlayer}`;
    const response = await getAPI(afterURL);
    return response.data;
  };
  const handlePageClick = (data) =>  {
     setCurrentPage(data.selected + 1);
  }
  const addPlayerInListPlayer = (data) => {
    const response = addFootballPlayer(data);
    // postAPI(url, data, true);
    response
      .then((res) => {
        if (res.status === 201) {
          
          const add = addPlayerInTeam(res.data.id);
          console.log(add);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(err)
      });
  };
  const addPlayerInTeam = (idPlayer) => {
    const data = {
      "teamId": props.id,
      "footballPlayerId": idPlayer
    }
    const response = addPlayerInTeamAPI(data);
;
    response
      .then((res) => {
        if (res.status === 201) {
          //resetStateForm();
          setAddPlayerComplete(true);
          toast.success("Thêm cầu thủ vào đội bóng thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          
          // navigate(`/teamDetail/${props.id}/inforTeamDetail`);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Thêm cầu thủ vào đội bóng thất bại", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const onClickAddPlayer = () => {
    setAddPlayerComplete(false);
  }
  const onHandleChange = (e) => {
    const {name,value} = e.target;
    setNamePlayer(value);
  }
  return (
    <>
      <div className="teamdetail__content listPlayer">
        <h3 className="listPlayer__title">Danh sách thành viên</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginTop: 30,
          }}
        >
          <AddPlayer id={id} gender={gender} addPlayerInListPlayer={addPlayerInListPlayer} onClickAddPlayer={onClickAddPlayer} />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h2 className="listPlayer__total">
              Có {count} thành viên
            </h2>
            <div>
              <div>
                  <label htmlFor="namePlayer" style={{
                    fontWeight: 700,
                    marginBottom: 30,
                    fontSize: 16
                  }}>Tìm kiếm cầu thủ theo tên: </label>
                  <input style={{
                    marginLeft:20,
                    padding:"5px 10px",
                    width: 300
                  }} placeholder="Tên cầu thủ" value={namePlayer} id="namePlayer" name="namePlayer"  onChange={onHandleChange} />
              </div>
              <div className="listPlayer__list">
                {playerInTeam.map((item, index) => {
                  return (
                    <div key={index} className="listPlayer__item">
                      <div className="avt">
                        <img src={item.playerAvatar} alt="dev" />
                      </div>
                      <div className="des">
                        <p className="namePlayer">
                          <span>Tên:</span>
                          {item.playername}
                        </p>
                        <p className="genderPlayer">
                          <span>Giới tính:</span>
                          {item.gender === "Male" ? "Name" : "Nữ"}
                        </p>
                        <p className="mailPlayer">
                          <span>Email:</span>
                          {item.email}
                        </p>
                        <p className="phonePlayer">
                          <span>Sdt:</span>
                          {item.phone}
                        </p>
                        <p className="dobPlayer">
                          <span>Ngày sinh:</span>
                          {item.dateOfBirth}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <nav
        aria-label="Page navigation example"
        className={styles.pagingTournament}
      >
        <ReactPaginate
          previousLabel={"Trang trước"}
          nextLabel={"Trang sau"}
          containerClassName="pagination"
          activeClassName={styles.active}
          pageClassName={styles.pageItem}
          nextClassName={styles.pageItem}
          previousClassName={styles.pageItem}
          breakLabel={"..."}
          pageCount={Math.ceil(count / 8)}
          marginPagesDisplayed={3}
          onPageChange={handlePageClick}
          pageLinkClassName={styles.pagelink}
          previousLinkClassName={styles.pagelink}
          nextLinkClassName={styles.pagelink}
          breakClassName={styles.pageItem}
          breakLinkClassName={styles.pagelink}
          pageRangeDisplayed={2}
        />
      </nav>
      </div>
    </>
  );
}
export default ListPlayer;
