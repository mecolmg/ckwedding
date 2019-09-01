import React from "react";
import styles from "./Navigation.module.scss";

function Navigation() {
  return (
    <div className={styles.navigation}>
      <h1>Colm Gallagher & Katelyn Salvatore</h1>
      <h3>September 26, 2020 | Bluemont, VA</h3>
      <div className={styles.menu}>
        <a href="#" className={styles.menuItem}>About</a>
        <a href="#" className={styles.menuItem}>RSVP</a>
        <a href="#" className={styles.menuItem}>Contact</a>
      </div>
    </div>
  );
}

export default Navigation;
