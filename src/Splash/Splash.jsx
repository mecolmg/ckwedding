import React from 'react';
import styles from './Splash.module.scss';
import Fab from '@material-ui/core/Fab';
import {ScrollToHOC as withScrollTo} from 'react-scroll-to';

function Splash({formRef}) {
  const EmailLink = withScrollTo(({scroll}) => (
    <Fab
      variant="extended"
      color="secondary"
      onClick={() => {
        scroll({y: formRef.current.offsetTop - 8, smooth: true});
      }}
    >
      Sign up for email updates
    </Fab>
  ));

  return (
    <div className={styles.splash}>
      <EmailLink />
    </div>
  );
}

export default Splash;
