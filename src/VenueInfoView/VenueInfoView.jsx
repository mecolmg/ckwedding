import React from "react";
import Footer from "Footer/Footer.jsx";
import VenueInfo from "VenueInfo/VenueInfo.jsx";
import Navigation from "Navigation/Navigation.jsx";

function VenueInfoView() {
  return (
    <div>
      <Navigation />
      <VenueInfo />
      <Footer />
    </div>
  );
}

export default VenueInfoView;
