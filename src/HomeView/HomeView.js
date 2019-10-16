import React from "react";
import Footer from "Footer/Footer";
import Gallery from "Gallery/Gallery";
import Navigation from "Navigation/Navigation";
import RSVP from "RSVP/RSVP";
import Splash from "Splash/Splash";
import WeddingInfo from "WeddingInfo/WeddingInfo";
import styles from "./HomeView.module.scss";

function HomeView() {
  const rsvpRef = React.createRef();
  return (
    <div>
      <Navigation className={styles.navigation} />
      <Splash rsvpRef={rsvpRef} />
      <WeddingInfo className={styles.weddingInfo} />
      <RSVP rsvpRef={rsvpRef} />
      <Gallery />
      <Footer />
    </div>
  );
}

export default HomeView;
