import React, { useState,useEffect } from "react";
import "./styles/style.css";
// import { Bracket, RoundProps } from "react-brackets";
import { Link } from "react-router-dom";
import {getTeamInMatchByTourId} from "../../api/TeamInMatchAPI"
import LoadingAction from "../LoadingComponent/LoadingAction"

  
// const rounds: RoundProps[] = [
//   {
//     title: "Vòng tứ kết",
//     seeds: [
//       {
//         id: 1,
//         date: new Date().toDateString(),
//         teams: [{ name: "Đội A" }, { name: "Đội B" }],
//       },
//       {
//         id: 2,
//         date: new Date().toDateString(),
//         teams: [{ name: "Đội C" }, { name: "Đội D" }],
//       },
//       {
//         id: 3,
//         date: new Date().toDateString(),
//         teams: [{ name: "Đội A" }, { name: "Đội B" }],
//       },
//       {
//         id: 4,
//         date: new Date().toDateString(),
//         teams: [{ name: "Đội C" }, { name: "Đội D" }],
//       },

//     ],
//   },
//   {
//     title: "Vòng bán kết",
//     seeds: [
//       {
//         id: 3,
//         date: new Date().toDateString(),
//         teams: [{ name: "Đội A" }, { name: "Đội B" }],
//       },
//       {
//         id: 4,
//         date: new Date().toDateString(),
//         teams: [{ name: "Đội C" }, { name: "Đội D" }],
//       },
//     ],
//   },
//   {
//     title: "Vòng chung kết",
//     seeds: [
//       {
//         id: 3,
//         date: new Date().toDateString(),
//         teams: [{ name: "Đội A" }, { name: "Đội B" }],
//       },
//     ],
//   },
// ];
function ScheduleTournamentDetail(props) {
  const {tourDetailId} = props;
  const [loading,setLoading] = useState(false);
  const [active, setactive] = useState(true);
  const [allTeamA,setAllTeamA] = useState(null);
  const [allTeamB,setAllTeamB] = useState(null);
  useEffect(() => {
    getAllTeamInMatch();
  },[tourDetailId])
  const getAllTeamInMatch = () => {
    setLoading(true);
    const response = getTeamInMatchByTourId(tourDetailId);
    response.then(res =>{
      if(res.status === 200){
        const allMatch = res.data.teamsInMatch;
        const teamB = [];
        const teamA = allMatch.reduce((accumulator,currentValue) => {
          if(currentValue.id % 2 === 1){
             accumulator.push(currentValue);
          }else{
            teamB.push(currentValue)
          }
          return accumulator
        },[])
        setAllTeamA(teamA);
        setAllTeamB(teamB);
        setLoading(false);
      }
    }).catch(err => {
      setAllTeamA(null);
        setAllTeamB(null);
      setLoading(false);
    })
      
  
  }
  return (
    <>
      <div className="teamdetail__content schedule__tour">
        <div className="wrap__title">
          <h2 className="title">Lịch thi đấu</h2>
          <div className="option__view">
            <p
              className={active ? "active" : ""}
              onClick={() => {
                setactive(true);
              }}
            >
              Danh sách
            </p>
            <p
              className={!active ? "active" : ""}
              onClick={() => {
                setactive(false);
              }}
            >
              Biểu đồ
            </p>
          </div>
        </div>
        {active ? (
          <div className="wrap__table">
            <table className="schedule__table">
              <tr>
                <th colSpan={5}>Bảng đấu vòng tròn</th>
              </tr>
             
              {loading ? <LoadingAction /> : allTeamA != null && allTeamB != null ? 
               allTeamA.map((item,index) => {
                 return <tr>
               
                 <td>20-11-2021 11h30</td>
                 {/* <td>{index + 1}</td> */}
                 <td>
                   {item.teamName}
                   <img
                     src="/assets/img/homepage/banner1.jpg"
                     alt="gallery_item"
                   />
                 </td>
                 <td>
                   <span className="score">{item.teamScore}</span>
                   <span className="score"> - </span>
                   <span className="score">{allTeamB[index].teamScore}</span>
                 </td>
                 <td>
                   <img
                     src="/assets/img/homepage/banner1.jpg"
                     alt="gallery_item"
                   />
                   {allTeamB[index].teamName}
                 </td>
                 <td>
                   {" "}
                   <Link to={`/match/${item.match.id}/matchDetail`}>Chi tiết</Link>
                 </td>
               </tr>
               }) : <p style={{
                 padding: 20,
                 fontSize: 24,
                 fontWeight: 700,
                 color: "red"
               }}>Hệ thống chưa xếp lịch thi đấu cho giải này</p>}
              
            </table>
            {/* <table className="schedule__table">
              <tr>
                <th colSpan={5}>Bảng A</th>
              </tr>
              <tr>
                <td>20-11-2021 12:12</td>
                <td>
                  Đội A
                  <img
                    src="/assets/img/homepage/banner1.jpg"
                    alt="gallery_item"
                  />
                </td>
                <td>
                  <span className="score">1</span>
                  <span className="score"> - </span>
                  <span className="score">0</span>
                </td>
                <td>
                  <img
                    src="/assets/img/homepage/banner1.jpg"
                    alt="gallery_item"
                  />
                  Đội B{" "}
                </td>
                <td>
                  {" "}
                  <Link to={`/match/1/matchDetail`}>Chi tiết</Link>
                </td>
              </tr>
              <tr>
                <td>20-11-2021 11:22</td>
                <td>
                  Đội A
                  <img
                    src="/assets/img/homepage/banner1.jpg"
                    alt="gallery_item"
                  />
                </td>
                <td>
                  <span className="score">0</span>
                  <span className="score"> - </span>
                  <span className="score">0</span>
                </td>
                <td>
                  <img
                    src="/assets/img/homepage/banner1.jpg"
                    alt="gallery_item"
                  />
                  Đội B{" "}
                </td>
                <td>
                  {" "}
                  <Link to={`/match/1/matchDetail`}>Chi tiết</Link>
                </td>
              </tr>
            </table> */}
          </div>
        ) : (
          // <div className="round">
          //   <Bracket rounds={rounds} />;
          // </div>
          null
        )}
      </div>
    </>
  );
}

export default ScheduleTournamentDetail;
