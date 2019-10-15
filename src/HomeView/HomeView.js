import React from "react";
import Footer from "Footer/Footer";
import Gallery from "Gallery/Gallery";
import Navigation from "Navigation/Navigation";
import RSVP from "RSVP/RSVP";
import Splash from "Splash/Splash";
import WeddingInfo from "WeddingInfo/WeddingInfo";
import styles from "./HomeView.module.scss";

function HomeView() {
  return (
    <div>
      <Navigation className={styles.navigation} />
      <Splash />
      <WeddingInfo className={styles.weddingInfo} />
      <RSVP />
      <Gallery />
      <Footer />
    </div>
  );
}

export default HomeView;
