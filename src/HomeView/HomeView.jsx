import React from 'react';
import Footer from 'Footer/Footer.jsx';
import Navigation from 'Navigation/Navigation.jsx';
import RSVP from 'RSVP/RSVP.jsx';
import Splash from 'Splash/Splash.jsx';
import WeddingInfo from 'WeddingInfo/WeddingInfo.jsx';
import EmailForm from 'EmailForm/EmailForm.jsx';
import styles from './HomeView.module.scss';

function HomeView() {
  const formRef = React.createRef();
  return (
    <div>
      <Navigation className={styles.navigation} />
      <Splash formRef={formRef} />
      <WeddingInfo className={styles.weddingInfo} />
      <EmailForm ref={formRef} />
      <Footer />
    </div>
  );
}

export default HomeView;
