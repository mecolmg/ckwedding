import React from "react";
import Footer from "Footer/Footer";
import Gallery from "Gallery/Gallery";
import Navigation from "Navigation/Navigation";
import RSVP from "RSVP/RSVP";
import Splash from "Splash/Splash";
import WeddingInfo from "WeddingInfo/WeddingInfo";

function HomeView() {
  return (
    <div>
      <Navigation />
      <Splash />
      <WeddingInfo />
      <RSVP />
      <Gallery />
      <Footer />
    </div>
  );
}

export default HomeView;
