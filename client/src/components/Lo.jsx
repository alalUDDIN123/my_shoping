import React from 'react';
import styles from "../styles/lo.module.css"

function Lo() {
  return (
    <div className={styles._Single_loader_wrapper}>
      <div className={styles._Single_loader_container}>
        <div className={`${styles._Single_loader_sector} ${styles._Single_loader_sector_red}`}></div>
        <div className={`${styles._Single_loader_sector} ${styles._Single_loader_sector_blue}`}></div>
        <div className={`${styles._Single_loader_sector} ${styles._Single_loader_sector_green}`}></div>
        <div className={`${styles._Single_loader_sector} ${styles._Single_loader_sector_yellow}`}></div>
        <div className={`${styles._Single_loader_sector} ${styles._Single_loader_sector_pink}`}></div>
        <div className={`${styles._Single_loader_sector} ${styles._Single_loader_sector_purple}`}></div>
        <div className={`${styles._Single_loader_sector} ${styles._Single_loader_sector_cyan}`}></div>
        <div className={`${styles._Single_loader_sector} ${styles._Single_loader_sector_orange}`}></div>
      </div>
      <div className={styles.loader_text}>Loading...</div>
    </div>
  );
}

export default Lo;
