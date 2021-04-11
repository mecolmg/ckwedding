import React, { useState } from "react";
import ComfortSuitesLogo from "./images/ComfortSuitesLogo.png";
import MarriottLogo from "./images/MarriottLogo.png";
import HiltonLogo from "./images/EmbassySuitesLogo.png";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import styles from "./HotelsInfo.module.scss";
import mapStyles from "./map_styles.json";
import { compose, lifecycle, withProps } from "recompose";
import { useTheme } from "@material-ui/core/styles";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

const MAPS_API_KEY = "AIzaSyDGOgMb65UUKxKAUrm4tZNYJNPa5Dqxbf8";

export function Splash() {
  return <div className={styles.splash}></div>;
}

export function HotelsInfo(props) {
  const [marriottDialogOpen, setMarriottDialogOpen] = useState(false);
  const [comfortSuitesDialogOpen, setComfortSuitesDialogOpen] = useState(false);
  const [hiltonDialogOpen, setHiltonDialogOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const classNames =
    styles.hotelsInfo + (props.className ? ` ${props.className}` : "");
  return (
    <div className={classNames}>
      <h1 className={styles.title}>Hotel Info</h1>
      <div className={styles.hotelsContainer}>
        <div>
          <p>
            We've updated the hotel wedding blocks for the new 2021 reception
            date! For those who would like to stay close to the Salvatore house
            (or don't care either way), you may be better off waiting several
            weeks to book your hotel.
          </p>
          <p>
            There's a new hotel (Tru by Hilton) that's currently being built in
            One Loudoun. Unfortunately, we don't know when construction will be
            finished, but it's very close to opening! We think guests would
            appreciate staying in One Loudoun, as it's a very fun area with lots
            of restaurants and shopping. It{"'"}s also walking distance from the
            Salvatore house (albeit a long walk).
          </p>
          <p>
            <a href="https://goo.gl/maps/4TrcVzfLN3LKy4Ay9">
              Here{"'"}s where the One Loudoun hotel will be located once it
              opens.
            </a>
          </p>
          <p>
            We'll send an email update when we know more about the opening date
            of the One Loudoun hotel. All guests have plenty of time to reserve
            rooms still, so you shouldn't feel rushed. The following hotels
            listed are also available for the wedding, so please choose
            whichever will work best for you!
          </p>
        </div>
        <Hotel
          name="Comfort Suites"
          address={"80 Prosperity Ave\nLeesburg, VA, 20175"}
          mapsLink="https://goo.gl/maps/KKAgCeakvqvwo8Uf8"
          link="https://www.choicehotels.com/reservations/groups/IA67G8"
          logo={ComfortSuitesLogo}
          viewMoreAction={() => setComfortSuitesDialogOpen(true)}
          hidden
        />
        <Hotel
          name="Marriott - SpringHill Suites"
          address={"20065 Lakeview Center Plaza\nAshburn, Virginia 20147"}
          mapsLink="https://goo.gl/maps/YWEChCQBNbNHP1GQ7"
          link="https://www.marriott.com/events/start.mi?id=1597256182258&key=GRP"
          logo={MarriottLogo}
          viewMoreAction={() => setMarriottDialogOpen(true)}
        />
        <Hotel
          name="Embassy Suites by Hilton"
          address={"44610 Waxpool Road\nDulles, Virginia 20147"}
          mapsLink="https://goo.gl/maps/9cHcBFGTe4zmCi6A7"
          link="https://embassysuites.hilton.com/en/es/groups/personalized/W/WASNLES-GSW-20210827/index.jhtml"
          logo={HiltonLogo}
          viewMoreAction={() => setHiltonDialogOpen(true)}
        />
      </div>
      <Dialog
        open={comfortSuitesDialogOpen}
        maxWidth="md"
        fullScreen={fullScreen}
        onClose={() => setComfortSuitesDialogOpen(false)}
      >
        <DialogTitle>Comfort Suites</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h2>Room Options</h2>
            <p>
              <b>King Studio Suites</b> - One king bed and a pull out sleeper
              sofa, mini refrigerator, microwave, and coffee maker.
              <br />
              Arrival on September 25<sup>th</sup>, 2020 and departure on
              September 27<sup>th</sup>, 2020
              <br />
              $135 per night plus tax
            </p>
            <p>
              <b>Queen Studio Suites</b> - Two queen beds and a pull out sleeper
              sofa, mini refrigerator, microwave and coffee maker.
              <br />
              Arrival on September 25<sup>th</sup>, 2020 and departure on
              September 27<sup>th</sup>, 2020
              <br />
              $135 per night plus tax
            </p>
            <h2>Shuttle Service</h2>
            <p>
              <b>Airport Shuttle</b> - Comfort Suites provides a complimentary
              shuttle to and from Dulles Airport for any guests that may be
              flying in. The shuttle runs from 7 AM - 10 PM daily upon request.
            </p>
            <p>
              <b>Wedding Shuttle</b> - Comfort Suites will also provide one
              complimentary 14 or 12 passenger van to and from Whitehall Estate
              with 10 guaranteed rooms.
            </p>
            <p>
              <b>Rental Cars</b> - If you&apos;d prefer a little more freedom,
              you can rent a car from Enterprise Rental Car in Leeseburg for a
              discounted rate. The rate code is{" "}
              <b className={styles.rateCode}>L16V68G / COM</b>. Call
              703-777-5800 to book.
            </p>
            <h2>How to Book</h2>
            <p>
              To book your room, you can call the hotel directly at 703-669-1650
              and ask for the Salvatore Wedding room block. You can also{" "}
              <a href="https://www.choicehotels.com/reservations/groups/IA67G8">
                book now online
              </a>
              .
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setComfortSuitesDialogOpen(false)}
            color="primary"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={marriottDialogOpen}
        maxWidth="md"
        fullScreen={fullScreen}
        onClose={() => setMarriottDialogOpen(false)}
      >
        <DialogTitle>Marriott - SpringHill Suites</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h2>Check in/out</h2>
            <p>
              <b>Check in: </b>August 26<sup>th</sup>, 2021
              <br />
              <b>Check out: </b>August 30<sup>th</sup>, 2021
              <br />
              <br />
              You can edit the check-in and check-out dates to better fit your
              needs.
            </p>
            <h2>Room Options</h2>
            <p>
              <b>1 King with trundle bed</b> ($109 per night plus tax) - One
              king bed and a trundle bed, mini refrigerator, microwave, and
              coffee maker.
            </p>
            <p>
              <b>2 Queens with trundle bed</b> ($129 per night plus tax) - Two
              queen beds and a trundle bed, mini refrigerator, microwave, and
              coffee maker.
            </p>
            <h2>Breakfast</h2>
            <p>Complimentary buffet breakfast is provided every day.</p>
            <h2>Airport Shuttle</h2>
            <p>
              SpringHill Suites provides a complimentary shuttle to and from
              Dulles Airport for any guests that may be flying in.
              Unfortunately, as of April 11<sup>th</sup>, 2021, the shuttle is
              not running due to covid-19. We're hopeful that it will be back up
              and running by August, though!
            </p>
            <h2>When is the Last Day to Book a Room?</h2>
            <p>
              The last day you can book a room is July 29<sup>th</sup>, 2021!
            </p>
            <h2>How to Book</h2>
            <p>
              The last day to book is August 28<sup>th</sup>, 2020. To book your
              room, you can call the hotel directly at +1-703-723-9300 and ask
              for the Salvatore-Gallagher Wedding room block. You can also{" "}
              <a
                href="https://www.marriott.com/events/start.mi?id=1597256182258&key=GRP"
                target="_blank"
                rel="noopener noreferrer"
              >
                book now online
              </a>
              .
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setMarriottDialogOpen(false)}
            color="primary"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={hiltonDialogOpen}
        maxWidth="md"
        fullScreen={fullScreen}
        onClose={() => setHiltonDialogOpen(false)}
      >
        <DialogTitle>Embassy Suites by Hilton</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h2>Check in/out</h2>
            <p>
              <b>Check in:</b> August 27th, 2021
              <br />
              <b>Check out:</b> August 29th, 2021
              <br />
              <br />
              You can edit the check-in and check-out dates to better fit your
              needs.
            </p>
            <h2>Room Options</h2>
            <p>
              <b>1 King Bed nonsmoking</b> ($129 per night plus tax) - Separate
              living room, sofa bed, microwave, refrigerator, 2 TVs, WiFi.
              <br />
              <br />
              Relax in this bright two-room suite with a king-sized bed and a
              separate living room featuring an armchair, sofa bed, an activity
              table and a 27-inch TV. Refresh in the bathroom which contains a
              sleek marble vanity, a bathtub and a shower with a rounded shower
              rod for added space and comfort.
              <br />
              <br />
              The suite offers a variety of useful amenities, including a
              microwave, a refrigerator, an MP3 alarm clock and a second 27-inch
              TV in the bedroom.
            </p>
            <p>
              <b>2 Queen Beds nonsmoking</b> ($129 per night plus tax) -
              Separate living room, sofa bed, microwave, refrigerator, 2 TVs
              WiFi.
              <br />
              <br />
              Enjoy a comfortable stay in this two-room suite with two queen
              beds. Relax in the separate living room featuring an armchair, a
              sofa bed, an activity table and a 27-inch TV. As with all of our
              suites, included is a full cooked-to-order breakfast and our
              Evening Reception. This gives you the ability to tailor your own
              breakfast experience, as well as allowing you to easily unwind and
              relax in the evening after a long day of work or fun. Unwind in
              the bathroom which contains a marble vanity and a bathtub and
              shower with a curved shower rod for added space.
              <br />
              <br />
              The suite offers several convenient features, including a
              microwave, a refrigerator, an MP3 alarm clock and a second 27-inch
              TV in the bedroom.
            </p>
            <h2>Breakfast, Lunch, and Dinner</h2>
            <p>
              Complimentary cooked-to-order breakfast is provided every day.
              <br />
              There is also an on-site restaurant where guests can purchase
              lunch and/or dinner.
            </p>
            <h2>Airport Shuttle</h2>
            <p>
              As of April 11<sup>th</sup>, 2021, the complimentary Dulles
              airport shuttle is not running at the moment due to covid-19. It
              might be running again by August, however!
              <br />
              If the airport shuttle is running, guests just need to call the
              hotel when they're ready to be picked up. The hotel will send a
              shuttle over, and it should arrive within about 15 minutes!
            </p>
            <h2>Hotel Amenities</h2>
            <p>
              Free breakfast, non-smoking rooms, free WiFi, complimentary
              evening reception, free parking, on-site restaurant, indoor pool,
              outdoor pool, fitness center, airport shuttle, business center.
            </p>
            <h2>When is the Last Day to Book a Room?</h2>
            <p>
              Rooms in the hotel wedding block can be booked until 24 hours
              before your planned check-in date! So for most guests, that means
              you can wait to reserve a room until August 26<sup>th</sup> at the
              latest. We would recommend booking sooner than 24 hours out just
              to be safe though!
            </p>
            <h2>How to Book</h2>
            <p>
              To book your room, you can call the hotel directly at
              +1-703-723-5300 and ask for the Gallagher/Salvatore Wedding room
              block. You can also{" "}
              <a
                href="https://embassysuites.hilton.com/en/es/groups/personalized/W/WASNLES-GSW-20210827/index.jhtml"
                target="_blank"
                rel="noopener noreferrer"
              >
                book now online
              </a>
              .
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setHiltonDialogOpen(false)}
            color="primary"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Hotel({
  name,
  logo,
  address,
  link,
  mapsLink,
  viewMoreAction,
  ...props
}) {
  return (
    <div className={styles.hotel} {...props}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={logo} alt={`${name} Logo`} className={styles.hotelImage} />
      </a>
      <p>{name}</p>
      <a href={mapsLink} target="_blank" rel="noopener noreferrer">
        <div>
          {address.split("\n").map((x, index) => (
            <div key={index}>{x}</div>
          ))}
        </div>
      </a>
      <div className={styles.hotelButtons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => viewMoreAction()}
        >
          View Details
        </Button>
        <Button
          variant="contained"
          color="primary"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}

export const HotelsAndHousesMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAPS_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  lifecycle({
    componentWillMount() {
      const refs = {};
      const markers = [
        {
          name: "Whitehall Estate",
          position: { lat: 39.1118773, lng: -77.8251408 },
          link: "https://goo.gl/maps/XG5LsDTdDt3V7wM49",
        },
        {
          name: "The Gallaghers' House",
          position: { lat: 39.0168022, lng: -77.503797 },
          link: "https://goo.gl/maps/ZPRGbeqaTYG2yHRR9",
        },
        {
          name: "The Salvatores' House",
          position: { lat: 39.0585488, lng: -77.4752764 },
          link: "https://goo.gl/maps/oUUsEfGoT6GZGp8z8",
        },
        // {
        //   name: "Comfort Suites",
        //   position: { lat: 39.104933, lng: -77.548374 },
        //   link: "https://goo.gl/maps/zYoyV7xnGgSj76WG6",
        // },
        {
          name: "Marriott - SpringHill Suites",
          position: { lat: 39.0608259, lng: -77.4528328 },
          link: "https://goo.gl/maps/YWEChCQBNbNHP1GQ7",
        },
        {
          name: "Embassy Suites by Hilton",
          position: { lat: 39.01427, lng: -77.46201 },
          link: "https://goo.gl/maps/9cHcBFGTe4zmCi6A7",
        },
      ];
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(marker.position);
      });

      this.setState({
        bounds,
        center: bounds.getCenter(),
        markers,
        onMapMounted: (ref) => {
          refs.map = ref;
          if (refs.map) {
            refs.map.fitBounds(bounds);
            this.setState({ zoom: refs.map.getZoom() - 1 });
          }
        },
        zoom: 11,
      });
    },
  }),
  withGoogleMap
)((props) => {
  const markers = props.markers.map((marker, index) => {
    return (
      <MarkerWithLabel
        key={index}
        position={marker.position}
        labelAnchor={new window.google.maps.Point(0, 0)}
        labelClass={styles.markerLabel}
        onClick={() => window.open(marker.link)}
        zIndex={marker.zIndex}
      >
        <Paper className={styles.markerLabelContent}>{marker.name}</Paper>
      </MarkerWithLabel>
    );
  });

  return (
    <GoogleMap
      ref={props.onMapMounted}
      zoom={props.zoom}
      center={props.center}
      defaultOptions={{
        styles: mapStyles,
      }}
    >
      {markers}
    </GoogleMap>
  );
});

export default HotelsInfo;
