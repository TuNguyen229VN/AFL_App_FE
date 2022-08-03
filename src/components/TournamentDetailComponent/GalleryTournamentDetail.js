import React, { useEffect, useState } from "react";
import "./styles/style.css";
import { ImageGroup, Image } from "react-fullscreen-image";
import { useParams } from "react-router-dom";
import LoadingAction from "../LoadingComponent/LoadingAction";
import { toast } from "react-toastify";
import axios from "axios";
import { getAPI } from "../../api";
import ReactPaginate from "react-paginate";
function GalleryTournamentDetail(data) {
  const {tourDetail} = data;
  
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [popupConfirmDelete, setPopupConfirmDelete] = useState(false);
  const [popupCreateImage, setPopupCreateImage] = useState(false);
  const { idTour } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setselectedImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [check, setCheck] = useState(false);
  const [count, setCount] = useState(0);
  const [countList, setCountList] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberPage, setNumberPage] = useState(0);
  const [images, setimages] = useState([]);
  const [idItem, setIdItem] = useState("");
  const getImages = (currentPage) => {
    setLoading(true);
    let afterDefaultURL = null;
    afterDefaultURL = `images?tournament-id=${idTour}&order-type=DESC&status=true&page-offset=${currentPage}&limit=10`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setimages(res.data.images);
        setCountList(res.data.countList);
        setCount(res.data.countList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    setNumberPage(data.selected);
    getImages(data.selected + 1);
    setCheck(!check);
  };

  useEffect(() => {
    getImages(currentPage);
  }, [check, currentPage]);

  const deleteImages = async (id) => {
    console.log(numberPage);
    try {
      const response = await axios.delete(
        `https://afootballleague.ddns.net/api/v1/images/${id}`
      );
      if (response.status === 200) {
        setPopupConfirmDelete(false);
        if (currentPage >= 2 && images.length === 1) {
          setCurrentPage(currentPage - 1);
          setNumberPage(numberPage - 1);
        }
        setCheck(!check);
        setLoading(false);
        toast.success("Xóa hình ảnh thành công", {
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

  const addImages = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (selectedImages.length === 0) {
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
    try {
      for (let i = 0; i < selectedFile.length; i++) {
        console.log(selectedFile[i]);
        const response = await axios.post(
          "https://afootballleague.ddns.net/api/v1/images",
          {
            file: selectedFile[i],
            tournamentId: idTour,
          },
          {
            headers: { "content-type": "multipart/form-data" },
          }
        );
        if (response.status === 201) {
          if (selectedFile[i] === selectedFile[selectedFile.length - 1]) {
            setselectedImages([]);
            setSelectedFile([]);
            setPopupCreateImage(false);
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
        }
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

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    const imagesArrayFile = selectedFilesArray.map((file) => {
      return file;
    });
    setSelectedFile(imagesArrayFile);
    setselectedImages(imagesArray);
  };
  return (
    <>
      {loading ? <LoadingAction /> : null}
      <div
        className={
          popupCreateImage || popupConfirmDelete ? `overlay active` : "active"
        }
        onClick={() => {
          setPopupCreateImage(false);
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
              deleteImages(idItem);
            }}
          >
            Xóa
          </button>
        </div>
      </div>
      <form
        className={popupCreateImage ? "popup__news1 active" : "popup__news1"}
        onSubmit={addImages}
      >
        <div className="close" onClick={() => setPopupCreateImage(false)}>
          X
        </div>
        <h4>Thêm hình ảnh</h4>
        <div className="hihi exo">
          <label htmlFor="image">
            <i class="fa-solid fa-image"></i>
            <span>Chọn hình</span>
          </label>
          <div className="img__list">
            {selectedImages &&
              selectedImages.map((image, index) => (
                <div className="img" key={index}>
                  <i
                    class="fa-solid fa-x"
                    onClick={() => {
                      setselectedImages(
                        selectedImages.filter((e) => e !== image)
                      );
                      setSelectedFile(selectedFile.filter((e) => e !== image));
                    }}
                  ></i>
                  <img src={image} alt={index} />
                </div>
              ))}
          </div>
        </div>
        <input
          type="file"
          id="image"
          multiple
          accept="image/*"
          name="imageU"
          onChange={onSelectFile}
        />
        <button>Đăng</button>
      </form>
      <div className="teamdetail__content gallery__tour cmtTeam">
        <h2 className="title">Hình Ảnh</h2>
        {user !== null ? (
          <>
            {user.userVM.id === data.idTour && tourDetail.status === true && tourDetail.statusTnm !== "Kết thúc" ? (
              <div className="cmtInput">
                <button
                  className="thongbao__btn"
                  onClick={() => setPopupCreateImage(true)}
                >
                  Đăng hình ảnh mới
                </button>
              </div>
            ) : null}
          </>
        ) : null}
        {images.length !== 0 ? (
          <ImageGroup>
            <ul className="images">
              {images.map((i) => (
                <li key={i}>
                  {user !== null && user.userVM.id === data.idTour ? (
                    <i
                      className="fa-solid fa-x"
                      onClick={() => {
                        setIdItem(i.id);
                        setPopupConfirmDelete(true);
                      }}
                    ></i>
                  ) : null}
                  <Image src={i.imageURL} alt="mountains" />
                </li>
              ))}
            </ul>
          </ImageGroup>
        ) : (
          <p className="baivietnull">Giải đấu chưa có hình ảnh </p>
        )}
        <ReactPaginate
          previousLabel={"Trang trước"}
          nextLabel={"Trang sau"}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="pageItem"
          nextClassName="pageItem"
          previousClassName="pageItem"
          breakLabel={"..."}
          pageCount={Math.ceil(count / 10)}
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

export default GalleryTournamentDetail;
