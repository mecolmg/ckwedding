import React from 'react';
import Footer from 'Footer/Footer.jsx';
import Gallery from 'Gallery/Gallery.jsx';
import Navigation from 'Navigation/Navigation.jsx';

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
