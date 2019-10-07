import React from "react";
import Footer from "Footer/Footer";
import Gallery from "Gallery/Gallery";
import Navigation from "Navigation/Navigation";

function PhotoView() {
  return (
    <div>
      <Navigation />
      <Gallery />
      <Footer />
    </div>
  );
}

export default PhotoView;
