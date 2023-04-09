import React from 'react';

import styles from "../styles/mobile.loader.module.css"
function MobileLoader() {
  return (
    <div className={styles._mobile_loader_container}>
      loading...
      <div className={`${styles._mobile_loader_sector} ${styles._mobile_loader_sector_red}`}></div>
      <div className={`${styles._mobile_loader_sector} ${styles._mobile_loader_sector_blue}`}></div>
      <div className={`${styles._mobile_loader_sector} ${styles._mobile_loader_sector_green}`}></div>
    </div>
  );
}

export default MobileLoader;