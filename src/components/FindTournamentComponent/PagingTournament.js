import React from "react";
import styles from "./TournamentFind.module.css";
import ReactPaginate from "react-paginate";
const PagingTournament = (props) => {
  // const handlePageClick = (data) => {
  //   setNumberPage=data.selected+1;
  //   console.log(setNumberPage)
  // };
  return (
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
        pageCount={105}
        marginPagesDisplayed={3}
        onPageChange={()=>props.setNumberPage(1)}
        pageLinkClassName={styles.pagelink}
        previousLinkClassName={styles.pagelink}
        nextLinkClassName={styles.pagelink}
        breakClassName={styles.pageItem}
        breakLinkClassName={styles.pagelink}
        pageRangeDisplayed={2}
      />
      {/* <ul className="pagination">
        <li className={styles.pageItem}>
          <a className={styles.pagelink} href="#">
            Trang trước
          </a>
        </li>
        <li className={`${styles.pageItem} ${styles.active}`}>
          <a className={styles.pagelink} href="#">
            1
          </a>
        </li>
        <li className={styles.pageItem}>
          <a className={styles.pagelink} href="#">
            2
          </a>
        </li>
        <li className={styles.pageItem}>
          <a className={styles.pagelink} href="#">
            3
          </a>
        </li>
        <li className={`${styles.pageItem}`}>
          <a className={styles.pagelink} href="#">
            ...
          </a>
        </li>
        <li className={styles.pageItem}>
          <a className={styles.pagelink} href="#">
            Trang tiếp
          </a>
        </li>
      </ul> */}
    </nav>
  );
};

export default PagingTournament;
