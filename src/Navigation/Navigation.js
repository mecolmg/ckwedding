import React from "react";
import styles from "./Navigation.module.scss";

function Navigation() {
  return (
    <div className={styles.navigation + " card"}>
      <h1>Colm Gallagher & Katelyn Salvatore</h1>
      <h3>
        <span className={styles.nowrap}>September 26, 2020 |&nbsp;</span>
        <span className={styles.nowrap}>Bluemont, VA</span>
      </h3>
      <div className={styles.menu}>
        {/* eslint-disable-next-line */}
        <a href="#" className={styles.menuItem}>
          About
        </a>
        {/* eslint-disable-next-line */}
        <a href="#" className={styles.menuItem}>
          RSVP
        </a>
        {/* eslint-disable-next-line */}
        <a href="#" className={styles.menuItem}>
          Contact
        </a>
      </div>
    </div>
  );
}

export default Navigation;
