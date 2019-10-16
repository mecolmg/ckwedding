import React from "react";
import styles from "./Splash.module.scss";
import Fab from "@material-ui/core/Fab";
import { ScrollToHOC as withScrollTo } from "react-scroll-to";

function Splash(props) {
  const RsvpLink = withScrollTo(props => (
    <Fab
      variant="extended"
      color="secondary"
      onClick={() => {
        props.scroll({ y: props.rsvpRef.current.offsetTop - 8, smooth: true });
      }}
    >
      Unofficial RSVP By November 1st
    </Fab>
  ));
  return (
    <div className={styles.splash}>
      <RsvpLink rsvpRef={props.rsvpRef} />
    </div>
  );
}

export default Splash;
