import React from 'react';

import styles from "../styles/Tablet.loader.module.css"
function TabletLoader() {
  return (
    <div className={styles._tablet_loader_container}>
      loading...
      <div className={`${styles._tablet_loader_sector} ${styles._tablet_loader_sector_red}`}></div>
      <div className={`${styles._tablet_loader_sector} ${styles._tablet_loader_sector_blue}`}></div>
      <div className={`${styles._tablet_loader_sector} ${styles._tablet_loader_sector_green}`}></div>
    </div>
  );
}

export default TabletLoader;