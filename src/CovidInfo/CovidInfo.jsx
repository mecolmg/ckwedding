import React from 'react';
import styles from './CovidInfo.module.scss';

function CovidInfo() {
  return (
    <div className={styles.covidInfo}>
      <h1 className={styles.title}>Coronavirus Update</h1>
      <p>
        Please don&apos;t cancel your plans yet! We&apos;re planning to have the
        wedding on September 26<sup>th</sup>, 2020 as scheduled. Hopefully the
        world will be a bit safer by then.
      </p>
      <p>
        Invitations will be coming a little later than we planned because we had
        to reschedule our tasting, but we&apos;ll try to get those mailed as
        soon as possible. Until then, know that we haven&apos;t given up hope!
        We&apos;re even more excited now to see all our family and friends. Stay
        safe and keep in touch!
      </p>
      <p className={styles.signature}>--Colm and Katie</p>
    </div>
  );
}

export default CovidInfo;
