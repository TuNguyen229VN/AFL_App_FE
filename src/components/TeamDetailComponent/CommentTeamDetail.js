import React ,{useState, useEffect} from "react";
import "./styles/style.css";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";

function CommentTeamDetail() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const { idTeam } = useParams();
  const [comment, setComment] = useState();
  const [pageIndex, setPageIndex] = useState(1);
  const [numPage,setNumPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [content,setContent] = useState("");
  const [contentError, setContentError] = useState("");
   const getComment = async () => {
     try {
      console.log("page index" , pageIndex);
      let numOfContent = limit;
      if(pageIndex== numPage){
        
      }
      const response = await axios.get(`https://afootballleague.ddns.net/api/v1/Comment?teamID=${idTeam}&pageIndex=1&limit=${numOfContent}`);
      setNumPage(Math.ceil(response.data.countList/5));    
      setComment( response.data);       
     }
     catch (err) {
       console.log(err);
     }
   }
let navigate = useNavigate();
   useEffect(() => {  
    getComment();  
  },[]);

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
        teamId: idTeam,
        userId: user.userVM.id
      } 
      const response = await axios.post(`https://afootballleague.ddns.net/api/v1/Comment?teamID=${idTeam}`,data,{
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
          <h3 className="cmtTeam__title">Bình luận</h3>
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
              <img src={comment.user.avatar} alt="dev" />
              <div>
                <p className="name">{comment.user.username}</p>
                <p className="content">{comment.content}</p>
                <p className="time">{formatDate(comment.dateCreate)} {formatTime(comment.dateCreate)}</p>
              </div>
            </div>))}
            {pageIndex<numPage?<button className="btnLoadMore" onClick={e =>{setPageIndex(pageIndex => pageIndex+1);
              setLimit(limit => limit+5); getComment();  e.preventDefault();}}>Xem Thêm</button>:""}
          </div>
        </div>
    </>
  );
}

export default CommentTeamDetail;
