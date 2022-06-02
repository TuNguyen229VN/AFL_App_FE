import React, {useState, useEffect} from 'react'
import "./styles/style.css";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
function CommentTournamentDetail() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const { idTour } = useParams();
  const [comment, setComment] = useState();
  const [pageIndex, setPageIndex] = useState(1);
  const [numPage,setNumPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [content,setContent] = useState("");
  const [contentError, setContentError] = useState("");
  const [contentEdit, setContentEdit] = useState("");
  const [edit, setEdit] = useState(0);
  const [deletePop,setDeletePop] = useState(false);
  const [contentEditError,setContentEditError] = useState("");
  const [deleteId, setDeleteId] = useState(0);
   const getComment = async (created) => {
     try {
      let numOfContent = limit;
      const response = await axios.get(`https://afootballleague.ddns.net/api/v1/Comment?tounamentID=${idTour}&pageIndex=1&limit=${numOfContent}`);
      setNumPage(Math.ceil(response.data.countList/5));
      setComment(response.data)
     }
     catch (err) {
       console.log(err);
     }
   }
let navigate = useNavigate();
   useEffect(() => {  
    getComment();  
  },[]);
  console.log(comment);
  useEffect(() => {
    getComment();
  },[limit])
 
  const createComment = async () => {
    try {
    
      if(user == null){
        navigate("../Login");
      }
      if(content == null || content ==""){
        setContentError("Vui lòng nhập bình luận...");
        return;
      }
      const data ={
        content :content,
        status:"",
        tournamentId: idTour,
        userId: user.userVM.id
      } 
      const response = await axios.post(`https://afootballleague.ddns.net/api/v1/Comment?tournamentID=${idTour}`,data,{
        headers:{
          "Content-Type": "application/json",
        }
      })
      setContent("");
      setContentError("");
      await getComment();
    }catch (err) {
      console.log(err);
    }
  }

  const updateComment = async(id) => {
    try {
      if(contentEdit == null || contentEdit ==""){
        setContentError("Vui lòng nhập bình luận...");
        return;
      }
      const data ={
        id: id,
        content :contentEdit,
        status:"",
      } 
      const response = await axios.put(`https://afootballleague.ddns.net/api/v1/Comment`,data,{
        headers:{
          "Content-Type": "application/json",
        }
      });
      setEdit(0);
      setContentEdit("");
      setContentEditError("");
      await getComment();
    }catch (err) {
      console.log(err);
    }
  }

  const deleteComment = async (id)=>{
    try{
      const response = await axios.delete(`https://afootballleague.ddns.net/api/v1/Comment?id=${id}`);
      setDeletePop(false);
      setDeleteId(0);
      await getComment();
    }
    catch (err) {
      console.log(err);
    }
  }
  const formatDate = (date) => {
    const myArr = date.split("T");
      const day = myArr[0].split("-").reverse();
       return day.join("/");
  }
  const formatTime = (date) => {
    const myArr = date.split("T");
      const day = myArr[1].split(".");
       return day[0];
  }
  return (
    <> 
        <div className="teamdetail__content cmtTeam">
          {deletePop&&<div className="deleteShadow"></div>}
          <h3 className="cmtTeam__title">Bình luận </h3>
          <div className="totalcmt">
            <p className="number">{comment&&comment.countList} bình luận</p>
            <div className="sort">
              Sắp xếp theo
              <select>
                <option>Mới nhất</option>
                <option>Cũ nhất</option>
              </select>
            </div>
          </div>
          <form className="cmtInput">
            <textarea onChange={e =>{setContent(e.target.value);}} className="content" placeholder="Viết bình luận" value={content} />
            <p className="error">{contentError}</p>
            <button onClick={e =>{createComment(); e.preventDefault()}}>Đăng</button>
          </form>
          <div className="another__cmt">
            {comment&&comment.comments.map(comment =>(<div className="another__content">
            {deletePop&&<div className="deletePopup">
            <h2>Bạn muốn xóa bình luận này ?</h2>
            <div className="btnWrap">
                <button className="btnLoadMore"onClick={e =>{setDeletePop(false); e.preventDefault()}}>Hủy</button>
                <button className="btnLoadMore"onClick={e =>{deleteComment(deleteId); e.preventDefault()}}>Chấp nhận</button>
                </div>
          </div>}
              <img src={comment.user.avatar} alt="dev" />
              <div className="another__info">
              {user&&comment.userId==user.userVM.id?<div className="modifyIcon">
                <img onClick={()=> {setEdit(comment.id);setContentEdit(comment.content);}}className="editIcon" src="/assets/icons/edit.png" alt="edit" />
                <img onClick={()=> {setDeletePop(true); setDeleteId(comment.id)}}className="editIcon" src="/assets/icons/delete.png" alt="edit" />
              </div>:""}
                <p className="name">{comment.user.username}</p>
                {edit!=comment.id&&<p className="content">{comment.content}</p>}
                <form className={`editComment_form ${edit==comment.id&&'active'}`}>
                 <textarea onChange={e =>{setContentEdit(e.target.value);}} className="content" placeholder="Viết bình luận" value={contentEdit} />
                <p className="error">{contentEditError}</p>
                <div className="btnWrap">
                <button className="btnLoadMore"onClick={e =>{setEdit(0);  e.preventDefault()}}>Hủy</button>
                <button className="btnLoadMore"onClick={e =>{updateComment(comment.id); e.preventDefault()}}>Hoàn tất</button>
                </div>
                  </form>
                <p className="time">{formatDate(comment.dateCreate)} {formatTime(comment.dateCreate)}</p>
              </div>
            </div>))}
            {pageIndex<numPage?<button className="btnLoadMore" onClick={e =>{setPageIndex(pageIndex => pageIndex+1);
              setLimit(limit => limit+5);getComment();  e.preventDefault();}}>Xem Thêm</button>:""}
          </div>
        </div>
    </>
  )
}

export default CommentTournamentDetail