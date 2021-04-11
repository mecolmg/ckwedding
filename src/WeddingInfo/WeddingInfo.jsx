import React from "react";
import styles from "./WeddingInfo.module.scss";
import Countdown from "react-countdown-now";

function WeddingInfo(props) {
  const classNames =
    styles.weddingInfo + (props.className ? ` ${props.className}` : "");
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
          to postpone our wedding to{" "}
          <b>
            August 28<sup>th</sup>, 2021
          </b>
          , in hopes that those will be safer times. As you probably know
          however, we have been engaged for longer than most, and decided to
          <i> tie the knot</i> on our original date - September 26
          <sup>th</sup>, 2020 - witnessed only by our most immediate family.
        </p>
        <p>
          In an effort to simplify the task of sending out updates like this, we
          ask you please share your email with us in the form below.
        </p>
        <div className={styles.signature}>- Colm and Katie</div>
        <div className={styles.events}>
          <div className={styles.event}>
            <h2 className={styles.event}>The Private Ceremony</h2>
            <div className={styles.countdown}>~ Success! ~</div>
          </div>
          <div className={styles.event}>
            <h2 className={styles.event}>Renewal of Vows {"&"} Reception</h2>
            <div className={styles.countdown}>
              ~{" "}
              <Countdown
                date="2021-08-28T17:00:00-05:00"
                renderer={(props) => props.days}
              />{" "}
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
        <div className={styles.videoContainer}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/nInHhAkZYgY?rel=0"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyros
          cope; picture-in-picture; fullscreen"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default WeddingInfo;
