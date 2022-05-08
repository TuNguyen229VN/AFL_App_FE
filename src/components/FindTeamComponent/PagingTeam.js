import React from "react";
import styles from "./TeamFind.module.css";

const PagingTeam = () => {
  return (
    <nav aria-label="Page navigation example" className={styles.pagingTournament}>
      <ul className="pagination">
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
      </ul>
    </nav>
  );
};

export default PagingTeam;
