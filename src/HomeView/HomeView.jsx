import React from "react";
import Footer from "Footer/Footer.jsx";
import Navigation from "Navigation/Navigation.jsx";
import Splash from "Splash/Splash.jsx";
import WeddingInfo from "WeddingInfo/WeddingInfo.jsx";
import EmailForm from "EmailForm/EmailForm.jsx";
import RsvpForm from "RsvpForm/RsvpForm";
import styles from "./HomeView.module.scss";

function HomeView() {
  const formRef = React.createRef();
  return (
    <div>
      <Navigation className={styles.navigation} />
      <Splash formRef={formRef} />
      <RsvpForm ref={formRef} className={styles.splashOverlap} />
      <WeddingInfo />
      <Footer />
    </div>
  );
}

export default HomeView;
