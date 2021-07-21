import React from "react";
import PropTypes from "prop-types";
import styles from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";

function Navigation(props) {
  const classNames =
    styles.navigation + (props.className ? ` ${props.className}` : "");
  return (
    <div className={classNames}>
      <h1>Colm Gallagher & Katelyn Salvatore</h1>
      <h3>
        <span className={styles.nowrap}>August 28, 2021 |&nbsp;</span>
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
          to="/venue"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          About Venue
        </NavLink>
        <NavLink
          to="/our-story"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          Our Story
        </NavLink>
        <NavLink
          to="/menu"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          Menu
        </NavLink>
        <NavLink
          to="/registry"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          Registry
        </NavLink>
        <NavLink
          to="/hotels"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          Hotel Info
        </NavLink>
        <NavLink
          to="/gallery"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          Gallery
        </NavLink>
      </div>
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
};

export default Navigation;
