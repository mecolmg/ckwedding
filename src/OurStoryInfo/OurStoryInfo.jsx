import React from "react";
import Quote from "common/Quote.jsx";
import styles from "./OurStoryInfo.module.scss";
import physics from "./images/physics.jpg";
import fuzzy from "./images/fuzzy.jpg";
import sweetfrog from "./images/sweetfrog.jpg";
import promposal from "./images/promposal.jpg";
import moonbuggy from "./images/moonbuggy.jpg";
import waj_apt from "./images/waj_apt.jpg";
import senior_prom from "./images/senior_prom_tree.jpg";
import high_school_grad from "./images/high_school_grad_robes.jpg";
import color_run from "./images/color_run.jpg";
import proposal from "./images/proposal.jpg";
import duck_pond from "./images/duck_pond.jpg";
import mexico_repel from "./images/mexico_repel.jpg";
import new_zealand from "./images/new_zealand.jpg";

function OurStoryInfo() {
  return (
    <div className={styles.ourStoryInfo}>
      <h1 className={styles.title}>Our Love Story</h1>
      <div className={styles.portraitImages}>
        <img src={fuzzy} className={styles.portraitImage} />
        <img src={physics} className={styles.portraitImage} id="physics" />
      </div>
      <p>
        It all started in high school physics. Katie was seated two rows
        directly behind Colm. His sister, Aine, was seated directly next to him.
        About halfway through the year, they had their lesson on static
        electricity. Katie{"'"}s hair stood on end, and Colm was told to hold
        her hand. Sparks were flying!
      </p>
      <div className={styles.horizontalImages}>
        <img src={sweetfrog} className={styles.horizontalImage} />
        <img src={moonbuggy} className={styles.horizontalImage} />
      </div>
      <p>
        They became closer the summer before their senior year of high school,
        bonding over joining Moonbuggy (an engineering class where they designed
        and built a moon rover). Katie was technically Colm's boss! A week
        before Colm's birthday, Colm visited Katie at the frozen yogurt shop she
        was working at in high school, enjoyed a frozen yogurt after the shop
        closed, and officially started dating!
      </p>
      <p>
        They had their first date on Colm's 17th birthday--no pressure... They
        went to see an R-rated movie to celebrate. Turns out it wasn't a very
        popular movie, so they had the ENTIRE THEATER to themselves!
      </p>
      <div className={styles.horizontalImages}>
        <img src={promposal} className={styles.horizontalImage} />
        <img
          src={senior_prom}
          className={styles.horizontalImage}
          id="senior_prom"
        />
        <img
          src={color_run}
          className={styles.horizontalImage}
          id="color_run"
        />
        <img
          src={high_school_grad}
          className={styles.horizontalImage}
          id="high_school_grad"
        />
      </div>
      <p>
        Throughout their senior year they were able to enjoy homecoming, prom,
        the moonbuggy competition, graduation, and many more moments together.
        Both Colm and Katie wanted to study engineering in college, and they
        both decided to attend Virginia Tech!
      </p>
      <div className={styles.horizontalImages}>
        <img src={waj_apt} className={styles.horizontalImage} id="waj_apt" />
        <img
          src={duck_pond}
          className={styles.horizontalImage}
          id="duck_pond"
        />
      </div>
      <p>
        They had lots of fun living in the same dorm in college. Eventually,
        Katie decided to take a semester off of school to work for GE in
        Florida, and Colm decided to take the following semester off of school
        to work for Facebook in California. Katie would then move to Michigan in
        the summer to work for GM, and Colm would move to Seattle to work for
        Google. Thus began their year of long distance.
      </p>
      <div className={styles.horizontalImages}>
        <img src={proposal} className={styles.horizontalImage} />
        <img src={mexico_repel} className={styles.horizontalImage} />
      </div>
      <p>
        After Katie finished her semester in Florida, they both decided to
        celebrate the new year together at a resort in Mexico! A few minutes
        into the start of 2017, they stopped at a balcony in the resort to enjoy
        the view of fireworks over the ocean. At that moment, Colm got down on
        one knee and proposed (and Katie accepted)!
      </p>
      <div className={styles.horizontalImages}>
        <img src={new_zealand} className={styles.horizontalImage} />
      </div>
      <p>
        Despite being engaged now, they had to go back to long distance. But
        they made it through! They successfully graduated from Virginia Tech at
        the same time, and then left for a celebratory trip to New Zealand!
        After they came back, they moved up to Boston, and started their
        wonderful life together!
      </p>
    </div>
  );
}

export default OurStoryInfo;
