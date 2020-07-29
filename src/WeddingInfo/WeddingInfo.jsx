import React from 'react';
import styles from './WeddingInfo.module.scss';
import Countdown from 'react-countdown-now';

function WeddingInfo(props) {
  const classNames =
    styles.weddingInfo + (props.className ? ` ${props.className}` : '');
  return (
    <div className={classNames}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Changed the Date,
          <br />
          But Couldn't Wait
        </h1>
        <p>
          With everything going on in the world today, we have made the decision
          to postpone our wedding to{' '}
          <b>
            August 28<sup>th</sup>, 2021
          </b>
          , in hopes that those will be safer times. As you probably know
          however, we have been engaged for longer than most, and will be{' '}
          <i>tying the knot</i> on our original date - September 26
          <sup>th</sup>, 2020 - witnessed only by our most immediate family.
        </p>
        <p>
          In an effort to simplify the task of sending out updates like this, we
          ask you please share your email with us in the form below.
        </p>
        <p>
          We know many of you may have made plans to attend already, and we
          appologise for any inconveniences.
        </p>
        <div className={styles.signature}>- Colm and Katie</div>
        <div className={styles.events}>
          <div className={styles.event}>
            <h2 className={styles.event}>The Private Ceremony</h2>
            <div className={styles.countdown}>
              ~{' '}
              <Countdown
                date="Sat, 26 Sep 2020"
                renderer={(props) => props.days}
              />{' '}
              Days Away ~
            </div>
          </div>
          <div className={styles.event}>
            <h2 className={styles.event}>Renewal of Vows {'&'} Reception</h2>
            <div className={styles.countdown}>
              ~{' '}
              <Countdown
                date="Sat, 28 Aug 2021"
                renderer={(props) => props.days}
              />{' '}
              Days Away ~
            </div>
          </div>
        </div>
        <div className={styles.eventLinks}>
          <div>
            <a
              href="https://www.whitehallestate.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Whitehall Estate
            </a>
          </div>
          <div>
            <a
              href="https://goo.gl/maps/X8tA6w9WLKUmvmzc7"
              target="_blank"
              rel="noopener noreferrer"
            >
              18301 Whitehall Estate Ln,
              <br />
              Bluemont, VA 20135
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeddingInfo;
