import React from "react";
import Footer from "Footer/Footer";
import VenueInfo from "VenueInfo/VenueInfo";
import Navigation from "Navigation/Navigation";

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
