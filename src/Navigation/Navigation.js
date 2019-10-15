import React from "react";
import styles from "./Navigation.module.scss";

function Navigation(props) {
  const classNames =
    styles.navigation + (props.className ? ` ${props.className}` : "");
  return (
    <div className={classNames}>
      <h1>Colm Gallagher & Katelyn Salvatore</h1>
      <h3>
        <span className={styles.nowrap}>September 26, 2020 |&nbsp;</span>
        <span className={styles.nowrap}>Bluemont, VA</span>
      </h3>
      <div className={styles.menu}>
        <a href="/" className={styles.menuItem}>
          Home
        </a>
        <a href="/hotels" className={styles.menuItem}>
          Hotel Info
        </a>
        <a href="/photos" className={styles.menuItem}>
          Gallery
        </a>
      </div>
    </div>
  );
}

export default Navigation;
