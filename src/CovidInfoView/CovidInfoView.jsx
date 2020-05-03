import React from "react";
import Footer from "Footer/Footer";
import CovidInfo from "CovidInfo/CovidInfo";
import Navigation from "Navigation/Navigation";

function CovidInfoView() {
  return (
    <div>
      <Navigation />
      <CovidInfo />
      <Footer />
    </div>
  );
}

export default CovidInfoView;
