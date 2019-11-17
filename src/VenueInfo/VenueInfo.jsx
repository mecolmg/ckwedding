import React from "react";
import Quote from "common/Quote.jsx";
import styles from "./VenueInfo.module.scss";

function VenueInfo() {
  return (
    <div className={styles.venueInfo}>
      <h1 className={styles.title}>History of Whitehall Estate</h1>
      <p>
        Whitehall Estate is located in Virginia on the foothills of the majestic
        Blue Ridge Mountains on the western edge of Loudoun County, Virginia in
        the area originally known as Snicker's Gap - the main pathway in the
        area to traverse over the Blue Ridge Mountain to the Shenandoah River
        and Valley beyond.
      </p>
      <p>
        Whitehall Estate was constructed during the Federal Period (circa 1787)
        on land that was part of 2,941 acres patented to George Carter in 1731
        by his father Robert (King) Carter and then in 1768 to then to John
        Augustine Washington (George Washington's brother). When William
        Woodford leased the land in 1787 it was owned by Henry Lee. Woodford's
        widowed daughter-in-law married James Hill, and in 1864 the land was
        owned by a descendant, Washington Hill. George Washington is known to
        have traveled through Snicker's Gap many times including when in the
        employ of Lord Fairfax as a surveyor and on trips to survey in the
        Shenandoah Valley.
      </p>
      <p>
        Whitehall is a fine brick home that survived the Civil War "Battle of
        Snickersville" on October 22, 1862 which is said to have taken place
        across the rolling fields in front of the Manor House.
      </p>
      <Quote>
        On 29 October 1862, the Army of Northern Virginia began its return to
        "middle Virginia" to counter [Union] General McClellan's crossing the
        Potomac into Loudoun County during the period 26-39 October.
        [Confederate General J.E.B.] Stuart began his engagement plan by leading
        Major General FitzLee's horsemen and six of Captain John Pelham's guns
        through the Blue Ridge via Snickers Gap. The initial clash occurred on
        the last day of October, and the antagonists maintained violent contact
        for the next week. Most of the fighting took place in the wedge of land
        between the Snickersville and Ashby's Gap Turnpikes in and around Union
        (now Unison). The Confederates got off to a 'rousing start' on the
        morning of the thirty-first as Stuart with the 3rd and 9th Virginia
        ranged east from Snickersville along the Turnpike to Mountville,
        surprising a 100-man detachment of the 1st Rhode Island Cavalry and
        capturing many.
        <br />
        <br />
        --Henry G. Plaster, "Snickersville During the Civil War," p. 7
      </Quote>
      <p>
        In 1864, area barns and crops were burned to end the assistance of
        Mosby's Rangers. The main house was taken by fire but the structure
        remained. An additional layer of brick was added and the interior
        woodwork was reconstructed in the style of the day.
      </p>
      <p>
        Circa 1890, the later part of the Nineteenth Century brought about many
        changes to the home. The Classical Revival Ballroom was built in order
        to entertain prominent guests, along with such amenities as a Coach
        Landing, Italian Marble Fireplaces, Running Water inside the Manor, Gas
        Lighting and Streetlights from the Manor House to the town.
      </p>
      <p>
        It was in 1900 that the Southern Railroad (later called the Washington &
        Old Dominion - the modern day Bike Trail that extends from Alexandria to
        Purcellville) extended the railway line to the terminus in Bluemont
        Station. In order to attract more visitors to the area, in 1900 the town
        was renamed "Bluemont" after the W & OD Train Station. This scenic
        landscape was a resort community for "City Folk" from Alexandria and
        Washington that ventured out of the city onboard the Railway. The
        natural breezes that whisper through Williams Gap & Snickers Gap in the
        mountains made this a very popular destination in the summer months. The
        local town had a drug store, an ice cream parlor, a movie house, a dance
        hall with orchestras from Washington, and the Blue Ridge Inn above the
        town.
      </p>
      <p>
        Throughout the 20<sup>th</sup> Century, Whitehall Farm was one of the
        largest dairy farms in this part of the State. From 1919 to 1956, the
        farm was owned by the McComb family and they had some of the best
        registered Holstein cattle in the state. From 1956 until 1992, Whitehall
        was the home of James and Zora Brownell who raised a family of four boys
        and one girl on the dairy farm and were well known throughout the area.
      </p>
      <p>
        The dairy farm operations ended with the Brownell's in 1992 and
        Whitehall Estate was founded as a Country Inn to host receptions,
        private parties, weddings and events. In 2005 "The Great Hall" was added
        to host up to 250 guests in a temperature controlled room with amazing
        views of the Blue Ridge, ample restrooms and a restaurant kitchen
        attached to provide fine hospitality to the guests. Today the tradition
        continues as one of the regions finest wedding and reception locations.
      </p>
      <a
        href="https://www.whitehallestate.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.sourceLink}
      >
        Source: Whitehall Estate
      </a>
    </div>
  );
}

export default VenueInfo;
