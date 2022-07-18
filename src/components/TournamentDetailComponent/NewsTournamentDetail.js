import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getAPI } from "../../api";
import LoadingAction from "../LoadingComponent/LoadingAction";
import ReactPaginate from "react-paginate";
function NewsTournamentDetail(data,props) {
  const {allTeam,postNotificationforTeamManager} = data;
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const { idTour } = useParams();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({ value: "", error: "" });
  const [img, setImage] = useState({
    value: "",
    error: "",
    img: "",
  });
  
  const [contentUpdate, setContentUpdate] = useState({ value: "", error: "" });
  const [imgUpdate, setImageUpdate] = useState({
    value: "",
    error: "",
    img: "",
  });

  const [idNews, setIdNews] = useState("");
  const [idItem, setIdItem] = useState("");
  const [popupConfirmDelete, setPopupConfirmDelete] = useState(false);
  const [popupCreateNews, setPopupCreateNews] = useState(false);
  const [popupUpdateNews, setPopupUpdateNews] = useState(false);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [numberPage, setNumberPage] = useState(0);
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const [countList, setCountList] = useState(0);
  const [orderType, setOrderType] = useState("DESC");
  const [news, setNews] = useState([]);
  const [sizePage, setSizePage] = useState(0);
  const [viewMoreOption, setViewMoreOption] = useState({
    index: "0",
    check: false,
  });
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    setNumberPage(data.selected);
    getNews(data.selected + 1);
    setCheck(!check);
  };

  useEffect(() => {
    getNews(currentPage);
  }, [check, currentPage]);

  const getNews = (currentPage) => {
    setLoading(true);
    let afterDefaultURL = null;
    afterDefaultURL = `news?tournament-id=${idTour}&order-by=Id&order-type=${orderType}&status=true&page-offset=${currentPage}&limit=3`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setNews(res.data.news);
        setCountList(res.data.countList);
        setCount(res.data.countList);
        setSizePage(res.data.size);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const addNews = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (content.value === null || content.value === "") {
      toast.error("Không được để trống", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }
    const data = {
      content: content.value,
      newsImage: img.value,
      tournamentId: idTour,
    };
    try {
      const response = await axios.post(
        "https://afootballleague.ddns.net/api/v1/news",
        data,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      if (response.status === 201) {
        for(const item of allTeam){
          await postNotificationforTeamManager(item.id,idTour,item.id,"news")
        }
        setImage({ value: "", img: "", error: "" });
        setContent({ value: "", error: "" });
        setPopupCreateNews(false);
        setLoading(false);
        setCheck(!check);
        toast.success("Đăng bài thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };

  const updateNews = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (contentUpdate.value === null || contentUpdate.value === "") {
      toast.error("Không được để trống", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }
    const data = {
      id: idNews,
      content: contentUpdate.value,
      newsImage: imgUpdate.value,
      tournamentId: idTour,
    };
    try {
      const response = await axios.put(
        "https://afootballleague.ddns.net/api/v1/news",
        data,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        setViewMoreOption({
          check: !viewMoreOption.check,
        });
        setPopupUpdateNews(false);
        setLoading(false);
        setCheck(!check);
        toast.success("Chỉnh sửa thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };

  const validateForm = (name, value) => {
    switch (name) {
      case "img":
        break;
      case "imgU":
        break;
      case "content":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        }
        break;
      case "contentU":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        }
        break;
      default:
        break;
    }

    return { flag: true, content: null };
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const flagValid = validateForm(name, value);
    switch (name) {
      case "imageA":
        const valueImg = URL.createObjectURL(e.target.files[0]);
        setImage({
          ...img,
          img: valueImg,
          value: e.target.files[0],
        });
        break;
      case "content":
        let content = null;
        if (flagValid.flag === false) {
          content = {
            value,
            error: flagValid.content,
          };
        } else {
          content = {
            value,
            error: null,
          };
        }
        setContent({
          ...content,
        });
        break;
      case "imageU":
        const valueImgU = URL.createObjectURL(e.target.files[0]);
        setImageUpdate({
          ...imgUpdate,
          img: valueImgU,
          value: e.target.files[0],
        });
        break;
      case "contentU":
        let contentU = null;
        if (flagValid.flag === false) {
          contentU = {
            value,
            error: flagValid.content,
          };
        } else {
          contentU = {
            value,
            error: null,
          };
        }
        setContentUpdate({
          ...contentU,
        });
        break;
      case "SORT":
        let ordertype = null;
        if (value === "timeDesc") {
          ordertype = "ASC";
        } else if (value === "timeIns") {
          ordertype = "DESC";
        }
        setOrderType(ordertype);
        getNews(currentPage);
        setSort(value === "default" ? "" : value);
        break;
      default:
        break;
    }
  };

  const deleteNews = async (id) => {
    try {
      const response = await axios.delete(
        `https://afootballleague.ddns.net/api/v1/news/${id}`
      );
      if (response.status === 200) {
        setPopupConfirmDelete(false);
        setViewMoreOption({
          check: !viewMoreOption.check,
        });
        if (currentPage >= 2 && news.length === 1) {
          setCurrentPage(currentPage - 1);
          setNumberPage(numberPage - 1);
        }
        setCheck(!check);
        setLoading(false);
        toast.success("Xóa bài viết thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };

  const formatDateTime = (date) => {
    const day = new Date(date);
    return (
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear() +
      " " +
      String(day.getHours()).padStart(2, "0") +
      ":" +
      String(day.getMinutes()).padStart(2, "0")
    );
  };
  return (
    <>
      {loading ? <LoadingAction /> : null}
      <div
        className={
          popupCreateNews || popupUpdateNews || popupConfirmDelete
            ? `overlay active`
            : "active"
        }
        onClick={() => {
          setPopupCreateNews(false);
          setPopupUpdateNews(false);
          setPopupConfirmDelete(false);
        }}
      ></div>
      <div
        className={
          popupConfirmDelete ? "deleteConfirm active" : "deleteConfirm"
        }
      >
        <h3>Xác nhận xóa hình ảnh này</h3>
        <div className="buttonConfirm">
          <button
            className="cancel"
            onClick={() => setPopupConfirmDelete(false)}
          >
            Hủy
          </button>
          <button
            className="confirm"
            onClick={(e) => {
              e.preventDefault();
              deleteNews(idItem);
            }}
          >
            Xóa
          </button>
        </div>
      </div>
      <form
        className={popupUpdateNews ? "popup__news active" : "popup__news"}
        onSubmit={updateNews}
      >
        <div className="close" onClick={() => setPopupUpdateNews(false)}>
          X
        </div>
        <h4>Chỉnh sửa bài viết</h4>
        <textarea
          placeholder="Nhập nội dung"
          className="content"
          name="contentU"
          autoComplete="off"
          value={contentUpdate.value}
          onChange={onChangeHandler}
        />
        <p className="error">{content.error}</p>
        <div className="hihi">
          <label htmlFor="image">
            <i class="fa-solid fa-image"></i>
            <span>Chọn hình</span>
          </label>
          {imgUpdate.value !== "" ? (
            <div className="img">
              <i
                class="fa-solid fa-x"
                onClick={() => {
                  setImageUpdate({ value: "", img: "", error: "" });
                }}
              ></i>
              <img src={imgUpdate.img} alt={imgUpdate.value} />
            </div>
          ) : null}
        </div>
        <input
          type="file"
          id="image"
          accept="image/*"
          name="imageU"
          onChange={onChangeHandler}
        />
        <button>Chỉnh sửa</button>
      </form>
      <form
        className={popupCreateNews ? "popup__news active" : "popup__news"}
        onSubmit={addNews}
      >
        <div className="close" onClick={() => setPopupCreateNews(false)}>
          X
        </div>
        <h4>Tạo bài viết mới</h4>
        <textarea
          placeholder="Nhập nội dung"
          className="content"
          name="content"
          autoComplete="off"
          value={content.value}
          onChange={onChangeHandler}
        />
        <p className="error">{content.error}</p>
        <div className="hihi">
          <label htmlFor="imageA">
            <i class="fa-solid fa-image"></i>
            <span>Chọn hình</span>
          </label>
          {img.value !== "" ? (
            <div className="img">
              <i
                class="fa-solid fa-x"
                onClick={() => {
                  setImage({ value: "", img: "", error: "" });
                }}
              ></i>
              <img src={img.img} alt={img.value} />
            </div>
          ) : null}
        </div>
        <input
          type="file"
          id="imageA"
          accept="image/*"
          name="imageA"
          onChange={onChangeHandler}
        />
        <button>Đăng</button>
      </form>
      <div className="teamdetail__content cmtTeam">
        <h3 className="cmtTeam__title">Tin tức</h3>
        <div className="totalcmt">
          <p className="number">Có {countList} bài viết</p>
          <div className="sort">
            Sắp xếp theo
            <select onChange={onChangeHandler} value={sort} name="SORT">
              <option value="timeDesc">Mới nhất</option>
              <option value="timeIns">Cũ nhất</option>
            </select>
          </div>
        </div>
        {user !== null ? (
          <>
            {user.userVM.id === data.idTour ? (
              <div className="cmtInput">
                <button
                  className="thongbao__btn"
                  onClick={() => setPopupCreateNews(true)}
                >
                  Tạo tin tức mới
                </button>
              </div>
            ) : null}
          </>
        ) : null}
        <div className="thongbao">
          {news.length !== 0 ? (
            <>
              {news.map((item, index) => (
                <div className="thongbao__item" key={item.id}>
                  <div className="thongbao_top">
                    <h1>Thông báo lúc {formatDateTime(item.dateCreate)}</h1>
                    {user !== null ? (
                      <>
                        {user.userVM.id === data.idTour ? (
                          <>
                            <div
                              className="view__more"
                              onClick={() => {
                                setViewMoreOption({
                                  index: index,
                                  check: !viewMoreOption.check,
                                });
                              }}
                            >
                              <i className="fa-solid fa-ellipsis"></i>
                            </div>
                            <div
                              className={
                                viewMoreOption.index === index &&
                                viewMoreOption.check
                                  ? "option__player active"
                                  : "option__player"
                              }
                            >
                              <p
                                onClick={() => {
                                  setPopupUpdateNews(true);
                                  setContentUpdate({ value: item.content });
                                  setImageUpdate({
                                    value: item.newsImage,
                                    img: item.newsImage,
                                  });
                                  setIdNews(item.id);
                                }}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                                Chỉnh sửa bài viết
                              </p>

                              <p
                                onClick={() => {
                                  setIdItem(item.id);
                                  setPopupConfirmDelete(true);
                                }}
                              >
                                <i class="fa-solid fa-trash"></i>Xóa bài viết
                              </p>
                            </div>
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </div>

                  <div className="thongbao__content">
                    <div className="thongbao__img">
                      <img src={item.newsImage} alt={item.content} />
                    </div>
                    <p>{item.content}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="baivietnull">Chưa có bài viết nào</p>
          )}
        </div>
        <ReactPaginate
          previousLabel={"Trang trước"}
          nextLabel={"Trang sau"}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="pageItem"
          nextClassName="pageItem"
          previousClassName="pageItem"
          breakLabel={"..."}
          pageCount={Math.ceil(count / 3)}
          marginPagesDisplayed={3}
          onPageChange={handlePageClick}
          pageLinkClassName="pagelink"
          previousLinkClassName="pagelink"
          nextLinkClassName="pagelink"
          breakClassName="pageItem"
          breakLinkClassName="pagelink"
          pageRangeDisplayed={2}
          className="pagingTournament"
          forcePage={numberPage}
        />
      </div>
    </>
  );
}

export default NewsTournamentDetail;
