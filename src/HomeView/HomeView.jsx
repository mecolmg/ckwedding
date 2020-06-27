import React from 'react';
import Footer from 'Footer/Footer.jsx';
import Gallery from 'Gallery/Gallery.jsx';
import Navigation from 'Navigation/Navigation.jsx';
import RSVP from 'RSVP/RSVP.jsx';
import Splash from 'Splash/Splash.jsx';
import WeddingInfo from 'WeddingInfo/WeddingInfo.jsx';
import styles from './HomeView.module.scss';

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
