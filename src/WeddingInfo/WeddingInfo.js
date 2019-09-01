import React from "react";
import styles from "./WeddingInfo.module.scss";
import Countdown from 'react-countdown-now';

function WeddingInfo() {
  return (
    <div className={styles.weddingInfo}>
      <h1 className={styles.title}>The Wedding</h1>
      <div>
        <Countdown
          date="Sat, 26 Sep 2020"
          renderer={props => props.days}
        />
        {' '}
        Days Away!
      </div>
      <div className={styles.events}>
        <div className={styles.event}>
          <h2>The Rehersal Dinner</h2>
          <p>TBD</p>
        </div>
        <div className={styles.event}>
          <h2>The Reception</h2>
          <div>
            <p>Whitehall Estate</p>
            <p>
              18301 Whitehall Estate Ln,
              <br/>
              Bluemont, VA 20135
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeddingInfo;
