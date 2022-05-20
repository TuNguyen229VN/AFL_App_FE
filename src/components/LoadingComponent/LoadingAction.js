import React from 'react'
import styles from "./styles/style.module.css"
function LoadingAction() {
  return (
    <div className={styles.loader_wrap}>
        <div className={styles.overlay}></div>
        <div className={styles.loader}>
            <span className={styles.loader_item}></span>
            <span className={styles.loader_item}></span>
            <span className={styles.loader_item}></span>
            <span className={styles.loader_item}></span>
            <span className={styles.loader_item}></span>
            <span className={styles.loader_item}></span>
            <span className={styles.loader_item}></span>
            <span className={styles.loader_item}></span>
            <span className={styles.loader_item}></span>
            <span className={styles.loader_item}></span>
        </div>
    </div>
  )
}

export default LoadingAction