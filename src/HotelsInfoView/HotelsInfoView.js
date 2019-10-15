import React from "react";
import Footer from "Footer/Footer";
import { Splash } from "HotelsInfo/HotelsInfo";
import HotelsInfo from "HotelsInfo/HotelsInfo";
import Navigation from "Navigation/Navigation";
import styles from "./HotelsInfoView.module.scss";

function HotelsInfoView() {
  return (
    <div>
      <Navigation className={styles.navigation} />
      <Splash />
      <HotelsInfo className={styles.hotelsInfo} />
      <Footer />
    </div>
  );
}

export default HotelsInfoView;
