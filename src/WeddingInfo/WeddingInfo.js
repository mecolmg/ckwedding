import React from "react";
import styles from "./WeddingInfo.module.scss";
import Countdown from "react-countdown-now";

function WeddingInfo(props) {
  const classNames =
    styles.weddingInfo + (props.className ? ` ${props.className}` : "");
  return (
    <div className={classNames}>
      <h1 className={styles.title}>The Wedding</h1>
      <div className={styles.countdown}>
        ~ <Countdown date="Sat, 26 Sep 2020" renderer={props => props.days} />{" "}
        Days Away ~
      </div>
      <div className={styles.events}>
        <div className={styles.event} hidden>
          <h2>The Rehersal Dinner</h2>
          <p>TBD</p>
        </div>
        <div className={styles.event}>
          <h2>The Reception</h2>
          <div>
            <p>
              <a
                href="https://www.whitehallestate.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Whitehall Estate
              </a>
            </p>
            <p>
              <a
                href="https://goo.gl/maps/X8tA6w9WLKUmvmzc7"
                target="_blank"
                rel="noopener noreferrer"
              >
                18301 Whitehall Estate Ln,
                <br />
                Bluemont, VA 20135
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeddingInfo;
