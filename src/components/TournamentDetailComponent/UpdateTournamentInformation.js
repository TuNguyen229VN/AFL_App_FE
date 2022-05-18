// import React, {useState,useEffect} from "react";
// import {useLocation} from 'react-router-dom';
// import {getTournamentById} from "../../api/TournamentAPI"
// import Loading from "../LoadingComponent/Loading"
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { EditorState, convertToRaw } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
// import styles from "../CreateTournament/styles/style.css";




// const UpdateTournamentInformation = () => {
//     const location = useLocation();
//     const idTournament = location.state.id;
//     const [team,setTeam] = useState(null);
//     const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const descriptionText = draftToHtml(
//     convertToRaw(editorState.getCurrentContent())
//   );
//     const [loading,setLoading] = useState(false);
//     const getInforTournamentById = async() => {
//         const response = await getTournamentById(idTournament);
//         if(response.status === 200){
//             setTeam(response.data);
//             setLoading(true);
//         }
//     }

//     const onChangeHandler = (e) => {

//     }

//     useEffect(() => {
//         getInforTournamentById();
//     },[])
    
//     return(
//         <div className="">
//             <Header/>
//             {!loading ? <Loading /> : 
//             <div className={styles.createTournament}>
//             <div className={styles.createTournament_info}>
//               <div>
//                 <div>
//                   <h1 className={styles.createTournament_title}>Tạo giải đấu</h1>
//                   <hr
//                     width={100}
//                     size={10}
//                     style={{
//                       backgroundColor: "black",
//                       opacity: 1,
//                     }}
//                   />
//                 </div>
//                 <div
//                   style={{
//                     marginTop: 30,
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <input
//                     type="checkbox"
//                     id="switch"
//                     className={styles.switch__input}
//                   />
//                   <label
//                     for="switch"
//                     className={styles.switch}
//                   />
//                   <p
//                     style={{
//                       marginLeft: 10,
//                     }}
//                   >
//                     Chế độ {status === 0 ? "công khai" : "riêng tư"}
//                   </p>
//                 </div>
//               </div>
//               <form onSubmit={onSubmitHandler}>
//                 <div className={styles.createTournament_row1}>
//                   <div className={styles.createTournament_img}>
//                     <h1 className={styles.createTournament_img_title}>
//                       Hình giải đấu
//                     </h1>
//                     <div>
//                       <input
//                         type="file"
//                         id="file_imgCreateTournament"
//                         accept="image/*"
//                         name="imgTournament"
//                         onChange={onChangeHandler}
//                         className={styles.file_imgCreateTournament}
//                       />
//                       <label
//                         htmlFor="file_imgCreateTournament"
//                         className={styles.createTournament_img_detail}
//                       >
//                         <img
//                           style={{
//                             width: 120,
//                             margin: "auto",
//                           }}
//                           src={
//                             imgTournament.value === ""
//                               ? "assets/img/createteam/camera.png"
//                               : imgTournament.img
//                           }
//                           alt="camera"
//                         />
    
//                         <p className={styles.btnUploadImg_createTournament}>
//                           Tải ảnh lên{" "}
//                           <i
//                             style={{
//                               marginLeft: 10,
//                             }}
//                             className="fa-solid fa-upload"
//                           ></i>
//                         </p>
//                       </label>
    
//                       {/* <input type="file" /> */}
//                     </div>
//                   </div>
//                   <div className={styles.createTournament_row1_col2}>
//                     <div className={styles.nameTournament}>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "baseline",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <label
//                           htmlFor="createTour"
//                           className={styles.createTournament_img_title}
//                         >
//                           Tên giải đấu
//                         </label>
//                         {nameTournament.error != null ? 
//                         <p
//                         style={{
//                           color: "red",
//                           fontWeight: 900,
//                           fontSize: 18,
//                         }}
//                       >
//                         {nameTournament.error}
//                       </p> : <p></p>}
//                       </div>
    
//                       <input
//                         id="createTour"
//                         placeholder="Tên giải đấu"
//                         onChange={onChangeHandler}
//                         name="nameTournament"
//                         value={nameTournament.value}
//                         required
//                       />
//                     </div>
//                     <div className={styles.lengthTeam}>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "baseline",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <label
//                           htmlFor="select_lengthTeam"
//                           className={styles.createTournament_img_title}
//                         >
//                           Số đội tham gia
//                         </label>
//                         {teamPaticipate.error != null ? 
//                         <p
//                         style={{
//                           color: "red",
//                           fontWeight: 900,
//                           fontSize: 18,
//                         }}
//                       >
//                         {teamPaticipate.error}
//                       </p> : <p></p>}
//                       </div>
    
//                       <input
//                         className={styles.select_lengthTeam}
//                         id="select_lengthTeam"
//                         name="teamPaticipate"
//                         value={teamPaticipate.value}
//                         placeholder="Nhập số đội tham gia"
//                         onChange={onChangeHandler}
//                         required
//                       />
//                     </div>
    
//                     <div className={styles.typeFootballField}>
//                       <label className={styles.createTournament_img_title}>
//                         Loại sân thi đấu
//                       </label>
//                       <select
//                         className={styles.select_typeFootballField}
//                         onChange={onChangeHandler}
                        
//                         name="typeFootballField"
//                       >
//                         <option value="Field5">Sân thi đấu bóng đá 5</option>
//                         <option value="Field7">Sân thi đấu bóng đá 7</option>
//                         <option value="Field11">Sân thi đấu bóng đá 11</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label
//                         className={styles.createTournament_img_title}
//                         htmlFor="genderteam"
//                       >
//                         Giới tính đội
//                       </label>
//                       <select
//                         name="gender"
//                         value={gender.value}
//                         onChange={onChangeHandler}
//                         id="genderteam"
//                         className={styles.timeCloseRegister_input}
//                         required
//                       >
//                         <option value="Male">Nam</option>
//                         <option value="Female">Nữ</option>
//                       </select>
//                     </div>
//                   </div>
    
//                   <div className={styles.createTournament_row1_col3}>
//                   {status === 0 ? (
//                       <div className={styles.timeCloseRegister}>
//                         <div
//                         style={{
//                           display: "flex",
//                           alignItems: "baseline",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <label
//                           htmlFor="timeCloseRegister"
//                           className={styles.createTournament_img_title}
//                         >
//                           Ngày đóng đăng ký tham gia
//                         </label>
//                         {closeRegister.error != null ? 
//                         <p
//                         style={{
//                           color: "red",
//                           fontWeight: 900,
//                           fontSize: 18,
//                         }}
//                       >
//                         {closeRegister.error}
//                       </p> : <p></p>}
//                       </div>
//                         <input
//                           className={styles.timeCloseRegister_input}
//                           id="timeCloseRegister"
//                           type="datetime-local"
//                           name="closeRegister"
//                           value={closeRegister.value}
//                           onChange={onChangeHandler}
//                           min={new Date().toISOString().split(".")[0]}
//                           required
//                         />
//                       </div>
//                     ) : (
//                       <div
//                         style={{
//                           height: 70,
//                         }}
//                       ></div>
//                     )}
//                     {status === 0 ?
//                       closeRegister.value != null ? 
//                         <div className={styles.timeStart}>
//                       <div
//                           style={{
//                             display: "flex",
//                             alignItems: "baseline",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                            <label
//                           className={styles.createTournament_img_title}
//                           htmlFor="startTime"
//                         >
//                           Ngày bắt đầu
//                         </label>
//                         {startTime.error != null ? 
//                           <p
//                           style={{
//                             color: "red",
//                             fontWeight: 900,
//                             fontSize: 18,
//                           }}
//                         >
//                           {startTime.error}
//                         </p> : <p></p>}
//                         </div>
                       
//                         <input
//                           className={styles.timeStart_input}
//                           id="startTime"
//                           type="datetime-local"
//                           name="startTime"
//                           value={startTime.value}
//                           min={closeRegister.value}
//                           onChange={onChangeHandler}
//                         />
//                       </div> : <div style={{
//                         height: 70
//                       }}>
//                       </div>
//                     :
//                     <div className={styles.timeStart}>
//                     <div
//                         style={{
//                           display: "flex",
//                           alignItems: "baseline",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                          <label
//                         className={styles.createTournament_img_title}
//                         htmlFor="startTime"
//                       >
//                         Ngày bắt đầu
//                       </label>
//                       {startTime.error != null ? 
//                         <p
//                         style={{
//                           color: "red",
//                           fontWeight: 900,
//                           fontSize: 18,
//                         }}
//                       >
//                         {startTime.error}
//                       </p> : <p></p>}
//                       </div>
//                       <input
//                         className={styles.timeStart_input}
//                         id="startTime"
//                         type="datetime-local"
//                         name="startTime"
//                         value={startTime.value}
//                         onChange={onChangeHandler}
                        
//                       />
//                     </div>
//                     }
                    
                    
//                     {startTime.value != null ? 
//                     <div className={styles.timeEnd}>
//                     <div
//                         style={{
//                           display: "flex",
//                           alignItems: "baseline",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                          <label
//                         htmlFor="endTime"
//                         className={styles.createTournament_img_title}
//                       >
//                         Ngày kết thúc
//                       </label>
//                       {endTime.error != null ? 
//                         <p
//                         style={{
//                           color: "red",
//                           fontWeight: 900,
//                           fontSize: 18,
//                         }}
//                       >
//                         {endTime.error}
//                       </p> : <p></p>}
//                       </div>
                     
//                       <input
//                         className={styles.timeEnd_input}
//                         id="endTime"
//                         type="datetime-local"
//                         name="endTime"
//                         value={endTime.value}
//                         onChange={onChangeHandler}
//                         min={startTime.value}
//                       />
//                     </div> : 
//                    <div
//                    style={{
//                      height: 70,
//                    }}
//                  ></div>}
//                     <div className={styles.timeDuration}>
//                       <label
//                         className={styles.createTournament_img_title}
//                         htmlFor="timeDuration"
//                       >
//                         Thời gian thi đấu mỗi trận
//                       </label>
//                       <select
//                         className={styles.select_typeFootballField}
//                         id="timeDuration"
//                         onChange={onChangeHandler}
//                         value={timeDuration.value}
//                         name="timeDuration"
//                       >
//                         <option value="15">15p</option>
//                         <option value="30">30p</option>
//                         <option value="45">45p</option>
//                       </select>
//                     </div>
    
//                   </div>
//                 </div>
//                 <CompetitionFormat
//                   competitionFormat={competitionFormat}
//                   onChangeHandler={onChangeHandler}
//                 />
    
//                 <div className={styles.createTournament_row4}>
//                   <div className={styles.createTournament_row4_col1}>
//                     <div className={styles.mininum_member}>
//                     <div
//                         style={{
//                           display: "flex",
//                           alignItems: "baseline",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                                           <label
//                         htmlFor="mininum_member"
//                         className={styles.createTournament_img_title}
//                       >
//                         Số cầu thủ tối thiểu mỗi đội
//                       </label>
//                         {minimunPlayerInTournament.error != null ? 
//                         <p
//                         style={{
//                           color: "red",
//                           fontWeight: 900,
//                           fontSize: 18,
//                         }}
//                       >
//                         {minimunPlayerInTournament.error}
//                       </p> : <p></p>}
//                       </div>
//                       <input
//                         id="mininum_member"
//                         className={styles.mininum_member_input}
//                         type="number"
//                         min={5}
//                         name="minimunPlayerInTournament"
//                         value={minimunPlayerInTournament.value}
//                         onChange={onChangeHandler}
//                       />
//                     </div>
    
//                     <div className={styles.contactPhone}>
//                     <div
//                         style={{
//                           display: "flex",
//                           alignItems: "baseline",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <label
//                         htmlFor="phoneContact"
//                         className={styles.createTournament_img_title}
//                       >
//                         Số điện thoại liên lạc
//                       </label>
//                         {phoneContact.error != null ? 
//                         <p
//                         style={{
//                           color: "red",
//                           fontWeight: 900,
//                           fontSize: 18,
//                         }}
//                       >
//                         {phoneContact.error}
//                       </p> : <p></p>}
//                       </div>
                      
//                       <input
//                         type="text"
//                         id="phoneContact"
//                         className={styles.phoneContact}
//                         placeholder="Số điện thoại"
//                         name="phoneContact"
//                         value={phoneContact.value}
//                         onChange={onChangeHandler}
//                       />
//                     </div>
    
//                     <div className={styles.description_tournament}>
//                       <label
//                         htmlFor="description"
//                         className={styles.createTournament_img_title}
//                       >
//                         Mô tả
//                       </label>
//                       {/* <textarea
//                       placeholder="Mô tả về giải đấu"
                      
//                     /> */}
//                       <div className={styles.descTeam}>
//                         {/* <Description
//                           editorState={editorState}
//                           setEditorState={setEditorState}
//                         /> */}
//                       </div>
//                     </div>
//                   </div>
//                   <div className={styles.createTournament_row4_col2}>
//                     <div className={styles.fieldSoccer}>
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           marginBottom: 65,
//                           width: "100%",
//                         }}
//                       >
//                         <label
//                           className={styles.createTournament_img_title}
//                           htmlFor="provice"
//                         >
//                           Thành phố/Tỉnh{" "}
//                         </label>
//                         <select
//                           style={{
//                             padding: "10px 5px",
//                           }}
//                           name="provice"
//                           onChange={onChangeHandler}
//                         >
//                           <option selected disabled>
//                             Chọn thành phố
//                           </option>
                          
//                         </select>
//                       </div>
    
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           marginBottom: 65,
//                           width: "100%",
//                         }}
//                       >
//                         <label
//                           className={styles.createTournament_img_title}
//                           htmlFor="districts"
//                         >
//                           Quận/Huyện
//                         </label>
//                         <select
//                           style={{
//                             padding: "10px 5px",
//                           }}
//                           name="districts"
//                           onChange={onChangeHandler}
//                         >
//                           <option selected disabled>
//                             Chọn quận
//                           </option>
                          
//                         </select>
//                       </div>
    
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           marginBottom: 65,
//                           width: "100%",
//                         }}
//                       >
//                         <label
//                           className={styles.createTournament_img_title}
//                           htmlFor="wards"
//                         >
//                           Phường/Xã
//                         </label>
//                         <select
//                           style={{
//                             padding: "10px 5px",
//                           }}
//                           name="wards"
//                           onChange={onChangeHandler}
//                         >
//                           <option selected disabled>
//                             Chọn phường
//                           </option>
                          
//                         </select>
//                       </div>
    
//                       <div>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "baseline",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                          <label
//                           className={styles.createTournament_img_title}
//                           htmlFor="fieldSoccer"
//                         >
//                           Địa điểm
//                         </label>
                        
//                         <p
//                         style={{
//                           color: "red",
//                           fontWeight: 900,
//                           fontSize: 18,
//                         }}
//                       >
                        
//                       </p> 
//                       </div>
                       
//                         <input
//                           id="fieldSoccer"
//                           className={styles.fieldSoccer_input}
//                           placeholder="Nhập địa chỉ"
//                           name="footballField"
//                           value=""
//                           onChange={onChangeHandler}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className={styles.btn_nextPage}>
//                   <input
//                     type="submit"
//                     className={styles.btn_Next}
//                     value="Tiếp theo"
//                   /> 
//                 </div>
//               </form>
//             </div>
//           </div>
            
//             }
//             <Footer />
//         </div>
//     )

// }


// export default UpdateTournamentInformation;