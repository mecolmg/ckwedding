import React from "react";
import styles from "./Splash.module.scss";
import Fab from "@material-ui/core/Fab";

function Splash() {
  return (
    <div className={styles.splash}>
      <a href="#rsvpSection">
        <Fab variant="extended" color="secondary">
          Unofficial RSVP By November 1st
        </Fab>
      </a>
    </div>
  );
}

export default Splash;
