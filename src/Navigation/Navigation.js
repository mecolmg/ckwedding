import React from "react";
import styles from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";

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
        <NavLink
          exact
          to="/"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          Home
        </NavLink>
        <NavLink
          to="/hotels"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          Hotel Info
        </NavLink>
        <NavLink
          to="/photos"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          Gallery
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;
