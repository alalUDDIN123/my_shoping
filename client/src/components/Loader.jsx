import React from 'react';

import styles from "../styles/Loader.module.css"
function Loader() {
  return (
    <div className={styles.loader_container}>
      loading...
      <div className={`${styles.loader_sector} ${styles.loader_sector_red}`}></div>
      <div className={`${styles.loader_sector} ${styles.loader_sector_blue}`}></div>
      <div className={`${styles.loader_sector} ${styles.loader_sector_green}`}></div>
    </div>
  );
}

export default Loader;