import React from 'react';
import Footer from 'Footer/Footer.jsx';
import {HotelsAndHousesMap, Splash} from 'HotelsInfo/HotelsInfo.jsx';
import HotelsInfo from 'HotelsInfo/HotelsInfo.jsx';
import Navigation from 'Navigation/Navigation.jsx';
import styles from './HotelsInfoView.module.scss';

function HotelsInfoView() {
  return (
    <div>
      <Navigation className={styles.navigation} />
      <Splash />
      <HotelsInfo className={styles.hotelsInfo} />
      <HotelsAndHousesMap />
      <Footer />
    </div>
  );
}

export default HotelsInfoView;
